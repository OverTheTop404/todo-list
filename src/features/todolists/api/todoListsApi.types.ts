import { domainTodoSbSchema } from '@/features/todolists/lib/schemas'
import { z } from 'zod/v4'
import type { RequestStatus } from '@/app/app-slice'

export type DomainTodoLists = z.infer<typeof domainTodoSbSchema>

export type TodoListType = DomainTodoLists & {
  entityStatus: RequestStatus
  renameStatus: boolean
  addTaskStatus: boolean
  isNew?: boolean
}
export type List = {
  id: string
  title: string
  board_id: string
  position: number
  created_at: string
  updated_at: string
  is_archived: boolean
  head_line_color: string
}

export type CreateList = {}

export type Card = {
  id: string
  title: string
  description: string
  list_id: string
  position: number
  created_at: Date
  updated_at: Date
  is_completed: boolean
  labels: string[]
  due_date: Date | null
}
