import { connectDB } from './db'
import app from './app'
import dotenv from 'dotenv'
dotenv.config()

connectDB()
  .then(() => {
    const PORT = process.env.PORT || 4000
    app.listen(PORT, () => {
      console.log(`Server is running on port : ${PORT}`)
    })
  })
  .catch((error) => {
    console.log('MongoDB connection failed !! ', error)
    process.exit(1)
  })
