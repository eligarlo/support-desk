import axios from 'axios'
import { ILoginUser, IRegisterUser } from 'features/auth/authInterfaces'

const API_URL = '/api/users'

// Register user
const register = async (userData: IRegisterUser) => {
  const response = await axios.post(API_URL, userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

// Login user
const login = async (userData: ILoginUser) => {
  const response = await axios.post(`${API_URL}/login`, userData)

  if (response.data) {
    localStorage.setItem('user', JSON.stringify(response.data))
  }
  return response.data
}

// Logout userData
const logout = () => localStorage.removeItem('user')

const authService = {
  register,
  logout,
  login,
}

export default authService
