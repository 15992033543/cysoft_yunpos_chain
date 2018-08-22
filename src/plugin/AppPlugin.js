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
  getQuery
} from '@/common'

const AppPlugin = {
  install (Vue) {
    // date格式化
    window.Date.prototype.format = dateFormat
    // 获取当月第一天
    Vue.prototype.$getFirstDate = getFirstDate
    // 获取当月最后一天
    Vue.prototype.$getLastDate = getLastDate
    // 获取当前日期
    Vue.prototype.$getNowDate = getNowDate
    // 深拷贝对象
    Vue.prototype.$deepClone = deepClone
    // 加
    Vue.prototype.$accAdd = accAdd
    // 减
    Vue.prototype.$accSub = accSub
    // 乘
    Vue.prototype.$accMul = accMul
    // 除
    Vue.prototype.$accDiv = accDiv
    // 四舍五入
    Vue.prototype.$accRound = accRound
    // 日期转礼拜
    Vue.prototype.$dateToWeek = dateToWeek
    // 获取保存在本地的pageSize
    Vue.prototype.$getLocalPageSize = getLocalPageSize
    // 统一的导出方法
    Vue.prototype.$exportFile = exportFile
    // 递归数据处理程序
    Vue.prototype.$recursionDataHandler = recursionDataHandler
    // \/Date(1531670400000)\/日期格式转换器
    Vue.prototype.$dateTransformer = dateTransformer
    // 获取url查询参数
    Vue.prototype.$getQuery = getQuery
  }
}

export default AppPlugin
