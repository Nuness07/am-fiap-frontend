<template>
  <div class="dashboard">
    <section class="dashboard-left">
      <div class="dashboard-left__user-box">
        <img src="@/assets/img/user-icon.png" alt="foto do usuário" class="dashboard-left__user-box--photo">
        <div class="dashboard-left__user-box-infos">
          <h2 class="dashboard-left__user-box-infos--name">
            {{ $auth.user.nome }} {{ $auth.user.sobrenome }}
          </h2>
          <p class="dashboard-left__user-box-infos--cargo">
            {{ $auth.user.cargo }} <span v-if="$auth.user.is_gerente">- Gerente</span>
          </p>
          <p class="dashboard-left__user-box-infos--filial">
            {{ $auth.user.localidade_filial }}
          </p>
          <button class="logout" @click="logout">
            Sair
          </button>
        </div>
      </div>

      <div class="dashboard-left__feedback-semanal dashboard-left__box">
        <h3 class="dashboard-left__box--title">
          Nos diga como foi a sua semana
        </h3>
        <div class="dashboard-left__box-content">
          <a-button v-if="$auth.user.feedback_semanal == false" type="secondary" class="btn-secondary" @click="$vm2.open('feedback-semanal')">
            Enviar feedback
          </a-button>
          <p v-else class="feedback-semanal-send">
            Seu feedback foi enviado
          </p>
        </div>
      </div>
    </section>
    <section class="dashboard-right">
      <div class="dashboard-right__metas dashboard-right__section">
        <h3 class="dashboard-right__section--title">
          Metas Gerais
        </h3>

        <div class="dashboard-right__metas dashboard-right__item">
          <h3 class="dashboard-right__item-title">
            Suas metas
          </h3>
          <div class="dashboard-right__item-content">
            <p class="dashboard-right__item-content-nometa">
              Você ainda não tem nenhuma meta
            </p>
          </div>
        </div>

        <div class="dashboard-right__metas-graficos">
          <div class="dashboard-right__item">
            <h3 class="dashboard-right__item-title">
              Metas batidas da sua equipe
            </h3>
            <div class="dashboard-right__item-content">
              <MetaChart height="100" :data="equipeMetaData" />
            </div>
          </div>
          <div class="dashboard-right__item">
            <h3 class="dashboard-right__item-title">
              Suas Metas batidas
            </h3>
            <div class="dashboard-right__item-content">
              <MetaChart height="100" :data="pessoalMetaData" />
            </div>
          </div>
        </div>

        <div class="dashboard-right__metas-desempenho">
          <div class="dashboard-right__item">
            <h3 class="dashboard-right__item-title">
              Seu desempenho mensal
            </h3>
            <div class="dashboard-right__item-content">
              <div class="content-grafic">
                <MetaLineChart height="100" :data="lineMetaData" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- INICIO EQUIPES -->
      <div class="dashboard-right__equipe dashboard-right__section">
        <h3 class="dashboard-right__section--title">
          Sua equipe
        </h3>

        <div class="dashboard-right__item-content content-equipe">
          <div v-for="funcionario in equipe" :key="funcionario.id">
            <BoxFuncionarioEquipe :funcionario="funcionario" />
          </div>
        </div>
      </div>
      <!-- FIM EQUIPES -->

      <!-- INICIO FEEDBACKS -->
      <div class="dashboard-right__feedbacks dashboard-right__section">
        <h3 class="dashboard-right__section--title">
          Feedbacks recebidos
        </h3>

        <div class="dashboard-right__item-content dashboard-right__item-content--feedbacks">
          <div v-if="$auth.user.feedbacks.length > 0" class="dashboard-feedback-flex">
            <div v-for="feedback in $auth.user.feedbacks" :key="feedback.id_feedback">
              <BoxFeedback :feedback="feedback" />
            </div>
          </div>
          <div v-else>
            <p>Nenhum Feedback recebido</p>
          </div>
        </div>
      </div>
    </section>

    <client-only>
      <vue-modal-2
        class="modal"
        name="feedback-semanal"
        :header-options="{
          title: 'Enviar Feedback Semanal',
        }"
        :no-footer="false"
        :modal-size="`xl`"
        @on-close="$vm2.close('feedback-semanal')"
      >
        <p class="form-semanal-text">
          Reflita sobre suas atividades, projetos, interações, dinâmicas e desempenho,
          e selecione o emoji que mais comunica como você está se sentindo!
        </p>

        <div class="tipos-feedback">
          <label
            v-for="nivel in niveisFeedback"
            :key="nivel.id"
            :for="nivel.id"
            class="c-check"
          >
            <input
              :id="nivel.id"
              name="tipoImovel"
              style="pointer-events: none"
              type="radio"
            >
            <span>
              <div v-if="nivel.nome == 'otimo'">
                <img src="@/assets/img/icons/icon-happy.svg" alt="feedback bom">
              </div>

              <div v-if="nivel.nome == 'bom'">
                <img src="@/assets/img/icons/icon-medium.svg" alt="feedback médio">
              </div>

              <div v-if="nivel.nome == 'ruim'">
                <img src="@/assets/img/icons/icon-bad.svg" alt="feedback ruim">
              </div>
            </span>
          </label>
        </div>
        <a-form-model
          ref="formSemanal"
          :rules="rules"
          :model="formSemanal"
          class="form-semanal"
        >
          <a-form-model-item
            class="form-item__title"
            prop="description"
            label="Diga mais alguma coisa"
          >
            <a-input v-model="formSemanal.description" type="textarea" placeholder="Conte-nos mais como foi sua semana" :rows="4" />
          </a-form-model-item>
        </a-form-model>

        <template #footer>
          <div class="modal-semanal-footer">
            <p class="modal-semanal-footer-text">
              Apenas você seu líder e o RH terão visibilidade da sua resposta
            </p>
            <a-button type="secondary" class="btn-secondary" @click="check">
              Enviar feedback
            </a-button>
          </div>
        </template>
      </vue-modal-2>
      <!-- FIM MODAL SPOTIFY -->
    </client-only>
  </div>
