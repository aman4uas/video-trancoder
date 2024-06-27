import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import { User } from '../models'
dotenv.config()

const auth = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token =
      req.cookies.token ||
      req.body.token ||
      req.header('Authorization')?.replace('Bearer ', '')

    if (!token || token === undefined) {
      return res.status(200).json({
        success: false,
        message: 'User unauthorized !!',
        error_message: 'Token not found',
      })
    }
    let payload
    try {
      payload = jwt.verify(token, process.env.JWT_SECRET!) as { email: string }
      req.user = payload
    } catch (error) {
      return res.status(200).json({
        success: false,
        message: 'User unauthorized !!',
        error_message: 'Token is invalid',
      })
    }
    const { email } = payload

    const user = User.findOne({ email })
    if (!user) {
      return res.status(200).json({
        success: false,
        message: 'User unauthorized !!',
        error_message: 'User not found !!',
      })
    }
    next()
  } catch (error) {
    console.log(error)
    return res.status(200).json({
      success: false,
      message: 'Something went wrong !!',
    })
  }
}

export { auth }
