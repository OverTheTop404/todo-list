import { TaskPriority, TaskStatus } from '@/common/enums/enams'
import { z } from 'zod/v4'

export const domainTaskSbSchema = z.object({
  id: z.string(),
  title: z.string(),
  description: z.string().nullable(),
  list_id: z.string(),
  position: z.number(),
  created_at: z.iso.datetime({ local: true }),
  updated_at: z.iso.datetime({ local: true }),
  is_completed: z.boolean(),
  labels: z.array(z.string()),
  due_date: z.iso.datetime({ local: true }).nullable(),
})

export const domainTaskSchema = z.object({
  description: z.string().nullable(),
  deadline: z.string().nullable(),
  startDate: z.iso.datetime({ local: true }).nullable(),
  title: z.string(),
  status: z.enum(TaskStatus),
  priority: z.enum(TaskPriority),
  id: z.string(),
  todoListId: z.string(),
  order: z.number(),
  addedDate: z.iso.datetime({ local: true }),
})

export const domainTodoSchema = z.object({
  id: z.string(),
  title: z.string(),
  order: z.number(),
  addedDate: z.iso.datetime({ local: true }),
})

export const domainTodoSbSchema = z.object({
  id: z.string(),
  title: z.string(),
  board_id: z.string(),
  position: z.number(),
  created_at: z.iso.datetime({ local: true }),
  updated_at: z.iso.datetime({ local: true }),
  is_archived: z.boolean(),
  head_line_color: z.string(),
})
