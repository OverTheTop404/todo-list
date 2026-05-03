import type { TaskSbType } from '@/features/todolists/api/tasksApi.types'
import { supabaseApi } from '@/app/supabaseApi'
import { supabase } from '@/app/supaBaseClient'
import { changeModeAddTaskAC } from '@/features/todolists/utils/todoUpdateQueryData'

export const tasksSbApi = supabaseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<TaskSbType[], { list_id: string }>({
      queryFn: async ({ list_id }) => {
        try {
          const { data: tasks, error } = await supabase.from('cards').select('*').eq('list_id', list_id).order('position', { ascending: true })
          //.order('created_at', { ascending: false })

          if (error) {
            return { error: error as Error }
          }

          const transformData = tasks?.map((item) => ({
            ...item,
            renameStatus: false,
            entityStatus: 'idle',
          }))

          return { data: transformData as TaskSbType[] }
        } catch (error) {
          return { error: error as Error }
        }
      },
      providesTags: ['Cards'],
    }),

    createTask: build.mutation<TaskSbType, { list_id: string; title: string; boardId: string }>({
      queryFn: async ({ list_id, title }) => {
        try {
          const { data: newTask, error } = await supabase
            .from('cards')
            .insert([
              {
                list_id,
                title,
                //position: 0,
                is_completed: false,
              },
            ])
            .select()
            .single()

          if (error) {
            return { error: error as Error }
          }

          const transformData = {
            ...newTask,
            renameStatus: false,
            entityStatus: 'idle',
          }

          return { data: transformData as TaskSbType }
        } catch (error) {
          return { error: error as Error }
        }
      },
      async onQueryStarted({ list_id, title, boardId }, { dispatch, queryFulfilled }) {
        dispatch(changeModeAddTaskAC({ listId: list_id, boardId, status: false }))
        const tempId = `temp-${Date.now()}-${Math.random()}`
        const patchResult = dispatch(
          tasksSbApi.util.updateQueryData('getTasks', { list_id }, (draft) => {
            // Вычисляем максимальную позицию
            let maxPosition = 0
            draft.forEach((task) => {
              if (task.position > maxPosition) {
                maxPosition = task.position
              }
            })

            const optimisticTask: TaskSbType = {
              id: tempId,
              title,
              list_id,
              position: maxPosition + 1,
              created_at: new Date().toISOString(),
              updated_at: new Date().toISOString(),
              description: null,
              is_completed: false,
              labels: [],
              due_date: null,
              renameStatus: false,
              entityStatus: 'idle',
            }
            console.log('Optimistic position:', optimisticTask.position)
            draft.push(optimisticTask)
          }),
        )

        try {
          const { data: realData } = await queryFulfilled
          console.log('Real data from server:', realData)
          dispatch(
            tasksSbApi.util.updateQueryData('getTasks', { list_id }, (draft) => {
              const tempIndex = draft.findIndex((item) => item.id === tempId)
              if (tempIndex !== -1 && realData) {
                draft[tempIndex] = {
                  ...realData,
                  renameStatus: false,
                  entityStatus: 'idle',
                }
              }
            }),
          )
        } catch (error) {
          patchResult.undo()
        }
      },
    }),

    deleteTask: build.mutation<{ status: number; statusText: string }, { list_id: string; task_id: string }>({
      queryFn: async ({ task_id }) => {
        try {
          await supabase.from('cards').delete().eq('id', task_id)
          return {
            data: { status: 204, statusText: 'Success' },
          }
        } catch (error) {
          return { error: error as Error }
        }
      },
      async onQueryStarted({ list_id, task_id }, { dispatch, queryFulfilled }) {
        const patchResult = dispatch(
          tasksSbApi.util.updateQueryData('getTasks', { list_id }, (draft) => {
            const index = draft.findIndex((task) => task.id === task_id)
            if (index !== -1) {
              draft.splice(index, 1)
            }
          }),
        )

        try {
          await queryFulfilled
        } catch (error) {
          patchResult.undo()
        }
      },
    }),

    updateTask: build.mutation<
      { status: number; statusText: string },
      {
        task_id: string
        list_id: string
        updates: Partial<{
          title: string
          description: string | null
          is_completed: boolean
          position: number
          labels: string[]
          due_date: string | null
        }>
      }
    >({
      queryFn: async ({ task_id, updates }) => {
        try {
          await supabase
            .from('cards')
            .update({
              ...updates,
              updated_at: new Date().toISOString(),
            })
            .eq('id', task_id)

          return { data: { status: 204, statusText: 'Success' } }
        } catch (error) {
          return { error: error as Error }
        }
      },
      async onQueryStarted({ task_id, list_id, updates }, { dispatch, queryFulfilled }) {
        // Если list_id не передан, нужно получить его из текущего состояния
        if (!list_id) {
          try {
            const { data: task } = await supabase.from('cards').select('list_id').eq('id', task_id).single()

            if (task) {
              list_id = task.list_id
            }
          } catch (error) {
            console.error('Failed to get list_id for task', task_id)
            return
          }
        }

        const patchResult = dispatch(
          tasksSbApi.util.updateQueryData('getTasks', { list_id }, (draft) => {
            const task = draft.find((task) => task.id === task_id)
            if (task) {
              Object.assign(task, updates)
              task.updated_at = new Date().toISOString()
            }
          }),
        )

        try {
          await queryFulfilled
        } catch (error) {
          patchResult.undo()
        }
      },
    }),

    getTaskById: build.query<TaskSbType, { task_id: string }>({
      queryFn: async ({ task_id }) => {
        try {
          const { data: task, error } = await supabase.from('cards').select('*').eq('id', task_id).single()

          if (error) {
            return { error: error as Error }
          }

          const transformData = {
            ...task,
            renameStatus: false,
            entityStatus: 'idle',
          }

          return { data: transformData as TaskSbType }
        } catch (error) {
          return { error: error as Error }
        }
      },
      providesTags: ['Cards'],
    }),
  }),
})

export const { useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation, useGetTaskByIdQuery } = tasksSbApi
