import config from '../../config'
import store from '@/store'
import { api as http } from '@/api'
import jsonp from 'jsonp'

// 手机正则
export const phoneReg = /^1[0-9]{10}$/

// 密码正则
export const passwordReg = /^[0-9A-Za-z_]{6,20}$/

// 获取参数的类型
const getType = arg => Object.prototype.toString.call(arg)

// 判断一个参数是否为Object
export function isObject (arg) {
  return getType(arg).indexOf('Object') !== -1
}

export function isArray (arg) {
  return getType(arg).indexOf('Array') !== -1
}

// 日期转换器
export function dateFormat (fmt) {
  const o = {
    'M+': this.getMonth() + 1,
    'd+': this.getDate(),
    'h+': this.getHours(),
    'm+': this.getMinutes(),
    's+': this.getSeconds(),
    'q+': Math.floor((this.getMonth() + 3) / 3),
    'S': this.getMilliseconds()
  }
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + '').substr(4 - RegExp.$1.length))
  }
  for (let k in o) {
    if (new RegExp('(' + k + ')').test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
    }
  }
  return fmt
}

// 获取当月第一天
export function getFirstDate (format = 'yyyy-MM-dd') {
  const date = new Date()
  date.setDate(1)
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  return date.format(format)
}

// 获取当月最后一天
export function getLastDate (format = 'yyyy-MM-dd') {
  const date = new Date()
  date.setMonth(date.getMonth() + 1)
  date.setDate(1)
  date.setDate(date.getDate() - 1)
  date.setHours(23)
  date.setMinutes(59)
  date.setSeconds(59)
  return date.format(format)
}

// 获取当前日期
export function getNowDate (format = 'yyyy-MM-dd') {
  return new Date().format(format)
}

// 深拷贝一个对象
export function deepClone (data) {
  let obj
  if (isArray(data)) {
    obj = []
  } else if (isObject(data)) {
    obj = {}
  } else {
    return data
  }
  if (isArray(data)) {
    for (let i = 0, len = data.length; i < len; i++) {
      obj.push(deepClone(data[i]))
    }
  } else if (isObject(data)) {
    for (let key in data) {
      obj[key] = deepClone(data[key])
    }
  }
  return obj
}

// 运算处理程序
const numHandler = function (num1, num2) {
  let n1, n2, l1, l2
  try { l1 = num1.toString().split('.')[1].length } catch (error) { l1 = 0 }
  try { l2 = num2.toString().split('.')[1].length } catch (error) { l2 = 0 }
  const differ = l1 - l2
  n1 = Number(num1.toString().replace('.', ''))
  n2 = Number(num2.toString().replace('.', ''))
  n1 = differ > 0 ? n1 : n1 * Math.pow(10, Math.abs(differ))
  n2 = differ < 0 ? n2 : n2 * Math.pow(10, Math.abs(differ))
  return { n1: n1, n2: n2, l1: l1, l2: l2 }
}

// 加法运算
export function accAdd (num1, num2) {
  const o = numHandler(num1, num2)
  return (o.n1 + o.n2) / Math.pow(10, Math.max(o.l1, o.l2))
}

// 减法运算
export function accSub (num1, num2) {
  const o = numHandler(num1, num2)
  return (o.n1 - o.n2) / Math.pow(10, Math.max(o.l1, o.l2))
}

// 乘法运算
export function accMul (num1, num2) {
  let n1, n2, l1, l2
  try { l1 = num1.toString().split('.')[1].length } catch (error) { l1 = 0 }
  try { l2 = num2.toString().split('.')[1].length } catch (error) { l2 = 0 }
  n1 = Number(num1.toString().replace('.', ''))
  n2 = Number(num2.toString().replace('.', ''))
  return (n1 * n2) / Math.pow(10, Math.max(l1 + l2))
}

// 除法运算
export function accDiv (num1, num2) {
  const o = numHandler(num1, num2)
  return o.n1 / o.n2
}

