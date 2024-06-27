import { z } from 'zod'

const signupSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password too short !!' })
    .max(20, { message: 'Password too long !!' }),
})

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required !!' }),
})

export { signupSchema, loginSchema }
