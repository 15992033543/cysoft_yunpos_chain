// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import ElementUI from 'element-ui'
import RouterPlugin from './plugin/RouterPlugin'
import ApiPlugin from './plugin/ApiPlugin'
import AppPlugin from './plugin/AppPlugin'
import 'element-ui/lib/theme-chalk/index.css'
import 'font-awesome/css/font-awesome.css'
import 'ag-grid/dist/styles/ag-grid.css'
import 'ag-grid/dist/styles/ag-theme-balham.css'
import './assets/scss/app.scss'
import './assets/scss/overwrite.scss'

// import 'babel-polyfill' // 兼容ie

Vue.config.productionTip = false

Vue.use(ElementUI, { size: 'small' })
Vue.use(RouterPlugin)
Vue.use(ApiPlugin)
Vue.use(AppPlugin)

/* eslint-disable no-new */
export default new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
