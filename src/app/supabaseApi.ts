import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { handleError } from '@/common/utils/handleError'
import { supabase } from '@/app/supaBaseClient'

export const supabaseApi = createApi({
  reducerPath: 'supabaseApi',
  tagTypes: ['Board', 'List', 'Cards', 'Auth', 'Profile'],
  refetchOnReconnect: true,
  baseQuery: async (args, api, extraOptions) => {
    try {
      const {
        data: { session },
      } = await supabase.auth.getSession()
      const token = session?.access_token

      // Для запросов к Supabase REST API
      if (args.url?.startsWith('/rest/')) {
        const fetchResult = await fetchBaseQuery({
          baseUrl: `${import.meta.env.VITE_SUPABASE_URL}/rest/v1`,
          prepareHeaders: (headers) => {
            headers.set('apikey', import.meta.env.VITE_SUPABASE_ANON_KEY)

            if (token) headers.set('Authorization', `Bearer ${token}`)
            headers.set('Content-Type', 'application/json')
            return headers
          },
        })(args, api, extraOptions)

        await handleError(api, fetchResult)

        return fetchResult
      }

      // Для запросов к Supabase Auth API
      if (args.url?.startsWith('/auth/')) {
        // Используем напрямую Supabase JS клиент
        const result = await handleSupabaseAuthRequest(args)
        return { data: result }
      }

      throw new Error('Invalid API endpoint')
    } catch (error) {
      return { error }
    }
  },
  endpoints: () => ({}),
})

// Обработчик запросов к Auth API
async function handleSupabaseAuthRequest(args: any) {
  switch (args.method) {
    case 'get':
      if (args.url === '/auth/me') {
        const {
          data: { session },
        } = await supabase.auth.getSession()
        return session
      }
      break

    case 'post':
      if (args.url === '/auth/login') {
        const { email, password } = args.body
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })
        if (error) throw error
        return data
      }
      if (args.url === '/auth/signup') {
        const { data, error } = await supabase.auth.signUp(args.body)
        if (error) throw error
        return data
      }
      break

    case 'delete':
      if (args.url === '/auth/logout') {
        const { error } = await supabase.auth.signOut()
        if (error) throw error
        return { success: true }
      }
      break
  }
}
