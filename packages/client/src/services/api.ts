import axios from 'axios'
import Cookies from 'js-cookie'

function Api() {
  const authorization = Cookies.get('auth-token')
    ? { Authorization: `Bearer ${Cookies.get('auth-token')}` }
    : {}

  const url = process.env.BASE_URL || 'http://localhost:3001'

  return axios.create({
    baseURL: url,
    headers: {
      ...authorization
    }
  })
}

export default Api
