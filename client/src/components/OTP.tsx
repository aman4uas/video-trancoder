import React, { useState, useEffect } from 'react'
import { FaKey, FaRedo } from 'react-icons/fa'
import { RESEND_OTP_TIME } from '../constants'

interface OTPProps {
  otp: string
  setOtp: (otp: string) => void
  resendOtp: (
    setResendTimer: (time: number) => void,
    setResendOTPButtonDisable: (disableVar: boolean) => void
  ) => void
  submitHandler: (event: React.FormEvent<HTMLFormElement>) => void
  disableButton: boolean
}

const OTP: React.FC<OTPProps> = ({ otp, setOtp, resendOtp, submitHandler, disableButton }) => {
  const [resendTimer, setResendTimer] = useState(RESEND_OTP_TIME)
  const [resendOTPButtonDisable, setResendOTPButtonDisable] = useState(false)

  useEffect(() => {
    if (resendTimer > 0) {
      const timerId = setTimeout(() => setResendTimer(resendTimer - 1), 1000)
      return () => clearTimeout(timerId)
    }
  }, [resendTimer])

  return (
    <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
      <div className="relative">
        <FaKey className="absolute left-3 top-3 text-gray-500" />
        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          className="pl-10 bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5"
          placeholder="Enter OTP"
          required
        />
      </div>
      <button
        disabled={disableButton}
        type="submit"
        className="w-full text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-yellow-800"
      >
        Verify OTP
      </button>
      {resendTimer > 0 ? (
        <p className="text-sm text-center font-light text-gray-400">
          Didn't get OTP? Resend OTP in {resendTimer} seconds
        </p>
      ) : (
        <div className="flex justify-center">
          <button
            disabled={resendOTPButtonDisable}
            type="button"
            onClick={() => {
              resendOtp(setResendTimer, setResendOTPButtonDisable)
            }}
            className="flex items-center text-yellow-500 hover:text-yellow-600 transition-colors duration-300"
          >
            {resendOTPButtonDisable ? (
              <>Sending OTP..</>
            ) : (
              <>
                <FaRedo className="mr-2 animate-spin-slow" />
                Resend OTP
              </>
            )}
          </button>
        </div>
      )}
    </form>
  )
}

// eslint-disable-next-line react-refresh/only-export-components
export default OTP
