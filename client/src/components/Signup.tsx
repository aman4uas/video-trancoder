import React, { useState } from 'react'
import { APP_NAME, RESEND_OTP_TIME } from '../constants'
import { Link, useNavigate } from 'react-router-dom'
import SignUpForm from './SignupForm'
import OTP from './OTP'
import { apiPostRequest, errorHandler, toastMessage } from '../utils'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const Signup = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [otp, setOtp] = useState('')
  const [otpSent, setOtpSent] = useState(false)
  const [disableButton, setDisableButton] = useState(false)

  const resendOtp = async (
    resendTimer: (time: number) => void,
    setResendOTPButtonDisable: (disableVar: boolean) => void
  ) => {
    try {
      setResendOTPButtonDisable(true)
      const response = await apiPostRequest(BACKEND_URL + '/user/signup/resend-otp', false, {
        email,
      })
      setResendOTPButtonDisable(false)
      if (errorHandler(response)) {
        return
      }
      toastMessage('OTP sent successfully !!', true)
      resendTimer(RESEND_OTP_TIME)
    } catch (error) {
      console.log(error)
      setResendOTPButtonDisable(false)
      toastMessage('Something went wrong !!', false)
    }
  }

  const generateOTP = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setDisableButton(true)
    if (password !== confirmPassword) {
      toastMessage('Passwords do not match !!', false)
      return
    }
    try {
      const response = await apiPostRequest(BACKEND_URL + '/user/signup/otp', false, {
        email,
        password,
      })
      setDisableButton(false)
      if (errorHandler(response)) return
      setOtpSent(true)
      toastMessage('OTP sent to Mail', true)
    } catch (error) {
      console.log(error)
      setDisableButton(false)
    }
  }

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    if (otp.length > 10) {
      toastMessage('OTP size too large !!', false)
      return
    }
    setDisableButton(true)
    try {
      const response = await apiPostRequest(BACKEND_URL + '/user/signup', false, {
        email,
        password,
        otp,
      })
      setDisableButton(false)
      if (errorHandler(response)) return
      navigate('/signin')
      toastMessage('User created successfully !!', true)
    } catch (error) {
      console.log(error)
      setDisableButton(false)
    }
  }

  return (
    <section className="bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-white">
          <img className="w-11 h-10 rounded-2xl mr-2" src="logo.png" alt="logo" />
          {APP_NAME}
        </Link>
        <div className="w-full bg-gray-800 rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
              {otpSent ? 'Enter OTP' : 'Create an account'}
            </h1>
            {!otpSent ? (
              <SignUpForm
                email={email}
                setEmail={setEmail}
                password={password}
                confirmPassword={confirmPassword}
                setPassword={setPassword}
                setConfirmPassword={setConfirmPassword}
                generateOTP={generateOTP}
                disableButton={disableButton}
              />
            ) : (
              <OTP
                otp={otp}
                setOtp={setOtp}
                resendOtp={resendOtp}
                submitHandler={submitHandler}
                disableButton={disableButton}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Signup
