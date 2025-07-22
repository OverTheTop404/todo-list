import { instance } from '@/common/instance'
import type { BaseResponse } from '@/common/types/types'
import type { DomainTask, GetDomainTasksResponse, GetTasksResponse, UpdateTaskModel } from '@/features/todolists/api/tasksApi.types'
import { TasksPortion } from '@/common/enums/enams'
import { baseApi } from '@/app/baseApi'

export const tasksApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTasks: build.query<GetTasksResponse, string>({
      query: (id) => `/todo-lists/${id}/tasks?count=${TasksPortion.Twenty}`,
      transformResponse: (payload: GetDomainTasksResponse): GetTasksResponse => {
        return { ...payload, items: payload.items.map((task) => ({ ...task, renameStatus: false, entityStatus: 'idle' })) }
      },
      providesTags: ['Task'],
    }),
    createTask: build.mutation<BaseResponse<{ item: DomainTask }>, { todoListId: string; title: string }>({
      query: (payload) => ({ method: 'post', url: `/todo-lists/${payload.todoListId}/tasks`, body: { title: payload.title } }),
      invalidatesTags: ['Task'],
    }),
    deleteTask: build.mutation<BaseResponse, { todolistId: string; taskId: string }>({
      query: (payload) => ({ method: 'delete', url: `/todo-lists/${payload.todolistId}/tasks/${payload.taskId}` }),
      invalidatesTags: ['Task'],
    }),
    updateTask: build.mutation<BaseResponse<{ item: DomainTask }>, { todolistId: string; taskId: string; model: UpdateTaskModel }>({
      query: (args) => ({ method: 'put', url: `/todo-lists/${args.todolistId}/tasks/${args.taskId}`, body: args.model }),
      invalidatesTags: ['Task'],
    }),
  }),
})

export const { useGetTasksQuery, useCreateTaskMutation, useDeleteTaskMutation, useUpdateTaskMutation } = tasksApi

export const _tasksApi = {
  getTasks(todoListId: string) {
    return instance.get<GetDomainTasksResponse>(`/todo-lists/${todoListId}/tasks?count=${TasksPortion.Twenty}`)
  },
  createTask(payload: { todoListId: string; title: string }) {
    return instance.post<BaseResponse<{ item: DomainTask }>>(`/todo-lists/${payload.todoListId}/tasks`, { title: payload.title })
  },
  deleteTask(payload: { todolistId: string; taskId: string }) {
    return instance.delete<BaseResponse>(`/todo-lists/${payload.todolistId}/tasks/${payload.taskId}`)
  },
  updateTask(payload: { todolistId: string; taskId: string; model: UpdateTaskModel }) {
    const { todolistId, taskId, model } = payload
    return instance.put<BaseResponse<{ item: DomainTask }>>(`/todo-lists/${todolistId}/tasks/${taskId}`, model)
  },
}
