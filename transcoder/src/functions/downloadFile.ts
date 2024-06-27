import { GetObjectCommand, GetObjectCommandOutput } from '@aws-sdk/client-s3'
import fs from 'fs'
import dotenv from 'dotenv'
dotenv.config()
import { s3Client } from './client'

const downloadFile = async (downloadPath: string) => {
  try {
    const command = new GetObjectCommand({
      Bucket: process.env.TEMP_BUCKET_NAME,
      Key: decodeURIComponent(process.env.FILE_PATH!),
    })
    const data: GetObjectCommandOutput = await s3Client.send(command)
    if (!data.Body) {
      throw new Error('No data body in the response')
    }

    const fileStream = fs.createWriteStream(downloadPath)
    ;(data.Body as NodeJS.ReadableStream).pipe(fileStream)

    await new Promise<void>((resolve, reject) => {
      fileStream.on('finish', resolve)
      fileStream.on('error', reject)
    })

    console.log(`File downloaded successfully to ${downloadPath}`)
  } catch (error) {
    console.log('Error downloading the file !!')
    console.log(error)
    throw new Error()
  }
}

export { downloadFile }
