import { Link, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { APP_NAME } from '../constants'
import { apiPostRequest, toastMessage } from '../utils'

const Signin = () => {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const submitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault()
      const url = import.meta.env.VITE_BACKEND_URL + '/user/login'
      const response = await apiPostRequest(url, false, { email, password })
      if (response.data.success) {
        const token = response.data.data
        localStorage.setItem('accessToken', token)
        navigate('/')
      } else {
        toastMessage(response.data.message, false)
      }
    } catch (error) {
      console.log(error)
      toastMessage('Something went wrong !!', false)
    }
  }
  return (
    <section className="bg-gray-900 min-h-screen">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto h-screen lg:py-0">
        <Link to="/" className="flex items-center mb-6 text-2xl font-semibold text-white">
          <img className="w-12 h-12 rounded-2xl mr-2" src="logo.png" alt="logo" />
          {APP_NAME}
        </Link>
        <div className="w-full rounded-lg shadow border md:mt-0 sm:max-w-md xl:p-0 bg-gray-800 border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-white">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={submitHandler}>
              <div>
                <label className="block mb-2 text-sm font-medium text-white">Email</label>
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-yellow-500 focus:border-yellow-500"
                  placeholder="john@email.com"
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
                  className="border rounded-lg block w-full p-2.5 bg-gray-700 border-gray-600 placeholder-gray-400 text-white focus:ring-yellow-500 focus:border-yellow-500"
                  required={true}
                />
              </div>

              <button
                type="submit"
                className="w-full text-white focus:ring-4 focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center bg-yellow-600 hover:bg-yellow-700 focus:ring-yellow-800"
              >
                Sign in
              </button>
              <p className="text-sm mt-4 font-light text-gray-400">
                Don't have an account yet?{' '}
                <Link to="/signup" className="font-medium hover:underline text-yellow-500">
                  Sign up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Signin