</template>

<script>
import UserService from '@/service/user/user-service'
import MetaChart from '~/components/MetaChart.vue'
import MetaLineChart from '~/components/MetaLineChart.vue'
export default {
  components: {
    MetaChart,
    MetaLineChart
  },
  layout: 'logged',
  middleware: 'auth',
  data () {
    return {
      equipeMetaData: {
        labels: ['Metas não batidas', 'Metas batidas'],
        datasets: [
          {
            backgroundColor: ['#F94A4A', '#4AC7F0'],
            width: 200,
            data: [25, 75],
            borderWidth: 1,
            weight: 0.5
          }
        ],
        options: {
          responsive: true,
          maintainAspectRatio: false
        }

      },

      pessoalMetaData: {
        labels: ['Metas não batidas', 'Metas batidas'],
        datasets: [
          {
            backgroundColor: ['#F94A4A', '#4AC7F0'],
            width: 200,
            data: [25, 20],
            borderWidth: 1,
            weight: 0.5
          }
        ],
        options: {
          responsive: true,
          maintainAspectRatio: false
        }
      },

      lineMetaData: {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
        datasets: [
          {
            label: 'Metas Mensais batidas',
            data: [10, 5, 12, 20, 22, 10, 12],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          },
          {
            label: 'Metas determinadas',
            data: [10, 8, 10, 20, 24, 11, 10],
            fill: false,
            borderColor: '#F94A4A',
            tension: 0.1
          }
        ],
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          },
          aspectRatio: 1
        }
      },

      niveisFeedback: [
        {
          id: 3,
          nome: 'ruim'
        },
        {
          id: 2,
          nome: 'bom'
        },
        {
          id: 1,
          nome: 'otimo'
        }
      ],

      formSemanal: {
        description: null
      },

      description: null,

      rules: {
        description: [
          { required: true, message: 'Digite uma pequena descrição da sua semana' }
        ]
      },

      equipe: [
        {
          id: 'c3ab00ab-9538-4a35-ac72-b3c4ea26e769',
          nome: 'Gabriel Nunes',
          cargo: 'Desenvolvedor Front-end'
        },
        {
          id: 'c3ab00ab-9538-4a35-ac72-b3c4ea26e742',
          nome: 'Bruno Palotta',
          cargo: 'DBA'
        },
        {
          id: 'c3ab00ab-9538-4a35-ac72-b3c4ea26e761',
          nome: 'Adriana Monteiro',
          cargo: 'QA'
        }
      ]
    }
  },
  methods: {
    async check () {
      await this.$refs.formSemanal.validate((valid) => {
        if (valid) {
          UserService.editUser(this.$auth.user.id_usuario, { feedback_semanal: true })
          this.$toast.success('Feedback semanal enviado!', {
            timeout: 2000
          })
          this.$vm2.close('feedback-semanal')
          this.$router.go()
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    async logout () {
      try {
        await this.$auth.logout()
        this.$toast.success('Você deslogou com sucesso!', {
          timeout: 2000
        })
        this.$router.push('/')
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.dashboard{
  display: flex;
  margin-left: 36px;
  &-left{
    min-width: 394px;
    margin-right: 36px;
    position: sticky;
    top: 50px;
    height: 300px;
    &__user-box{
      background: #FFF;
      box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
      max-width: 394px;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 30px 30px 30px 15px;
      margin-bottom: 36px;

      &--photo{
        max-width: 100px;
        clip-path: circle();
      }

      &-infos{
        &--name{
          font-size: 0.875rem;
          margin-bottom: 0;
        }
        &--cargo{
          font-size: 0.75rem;
          margin-bottom: 10px !important;
        }
        &--filial{
          font-size: 0.875rem;
        }
      }
    }

    &__box{
      &--title{
        font-size: 1rem;
        color: $primary-color;
        text-align: center;
      }
    }

    &__feedback-semanal{
      .dashboard-left__box-content{
        background: #FFF;
        padding: 60px 20px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
  }

  &-right{
    margin-right: 36px;
    max-width: 680px;

    &__section{
      margin-bottom: 60px;
    }
    &__section--title{
      font-size: 1.125rem;
    }

    &__item{
      &-content{
        background: #F2F2F2;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 40px 0;
        margin-bottom: 20px;

        &-nometa{
          color: $secondary-color;
          font-size: 1.125rem;
        }
      }
    }

    &__metas-graficos{
      display: flex;
      justify-content: space-between;
      column-gap: 20px;

      .dashboard-right__item{
        width: 50%;
      }
    }
  }
}

@media(max-width: 1024px){
  .dashboard{
    display: block;
    padding: 0 24px;
    &-left{
      min-width: 100%;
      width: 100%;
      margin-right: 0px;
      margin-bottom: 60px;
      position: relative;
      &__user-box{
        max-width: 375px;
        margin: 30px auto;
      }
    }

    &-right{
    margin-right: 0px;

    &__section--title{
      text-align: center;
    }

    &__metas-graficos{
      display: block;

      .dashboard-right__item{
        width: 100%;
      }
    }
  }
  }
}

.content-grafic{
  width: 100%;
  height: 200px !important;
  object-fit: cover;
}

.tipos-feedback{
  display: flex;
  justify-content: space-around;
}

.c-check {
  input {
    position: absolute;
    left: 0;
    opacity: 0;
    pointer-events: none !important;
    display: none;
    position: absolute;
    top: -1000%;

    &:checked {
      ~ {
        span {
          background: $secondary-color;
        }

        span .tipoImovel-checked{
          display: flex;
        }
      }
    }
  }
  span {
    width: 90px;
    height: 90px;
    border-radius: 10px;
    transition: background-size 0.2s, background-color 0.2s;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    cursor: pointer;
  }
  .tipoImovel-checked{
    display: none;
    position: absolute;
    right: 16px;
    top: 16px;
    width: 32px;
    height: 32px;
    justify-content: center;
    align-items: center;
    border-radius: 50%;
    cursor: pointer;
  }
}

.form-semanal{
  margin: 20px 36px;
}

.form-semanal-text{
  font-weight: 400;
  font-size: 0.75rem;
  text-align: center;
  padding: 0 40px;
  margin-bottom: 16px;
}

.modal{
  z-index: 99999999999;
}

.modal-semanal-footer{
  margin-top: -16px;
  background: #F3F3F3;
  padding: 30px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  &-text{
    font-size: 0.75rem;
  }
}

.dashboard-right__item-content--feedbacks{
  column-gap: 16px;
  justify-content: flex-start !important;
  overflow-x: scroll;
  width: 100%;
  height: 100%;
  padding: 20px;
  position: relative;
}

.feedback-semanal-send{
  background: $primary-color;
  padding: 5px;
  color: #FFF;
  border-radius: 4px;
}

.dashboard-feedback-flex{
  display: flex;
  column-gap: 20px;
  overflow-x: scroll;
}

.content-equipe{
  column-gap: 20px;
}

.logout{
  border: none;
  background:crimson;
  color: #FFF;
  padding: 5px 15px;
  border-radius: 4px;
  margin-top: 5px;
  cursor: pointer;
}

</style>
