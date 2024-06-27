import { Request, Response } from 'express'

const authenticated = (req: Request, res: Response) => {
  res.status(200).json({
    success: true,
    message: 'User is authenticated',
  })
}

export { authenticated }
