import otpGenerator from 'otp-generator'
import { OTP } from '../models'
import { OTP_LENGTH } from '../constants'

const generateOTP = async (email: string) => {
  let newOtp, findOTPMatch
  do {
    newOtp = otpGenerator.generate(OTP_LENGTH, {
      digits: true,
      lowerCaseAlphabets: false,
      upperCaseAlphabets: false,
      specialChars: false,
    })
    findOTPMatch = await OTP.findOne({ otp: newOtp })
  } while (findOTPMatch)

  await OTP.create({
    otp: newOtp,
    email: email,
  })
}

export { generateOTP }
