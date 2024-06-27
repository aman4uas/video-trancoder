import { Request, Response } from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

import { User } from '../models'
import { JWT_EXPIRY, COOKIE_EXPIRY } from '../constants'
import { loginSchema, signupSchema } from '../schemas'
import { IPayload, IUser } from '../models/interfaces'

const signup = async (req: Request, res: Response) => {
  try {
    const { success, data, error } = signupSchema.safeParse(req.body)
    if (!success) {
      let message = error.issues[0].message
      if (message === 'Required') message = 'All fields are required !!'
      return res.status(200).json({
        success: false,
        message,
      })
    }
    const { email, password } = data

    const existingUser = await User.findOne({ email })
    if (existingUser) {
      return res.status(200).json({
        success: false,
        message: 'User already exists !!',
      })
    }

    let hashedPassword = await bcrypt.hash(password, 10)
    await User.create({ email, password: hashedPassword })

    return res.status(200).json({
      success: true,
      message: 'Signed up successfully !!',
    })
  } catch (error) {
    console.log(error)
    return res.status(200).json({
      success: false,
      message: 'Error signing up !!',
    })
  }
}

const login = async (req: Request, res: Response) => {
  try {
    const { success, data, error } = loginSchema.safeParse(req.body)
    if (!success) {
      let message = error.issues[0].message
      if (message === 'Required') message = 'All fields are required !!'
      return res.status(200).json({
        success: false,
        message,
      })
    }
    const { email, password } = data

    let user: IUser | null = await User.findOne({ email })
    if (!user) {
      return res.status(200).json({
        success: false,
        message: 'User is not registered !!',
      })
    }

    const passwordMatch = await bcrypt.compare(password, user.password)
    if (!passwordMatch) {
      return res.status(200).json({
        success: false,
        message: 'Wrong password !!',
      })
    }

    const payload: IPayload = {
      email: user.email,
      id: user._id,
    }

    const token = jwt.sign(payload, process.env.JWT_SECRET!, {
      expiresIn: JWT_EXPIRY,
    })

    return res
      .cookie('token', token, {
        expires: new Date(Date.now() + COOKIE_EXPIRY * 1000),
        httpOnly: false,
        secure: true,
        sameSite: 'none',
      })
      .status(200)
      .json({
        success: true,
        message: 'User Logged in successfully',
        data: token,
      })
  } catch (error) {
    console.log(error)
    return res.status(200).json({
      success: false,
      message: 'Something went wrong !!',
    })
  }
}

export { signup, login }
