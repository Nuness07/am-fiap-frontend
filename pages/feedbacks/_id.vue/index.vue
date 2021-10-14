<template>
  <div class="enviar-feedback">
    <div class="enviar-feedback__wrapper">
      <h2>Enviar Feedback para {{ funcionario.nome }}</h2>

      <a-form-model ref="formFeedback" class="formulario-feedback" :model="formFeedback" :rules="rules">
        <a-form-model-item has-feedback prop="assunto" label="Assunto do Feedback">
          <a-input
            v-model="formFeedback.assunto"
            class="secondary"
            placeholder="Sobre o que você vai falar?"
          />
        </a-form-model-item>
        <a-form-model-item label="Nível do feedback">
          <a-radio-group v-model="formFeedback.nivel_feedback" @change="selectNivel">
            <a-radio-button value="exce">
              Excelente
            </a-radio-button>
            <a-radio-button value="regu">
              Regular
            </a-radio-button>
            <a-radio-button value="ruim">
              Ruim
            </a-radio-button>
          </a-radio-group>
        </a-form-model-item>
        <p v-if="validarNivel" class="validar-nivel">
          Selecione um nível de feedback
        </p>
        <a-form-model-item has-feedback prop="feedback" label="Seu Feedback">
          <a-input
            v-model="formFeedback.feedback"
            type="textarea"
            class="primary"
            placeholder="Digite seu feedback aqui!"
            :rows="15"
          />
        </a-form-model-item>
      </a-form-model>

      <a-button type="primary" class="btn-sendfeedback" @click="check">
        Enviar Feedback
      </a-button>
    </div>
  </div>
</template>

<script>
import UserService from '@/service/user/user-service'
import FeedbackService from '@/service/feedback/feedback-service'
export default {
  layout: 'logged',
  middleware: 'auth',
  data () {
    return {
      funcionario: {},
      formFeedback: {
        nivel_feedback: null,
        assunto: null,
        feedback: null
      },

      rules: {
        assunto: [{ required: true, message: 'Assunto é obrigatório' }],
        feedback: [{ required: true, message: 'O feedback é obrigatório' }]
      },
      validarNivel: false
    }
  },
  mounted () {
    this.getUser()
  },
  methods: {
    async getUser () {
      const user = await UserService.getUser(this.$route.params.id)
      this.funcionario = user.data
    },

    selectNivel (e) {
      this.formFeedback.nivel_feedback = e.target.value
      console.log(this.formFeedback)
    },

    async check () {
      await this.$refs.formFeedback.validate((valid) => {
        if (valid) {
          if (!this.formFeedback.nivel_feedback) {
            this.validarNivel = true
            console.log('entrou nessa validação')
            return
          }

          const feedbackObject = {
            nivel_feedback: this.formFeedback.nivel_feedback,
            assunto: this.formFeedback.assunto,
            feedback: this.formFeedback.feedback,
            id_usuario_enviou: this.$auth.user.id_usuario,
            id_usuario_recebeu: this.funcionario.id_usuario
          }

          FeedbackService.cadastrarFeedback(feedbackObject)

          this.$toast.success(`Feedback enviado para ${this.funcionario.nome}`, {
            timeout: 2000
          })
          this.$router.push('/feedbacks')
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.enviar-feedback{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 90vh;
}

.enviar-feedback__wrapper{
  width: 375px;
}

@media(max-width: 375px){
  .enviar-feedback__wrapper{
    width: 320px;
  }
}
.formulario-feedback{
  max-width: 600px;
}

.btn-sendfeedback{
  width: 100%;
}

.validar-nivel{
  color: red;
  font-size: 0.75rem;
}
</style>
