import axios from 'axios'
import { MessageBox } from 'element-ui'

const baseURL = process.env.NODE_ENV === 'development' ? '/api' : ''
const timeout = 60000

const instance = axios.create({ baseURL, timeout })

let flag = false

instance.interceptors.response.use(response => {
  if (response.data.Data.level === 11 && !flag) {
    flag = true
    MessageBox.alert('<span style="color: red">您未登录或者登录时效已过期！请重新登录！</span>', '温馨提示', {
      dangerouslyUseHTMLString: true,
      confirmButtonText: '确定',
      showClose: false,
      callback: action => {
        flag = false
      }
    })
  }
  return response
}, error => {
  return Promise.reject(error)
})

// 需要登录权限的请求
export function apiAuth (options) {
  options.headers = options.headers || {}
  options.headers.token = window.localStorage.getItem('userApiToken')
  return instance(options).then(res => res.data)
}

// 不需要登录权限的请求
export function api (options) {
  return instance(options).then(res => res.data)
}
