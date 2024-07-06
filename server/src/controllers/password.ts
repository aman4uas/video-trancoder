import jwt from 'jsonwebtoken'
import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import dotenv from 'dotenv'
dotenv.config()

import { User } from '../models'
import { mailSender } from '../utils'
import { RESET_PASSWORD_TIME_LIMIT } from '../constants'
import { resetPasswordSchema, resetPasswordTokenSchema } from '../schemas'

const generateResetPasswordToken = async (req: Request, res: Response) => {
  try {
    const { success, data, error } = resetPasswordTokenSchema.safeParse(req.body)
    if (!success) {
      return res.status(200).json({
        success: false,
        message: error.issues[0].message,
      })
    }
    const { email } = data
    const user = await User.findOne({ email: email }).select('_id password')
    if (!user) {
      return res.status(200).json({
        success: false,
        message: 'Email is not registered.',
      })
    }

    const payload = { email: email }
    const secret = process.env.JWT_SECRET + user.password
    const token = jwt.sign(payload, secret, { expiresIn: RESET_PASSWORD_TIME_LIMIT })
    const URL = `${process.env.FRONTEND_URL}/reset-password?id=${user._id}&token=${token}`

    const subject = 'RESET PASSWORD LINK'
    const HTML_CONTENT = `Link for password reset: ${URL}`
    await mailSender(email, subject, HTML_CONTENT)

    return res.status(200).json({
      success: true,
      message: 'Reset Password link sent to mail successfully !!',
    })
  } catch (err) {
    return res.status(200).json({
      success: false,
      message: 'Internal Server Error, Please try again later!!',
    })
  }
}

const resetPassword = async (req: Request, res: Response) => {
  const { success, data, error } = resetPasswordSchema.safeParse(req.body)
  if (!success) {
    return res.status(200).json({
      success: false,
      message: error.issues[0].message,
    })
  }
  const { password, confirmPassword, token, id } = data
  if (password !== confirmPassword) {
    return res.status(200).json({
      success: false,
      message: 'Passwords do not match',
    })
  }
  const user = await User.findById(id).select('password email')
  if (!user) {
    return res.status(200).json({
      success: false,
      message: 'No user found',
    })
  }

  let payload
  try {
    const secret = process.env.JWT_SECRET + user.password
    console.log(secret)
    payload = jwt.verify(token, secret) as { email: string }
  } catch (error) {
    return res.status(200).json({
      success: false,
      message: 'Link expired',
    })
  }

  if (payload.email !== user.email) {
    return res.status(200).json({
      success: false,
      message: 'Emails do not match',
    })
  }

  const hashedPassword = await bcrypt.hash(password, 10)
  await User.findOneAndUpdate({ email: user.email }, { password: hashedPassword })

  return res.status(200).json({
    success: true,
    message: 'Password updated successfully',
  })
}

export { generateResetPasswordToken, resetPassword }
