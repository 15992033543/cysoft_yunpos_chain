import config from '../../config'

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

export function getFirstDate (format = 'yyyy-MM-dd') {
  const date = new Date()
  date.setDate(1)
  date.setHours(0)
  date.setMinutes(0)
  date.setSeconds(0)
  return date.format(format)
}

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

export function getNowDate (format = 'yyyy-MM-dd') {
  return new Date().format(format)
}

const getType = obj => {
  const toString = Object.prototype.toString
  const map = {
    '[object Boolean]': 'boolean',
    '[object Number]': 'number',
    '[object String]': 'string',
    '[object Function]': 'function',
    '[object Array]': 'array',
    '[object Date]': 'date',
    '[object RegExp]': 'regExp',
    '[object Undefined]': 'undefined',
    '[object Null]': 'null',
    '[object Object]': 'object'
  }
  if (obj instanceof Element) {
    return 'element'
  }
  return map[ toString.call(obj) ]
}

export function deepClone (data) {
  const type = getType(data)
  let obj
  if (type === 'array') {
    obj = []
  } else if (type === 'object') {
    obj = {}
  } else {
    return data
  }
  if (type === 'array') {
    for (let i = 0, len = data.length; i < len; i++) {
      obj.push(deepClone(data[i]))
    }
  } else if (type === 'object') {
    for (let key in data) {
      obj[key] = deepClone(data[key])
    }
  }
  return obj
}

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

export function accAdd (num1, num2) {
  const o = numHandler(num1, num2)
  return (o.n1 + o.n2) / Math.pow(10, Math.max(o.l1, o.l2))
}

export function accSub (num1, num2) {
  const o = numHandler(num1, num2)
  return (o.n1 - o.n2) / Math.pow(10, Math.max(o.l1, o.l2))
}

export function accMul (num1, num2) {
  let n1, n2, l1, l2
  try { l1 = num1.toString().split('.')[1].length } catch (error) { l1 = 0 }
  try { l2 = num2.toString().split('.')[1].length } catch (error) { l2 = 0 }
  n1 = Number(num1.toString().replace('.', ''))
  n2 = Number(num2.toString().replace('.', ''))
  return (n1 * n2) / Math.pow(10, Math.max(l1 + l2))
}

export function accDiv (num1, num2) {
  const o = numHandler(num1, num2)
  return o.n1 / o.n2
}

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

export function getLocalPageSize () {
  return Number(window.localStorage.getItem('pageSize')) || 10
}

export function exportFile (url, data) {
  const exportUrl = process.env.NODE_ENV === 'development' ? `${config.dev.proxyTable['/api'].target}${url}` : url
  const app = document.getElementById('app')
  const form = document.createElement('form')
  form.setAttribute('action', exportUrl)
  form.setAttribute('method', 'POST')
  form.setAttribute('target', '_blank')
  const keys = Object.keys(data)
  keys.forEach(e => {
    const input = document.createElement('input')
    input.setAttribute('type', 'hidden')
    input.setAttribute('name', e)
    input.setAttribute('value', data[e])
    form.appendChild(input)
  })
  app.appendChild(form)
  form.submit()
  app.removeChild(form)
}

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

export function dateTransformer (value, format = 'yyyy-MM-dd') {
  if (!value) return ''
  const reg = /[^\d-]]*/g
  const date = parseInt(value.replace(reg, ''))
  return new Date(date).format(format)
}
