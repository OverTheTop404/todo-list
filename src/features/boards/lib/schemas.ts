import { z } from 'zod/v4'

export const createBoardSchema = z.object({
  title: z.string().trim().min(6, { error: 'Min 6 chars' }).max(30, { error: 'Max 30 chars' }),
  description: z.string(),
  image_url: z.string(),
})

// Создаем новую схему для формы с чекбоксом
export const createBoardFormSchema = z.object({
  title: z.string().trim().min(6, { error: 'Min 6 chars' }).max(30, { error: 'Max 30 chars' }),
  description: z.string(),
  image_url: z.string(),
  navigateToBoard: z.boolean(), // Убираем .default() и делаем обязательным
})

export type CreateBoardInputs = z.infer<typeof createBoardSchema>
export type CreateBoardFormInputs = z.infer<typeof createBoardFormSchema>
