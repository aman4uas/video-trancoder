import { Schema, model } from 'mongoose'
import { IUser } from './interfaces'

const UserSchema = new Schema<IUser>({
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  password: {
    type: String,
    required: true,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const User = model<IUser>('User', UserSchema)

export default User
