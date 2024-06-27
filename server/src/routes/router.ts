import { Router } from 'express'
import { signup, login, authenticated, generateSignedUrl, createVideoObject } from '../controllers'
import { auth } from '../middlewares'

const router = Router()

router.get('/file/signedurl', auth, generateSignedUrl)
router.post('/file/onupload', auth, createVideoObject)

router.post('/user/signup', signup)
router.post('/user/login', login)

router.get('/protected', auth, authenticated)

export default router
