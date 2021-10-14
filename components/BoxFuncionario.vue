<template>
  <div class="box-funcionario">
    <h2>{{ funcionario.nome }} {{ funcionario.sobrenome }}</h2>
    <small>{{ funcionario.cargo }}</small>

    <p v-if="$auth.user.is_gerente" class="secondary-info">
      Data de admissão: {{ funcionario.data_admissao }}
    </p>

    <nuxt-link class="btn-sendFeedback" :to="`/feedbacks/${funcionario.id_usuario}`">
      <a-button type="primary" class="btn-primary">
        Enviar Feedback
      </a-button>
    </nuxt-link>
  </div>
</template>

<script>
export default {
  name: 'BoxFuncionario',
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
  }
}
</script>

<style lang="scss" scoped>
.box-funcionario{
  background: #FFF;
  border-radius:4px;
  padding: 10px 20px;
  min-width: 320px;

  h2{
    font-size: 1rem;
    margin-bottom: -10px;
  }

  small{
    font-size: 0.75rem;
  }
}

.btn-sendFeedback{
  display: block;
  width: 100%;
  margin-top: 5px;

  button{
    width: 100%;
  }
}

.secondary-info{
  font-size: 0.875rem;
}
</style>
