<template>
  <a-layout-sider
    @scroll.native="handleScroll"
  >
    <a-menu theme="dark" mode="inline" :default-selected-keys="[activeItem]">
      <a-menu-item key="1" :style="{ padding: '0' }">
        <the-sidebar-link text="Inicio" slug="/dashboard">
          <OutlineHomeIcon />
        </the-sidebar-link>
      </a-menu-item>
      <a-menu-item key="2" :style="{ padding: '0' }">
        <the-sidebar-link text="Feedbacks" slug="/feedbacks">
          <OutlineChatAlt2Icon />
        </the-sidebar-link>
      </a-menu-item>
      <a-menu-item v-if="$auth.user.is_gerente" key="3" :style="{ padding: '0' }">
        <the-sidebar-link text="Equipe" slug="/equipe">
          <OutlineUserGroupIcon />
        </the-sidebar-link>
      </a-menu-item>
      <a-menu-item v-if="$auth.user.is_gerente" key="4" :style="{ padding: '0' }">
        <the-sidebar-link text="Filtros" slug="/filtros">
          <OutlineAdjustmentsIcon />
        </the-sidebar-link>
      </a-menu-item>
    </a-menu>
  </a-layout-sider>
</template>

<script>
import NuxtSSRScreenSize from 'nuxt-ssr-screen-size'

export default {
  mixins: [NuxtSSRScreenSize.NuxtSSRScreenSizeMixin],
  data () {
    return {
      data: '1',
      startY: 0
    }
  },
  computed: {
    activeItem () {
      return this.data
    }
  },
  created () {
    if (this.$route.path === '/dashboard') {
      this.data = '1'
    } else if (this.$route.path === '/feedbacks') {
      this.data = '2'
    } else if (this.$route.path === '/equipe') {
      this.data = '3'
    } else if (this.$route.path === '/filtros') {
      this.data = '4'
    }
  },
  mounted () {
    window.addEventListener('scroll', this.handleScroll)
  },
  destroyed () {
    window.removeEventListener('scroll', this.handleScroll)
  },
  methods: {
    handleScroll () {
      if (this.$vssWidth <= 1024) {
        const scrollY = window.scrollY

        scrollY > this.startY
          ? this.$store.commit('SET_POSITION_HEADER', 'not-visible')
          : this.$store.commit('SET_POSITION_HEADER', '')
        this.startY = scrollY
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.ant-layout-sider::v-deep {
  overflow: auto;
  height: 100vh;
  position: fixed;
  left: 0;
  max-width: 186px !important;
  min-width: 186px !important;
  width: 186px !important;
  z-index: 5;

  .ant-layout-sider-children {
    background: $primary-color;
  }

  @media (max-width: 1024px) {
    overflow: hidden;
    display: flex;
    flex-direction: row;
    position: fixed;
    top: initial;
    bottom: 0;
    max-width: 100% !important;
    min-width: 100% !important;
    width: 100% !important;
    height: 80px;

    .ant-layout-sider-children {
      width: 100%;
    }

    .logo {
      display: none;
    }

    &.not-visible {
      transform: translateY(80px);
      opacity: 0;
    }
  }
}

.ant-menu::v-deep {
  .ant-menu-item {
    height: initial;
    margin-top: 0;
    margin-bottom: 0;
    line-height: initial;
  }

  @media (max-width: 1024px) {
    display: flex;
    // width: 100%;
    // flex-direction: column;

    .ant-menu-item {
      width: calc(100% / 3 - 20px);
      transition: all 0.3s;

      &.ant-menu-item-selected,
      &:hover {
        width: calc(100% / 2 + 20px);
      }
    }

    // .sidebar__links {
    //   width: 100%;
    //   display: flex;
    //   justify-content: flex-start;
    // }
  }

  @media (max-width: 400px) {
    .ant-menu-item {
      width: calc(100% / 4 - 20px);

      &.ant-menu-item-selected,
      &:hover {
        width: 50%;
      }
    }
  }
}
</style>
