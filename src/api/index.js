import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import store from '@/store'
import { logout } from '@/common'

const baseURL = process.env.NODE_ENV === 'development' ? '/api' : ''
const timeout = 60000

const instance = axios.create({ baseURL, timeout })

let flag = false

instance.interceptors.response.use(response => {
  const data = response.data
  if (data.Level === 99 && !flag) {
    flag = true
    MessageBox.alert('<span style="color: red">您未登录或者登录时效已过期！请重新登录！</span>', '温馨提示', {
      dangerouslyUseHTMLString: true,
      confirmButtonText: '确定',
      showClose: false,
      callback: action => {
        flag = false
        logout(data.Data.redirect_url)
      }
    })
  }
  return response
}, error => {
  const code = error.response.status
  switch (code) {
    case 504:
      Message.error('服务器发生故障，请稍后重试！')
      break

    case 404:
      Message.error('请求的地址不存在，请联系客服！')
      break

    default:
      Message.error('出现未知错误，请稍后重试！')
  }
  return Promise.reject(error)
})

// 需要登录权限的请求
export function apiAuth (options) {
  options.headers = options.headers || {}
  options.headers.token = store.state.user.token
  return instance(options).then(res => res.data)
}

// 不需要登录权限的请求
export function api (options) {
  return instance(options).then(res => res.data)
}
