import type { BaseResponse } from '@/common/types/types'
import type { LoginInputs } from '@/features/auth/lib/schemas/loginSchema'
import { baseApi } from '@/app/baseApi'

export const authApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    authMe: build.query<BaseResponse<{ id: number; email: string; login: string }>, void>({
      query: () => ({ method: 'get', url: '/auth/me' }),
      //await new Promise((resolve) => setTimeout(resolve, 3000))
    }),
    login: build.mutation<BaseResponse<{ userId: number; token: string }>, LoginInputs>({
      query: (body) => ({ method: 'post', url: '/auth/login', body }),
    }),
    logout: build.mutation<BaseResponse, void>({
      query: () => ({ method: 'delete', url: '/auth/login' }),
    }),
  }),
})

export const { useAuthMeQuery, useLoginMutation, useLogoutMutation } = authApi
