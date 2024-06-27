import express, { Request, Response } from 'express'
import cors from 'cors'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'
dotenv.config()

import { router } from './routes'

const app = express()

app.use(express.json())
app.use(cookieParser())
app.use(cors({ origin: '*', credentials: true }))
app.use(router)

app.get('/', (req: Request, res: Response) => {
  res.send('Server is running !!')
})

export default app
