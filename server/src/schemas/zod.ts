import { z } from 'zod'
import { OTP_LENGTH } from '../constants'

const signupSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password too short !!' })
    .max(20, { message: 'Password too long !!' }),
})

const signupSchemaWithOTP = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z
    .string()
    .min(6, { message: 'Password too short !!' })
    .max(20, { message: 'Password too long !!' }),
  otp: z.string().length(OTP_LENGTH, { message: 'Invalid OTP length' }),
})

const loginSchema = z.object({
  email: z.string().email({ message: 'Invalid email address' }),
  password: z.string().min(1, { message: 'Password is required !!' }),
})

const resetPasswordTokenSchema = z.object({
  email: z.string({ message: 'Invalid input type' }).email({ message: 'Invalid email address' }),
})

const resetPasswordSchema = z.object({
  password: z
    .string({ message: 'Invalid input type' })
    .min(6, { message: 'Password too short !!' })
    .max(20, { message: 'Password too long !!' }),
  confirmPassword: z
    .string({ message: 'Invalid input type' })
    .min(6, { message: 'Password too short !!' })
    .max(20, { message: 'Password too long !!' }),
  token: z.string({ message: 'Invalid input type' }),
  id: z.string({ message: 'Invalid input type' }),
})

export {
  signupSchema,
  loginSchema,
  signupSchemaWithOTP,
  resetPasswordTokenSchema,
  resetPasswordSchema,
}
