import { S3Client } from '@aws-sdk/client-s3'
import { BUCKET_REGION } from '../constants'

const s3Client = new S3Client({
  region: BUCKET_REGION,
  credentials: {
    accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY!,
  },
})

export { s3Client }
