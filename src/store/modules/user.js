import { batchSetState } from '@/common'

let userInfo = window.localStorage.getItem('userInfo')

const saveToLoacal = data => {
  data && window.localStorage.setItem('userInfo', JSON.stringify(data))
}

try {
  userInfo = JSON.parse(userInfo)
} catch (err) {
  userInfo = {
    token: '', // 访问接口的token
    name: '', // 用户账号名
    customerService: null, // 客户专属服务（联系方式）
    dateDue: '', // 服务到期日期
    isShopMaster: false, // 是否为主门店
    shopId: '' // 门店id
  }
}

const user = {
  state: userInfo,

  mutations: {
    setUser (state, user) {
      batchSetState(state, user)
      saveToLoacal(state)
    },

    clearUser (state) {
      saveToLoacal({})
    }
  }
}

export default user
