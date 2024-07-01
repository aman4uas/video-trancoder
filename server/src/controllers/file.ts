import { Request, Response } from 'express'
import { PutObjectCommand } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { v4 as uuidv4 } from 'uuid'
import { MAX_FILE_SIZE_IN_MB, BUCKET_NAME, SIGNED_URL_EXPIRY } from '../constants'
import { s3Client, getFileExtension } from '../utils'
import { Video } from '../models'

const generateSignedUrl = async (req: Request, res: Response) => {
  try {
    const { sizeOfFile, typeOfFile, fileName } = req.query as {
      sizeOfFile: string
      typeOfFile: string
      fileName: string
    }

    if (parseInt(sizeOfFile) > MAX_FILE_SIZE_IN_MB * 1024 * 1024) {
      return res.status(200).json({
        success: false,
        message: `For demo we allow file less ${MAX_FILE_SIZE_IN_MB} MB`,
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
    const { fileName, fileSize } = req.body
    await Video.create({ fileName, createdBy: req.user.email, size: fileSize, link: '' })
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

const getUserVideoDetails = async (req: Request, res: Response) => {
  const userEmail = req.user.email
  if (!userEmail || userEmail === undefined) {
    return res.status(200).json({
      success: false,
      message: 'Cannot find User Email',
    })
  }

  const pipeline = [
    { $match: { createdBy: userEmail } },
    { $group: { _id: '$status', count: { $sum: 1 } } },
    { $project: { status: '$_id', count: 1, _id: 0 } },
    {
      $group: {
        _id: null,
        statuses: { $push: { status: '$status', count: '$count' } },
        total: { $sum: '$count' },
      },
    },
    {
      $project: {
        _id: 0,
        result: {
          $concatArrays: ['$statuses', [{ status: 'Total', count: '$total' }]],
        },
      },
    },
    { $unwind: '$result' },
    { $replaceRoot: { newRoot: '$result' } },
  ]

  const response1 = await Video.aggregate(pipeline)
  if (response1.length === 0) {
    return res.status(200).json({
      success: true,
      hasVideos: false,
    })
  }
  const response2 = await Video.find({ createdBy: userEmail }).select('-createdBy -fileName').sort({ createdAt: -1 })

  return res.status(200).json({
    success: true,
    hasVideos: true,
    statusData: response1,
    videoData: response2,
  })
}

export { generateSignedUrl, createVideoObject, getUserVideoDetails }
