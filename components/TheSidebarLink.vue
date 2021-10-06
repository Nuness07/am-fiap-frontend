<template>
  <nuxt-link v-wave class="sidebar__link f-body-2" :to="slug">
    <div class="svg">
      <slot />
    </div>
    <span>{{ text }}</span>
  </nuxt-link>
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: 'Input Text'
    },
    slug: {
      type: String,
      default: '/'
    }
  },
  methods: {}
}
</script>

<style lang="scss" scoped>
.sidebar__link {
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 36px 0;
  transition: all 0.4s;
  background: $primary-color;
  color: $secondary-color;

  .svg {
    width: 24px;
    height: 24px;
    margin-bottom: 22px;
    z-index: 1;
    pointer-events: none;
  }

  &::before {
    content: '';
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
    transition: all 0.3s;
    z-index: 0;
  }

  &::after {
    content: '';
    width: 59px;
    height: 1px;
    background: $background-gray;
    position: absolute;
    left: 50%;
    bottom: 0;
    transform: translateX(-50%);
    transition: all 0.3s;
  }

  &.nuxt-link-exact-active,
  &:hover {
    color: #fff;

    .svg {
      /* color: $primary-regular; */
    }

    &::before {
      background: rgba($color: $primary-color, $alpha: 1);
    }

    &::after {
      /* background: $primary-regular; */
      height: 3px;
    }
  }

  span {
    pointer-events: none;
    z-index: 1;
  }

  @media (max-width: 1024px) {
    justify-content: center;
    width: 100%;
    height: 80px;
    padding: 0;

    &::after {
      display: none;
    }

    &.nuxt-link-exact-active,
    &:hover {
      span {
        display: flex;
      }
    }

    .svg {
      margin-bottom: 8px;
    }

    span {
      display: none;
      /* @include pixel-to-rem(12); */
    }
  }
}
</style>
