<template>
  <div style="height: 100%; min-width: 1024px">
    <sidebar/>
    <div class="main-container">
      <div class="header">
        <navbar/>
        <toolbar/>
      </div>
      <app-main/>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar'
import Navbar from './components/Navbar'
import Toolbar from './components/Toolbar'
import AppMain from './components/AppMain'
import { getQuery } from '@/common'

export default {
  name: 'Layout',

  components: {
    Sidebar,
    Navbar,
    Toolbar,
    AppMain
  },

  created () {
    document.addEventListener('keydown', this.refreshThisPage)
  },

  beforeDestroy () {
    document.removeEventListener('keydown', this.refreshThisPage)
  },

  beforeRouteEnter (to, from, next) {
    const token = getQuery('token')
    if (token) {
      location.href = `http://${location.host}/#/home`
    } else {
      next()
    }
  },

  methods: {
    refreshThisPage (event) {
      // 使用F5刷新本页，阻止系统的F5事件
      if (event.keyCode === 116) {
        this.$appPush({ name: 'Refresh', params: { options: this.$store.state.tag.active } })
        event.preventDefault()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
  .main-container {
    overflow: hidden;
    height: 100%;
    position: relative;

    .header {
      position: relative;
      height: 50px;
      box-shadow: 0 2px 6px 0 rgba(0,0,0,.1);
    }
  }
</style>
