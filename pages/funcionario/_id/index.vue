<template>
  <div class="dashboard">
    <section class="dashboard-left">
      <div class="dashboard-left__user-box">
        <img src="@/assets/img/user-icon.png" alt="foto do usuário" class="dashboard-left__user-box--photo">
        <div class="dashboard-left__user-box-infos">
          <h2 class="dashboard-left__user-box-infos--name">
            {{ user.nome }} {{ user.sobrenome }}
          </h2>
          <p class="dashboard-left__user-box-infos--cargo">
            {{ user.cargo }} <span v-if="user.is_gerente">- Gerente</span>
          </p>
          <p class="dashboard-left__user-box-infos--filial">
            {{ user.localidade_filial }}
          </p>
        </div>
      </div>

      <nuxt-link class="btn-sendFeedback" :to="`/dashboard`">
        <a-button type="primary" class="btn-primary">
          Voltar para seu perfil
        </a-button>
      </nuxt-link>
    </section>
    <section class="dashboard-right">
      <div class="dashboard-right__metas dashboard-right__section">
        <h3 class="dashboard-right__section--title">
          Metas Gerais
        </h3>

        <div class="dashboard-right__metas dashboard-right__item">
          <h3 class="dashboard-right__item-title">
            Metas de {{ user.nome }}
          </h3>
          <div class="dashboard-right__item-content">
            <p class="dashboard-right__item-content-nometa">
              {{ user.nome }} ainda não tem nenhuma meta nesse mês
            </p>
          </div>
        </div>

        <div class="dashboard-right__metas-graficos">
          <div class="dashboard-right__item">
            <h3 class="dashboard-right__item-title">
              Metas da equipe de {{ user.nome }}
            </h3>
            <div class="dashboard-right__item-content">
              <MetaChart height="100" :data="equipeMetaData" />
            </div>
          </div>
          <div class="dashboard-right__item">
            <h3 class="dashboard-right__item-title">
              Suas Metas
            </h3>
            <div class="dashboard-right__item-content">
              <MetaChart height="100" :data="pessoalMetaData" />
            </div>
          </div>
        </div>

        <div class="dashboard-right__metas-desempenho">
          <div class="dashboard-right__item">
            <h3 class="dashboard-right__item-title">
              Desempenho Mensal de {{ user.nome }}
            </h3>
            <div class="dashboard-right__item-content">
              <div class="content-grafic">
                <MetaLineChart height="100" :data="lineMetaData" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
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
            data: [2, 30],
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
            data: [12, 62],
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
            data: [2, 8, 18, 12, 10, 10, 12],
            fill: false,
            borderColor: 'rgb(75, 192, 192)',
            tension: 0.1
          },
          {
            label: 'Metas determinadas',
            data: [10, 8, 16, 14, 13, 11, 7],
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

      description: null,
      user: {}
    }
  },
  mounted () {
    this.getUser()
  },
  methods: {
    async getUser () {
      const user = await UserService.getUser(this.$route.params.id)
      this.user = user.data
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

</style>
