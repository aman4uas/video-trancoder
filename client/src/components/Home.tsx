import { useEffect, useState } from 'react'
import { apiGetRequest, apiPostRequest, toastMessage } from '../utils'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL

const Home = () => {
  const navigate = useNavigate()
  const [selectedFile, setSelectedFile] = useState<null | File>(null)

  const handleUpload = async () => {
    try {
      if (selectedFile && selectedFile.type.startsWith('video/')) {
        const typeOfFile = selectedFile.type
        const sizeOfFile = selectedFile.size
        const fileName = selectedFile.name

        let response = await apiGetRequest(BACKEND_URL + '/file/signedurl', true, { typeOfFile, sizeOfFile, fileName })
        const { presignedUrl, file } = response.data.data
        response = await axios.put(presignedUrl, selectedFile)
        response = await apiPostRequest(BACKEND_URL + '/file/onupload', true, { fileName: file })
        console.log(response.data)
        toastMessage('File Uploaded successfully !!', true)
      } else {
        toastMessage('Please select file to upload', false)
      }
    } catch (error) {
      console.log(error)
      toastMessage('Something went wrong !!', false)
    }
  }
  useEffect(() => {
    const init = async () => {
      const response = await apiGetRequest(BACKEND_URL + '/protected', true)
      if (!response.data.success) {
        navigate('/signin')
      }
    }
    init()
  }, [])
  return (
    <div>
      <h2>File Input Example</h2>
      <input
        type="file"
        accept="video/*"
        onChange={(e) => setSelectedFile(e.target.files ? e.target.files[0] : null)}
      />
      <button onClick={handleUpload}>Upload</button>
    </div>
  )
}

export default Home
