import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import keepAlive from './modules/keepAlive'
import tag from './modules/tag'
import permissionList from './modules/permissionList'
import menuList from './modules/menuList'
import sysOption from './modules/sysOption'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    keepAlive,
    tag,
    permissionList,
    menuList,
    sysOption
  }
})

export default store
