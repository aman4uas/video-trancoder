import { SQSClient } from '@aws-sdk/client-sqs'
import { SQS_REGION } from '../constants'

const sqsClient = new SQSClient({
  region: SQS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID!,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
  },
})

export { sqsClient }
