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

router.get('/protected', auth, authenticated)

export default router
