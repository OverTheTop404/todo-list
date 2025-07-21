import { TaskPriority, TaskStatus } from '@/common/enums/enams'
import { z } from 'zod/v4'

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
