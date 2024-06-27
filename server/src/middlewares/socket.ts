import jwt from 'jsonwebtoken'
import { Socket } from 'socket.io'
import { ExtendedError } from 'socket.io/dist/namespace'
import { User } from '../models'

const socketAuth = (
  socket: Socket,
  next: {
    (err?: ExtendedError | undefined): void
    (arg0: Error | undefined): void
  }
) => {
  try {
    let token = socket.handshake.query.token
    if (
      !token ||
      token === undefined ||
      (Array.isArray(token) && token.length === 0)
    ) {
      next(new Error('Authentication error: Token missing'))
      return
    }
    token = Array.isArray(token) ? token[0] : token
    if (!token) {
      next(new Error('Authentication error: Token missing'))
      return
    }
    const payload = jwt.verify(token, process.env.JWT_SECRET!) as {
      email: string
    }
    const { email } = payload
    const user = User.findOne({ email })
    if (!user) {
      next(new Error('Authentication error: User not found'))
      return
    }
    socket.userdata = email
    next()
  } catch (error) {
    next(new Error('Authentication error'))
  }
}

export { socketAuth }
