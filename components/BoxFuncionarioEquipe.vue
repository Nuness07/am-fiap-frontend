<template>
  <div class="box-funcionario">
    <img src="~/assets/img/user-icon.png" alt="foto do usuário" class="img-box">
    <h2>{{ funcionario.nome }}</h2>
    <small>{{ funcionario.cargo }}</small>

    <nuxt-link class="btn-sendFeedback" :to="`/funcionario/${funcionario.id}`">
      <a-button type="primary" class="btn-primary">
        Visualizar Perfil
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
  width: 200px;
  display: flex;
  justify-content: center;
  flex-direction: column;

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

.img-box{
  max-width: 80px;
  clip-path: circle();
  margin: 0 auto;
  margin-bottom: 20px;
}
</style>
