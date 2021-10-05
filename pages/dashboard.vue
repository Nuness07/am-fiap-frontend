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
            {{ $auth.user.cargo }}
          </p>
          <p class="dashboard-left__user-box-infos--filial">
            {{ $auth.user.localidade_filial }}
          </p>
        </div>
      </div>

      <div class="dashboard-left__feedback-semanal dashboard-left__box">
        <h3 class="dashboard-left__box--title">
          Nos diga como foi a sua semana
        </h3>
        <div class="dashboard-left__box-content">
          <a-button type="secondary" class="btn-secondary">
            Enviar feedback
          </a-button>
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
              <p class="dashboard-right__item-content">
                Gráfico de meta da equipe
              </p>
            </div>
          </div>
          <div class="dashboard-right__item">
            <h3 class="dashboard-right__item-title">
              Suas metas batidas
            </h3>
            <div class="dashboard-right__item-content">
              <p class="dashboard-right__item-content">
                Gráfico das suas metas
              </p>
            </div>
          </div>
        </div>

        <div class="dashboard-right__metas-desempenho">
          <div class="dashboard-right__item">
            <h3 class="dashboard-right__item-title">
              Seu desempenho mensal
            </h3>
            <div class="dashboard-right__item-content">
              <p class="dashboard-right__item-content">
                Gráfico de meta mensais
              </p>
            </div>
          </div>
        </div>
      </div>

      <!-- INICIO EQUIPES -->
      <div class="dashboard-right__equipe dashboard-right__section">
        <h3 class="dashboard-right__section--title">
          Sua equipe
        </h3>

        <div class="dashboard-right__item-content">
          <p class="dashboard-right__item-content">
            Sua equipe
          </p>
        </div>
      </div>
      <!-- FIM EQUIPES -->

      <!-- INICIO FEEDBACKS -->
      <div class="dashboard-right__feedbacks dashboard-right__section">
        <h3 class="dashboard-right__section--title">
          Feedbacks recebidos
        </h3>

        <div class="dashboard-right__item-content">
          <p class="dashboard-right__item-content">
            Seus feedbacks
          </p>
        </div>
      </div>
      {{ $auth.user }}
    </section>
  </div>
</template>

<script>
export default {
  layout: 'logged',
  middleware: 'auth'
}
</script>

<style lang="scss" scoped>
.dashboard{
  display: flex;
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
</style>
