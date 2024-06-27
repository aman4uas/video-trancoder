import { Request, Response } from 'express'
import { POOLING_DELAY } from '../constants'
import { processQueue } from './helper'

let pollingInterval: NodeJS.Timeout | null = null

const startConsumer = () => {
  pollingInterval = setInterval(processQueue, POOLING_DELAY * 1000)
}

const startConsumerHandler = (req: Request, res: Response) => {
  if (pollingInterval) {
    const message = 'SQS consumer is already running'
    console.log(message)
    return res.send(message)
  }
  startConsumer()
  const message = 'SQS consumer started'
  console.log(message)
  res.send(message)
}

const stopConsumerHandler = (req: Request, res: Response) => {
  if (pollingInterval) {
    clearInterval(pollingInterval)
    pollingInterval = null
    const message = 'SQS consumer stopped'
    console.log(message)
    return res.send(message)
  }
  res.send('SQS consumer is not running')
}

export { startConsumerHandler, stopConsumerHandler, startConsumer }
