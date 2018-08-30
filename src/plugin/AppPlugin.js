import {
  dateFormat,
  getFirstDate,
  getLastDate,
  getNowDate,
  deepClone,
  accAdd,
  accSub,
  accMul,
  accDiv,
  accRound,
  dateToWeek,
  getLocalPageSize,
  exportFile,
  recursionDataHandler,
  dateTransformer,
  phoneReg,
  passwordReg,
  toFormData
} from '@/common'

const AppPlugin = {
  install (Vue) {
    window.Date.prototype.format = dateFormat
    Vue.prototype.$getFirstDate = getFirstDate
    Vue.prototype.$getLastDate = getLastDate
    Vue.prototype.$getNowDate = getNowDate
    Vue.prototype.$deepClone = deepClone
    Vue.prototype.$accAdd = accAdd
    Vue.prototype.$accSub = accSub
    Vue.prototype.$accMul = accMul
    Vue.prototype.$accDiv = accDiv
    Vue.prototype.$accRound = accRound
    Vue.prototype.$dateToWeek = dateToWeek
    Vue.prototype.$getLocalPageSize = getLocalPageSize
    Vue.prototype.$exportFile = exportFile
    Vue.prototype.$recursionDataHandler = recursionDataHandler
    Vue.prototype.$dateTransformer = dateTransformer
    Vue.prototype.$phoneReg = phoneReg
    Vue.prototype.$passwordReg = passwordReg
    Vue.prototype.$toFormData = toFormData
  }
}

export default AppPlugin
