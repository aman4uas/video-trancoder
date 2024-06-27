import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()

const dbConnect = async () => {
  try {
    const CONNECTION_URL = `${process.env.MONGO_URI}/${process.env.DB_NAME}`
    await mongoose.connect(CONNECTION_URL)
    console.log('Successfully connected to MongoDB !!')
  } catch (error) {
    console.log('Error connecting to MongoDB !!')
    console.log(error)
    throw new Error()
  }
}

export { dbConnect }
