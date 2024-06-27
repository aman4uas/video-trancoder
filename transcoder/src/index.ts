import path from 'path'
import dotenv from 'dotenv'
dotenv.config()
import { dbConnect, updateVideoInDB, downloadFile, uploadFiles, executeCommand, transcodeVideo } from './functions'
import mongoose from 'mongoose'

const uploadPath = path.join(__dirname, 'uploads')
const downloadPath = path.join(__dirname, 'downloads', `temp.${process.env.FILE_EXTENSION}`)

async function init() {
  try {
    // await dbConnect()
    // await updateVideoInDB({ status: 'Processing' })
    //await executeCommand(`mkdir "dist/downloads" "dist/uploads"`)
    // await downloadFile(downloadPath)
    await transcodeVideo(downloadPath, uploadPath)
    // await uploadFiles(uploadPath)
    // await updateVideoInDB({
    //   status: 'Success',
    //   link: `${process.env.MAIN_BUCKET_URL}/uploads/${decodeURIComponent(process.env.EMAIL!)}/${process.env
    //     .UPLOAD_FOLDER_NAME!}/index.m3u8`,
    // })
    console.log('Successfully done all steps...')
  } catch (error) {
    console.log('Process failed...')
    try {
      //await updateVideoInDB({ status: 'Failed' })
    } catch (error) {
      console.log('Error in updating video in DB')
    }
  } finally {
    //mongoose.connection.close()
    process.exit(0)
  }
}

init()
