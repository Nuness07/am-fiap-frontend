import axios from 'axios'

const URL = 'http://localhost:3000'

const config = {
  baseURL: `${URL}`,
  responseType: 'json'
}

const api = axios.create(config)

export default api
