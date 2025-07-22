import { instance } from '@/common/instance'
import type { DomainTodoLists, TodoListType } from '@/features/todolists/api/todoListsApi.types'
import type { BaseResponse } from '@/common/types/types'
import { baseApi } from '@/app/baseApi'

export const todoListsApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    getTodoLists: build.query<TodoListType[], void>({
      query: () => '/todo-lists',
      transformResponse: (todoLists: DomainTodoLists[]): TodoListType[] => {
        return todoLists.map((todo) => ({
          ...todo,
          headLineColor: '#1ac517',
          entityStatus: 'idle',
          renameStatus: false,
          addTaskStatus: false,
        }))
      },
      providesTags: ['Todolist'],
    }),
    addTodoList: build.mutation<BaseResponse<{ item: DomainTodoLists }>, string>({
      query: (title) => ({ method: 'post', url: '/todo-lists', body: { title } }),
      invalidatesTags: ['Todolist'],
    }),
    deleteTodoList: build.mutation<BaseResponse, string>({
      query: (todolistId) => ({ method: 'delete', url: `/todo-lists/${todolistId}` }),
      invalidatesTags: ['Todolist'],
    }),
    renameTodoList: build.mutation<BaseResponse, { title: string; id: string }>({
      query: ({ id, title }) => ({ method: 'put', url: `/todo-lists/${id}`, body: { title } }),
      invalidatesTags: ['Todolist'],
    }),
  }),
})

export const { useGetTodoListsQuery, useDeleteTodoListMutation, useAddTodoListMutation, useRenameTodoListMutation } = todoListsApi

export const _todoListsApi = {
  getTodoLists() {
    return instance.get<DomainTodoLists[]>('/todo-lists')
  },
  addTodoList(title: string) {
    return instance.post<BaseResponse<{ item: DomainTodoLists }>>('/todo-lists', { title })
  },
  deleteTodoList(todolistId: string) {
    return instance.delete<BaseResponse>(`/todo-lists/${todolistId}`)
  },
  renameTodoList(param: { title: string; todolistId: string }) {
    return instance.put<BaseResponse>(`/todo-lists/${param.todolistId}`, { title: param.title })
  },
}
