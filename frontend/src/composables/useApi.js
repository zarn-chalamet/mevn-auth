import axios from 'axios'

export const useApi = () =>
  axios.create({
    baseURL: 'http://localhost:3500',
    headers: {
      'Content-Type': 'application/json'
    }
  })

export const useApiPrivate = () => {
  const token = localStorage.getItem('token') // Use stored token
  return axios.create({
    baseURL: 'http://localhost:3500',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
}
