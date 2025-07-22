import { domainTodoSchema } from '@/features/todolists/lib/schemas'
import { z } from 'zod/v4'
import type { RequestStatus } from '@/app/app-slice'

export type DomainTodoLists = z.infer<typeof domainTodoSchema>

export type TodoListType = DomainTodoLists & {
  headLineColor: string
  entityStatus: RequestStatus
  renameStatus: boolean
  addTaskStatus: boolean
}
