import { Document, ObjectId } from 'mongoose'

enum EStatus {
  Processing = 'Processing',
  Queued = 'Queued',
  Failed = 'Failed',
  Success = 'Success',
}

interface IVideo extends Document {
  _id: ObjectId
  createdBy: string
  fileName: string
  status: EStatus
  link: string
  createdAt: Date
}

export { IVideo, EStatus }
