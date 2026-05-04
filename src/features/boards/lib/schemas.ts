import { z } from 'zod/v4'

export const createBoardSchema = z.object({
  title: z.string().trim().min(1, { error: 'Min 1 chars' }).max(30, { error: 'Max 30 chars' }),
  description: z.string(),
  image_url: z.string(),
})

// Создаем новую схему для формы с чекбоксом
export const createBoardFormSchema = z.object({
  title: z.string().trim().min(1, { error: 'Min 1 chars' }).max(30, { error: 'Max 30 chars' }),
  description: z.string(),
  image_url: z.string(),
  navigateToBoard: z.boolean(),
})

export type CreateBoardInputs = z.infer<typeof createBoardSchema>
export type CreateBoardFormInputs = z.infer<typeof createBoardFormSchema>
