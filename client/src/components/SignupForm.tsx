import { FaEnvelope, FaLock } from 'react-icons/fa'
import { Link } from 'react-router-dom'

interface SignUpFormProps {
  email: string
  setEmail: (email: string) => void
  password: string
  confirmPassword: string
  setPassword: (password: string) => void
  setConfirmPassword: (confirmPassword: string) => void
  generateOTP: (event: React.FormEvent<HTMLFormElement>) => void
  disableButton: boolean
}

const SignUpForm: React.FC<SignUpFormProps> = ({
  email,
  setEmail,
  password,
  confirmPassword,
  setPassword,
  setConfirmPassword,
  generateOTP,
  disableButton,
}) => {
  return (
    <form className="space-y-4 md:space-y-6" onSubmit={generateOTP}>
      <div className="relative">
        <FaEnvelope className="absolute left-3 top-3 text-gray-500" />
        <input
          value={email}
          type="email"
          onChange={(e) => setEmail(e.target.value)}
          className="pl-10 bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5"
          placeholder="Email"
          required
        />
      </div>
      <div className="relative">
        <FaLock className="absolute left-3 top-3 text-gray-500" />
        <input
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          type="password"
          placeholder="Password"
          className="pl-10 bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5"
          required
        />
      </div>
      <div className="relative">
        <FaLock className="absolute left-3 top-3 text-gray-500" />
        <input
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          type="password"
          placeholder="Confirm Password"
          className="pl-10 bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5"
          required
        />
      </div>
      <button
        disabled={disableButton}
        type="submit"
        className="w-full text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-yellow-800"
      >
        {disableButton ? <>Loading..</> : <>Create an account</>}
      </button>
      <p className="text-sm font-light text-gray-400">
        Already have an account?{' '}
        <Link to="/signin" className="font-medium text-yellow-500 hover:underline">
          Sign in here
        </Link>
      </p>
    </form>
  )
}

export default SignUpForm
