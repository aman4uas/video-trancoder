import { Router } from 'express'
import {
  signup,
  login,
  authenticated,
  generateSignedUrl,
  createVideoObject,
  getUserData,
  getUserVideoDetails,
  validateSignupDataAndGenerateOTP,
  resendOTP,
  generateResetPasswordToken,
  resetPassword,
} from '../controllers'
import { auth } from '../middlewares'

const router = Router()

router.get('/file/signedurl', auth, generateSignedUrl)
router.post('/file/onupload', auth, createVideoObject)
router.get('/file/details', auth, getUserVideoDetails)

router.post('/user/signup', signup)
router.post('/user/signup/otp', validateSignupDataAndGenerateOTP)
router.post('/user/signup/resend-otp', resendOTP)
router.post('/user/login', login)
router.get('/user/data', auth, getUserData)
router.post('/user/reset-password-token', generateResetPasswordToken)
router.post('/user/reset-password', resetPassword)

router.get('/protected', auth, authenticated)

export default router
