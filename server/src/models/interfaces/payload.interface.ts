import { ObjectId } from 'mongoose'

interface IPayload {
  email: string
  id: ObjectId
}

export { IPayload }
