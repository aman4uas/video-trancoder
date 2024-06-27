import { Request, Response } from 'express'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { v4 as uuidv4 } from 'uuid'
import { MAX_FILE_SIZE_IN_MB, BUCKET_NAME, SIGNED_URL_EXPIRY } from '../constants'
import { s3Client, getFileExtension } from '../utils'
import { Video } from '../models'

interface CustomRequest extends Request {
  query: {
    sizeOfFile: string
    typeOfFile: string
    fileName: string
  }
  user: {
    email: string
  }
}

const generateSignedUrl = async (req: CustomRequest, res: Response) => {
  try {
    const { sizeOfFile, typeOfFile, fileName } = req.query

    if (parseInt(sizeOfFile) > MAX_FILE_SIZE_IN_MB * 1024 * 1024) {
      return res.status(200).json({
        success: false,
        message: 'File size very large',
      })
    }
    if (!typeOfFile.startsWith('video/')) {
      return res.status(200).json({
        success: false,
        message: 'Invalid video type',
      })
    }

    const updatedFileName = uuidv4() + '.' + getFileExtension(fileName)
    const OBJECT_KEY = 'uploads/' + req.user.email + '/' + updatedFileName
    const command = new PutObjectCommand({
      Bucket: BUCKET_NAME,
      Key: OBJECT_KEY,
      ContentType: typeOfFile,
    })

    const presignedUrl = await getSignedUrl(s3Client, command, { expiresIn: SIGNED_URL_EXPIRY })
    return res.status(200).json({
      success: true,
      data: { presignedUrl, file: updatedFileName },
    })
  } catch (error) {
    console.log(error)
    return res.status(200).json({
      success: false,
      message: 'Internal Server Error',
    })
  }
}

const createVideoObject = async (req: Request, res: Response) => {
  try {
    const { fileName } = req.body
    await Video.create({ fileName, createdBy: req.user.email })
    return res.status(200).json({
      success: true,
      message: 'Successfully updated video status!!',
    })
  } catch (error) {
    console.log(error)
    return res.status(200).json({
      success: false,
      message: 'Internal server error',
    })
  }
}

export { generateSignedUrl, createVideoObject }
