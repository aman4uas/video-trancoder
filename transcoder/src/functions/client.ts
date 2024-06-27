import { S3Client } from '@aws-sdk/client-s3'
import dotenv from 'dotenv'
dotenv.config()

const s3Client = new S3Client({
  region: process.env.BUCKET_REGION!,
  credentials: {
    accessKeyId: process.env.ACCESS_KEY!,
    secretAccessKey: process.env.SECRET_ACCESS_KEY!,
  },
})

export { s3Client }
