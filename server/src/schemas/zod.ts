import { z } from 'zod'
import { OTP_LENGTH } from '../constants'

const signupSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password too short !!' }).max(20, { message: 'Password too long !!' }),
})

const signupSchemaWithOTP = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(6, { message: 'Password too short !!' }).max(20, { message: 'Password too long !!' }),
  otp: z.string().length(OTP_LENGTH, { message: 'Invalid OTP length' }),
})

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required !!' }),
})

export { signupSchema, loginSchema, signupSchemaWithOTP }
