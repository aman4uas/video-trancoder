import { Video } from '../models'

const updateVideoInDB = async (updates: Object) => {
  try {
    const video = await Video.findOneAndUpdate(
      { createdBy: decodeURIComponent(process.env.EMAIL!), fileName: process.env.FILE_NAME },
      { ...updates },
      { new: true }
    )
    return video
  } catch (error) {
    console.log('Error updating video in DB !!')
    console.log(error)
    throw new Error()
  }
}

export { updateVideoInDB }
