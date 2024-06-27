import { Document, ObjectId } from 'mongoose'

interface IUser extends Document {
  _id: ObjectId
  email: string
  password: string
  createdAt: Date
}

export { IUser }
