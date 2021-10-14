import api from '../api'

const FeedbackService = {
  cadastrarFeedback: async (data) => {
    try {
      const res = await api.post('/feedbacks', data)
      return res
    } catch (err) {
      return err
    }
  }
}

export default FeedbackService
