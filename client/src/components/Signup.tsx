import { useState } from 'react'
import { APP_NAME } from '../constants'
import { Link } from 'react-router-dom'
import { toastMessage, apiPostRequest, errorHandler } from '../utils'

const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()
      if (password !== confirmPassword) {
        toastMessage('Password and ConfirmPassword do not match', false)
        return
      }
      const url = import.meta.env.VITE_BACKEND_URL + '/user/signup'
      const response = await apiPostRequest(url, false, { email, password })
      if (errorHandler(response)) return
      toastMessage('User created successfully !!', true)
    } catch (error) {
      console.log(error)
      toastMessage('Something went wrong !!', false)
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
            <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">Create an account</h1>
            <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
              <div>
                <label className="block mb-2 text-sm font-medium text-white">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5"
                  placeholder="johndoe@email.com"
                  required={true}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-white">Password</label>
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type="password"
                  placeholder="••••••••"
                  className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5"
                  required={true}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-white">Confirm password</label>
                <input
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  type="password"
                  placeholder="••••••••"
                  className="bg-gray-700 border border-gray-600 text-white text-sm rounded-lg focus:ring-yellow-500 focus:border-yellow-500 block w-full p-2.5"
                  required={true}
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-600 rounded bg-gray-700 focus:ring-3 focus:ring-yellow-600"
                    required={true}
                  />
                </div>
                <div className="ml-3 text-sm">
                  <label htmlFor="terms" className="font-light text-gray-300">
                    I accept the{' '}
                    <a className="font-medium text-yellow-500 hover:underline" href="#">
                      Terms and Conditions
                    </a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                className="w-full text-white bg-yellow-600 hover:bg-yellow-700 focus:ring-4 focus:outline-none focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:focus:ring-yellow-800"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-400">
                Already have an account?{' '}
                <Link to="/signin" className="font-medium text-yellow-500 hover:underline">
                  Sign in here
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Signup
