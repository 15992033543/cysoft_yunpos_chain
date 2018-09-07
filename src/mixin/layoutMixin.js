import { api as http, apiAuth as httpAuth } from '@/api'
import routes from '@/router'
import store from '@/store'
import { Loading } from 'element-ui'

// 根据权限名获取router的name，用于跳转
const getRouter = data => {
  let name = ''
  const layout = routes.find(e => e.name === 'Layout')
  if (data) {
    const target = layout.children.find(e => {
      const permission = e.meta ? e.meta.permission : null
      return permission === `${data.ControllerName}/${data.ActionName}`
    })
    name = target ? target.name : ''
  }
  return name
}

// 获取列中菜单的个数
const getColumnCount = column => {
  let count = 0
  column.forEach(e => {
    count += e.children.length
  })
  return count
}

// 获取菜单数小于6个的列
const getColumn = data => {
  const column = data.find(c => {
    return getColumnCount(c) < 6
  })
  return column
}

// 设置子菜单
const getMenuChildren = data => {
  const children = []
  const tagNames = Array.from(new Set(data.map(e => e.TagName)))
  tagNames.forEach(name => {
    const m = {}
    m.groupName = name || (tagNames.length > 1 ? '其它' : '')
    m.children = data.filter(e => name === e.TagName).map(e => {
      return {
        name: e.Name,
        router: getRouter(e)
      }
    })
    const column = getColumn(children)
    if (column) {
      if (getColumnCount(column) + m.children.length < 10) {
        column.push(m)
      } else {
        children.push([ m ])
      }
    } else {
      children.push([ m ])
    }
  })
  return children
}

// 菜单处理程序
const menuHandler = data => {
  let menu = []
  if (Array.isArray(data)) {
    data.forEach(e => {
      const m = {}
      const children = e.Items
      if (Array.isArray(children)) {
        m.name = e.Name
        m.iconClass = e.Icon
        const firstChild = children[0]
        // 当只有一个二级菜单并且这个二级菜单的名字等于一级菜单的名字时，代表这个菜单没有子菜单（比如应用中心）
        if (children.length === 1 && firstChild.Name === e.Name) {
          m.router = getRouter(firstChild)
        } else {
          // 设置子菜单
          m.children = getMenuChildren(children)
        }
      }
      menu.push(m)
    })
  }
  return menu
}

// 获取用户信息
const getUserInfo = data => {
  const info = data.loginInfo
  let customerService = info.customerservice
  try {
    customerService = JSON.parse(customerService)
  } catch (err) {
    customerService = {}
  }
  return {
    name: info.name,
    customerService: customerService,
    dateDue: data.dateDue,
    isShopMaster: data.isShopMaster,
    shopId: info.id_shop
  }
}

// 获取系统选项
const getSysOption = data => {
  const digit = data.digitHashtable
  return {
    clientUrl: data.urlSoftDown,
    serviceUrl: data.urlBuyService,
    priceNum: digit.dj_digit,
    moneyNum: digit.je_digit,
    amountNum: digit.sl_digit,
    rebateNum: digit.zk_digit,
    noticeId: data.idNotice
  }
}

// 将主要信息保存至store
const saveStore = data => {
  const menuList = menuHandler(data.listMenu)
  const permissionList = data.listPermission
  const userInfo = getUserInfo(data)
  const sysOption = getSysOption(data)
  store.commit('setMenuList', menuList)
  store.commit('setPermissionList', permissionList)
  store.commit('setUser', userInfo)
  store.commit('setSysOption', sysOption)
}

// 根据密钥获取真正的token
const fetchApiToken = token => {
  return http({
    url: '/account/getAPIToken',
    method: 'post',
    data: { token }
  }).then(res => {
    if (res.Level === 10) {
      // 保存token到store，并保存至本地
      store.commit('setUser', { token: res.Data })
    } else {
      return Promise.reject(res)
    }
  })
}

// 获取系统初始化数据
const fetchInitData = () => {
  const loading = Loading.service({
    lock: true,
    text: '数据初始化中，请稍后',
    fullscreen: true,
    background: 'rgb(255, 255, 255)'
  })
  return httpAuth({
    url: '/account/getInitData',
    method: 'post'
  }).then(res => {
    if (res.Success) {
      saveStore(res.Data)
      // 跳转到首页
      window.location.href = `${window.location.origin}/#/home`
    }
    loading.close()
  })
}

const layoutMixin = {
  beforeRouteEnter (to, from, next) {
    const token = to.query.token
    // 如果没有密钥，直接进入
    if (!token) {
      next()
    } else { // 有密钥，用密钥去获取真正的token，实现单点登录
      fetchApiToken(token).then(fetchInitData)
    }
  }
}

export default layoutMixin
