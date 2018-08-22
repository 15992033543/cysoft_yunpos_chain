<template>
  <div class="bg">
    <div style="position: relative; top: 50px">
      <div class="logo-container">
        <img :src="logoImg">
      </div>
      <slot></slot>
    </div>
  </div>
</template>

<script>
import logoImg from '@/assets/img/login-logo.png'

export default {
  name: 'AccountShared',

  data () {
    return {
      logoImg: logoImg
    }
  }
}
</script>

<style lang="scss" scoped>
  .bg {
    background: url('~@/assets/img/login_bg.jpg') repeat-x top center;
    width: 100%;
    height: 100%;
    min-height: 947px;

    .logo-container {
      width: 450px;
      margin: 0 auto;
      margin-bottom: 30px;
    }
  }
</style>
