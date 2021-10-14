<template>
  <div>
    <div class="box-feedback">
      <h2>{{ funcionario.nome }}</h2>
      <small>{{ funcionario.cargo }}</small>
      <div v-if="funcionario.has_feedback" class="has-feedback">
        <p v-if="funcionario.nivel_feedback == 'exce'" class="box-feedback__nivel box-feedback__nivel-excelente">
          Excelente
        </p>

        <p v-if="funcionario.nivel_feedback == 'regu'" class="box-feedback__nivel box-feedback__nivel-regular">
          Regular
        </p>

        <p v-if="funcionario.nivel_feedback == 'ruim'" class="box-feedback__nivel box-feedback__nivel-ruim">
          Ruim
        </p>

        <p class="box-feedback__description">
          {{ funcionario.feedback }}
        </p>
      </div>
      <div v-else class="sem-feedback-wrapper">
        <p class="sem-feedback">
          Ainda não enviou o feedback semanal
        </p>
      </div>
    </div>
    <nuxt-link class="btn-sendFeedback" :to="`/funcionario/${funcionario.id}`">
      <a-button type="primary" class="btn-primary">
        Visualizar Desempenho
      </a-button>
    </nuxt-link>
  </div>
</template>

<script>
import UserService from '@/service/user/user-service'
export default {
  name: 'BoxFeedback',
  props: {
    funcionario: {
      typeof: Object,
      required: true
    }
  },
  data () {
    return {
      usuarioFeedback: {}
    }
  },
  mounted () {
    if (this.feedback) {
      this.getUserFeedback()
    }
  },
  methods: {
    async getUserFeedback () {
      const user = await UserService.getUser(this.feedback.id_usuario_enviou)
      this.usuarioFeedback = user.data
    }
  }
}
</script>

<style lang="scss" scoped>
.box-feedback{
  background: #FFF;
  border-radius: 4px;
  width: 200px;
  padding: 20px;
  height: 240px;
  overflow-x: hidden;

  h2{
    font-size: 0.875rem;
    font-family: $font-family-montserrat;
    margin-bottom: -10px;
  }

  small{
    margin-top: -10px;
  }

  &__nivel{
    display: block;
    border-radius: 4px;
    padding: 5px;

    &-excelente{
      background: $feedback-excelente,
    }
    &-regular{
      background: $feedback-regular,
    }
    &-ruim{
      background: $feedback-ruim,
    }
  }

  &__description{
    font-size: 0.75rem;
    margin-top: 10px;
    max-width: 200px;
  }
}

.sem-feedback{
  font-size: 0.7rem;
  text-align: center;
}

.sem-feedback-wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
  height: 130px;
}
</style>
