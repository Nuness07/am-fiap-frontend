<template>
  <div class="feedbacks">
    <div v-if="$auth.user.feedbacks.length > 0">
      <h2>Feedbacks Recebidos</h2>
      <div class="feedbacks__recebidos">
        <div v-for="feedback in $auth.user.feedbacks" :key="feedback.id_feedback" class="feedbacks__recebidos-cards">
          <BoxFeedback :feedback="feedback" />
        </div>
      </div>
    </div>

    <h2>Enviar Feedbacks</h2>
    <div class="feedbacks__enviar">
      <div v-for="funcionario in funcionarios" :key="funcionario.id_usuario">
        <BoxFuncionario :funcionario="funcionario" />
      </div>
    </div>
  </div>
</template>

<script>
import UserService from '@/service/user/user-service'
export default {
  layout: 'logged',
  middleware: 'auth',
  data () {
    return {
      funcionarios: {}
    }
  },
  mounted () {
    this.getUsers()
  },
  methods: {
    async getUsers () {
      const users = await UserService.getUsers()
      this.funcionarios = users.data
    }
  }
}
</script>

<style lang="scss" scoped>
.feedbacks{
  margin-left: 36px;
  margin-top: 30px;

  &__recebidos{
    display: flex;
    justify-content: flex-start;
    column-gap: 20px;
    overflow-x: scroll;
  }

  &__enviar{
    display: flex;
    column-gap: 20px;
    flex-wrap: wrap;
  }
}

</style>
