import { z } from 'zod/v4'

export const loginSchema = z.object({
  email: z.email(),
  password: z.string().nonempty({ error: 'Password is required' }).min(4, { error: 'Password must be at least 4 characters long' }),
  // rememberMe: z.boolean(),
  // captcha: z.string().optional(),
})

export type LoginInputs = z.infer<typeof loginSchema>

export const signupSchema = z.object({
  first_name: z.string().min(2, { error: 'Name must be at least 2 characters long' }),
  email: z.email(),
  password: z.string().nonempty({ error: 'Password is required' }).min(4, { error: 'Password must be at least 4 characters long' }),
})

export type signupInputs = z.infer<typeof signupSchema>
