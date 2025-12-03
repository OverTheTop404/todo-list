import { supabaseApi } from '@/app/supabaseApi'
import { Session, User } from '@supabase/supabase-js'

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

    // Логин
    login: build.mutation<{ user: User; session: Session }, { email: string; password: string }>({
      query: (body) => ({ method: 'post', url: '/auth/login', body }),
      invalidatesTags: ['Auth'],
    }),

    // Логаут
    logout: build.mutation<void, void>({
      query: () => ({ method: 'delete', url: '/auth/logout' }),
      invalidatesTags: ['Auth', 'List', 'Cards'],
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

export const { useAuthMeQuery, useLoginMutation, useLogoutMutation, useSignUpMutation, useUpdateUserMutation } = sbAuthApi
