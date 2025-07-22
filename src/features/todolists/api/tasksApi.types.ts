import { type TaskPriority, TaskStatus } from '@/common/enums/enams'
import { z } from 'zod/v4'
import type { domainTaskSchema } from '@/features/todolists/lib/schemas'
import type { RequestStatus } from '@/app/app-slice'

export type DomainTask = z.infer<typeof domainTaskSchema>

export type TaskType = DomainTask & {
  renameStatus: boolean
  entityStatus: RequestStatus // Временно string. Надо RequestStatus
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
