import { supabaseApi } from '@/app/supabaseApi'
import { Session, User } from '@supabase/supabase-js'
import { supabase } from '@/app/supaBaseClient' // Добавляем импорт supabase

const signUpModelCreator = (args: { email: string; password: string; metadata?: any }) => {
  return {
    email: args.email,
    password: args.password,
    options: {
      data: {
        first_name: args.metadata,
      },
    },
  }
}

export const sbAuthApi = supabaseApi.injectEndpoints({
  endpoints: (build) => ({
    // Получение текущего пользователя
    authMe: build.query<Session | null, void>({
      query: () => ({ method: 'get', url: '/auth/me' }),
      providesTags: ['Auth'],
      //await new Promise((resolve) => setTimeout(resolve, 3000))
    }),

    // Логин с email/password
    login: build.mutation<{ user: User; session: Session }, { email: string; password: string }>({
      query: (body) => ({ method: 'post', url: '/auth/login', body }),
      invalidatesTags: ['Auth'],
    }),

    // НОВЫЙ: Логин через GitHub
    loginWithGitHub: build.mutation<void, void>({
      queryFn: async () => {
        try {
          const { error } = await supabase.auth.signInWithOAuth({
            provider: 'github',
            options: {
              redirectTo: `${window.location.origin}/auth/callback`,
            },
          })

          if (error) {
            return { error: { data: error, status: 400 } }
          }

          // После редиректа на GitHub, мы не получим данные сразу
          // Пользователь будет перенаправлен на страницу GitHub
          return { data: undefined }
        } catch (error: any) {
          return { error: { data: error.message, status: 500 } }
        }
      },
    }),

    // НОВЫЙ: Получение сессии после OAuth callback
    getGitHubSession: build.query<Session | null, void>({
      queryFn: async () => {
        try {
          const { data, error } = await supabase.auth.getSession()

          if (error) {
            return { error: { data: error, status: 400 } }
          }

          return { data: data.session }
        } catch (error: any) {
          return { error: { data: error.message, status: 500 } }
        }
      },
      providesTags: ['Auth'],
    }),

    // Логаут
    logout: build.mutation<void, void>({
      query: () => ({ method: 'delete', url: '/auth/logout' }),
      invalidatesTags: ['Auth', 'Board', 'List', 'Cards'],
    }),

    // Регистрация
    signUp: build.mutation<{ user: User; session: Session }, { email: string; password: string; metadata?: any }>({
      query: (body) => ({
        method: 'post',
        url: '/auth/signup',
        body: { ...signUpModelCreator(body) },
      }),
      invalidatesTags: ['Auth'],
    }),

    // Обновление пользователя
    updateUser: build.mutation<any, { updates: any }>({
      query: ({ updates }) => ({
        method: 'put',
        url: '/auth/user',
        body: updates,
      }),
      invalidatesTags: ['Auth'],
    }),
  }),
})

export const {
  useAuthMeQuery,
  useLoginMutation,
  useLogoutMutation,
  useSignUpMutation,
  useUpdateUserMutation,
  useLoginWithGitHubMutation, // НОВЫЙ
  useGetGitHubSessionQuery, // НОВЫЙ
} = sbAuthApi
