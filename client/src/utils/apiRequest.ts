import axios from 'axios'

const apiGetRequest = async (
  url: string,
  credentials: boolean,
  params?: object
) => {
  let response
  if (!credentials && !params) {
    response = await axios.get(url)
    return response
  }
  if (!credentials && params) {
    response = await axios.get(url, { params })
    return response
  }
  const token = localStorage.getItem('accessToken')
  if (credentials && !params) {
    response = await axios.get(url, {
      headers: { Authorization: `Bearer ${token}` },
    })
    return response
  }

  response = axios.get(url, {
    params: params,
    headers: { Authorization: `Bearer ${token}` },
  })
  return response
}

const apiPostRequest = async (
  url: string,
  credentials: boolean,
  data: object
) => {
  let response
  if (!credentials) {
    response = await axios.post(url, data)
    return response
  }
  const token = localStorage.getItem('accessToken')
  response = await axios.post(url, data, {
    headers: { Authorization: `Bearer ${token}` },
  })
  return response
}

export { apiGetRequest, apiPostRequest }
