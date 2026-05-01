import { type TaskPriority, TaskStatus } from '@/common/enums/enams'
import { z } from 'zod/v4'
import { domainTaskSbSchema, type domainTaskSchema } from '@/features/todolists/lib/schemas'
import type { RequestStatus } from '@/app/app-slice'

export type DomainTask = z.infer<typeof domainTaskSchema>
export type DomainSbTask = z.infer<typeof domainTaskSbSchema>

export type TaskType = DomainTask & {
  renameStatus: boolean
  entityStatus: RequestStatus
}

export type TaskSbType = DomainSbTask & {
  renameStatus: boolean
  entityStatus: RequestStatus
}

export type GetDomainTasksResponse = {
  error: string | null
  totalCount: number
  items: DomainTask[]
}

export type GetTasksResponse = {
  error: string | null
  totalCount: number
  items: TaskType[]
}

export type UpdateTaskModel = {
  description: string | null
  title: string
  status: TaskStatus
  priority: TaskPriority
  startDate: string | null
  deadline: string | null
}

export const modelCreator = (args: UpdateTaskModel) => {
  return {
    description: args.description,
    status: args.status,
    priority: args.priority,
    startDate: args.startDate,
    deadline: args.deadline,
    title: args.title,
  }
}
