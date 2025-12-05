import { z } from 'zod/v4'

export const createBoardSchema = z.object({
  title: z.string().trim().min(6, { error: 'Min 6 chars' }).max(30, { error: 'Max 30 chars' }),
  description: z.string(),
  image_url: z.string(),
})

export type CreateBoardInputs = z.infer<typeof createBoardSchema>
