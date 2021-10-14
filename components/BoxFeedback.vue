<template>
  <div class="box-feedback">
    <h2>{{ usuarioFeedback.nome }} {{ usuarioFeedback.sobrenome }}</h2>
    <small>{{ usuarioFeedback.cargo }}</small>

    <p v-if="feedback.nivel_feedback == 'exce'" class="box-feedback__nivel box-feedback__nivel-excelente">
      Excelente
    </p>

    <p v-if="feedback.nivel_feedback == 'regu'" class="box-feedback__nivel box-feedback__nivel-regular">
      Regular
    </p>

    <p v-if="feedback.nivel_feedback == 'ruim'" class="box-feedback__nivel box-feedback__nivel-ruim">
      Ruim
    </p>

    <p class="box-feedback__description">
      {{ feedback.feedback }}
    </p>
  </div>
</template>

<script>
import UserService from '@/service/user/user-service'
export default {
  name: 'BoxFeedback',
  props: {
    feedback: {
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
  min-width: 200px;
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
</style>