// 四舍五入
export function accRound (value, num) {
  if (value === null || isNaN(value) || value.toString().trim() === '') {
    console.info('the parameter is not a number!')
    return ''
  }
  num = isNaN(num) ? 2 : Number(num)
  if (num < 0) {
    console.info('the num can not be less than 0!')
    return value
  }
  let left, right, n1, n2
  const data = value.toString().split('.')
  left = data[0]
  right = data[1]
  if (right) {
    n1 = right.substring(0, num)
    n2 = right.substring(num, num + 1)
    if (n2 && Number(n2) >= 5) {
      const length = n1.length
      const newLength = (Number(n1) + 1).toString().length
      if (newLength > length) {
        const sign = Number(value) < 0 ? '-' : ''
        left = sign + (Math.abs(Number(left)) + 1)
        n1 = new Array(num + 1).join('0')
      } else {
        n1 = new Array(length - newLength + 1).join('0') + (Number(n1) + 1)
      }
    } else {
      n1 += new Array(num - n1.length + 1).join('0')
    }
  } else {
    n1 = new Array(num + 1).join('0')
  }
  return num > 0 ? left + '.' + n1 : left
}

// 日期转星期
export function dateToWeek (date) {
  if (!date) return ''
  let d
  try {
    d = new Date(date)
  } catch (error) {
    return ''
  }
  const weeks = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
  const day = d.getDay()
  return weeks[day]
}

// 获取保存到本地的pageSize
export function getLocalPageSize () {
  return Number(window.localStorage.getItem('pageSize')) || 10
}

// 统一的导出方法
export function exportFile (url, data) {
  const exportUrl = process.env.NODE_ENV === 'development' ? `${config.dev.proxyTable['/api'].target}${url}` : url
  const app = document.getElementById('app')
  const form = document.createElement('form')
  form.setAttribute('action', exportUrl)
  form.setAttribute('method', 'POST')
  form.setAttribute('target', '_blank')
  const keys = Object.keys(data)
  const length = keys.length
  for (let i = 0; i <= length; i++) {
    const input = document.createElement('input')
    input.setAttribute('type', 'hidden')
    if (i !== length) {
      const key = keys[i]
      input.setAttribute('name', key)
      input.setAttribute('value', data[key])
    } else {
      input.setAttribute('name', 'token')
      input.setAttribute('value', store.state.user.token)
    }
    form.appendChild(input)
  }
  app.appendChild(form)
  form.submit()
  app.removeChild(form)
}

// 递归处理器
const recursionDataTrans = (o, k) => {
  const arr = []
  const data = o[k]
  if (Array.isArray(data)) {
    data.forEach(e => {
      const children = recursionDataTrans(o, e.id)
      children.length > 0 && (e.children = children)
      arr.push(e)
    })
  }
  return arr
}

// 递归数据处理程序
export function recursionDataHandler (data, topLevel = '#') {
  if (!Array.isArray(data)) return null
  const o = {}
  data.forEach(e => {
    const k = e.parent
    if (!o[k]) {
      o[k] = []
    }
    o[k].push(e)
  })
  return recursionDataTrans(o, topLevel)
}

// \/Date(1531670400000)\/日期格式转换器
export function dateTransformer (value, format = 'yyyy-MM-dd') {
  if (!value) return ''
  const reg = /[^\d-]*/g
  const date = parseInt(value.replace(reg, ''))
  return new Date(date).format(format)
}

// data转FormData
export function toFormData (data) {
  if (!isObject(data)) {
    console.info('the parameter is not a object!')
    return null
  }
  const fd = new FormData()
  const keys = Object.keys(data)
  keys.forEach(k => {
    fd.append(k, data[k])
  })
  return fd
}

// 批量设置state的值
export function batchSetState (state, data) {
  if (!isObject(data)) {
    console.info('the parameter is not a object!')
    return
  }
  const keys = Object.keys(data)
  keys.forEach(k => {
    if (data[k] !== null || data[k] !== undefined) {
      state[k] = data[k]
    }
  })
}

// 注销
export function logout () {
  http({
    url: '/account/logout',
    method: 'post'
  }).then(res => {
    if (res.Success) {
      jsonp('http://192.168.1.140:8012/Account/Logout')
      store.commit('clearUser')
      store.commit('clearTag')
      store.commit('clearKeepAlive')
      const url = process.env.NODE_ENV === 'development' ? `${location.origin}` : `${res.Data.redirect_url}`
      window.location.href = url
    }
  })
}
