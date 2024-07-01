import mongoose, { Schema } from 'mongoose'
import { mailSender } from '../utils'
import { OTP_EXPIRY_TIME } from '../constants'
import { IOtp } from './interfaces'

const OTPSchema = new Schema({
  email: {
    type: String,
    required: true,
  },
  otp: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
    expires: OTP_EXPIRY_TIME * 60,
  },
})

async function sendVerificationEmail(email: string, otp: string) {
  try {
    await mailSender(email, 'OTP Verification Email', otp)
  } catch (error) {
    console.log('Error occurred while sending mails: ', error)
    throw error
  }
}

OTPSchema.pre<IOtp>('save', async function (next) {
  await sendVerificationEmail(this.email, this.otp)
  next()
})

const OTP = mongoose.model<IOtp>('OTP', OTPSchema)
export default OTP
