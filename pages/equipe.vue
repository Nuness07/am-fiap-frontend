<template>
  <div class="dashboard">
    <section class="dashboard-right">
      <div class="dashboard-right__metas dashboard-right__section">
        <h3 class="dashboard-right__section--title">
          Desempenho Mensal da sua equipe
        </h3>

        <div class="dashboard-right__metas-graficos">
          <div class="dashboard-right__item">
            <h3 class="dashboard-right__item-title">
              Metas batidas
            </h3>
            <div class="dashboard-right__item-content">
              <MetaChart height="100" :data="equipeMetaData" />
            </div>
          </div>
        </div>

        <div class="dashboard-right__metas-desempenho">
          <div class="dashboard-right__item">
            <h3 class="dashboard-right__item-title">
              Gráfico Anual
            </h3>
            <div class="dashboard-right__item-content dashboard-item-grafico-anual">
              <div class="content-grafic">
                <MetaLineChart height="80" :data="lineMetaData" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- INICIO EQUIPES -->
      <div class="dashboard-right__equipe dashboard-right__section">
        <h3 class="dashboard-right__section--title">
          Feedbacks Semanais da sua equipe
        </h3>

        <div class="dashboard-right__item-content content-feedback-semanal">
          <div v-for="funcionario in feedbacksSemanais" :key="funcionario.id">
            <BoxFeedbackSemanal :funcionario="funcionario" />
          </div>
        </div>
      </div>
      <!-- FIM EQUIPES -->
    </section>
  </div>
</template>

<script>
// import UserService from '@/service/user/user-service'
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

      feedbacksSemanais: [
        {
          id: 'c3ab00ab-9538-4a35-ac72-b3c4ea26e769',
          nome: 'Gabriel Nunes',
          cargo: 'Desenvolvedor Front-End',
          has_feedback: true,
          nivel_feedback: 'exce',
          feedback: 'Minha semana foi muito produtiva e eu consegui concluir todas as minhas metas do sprint'
        },
        {
          id: 'c3ab00ab-9538-4a35-ac72-b3c4ea26e742',
          nome: 'Bruno Palotta',
          cargo: 'DBA',
          has_feedback: true,
          nivel_feedback: 'regu',
          feedback: 'tive alguns problemas durante a semana que me impediram de concluir todas as metas, mas no geral, até que foi boa'
        },
        {
          id: 'c3ab00ab-9538-4a35-ac72-b3c4ea26e761',
          nome: 'Adriana Monteiro',
          cargo: 'Desenvolvedor Front-End',
          has_feedback: false,
          nivel_feedback: 'exce',
          feedback: 'Minha semana foi muito produtiva e eu consegui concluir todas as minhas metas do sprint'
        }
      ]
    }
  },
  methods: {
  }
}
</script>

<style lang="scss" scoped>
.dashboard{
  margin-left: 36px;
  &-right{
    margin-right: 36px;
    max-width: 100%;

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
        width: 100%;
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

.dashboard-item-grafico-anual{
  background: transparent;
}

.content-feedback-semanal{
  column-gap: 20px;
}
</style>
