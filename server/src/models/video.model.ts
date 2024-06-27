import { Schema, model } from 'mongoose'
import { IVideo, EStatus } from './interfaces'

const VideoSchema = new Schema<IVideo>({
  createdBy: {
    type: String,
    required: true,
    trim: true,
  },
  status: {
    type: String,
    enum: EStatus,
    default: EStatus.Queued,
  },
  fileName: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    trim: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
})

const Video = model<IVideo>('Video', VideoSchema)

export default Video
