import { useEffect, useState } from 'react'
import Navbar from './Navbar'
import { toast } from 'react-toastify'
import { apiGetRequest, apiPostRequest, authHandler, errorHandler, toastMessage } from '../utils'
import axios from 'axios'
import { FiUpload } from 'react-icons/fi'
import { useNavigate } from 'react-router-dom'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const Home = () => {
  const navigate = useNavigate()
  const [uploadButtonDisable, setUploadButtonDisable] = useState(false)
  const [selectedFile, setSelectedFile] = useState<null | File>(null)
  const [loading, setLoading] = useState(true)
  let globalfile: null | string = null

  function uploadFile(selectedFile: File) {
    return new Promise((resolve, reject) => {
      apiGetRequest(BACKEND_URL + '/file/signedurl', true, {
        typeOfFile: selectedFile.type,
        sizeOfFile: selectedFile.size,
        fileName: selectedFile.name,
      })
        .then((response) => {
          if (authHandler(response)) return
          if (errorHandler(response)) return
          const { presignedUrl, file } = response.data.data
          globalfile = file
          return axios.put(presignedUrl, selectedFile)
        })
        .then(() => {
          return apiPostRequest(BACKEND_URL + '/file/onupload', true, {
            fileName: globalfile,
            fileSize: selectedFile.size,
          })
        })
        .then((response) => {
          if (authHandler(response)) return
          if (errorHandler(response)) return
          setSelectedFile(null)
          resolve(response)
          toast.success('Video uploaded successfully !!')
        })
        .catch((error) => {
          reject(error)
        })
    })
  }

  const handleUpload = async () => {
    setUploadButtonDisable(true)
    try {
      if (selectedFile && selectedFile.type.startsWith('video/')) {
        await toast.promise(uploadFile(selectedFile), {
          pending: 'Uploading file...',
          success: 'Processing queued..',
          error: 'Upload Failed',
        })
        navigate('/dashboard')
      } else {
        toastMessage('Please select file to upload', false)
      }
    } catch (error) {
      console.log(error)
    }
    setUploadButtonDisable(false)
  }
  useEffect(() => {
    const init = async () => {
      try {
        setLoading(true)
        await apiGetRequest(BACKEND_URL, false)
      } catch (error) {
        console.log(error)
        toastMessage('Something went wrong', false)
      } finally {
        setLoading(false)
      }
    }
    init()
  }, [])
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      {loading && (
        <div className="my-[25vh] text-center">
          <svg
            className="animate-spin h-8 w-8 text-white mx-auto mb-4"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8V0l-3.5 3.5L8 4m5-1.5L16.5 8H20a8 8 0 01-8 8v2.5L8 16.5z"
            ></path>
          </svg>
          <h1 className="mb-5 text-xl font-bold">Loading...</h1>
          <p className="text-sm text-gray-300">
            Server might take upto 2 minutes to respond for the very first request !!
          </p>
        </div>
      )}
      {!loading && (
        <>
          <div className="flex flex-col items-center justify-center h-full py-10">
            <h2 className="text-4xl font-bold mb-8 text-center">Upload Video Files Here to Transcode</h2>
            <div className="flex flex-col items-center space-y-6">
              <label className="w-72 flex flex-col items-center px-6 py-8 bg-gray-800 text-blue-400 rounded-lg shadow-lg tracking-wide uppercase border-2 border-blue-400 hover:border-blue-600 hover:text-blue-600 transition duration-150 ease-in-out">
                <FiUpload className="text-5xl mb-3" />
                <span className="mt-2 text-lg leading-normal">Select a video file</span>
                <input
                  type="file"
                  accept="video/*"
                  className="hidden"
                  onChange={(e) => {
                    const file = e.target.files ? e.target.files[0] : null
                    setSelectedFile(file)
                    setUploadButtonDisable(!file)
                  }}
                />
              </label>
              {selectedFile && <div className="text-base text-gray-300 mt-2">Selected file: {selectedFile.name}</div>}
              <button
                className={`px-6 py-3 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-150 ease-in-out ${
                  uploadButtonDisable ? 'opacity-50 cursor-not-allowed' : ''
                }`}
                disabled={uploadButtonDisable}
                onClick={handleUpload}
              >
                Upload
              </button>
            </div>
          </div>
          <div className="mt-10 px-8 py-6 bg-gray-800 rounded-lg shadow-lg mx-0">
            <h3 className="text-2xl font-semibold mb-4 text-center text-blue-400">Video Processing Information</h3>
            <ul className="text-base text-center text-gray-400 mt-4 mx-auto">
              <li>The uploaded video will be processed in 360p, 480p, 720p, and 1080p resolutions.</li>
              <li>
                All videos will be transcoded to HLS (HTTP Live Streaming) format for optimal streaming performance.
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  )
}

export default Home
