import { Router } from 'express'
import { startConsumerHandler, stopConsumerHandler } from '../controllers'
const router = Router()

router.get('/start', startConsumerHandler)
router.get('/stop', stopConsumerHandler)

export default router
