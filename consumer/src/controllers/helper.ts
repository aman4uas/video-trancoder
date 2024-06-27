import { ReceiveMessageCommand, DeleteMessageCommand, Message } from '@aws-sdk/client-sqs'
import { sqsClient, runECSTask } from '../utils'
import { MESSAGE_VISIBILITY_TIMEOUT, MESSAGE_WAIT_TIME } from '../constants'

const deleteMessageFromQueue = async (message: Message) => {
  try {
    const deleteParams = {
      QueueUrl: process.env.QUEUE_URL!,
      ReceiptHandle: message.ReceiptHandle,
    }
    await sqsClient.send(new DeleteMessageCommand(deleteParams))
    console.log('Message deleted:', message.MessageId)
  } catch (error) {
    console.log('Error deleting message in Queue..')
    console.log(error)
  }
}

const processQueue = async () => {
  try {
    const data = await sqsClient.send(
      new ReceiveMessageCommand({
        QueueUrl: process.env.QUEUE_URL!,
        MaxNumberOfMessages: 1,
        VisibilityTimeout: MESSAGE_VISIBILITY_TIMEOUT,
        WaitTimeSeconds: MESSAGE_WAIT_TIME,
        AttributeNames: ['All'],
        MessageAttributeNames: ['All'],
      })
    )

    if (data.Messages) {
      for (const _message of data.Messages) {
        if (!_message.Body) {
          await deleteMessageFromQueue(_message)
          console.log(`message.Body is undefined !!`)
          console.log(`Message: ${_message}`)
          return
        }
        const messageBody = JSON.parse(_message.Body)
        const path = decodeURIComponent(messageBody.Records[0].s3.object.key)
        if (!path) {
          await deleteMessageFromQueue(_message)
          console.log(`Path is undefined !!`)
          console.log(`Message: ${_message}`)
          return
        }
        const parts = path.split('/')
        const email = parts[1]
        const fileName = parts[2]
        const rawFileName = fileName.split('.')[0]
        const fileExtension = fileName.split('.')[1]

        console.log(path, email, fileName, rawFileName, fileExtension)

        const envArray = [
          { name: 'EMAIL', value: email },
          { name: 'UPLOAD_FOLDER_NAME', value: rawFileName },
          { name: 'FILE_PATH', value: path },
          { name: 'FILE_EXTENSION', value: fileExtension },
          { name: 'FILE_NAME', value: fileName },
        ]

        try {
          await runECSTask(envArray)
          await deleteMessageFromQueue(_message)
        } catch (error) {
          console.log('Error running ECS Task..')
          console.log(error)
        }
      }
    } else {
      console.log('No messages to process')
    }
  } catch (error) {
    console.log('Something went wrong !!')
    console.log(error)
  }
}

export { processQueue }
