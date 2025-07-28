import type { BaseResponse } from '@/common/types/types'
import type { DomainTask, GetDomainTasksResponse, GetTasksResponse, UpdateTaskModel } from '@/features/todolists/api/tasksApi.types'
import { TasksPortion } from '@/common/enums/enams'
import { baseApi } from '@/app/baseApi'

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<GetTasksResponse, string>({
      query: (id) => `/todo-lists/${id}/tasks?count=${TasksPortion.Thirty}`,
      transformResponse: (payload: GetDomainTasksResponse): GetTasksResponse => {
        return { ...payload, items: payload.items.map((task) => ({ ...task, renameStatus: false, entityStatus: 'idle' })) }
      },
      providesTags: (_res, _err, id) => [{ type: 'Task', id }],
    }),
    createTask: build.mutation<BaseResponse<{ item: DomainTask }>, { todoListId: string; title: string }>({
      query: (payload) => ({ method: 'post', url: `/todo-lists/${payload.todoListId}/tasks`, body: { title: payload.title } }),
      invalidatesTags: (_res, _err, payload) => [{ type: 'Task', id: payload.todoListId }],
    }),
    deleteTask: build.mutation<BaseResponse, { todolistId: string; taskId: string }>({
      query: (payload) => ({ method: 'delete', url: `/todo-lists/${payload.todolistId}/tasks/${payload.taskId}` }),
      invalidatesTags: (_res, _err, payload) => [{ type: 'Task', id: payload.todolistId }],
    }),
    updateTask: build.mutation<BaseResponse<{ item: DomainTask }>, { todolistId: string; taskId: string; model: UpdateTaskModel }>({
      query: (payload) => ({ method: 'put', url: `/todo-lists/${payload.todolistId}/tasks/${payload.taskId}`, body: payload.model }),
      invalidatesTags: (_res, _err, payload) => [{ type: 'Task', id: payload.todolistId }],
    }),
  }),
})

export const { useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = tasksApi
