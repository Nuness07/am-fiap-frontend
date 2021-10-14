<template>
  <div class="login">
    <TheHeader />

    <div class="login-form">
      <h1 class="login-form__title">
        Login na plataforma
      </h1>

      <a-form-model ref="formLogin" :model="formLogin" :rules="rules">
        <a-form-model-item has-feedback prop="email" label="E-mail">
          <a-input
            v-model="formLogin.email"
            type="email"
            class="primary"
            placeholder="funcionario@ey.com.br"
          />
        </a-form-model-item>
        <a-form-model-item has-feedback prop="password" label="Senha">
          <a-input
            v-model="formLogin.password"
            class="primary"
            type="password"
            placeholder="password"
          />
        </a-form-model-item>
      </a-form-model>

      <a-button type="primary" class="btn-primary" @click="check">
        Login
      </a-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Index',
  data () {
    return {
      formLogin: {
        email: null,
        password: null
      },

      rules: {
        email: [
          { required: true, message: 'E-mail é obrigatório' },
          { type: 'email', message: 'O e-mail não é valido' }
        ],
        password: [{ required: true, message: 'Senha é obrigatorio' }]
      }
    }
  },
  methods: {
    async check () {
      await this.$refs.formLogin.validate((valid) => {
        if (valid) {
          this.login(this.formLogin)

          this.$toast.success('Login realizado!', {
            timeout: 2000
          })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },

    async login (values) {
      try {
        await this.$auth.loginWith('localUser', {
          data: {
            email: values.email,
            password: values.password
          }
        })
        this.$router.push('/dashboard')
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.login-form{
  display: flex;
  align-items: center;
  justify-content: center;
  height: 80vh;
  flex-direction: column;

  &__title{
    font-weight: 800;
    font-size: 1.5rem;
    text-transform: uppercase;
    color: $primary-color;
  }

  .primary{
    width: 375px;
  }

  .btn-primary{
    width: 375px;
    transition: .3s transform;

    &:hover{
      transform: scale(1.03);
    }
  }
}
</style>
