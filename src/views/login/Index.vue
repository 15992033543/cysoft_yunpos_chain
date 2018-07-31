<template>
  <div class="bg">
    <div class="center">
      <img class="logo" :src="logoImg">
      <div class="content">
        <login/>
      </div>
    </div>
  </div>
</template>

<script>
import logoImg from '@/assets/img/login-logo.png'

import Login from './components/Login'

export default {
  name: 'LoginIndex',

  components: {
    Login
  },

  data () {
    return {
      logoImg: logoImg
    }
  }
}
</script>

<style lang="scss" scoped>
  .bg {
    background: url('../../assets/img/login_bg.jpg') repeat-x top center;
    width: 100%;
    height: 100%;
    min-height: 947px;

    .center {
      width: 450px;
      margin: 0 auto;
      position: relative;
      top: 80px;

      .logo {
        width: 100%;
        margin-bottom: 40px;
      }

      .content {
        background-color: white;
        width: 100%;
        box-sizing: border-box;
        padding: 20px 30px;
      }
    }
  }
</style>
