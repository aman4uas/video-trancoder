import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
dotenv.config()

import { router } from './routes'

const app = express()

app.use(express.json())
app.use(cors({ origin: '*' }))
app.use(router)

app.get('/', (req: Request, res: Response) => {
  res.send('Consumer is up and running !!')
})

export default app
