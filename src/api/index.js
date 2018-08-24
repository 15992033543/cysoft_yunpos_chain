import axios from 'axios'
// import App from '@/main'

const baseURL = process.env.NODE_ENV === 'development' ? '/api' : ''
const timeout = 60000

const instance = axios.create({ baseURL, timeout })

instance.interceptors.response.use(response => {
  // App.$msgbox({
  //   title: '温馨提示',
  //   message: App.$createElement('p', { style: 'color: red' }, '您未登录或者登录时效已过期！请重新登录！'),
  //   showClose: false,
  //   confirmButtonText: '确定',
  //   closeOnClickModal: false,
  //   closeOnPressEscape: false,
  //   callback: () => {
  //     App.$router.push('/login')
  //   }
  // })
  return response
}, error => {
  return Promise.reject(error)
})

// 需要登录权限的请求
export function apiAuth (options) {
  options.headers = options.headers || {}
  options.headers.token = ''
  return instance(options).then(res => res.data)
}

// 不需要登录权限的请求
export function api (options) {
  return instance(options).then(res => res.data)
}
