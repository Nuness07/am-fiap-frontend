import api from '../api'

const UserService = {
  editUser: async (id, data) => {
    try {
      const res = await api.put(`/usuarios/${id}`, data)
      return res
    } catch (err) {
      return err
    }
  },

  getUser: async (id) => {
    try {
      const res = await api.get(`/usuarios/${id}`)
      return res
    } catch (err) {
      return err
    }
  },

  getUsers: async () => {
    try {
      const res = await api.get('/usuarios')
      return res
    } catch (err) {
      return err
    }
  }
}

export default UserService
