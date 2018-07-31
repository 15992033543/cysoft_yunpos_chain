import { api, apiAuth } from '@/api'

const ApiPlugin = {
  install (Vue) {
    Vue.prototype.$http = api
    Vue.prototype.$httpAuth = apiAuth
  }
}

export default ApiPlugin
