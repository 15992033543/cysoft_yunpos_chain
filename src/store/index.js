import Vue from 'vue'
import Vuex from 'vuex'
import user from './modules/user'
import keepAlive from './modules/keepAlive'
import tag from './modules/tag'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user,
    keepAlive,
    tag
  }
})

export default store
