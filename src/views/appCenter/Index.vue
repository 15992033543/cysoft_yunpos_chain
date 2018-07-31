<template>
  <div class="app-center">
    <div class="app-item" v-for="(item, index) in appList" :key="index" @click="enter(item)">
      <img class="icon" :src="item.icon" alt="item.name">
      <p class="name">{{ item.name }}</p>
    </div>
  </div>
</template>

<script>
import dhyImg from '@/assets/img/dhy.png'
import messageImg from '@/assets/img/message.png'
import lbcxImg from '@/assets/img/lbcx.png'
import mallImg from '@/assets/img/mall.png'
import shopImg from '@/assets/img/shop.png'

export default {
  name: 'AppCenter',

  data () {
    return {
      appList: [
        { name: '订货易', icon: dhyImg, link: 'http://www.baidu.com' },
        { name: '短信服务', icon: messageImg, router: '' },
        { name: '老板查询', icon: lbcxImg, router: '' },
        { name: '微商城', icon: mallImg, router: '' },
        { name: '无人便利店', icon: shopImg, router: '' }
      ]
    }
  },

  methods: {
    enter (item) {
      if (item.link) {
        window.open(item.link)
        return
      }
      if (item.router) {
      }
    }
  }
}
</script>

<style lang="scss">
  .app-center {
    .app-item {
      display: inline-block;
      text-align: center;
      margin: 0 20px;
      cursor: pointer;
      .icon {
        width: 65px;
        height: 65px;
      }
      .name {
        padding: 5px;
        color: #000;
        font-weight: 600;
      }
    }
  }
</style>
