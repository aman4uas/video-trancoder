import { PutObjectCommand } from '@aws-sdk/client-s3'
import { s3Client } from './client'
import path from 'path'
import fs from 'fs'
import dotenv from 'dotenv'
import mime from 'mime-types'

dotenv.config()

const uploadFiles = async (uploadsFolderPath: string) => {
  try {
    const uploadsFolderContents = fs.readdirSync(uploadsFolderPath, { withFileTypes: true })
    for (const file of uploadsFolderContents) {
      const filePath = path.join(uploadsFolderPath, file.name)
      if (file.isDirectory()) continue
      let contentType = mime.lookup(filePath) || 'application/octet-stream'
      if (filePath.endsWith('.m3u8')) {
        contentType = 'application/vnd.apple.mpegurl'
      } else if (filePath.endsWith('.ts')) {
        contentType = 'video/MP2T'
      }

      const command = new PutObjectCommand({
        Bucket: process.env.MAIN_BUCKET_NAME!,
        Key: `uploads/${decodeURIComponent(process.env.EMAIL!)}/${process.env.UPLOAD_FOLDER_NAME!}/${file.name}`,
        Body: fs.createReadStream(filePath),
        ContentType: contentType,
      })
      await s3Client.send(command)
    }
    console.log('Successfully uploaded all files to S3')
  } catch (error) {
    console.log('Error uploading file to S3')
    console.log(error)
    throw new Error()
  }
}

export { uploadFiles }
