import { z } from 'zod/v4'

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().nonempty({ error: 'Password is required' }).min(5, { error: 'Password must be at least 5 characters long' }),
  rememberMe: z.boolean(),
  captcha: z.string().optional(),
})

export type LoginInputs = z.infer<typeof loginSchema>
