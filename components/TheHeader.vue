<template>
  <header class="header">
    <img src="@/assets/img/logo-ey.svg" alt="logo" width="33px">
  </header>
</template>

<script>
export default {
  name: 'TheHeader'
}
</script>

<style lang="scss" scoped>
  .header{
    background: $primary-color;
    height: 80px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
</style>
