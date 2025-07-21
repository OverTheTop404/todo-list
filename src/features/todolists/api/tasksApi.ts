import { instance } from '@/common/instance'
import type { BaseResponse } from '@/common/types/types'
import type { DomainTask, GetTasksResponse, UpdateTaskModel } from '@/features/todolists/api/tasksApi.types'
import { TasksPortion } from '@/common/enums/enams'

export const tasksApi = {
  getTasks(todoListId: string) {
    return instance.get<GetTasksResponse>(`/todo-lists/${todoListId}/tasks?count=${TasksPortion.Twenty}`)
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
