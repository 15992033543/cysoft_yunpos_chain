import { batchSetState } from '@/common'
let option = window.localStorage.getItem('sysOption')

try {
  option = JSON.parse(option)
} catch (err) {
  option = {
    clientUrl: '', // 收银端下载地址
    serviceUrl: '', // 购买服务地址
    priceNum: 2, // 单价小数位
    moneyNum: 2, // 金额小数位
    amountNum: 2, // 数量小数位
    rebateNum: 2, // 折扣小数位
    noticeId: '' // 通知的id，如果有，进入首页后弹出通知，如没有，跳到新手引导页面
  }
}

const sysOption = {
  state: option,

  mutations: {
    setSysOption (state, option) {
      batchSetState(state, option)
      window.localStorage.setItem('sysOption', JSON.stringify(state))
    }
  }
}

export default sysOption
