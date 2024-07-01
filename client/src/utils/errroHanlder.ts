import { AxiosResponse } from 'axios'
import { toastMessage } from './toastMessage'
interface ApiResponse {
  success: boolean
  message?: string
}

const authHandler = (response: AxiosResponse<ApiResponse>) => {
  if (response.data.success === false && response.data.message === 'User unauthorized !!') {
    return true
  }
  return false
}

const errorHandler = (response: AxiosResponse<ApiResponse>) => {
  if (response.data.success === false) {
    console.log(response.data.message)
    toastMessage(response.data.message || 'An error occurred', false)
    return true
  }
  return false
}

export { errorHandler, authHandler }
