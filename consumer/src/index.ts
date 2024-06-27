import { connectDB } from './db'
import app from './app'
import { startConsumer } from './controllers'
import dotenv from 'dotenv'
dotenv.config()

connectDB()
  .then(() => {
    const PORT = process.env.PORT || 8000
    app.listen(PORT, () => {
      startConsumer()
      console.log(`Consumer is running on port : ${PORT}`)
    })
  })
  .catch((error) => {
    console.log('MongoDB connection failed !! ', error)
    process.exit(1)
  })
