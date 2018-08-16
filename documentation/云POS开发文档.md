# 云POS开发文档

## 项目技术

* 主体框架：[vue](https://cn.vuejs.org/)
* 路由：[vue-router](https://router.vuejs.org/zh/)
* 状态机制：[vuex](https://vuex.vuejs.org/zh/)
* 网络请求框架：[axios](https://www.npmjs.com/package/axios)
* UI框架：[element](http://element-cn.eleme.io/#/zh-CN/component/installation)
* table表格：[ag-grid-vue](https://www.ag-grid.com/)
* 图标库：[fontawesome](https://fontawesome.com/?from=io)
* 图表库：[ECharts](http://echarts.baidu.com/index.html)
* 地图：[baidu map](https://lbsyun.baidu.com/)

## 项目结构

* documentation -- 文档
* src -- 项目源码
  * api -- 封装了axios请求
  * assets -- 资源目录
    * js -- javascript文件
    * scss -- scss文件
      * app.scss -- 通用样式
      * overwrite.scss -- 框架需要重写的样式
    * img -- 项目图片
  * common
    * index.js -- 项目的全局方法
  * components -- 通用组件
  * config -- 项目配置
  * menu -- 菜单配置
  * plugin -- 插件
  * router -- 路由
  * store -- 状态管理
    * modules -- 状态模块
      * keepAlive.js -- 用于页面缓存
      * tag.js -- 标签栏
      * user.js -- 保存用户信息
  * views -- 页面
    * layout -- 母版页
      * components -- 模块组件（非通用，只对当前模块有效的组件）
    * goodsData -- 模块，比如商品资料
      * components -- 模块组件
      * List.vue -- 列表
      * Add.vue -- 新增

## 规范

### 路由

* 路由的path规范为（模块名/页面），如商品资料列表（goodsData/list），新增商品资料（goodsData/add）
* 路由必须给name，且与所指向component的name同名（为了做全局keepAlive）
* 由于做了全局的keepAlive，跳转到需要缓存的页面请调用this.$appPush()方法，且必须通过name进行页面定位，不能使用path，比如：this.$appPush({ name: 'GoodsDataList', ... })
* 加新模块时，必须将模块地址redirect到模块下的一个页面，如商品资料模块：{ path: 'goodsData', redirect: 'goodsData/list' }