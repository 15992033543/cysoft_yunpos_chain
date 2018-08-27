import { api as http, apiAuth as httpAuth } from '@/api'
import { MessageBox } from 'element-ui'

const saveLocalInfo = data => {
  console.log(data)
}

// 根据密钥获取token
const fetchApiToken = token => {
  return http({
    url: '/account/getAPIToken',
    method: 'post',
    data: { token }
  }).then(res => {
    if (res.Level === 0) {
      // 保存token到本地
      window.localStorage.setItem('userApiToken', res.Data)
    }
    if (res.Data.level === 11) {
      return Promise.reject(res)
    }
  })
}

// 获取系统初始化数据
const fetchInitData = () => {
  return httpAuth({
    url: '/account/getInitData',
    method: 'post'
  }).then(res => {
    if (res.Success) {
      // const menuAuth = res.Data.listMenu ? JSON.stringify(res.Data.listMenu) : null
      // window.localStorage.setItem('menuAuth', menuAuth)
      saveLocalInfo(res)
      // location.href = `http://${location.host}/#/home`
    } else {
      return Promise.reject(res)
    }
  })
}

const errorHandler = err => {
  MessageBox.alert(`<span style="color: red">${err.Message}</span>`, '温馨提示', {
    dangerouslyUseHTMLString: true,
    confirmButtonText: '确定',
    showClose: false,
    callback: action => {
      location.href = err.redirect_url
    }
  })
}

const layoutMixin = {
  beforeRouteEnter (to, from, next) {
    const token = to.query.token
    // 如果没有token，直接进入系统首页
    if (!token) {
      next()
      return
    }
    fetchApiToken(token).then(fetchInitData)
  }
}

export default layoutMixin
