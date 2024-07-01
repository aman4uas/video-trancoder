import { Link } from 'react-router-dom'
import { CONTACT_LINK } from '../constants'

const PageNotFound = () => {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center">
      <img
        // src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/404/404-computer.svg"
        src="404-computer.svg"
        alt="404 Not Found"
        className="h-2/5 my-1"
      />
      <h1 className="text-xl font-bold text-blue-500 mb-2">404 Not Found</h1>
      <p className="text-4xl font-bold mb-12 text-gray-200">Whoops! That page doesn't exist.</p>
      <p className="text-gray-400 mb-3">Here are some helpful links instead:</p>
      <div className="flex space-x-4">
        <Link to="/" className="text-gray-400 underline hover:text-gray-300">
          Home
        </Link>
        <Link to="/signin" className="text-gray-400 underline hover:text-gray-300">
          Login
        </Link>
        <Link to="/pricing" className="text-gray-400 underline hover:text-gray-300">
          Pricing
        </Link>
        <a target="_blank" href={CONTACT_LINK} className="text-gray-400 underline hover:text-gray-300">
          Contact
        </a>
      </div>
    </div>
  )
}

export default PageNotFound
