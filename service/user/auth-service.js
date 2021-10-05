import api from '../api'

const UserAuthorization = {
  login: async (data) => {
    try {
      const res = await api.post('/login', data)
      console.log('chamou aqui')
      return res
    } catch (err) {
      return err
    }
  },

  getUser: async (token) => {
    try {
      const res = await api.get('/user', { headers: { Authorization: token } })
      return res
    } catch (err) {
      return err
    }
  }
}

export default UserAuthorization
