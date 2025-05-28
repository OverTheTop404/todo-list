import { type TaskPriority, TaskStatus } from '@/common/enums/enams'

export type DomainTask = {
  id: string
  title: string
  description: string
  status: number
  priority: number
  order: number
  startDate: string
  addedDate: string
  deadline: string
  todoListId: string
}

export type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: DomainTask[]
}

export type UpdateTaskModel = {
  description: string
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string
  deadline: string
}
