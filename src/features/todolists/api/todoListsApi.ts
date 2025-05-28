import { instance } from '@/common/instance'
import type { TodoListType } from '@/features/todolists/api/todoListsApi.types'
import type { BaseResponse } from '@/common/types/types'

export const todoListsApi = {
  getTodoLists() {
    return instance.get<TodoListType[]>('/todo-lists')
  },
  addTodoList(title: string) {
    return instance.post<BaseResponse<{ item: TodoListType }>>('/todo-lists', { title })
  },
  deleteTodoList(todolistId: string) {
    return instance.delete<BaseResponse>(`/todo-lists/${todolistId}`)
  },
  renameTodoList(param: { title: string; todolistId: string }) {
    return instance.put(`/todo-lists/${param.todolistId}`, { title: param.title })
  },
}
