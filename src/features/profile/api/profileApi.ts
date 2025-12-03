import { supabaseApi } from '@/app/supabaseApi'

export const profileApi = supabaseApi.injectEndpoints({
  endpoints: (build) => ({
    // Получить профиль пользователя
    getProfile: build.query<any, string>({
      query: (userId) => ({
        method: 'GET',
        url: `/rest/profiles?id=eq.${userId}`,
      }),
      providesTags: ['Profile'],
    }),

    // Создать или обновить профиль
    upsertProfile: build.mutation<any, any>({
      query: (profileData) => ({
        method: 'POST',
        url: '/rest/profiles',
        body: profileData,
      }),
      invalidatesTags: ['Profile'],
    }),

    // Обновить профиль
    updateProfile: build.mutation<any, { id: string; updates: any }>({
      query: ({ id, updates }) => ({
        method: 'PATCH',
        url: `/rest/profiles?id=eq.${id}`,
        body: updates,
      }),
      invalidatesTags: ['Profile'],
    }),
  }),
})

export const { useGetProfileQuery, useUpsertProfileMutation, useUpdateProfileMutation } = profileApi
