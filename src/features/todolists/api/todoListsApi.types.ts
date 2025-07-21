import { domainTodoSchema } from '@/features/todolists/lib/schemas'
import { z } from 'zod/v4'

export type DomainTodoLists = z.infer<typeof domainTodoSchema>
