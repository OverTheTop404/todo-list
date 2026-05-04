import type { List, TodoListType } from '@/features/todolists/api/todoListsApi.types'
import { supabaseApi } from '@/app/supabaseApi'
import { supabase } from '@/app/supaBaseClient'
import { modeAddTodoAC } from '@/app/app-slice'

type PartialExcept<T, K extends keyof T = never> = K extends never ? Partial<T> : Partial<Omit<T, K>> & Pick<T, K>

export const todoListsSbApi = supabaseApi.injectEndpoints({
  endpoints: (build) => ({
    getTodoLists: build.query<TodoListType[], { board_id: string }>({
      queryFn: async ({ board_id }) => {
        try {
          // await new Promise((resolve) => setTimeout(resolve, 1000))
          const { data, error } = await supabase
            .from('lists')
            .select('*')
            .eq('board_id', board_id)
            .order('position', { ascending: true })
            .order('created_at', { ascending: false })
          if (error) throw error
          const transformData = data?.map((item) => ({
            ...item,
            entityStatus: 'idle',
            renameStatus: false,
            addTaskStatus: false,
          }))
          return { data: transformData }
        } catch (error) {
          return { error }
        }
      },
      providesTags: ['List'],
    }),
    addTodoList: build.mutation<List, Pick<List, 'title' | 'board_id'>>({
      queryFn: async (listData) => {
        try {
          const { data } = await supabase.from('lists').insert([listData]).select().single()
          return { data }
        } catch (error) {
          return { error }
        }
      },
      async onQueryStarted({ board_id, title }, { dispatch, queryFulfilled }) {
        dispatch(modeAddTodoAC({ status: false }))
        const patchResult = dispatch(
          todoListsSbApi.util.updateQueryData('getTodoLists', { board_id }, (draft) => {
            const tempId = `temp-${Date.now()}-${Math.random()}`
            const optimisticList: TodoListType = {
              id: tempId,
              title,
              board_id,
              isNew: true,
              position: draft.length,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              entityStatus: 'idle',
              renameStatus: false,
              addTaskStatus: false,
              is_archived: false,
              head_line_color: 'rgb(26, 197, 23)',
            }
            draft.unshift(optimisticList)
          }),
        )

        try {
          const { data: realData } = await queryFulfilled
          dispatch(
            todoListsSbApi.util.updateQueryData('getTodoLists', { board_id }, (draft) => {
              const tempIndex = draft.findIndex((item) => item.id.toString().startsWith('temp-'))
              if (tempIndex !== -1 && realData) {
                draft[tempIndex] = {
                  ...realData,
                  entityStatus: 'idle',
                  renameStatus: false,
                  addTaskStatus: false,
                  isNew: true,
                }
              }
            }),
          )
        } catch (error) {
          patchResult.undo()
        }
      },
      invalidatesTags: ['List'],
    }),
    deleteTodoList: build.mutation<{ status: number; statusText: string }, { listId: string; boardId: string }>({
      queryFn: async ({ listId }) => {
        try {
          await supabase.from('lists').delete().eq('id', listId)
          return {
            data: { status: 204, statusText: 'Success' },
          }
        } catch (error) {
          return { error }
        }
      },
      onQueryStarted: async ({ listId, boardId }, { dispatch, queryFulfilled }) => {
        const deleteResult = dispatch(
          todoListsSbApi.util.updateQueryData('getTodoLists', { board_id: boardId }, (state) => {
            const index = state.findIndex((item) => item.id === listId)
            if (index !== -1) {
              state.splice(index, 1)
            }
          }),
        )
        try {
          await queryFulfilled
        } catch (e) {
          deleteResult.undo()
        }
      },
      invalidatesTags: ['List'],
    }),
    updateTodoList: build.mutation<{ status: number; statusText: string }, PartialExcept<List, 'id'>>({
      queryFn: async (arg) => {
        try {
          await supabase.from('lists').update(arg).eq('id', arg.id).select()
          return { data: { status: 204, statusText: 'Success' } }
        } catch (error) {
          return { error }
        }
      },
      onQueryStarted: async (arg, { dispatch, queryFulfilled }) => {
        const updateResult = dispatch(
          todoListsSbApi.util.updateQueryData('getTodoLists', { board_id: arg.board_id! }, (state) => {
            const index = state.findIndex((item) => item.id === arg.id)
            if (index !== -1) state[index] = { ...state[index], ...arg }
          }),
        )
        try {
          await queryFulfilled
        } catch (e) {
          updateResult.undo()
        }
      },
      invalidatesTags: ['List'],
    }),
  }),
})

export const { useGetTodoListsQuery, useAddTodoListMutation, useDeleteTodoListMutation, useUpdateTodoListMutation } = todoListsSbApi
