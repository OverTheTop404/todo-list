import { supabaseApi } from '@/app/supabaseApi'
import { supabase } from '@/app/supaBaseClient'
import type { Board } from '@/features/boards/api/boardsApi.types'

export const boardsApi = supabaseApi.injectEndpoints({
  endpoints: (builder) => ({
    // Получение всех досок
    getBoards: builder.query<Board[], void>({
      queryFn: async () => {
        const { data, error } = await supabase.from('boards').select('*').order('position', { ascending: true })

        if (error) {
          return { error: error }
        }
        return { data: data || [] }
      },
      providesTags: ['Board'],
    }),

    // Получение доски по ID
    getBoardById: builder.query<Board, string>({
      queryFn: async (id) => {
        const { data, error } = await supabase.from('boards').select('*').eq('id', id).single()

        if (error) {
          return { error: error }
        }
        return { data: data }
      },
      providesTags: (result) => (result ? [{ type: 'Board', id: result.id }] : ['Board']),
    }),

    // Создание новой доски
    createBoard: builder.mutation<Board, Partial<Board>>({
      queryFn: async (boardData) => {
        const { data, error } = await supabase.from('boards').insert([boardData]).select().single()

        if (error) {
          return { error: error }
        }
        return { data: data }
      },
      invalidatesTags: ['Board'],
    }),

    // Обновление доски
    updateBoard: builder.mutation<Board, { id: string; updates: Partial<Board> }>({
      queryFn: async ({ id, updates }) => {
        const { data, error } = await supabase.from('boards').update(updates).eq('id', id).select().single()

        if (error) {
          return { error: error }
        }
        return { data: data }
      },
      invalidatesTags: (result) => (result ? [{ type: 'Board', id: result.id }] : ['Board']),
    }),

    // Удаление доски
    deleteBoard: builder.mutation<void, string>({
      queryFn: async (id) => {
        const { error } = await supabase.from('boards').delete().eq('id', id)

        if (error) {
          return { error: error }
        }
        return { data: undefined }
      },
      invalidatesTags: ['Board'],
    }),

    // Обновление позиций досок
    updateBoardsPosition: builder.mutation<void, { boards: Array<{ id: string; position: number }> }>({
      queryFn: async ({ boards }) => {
        const updates = boards.map((board) => supabase.from('boards').update({ position: board.position }).eq('id', board.id))

        const results = await Promise.all(updates)
        const error = results.find((result) => result.error)?.error

        if (error) {
          return { error: error }
        }
        return { data: undefined }
      },
      invalidatesTags: ['Board'],
    }),
  }),
})

export const {
  useGetBoardsQuery,
  useGetBoardByIdQuery,
  useCreateBoardMutation,
  useUpdateBoardMutation,
  useDeleteBoardMutation,
  useUpdateBoardsPositionMutation,
} = boardsApi
