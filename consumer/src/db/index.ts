import mongoose from 'mongoose'
import { DB_NAME } from '../constants'

const connectDB = async () => {
  try {
    await mongoose.connect(`${process.env.MONGO_URI}/${DB_NAME}`)
    console.log('Connected to MongoDB successfully !!')
  } catch (error) {
    console.log('MONGODB connection FAILED ', error)
    process.exit(1)
  }
}

export { connectDB }
