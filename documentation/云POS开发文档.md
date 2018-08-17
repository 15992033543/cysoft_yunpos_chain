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

## 路由（重要）

1、路由配置文件在src/router/index.js

2、为了做全站缓存，路由与它所指向的组件一定要写name属性，且两者一致。比如商品资料列表：

    // 路由配置
    {
      path: 'goodsData/list',
      name: 'GoodsDataList',
      component: () => import('@/views/goodsData/List')
    }

    // 组件配置
    export default {
      name: 'GoodsDataList',
      ...
    }

3、为了灵活的控制缓存，跳转时，要使用this.$appPush()方法，并且必须使用name，不能使用path，其它参数与vue-router的push一致。比如：

    this.$appPush({ name: 'GoodsDataList', ... })

$appPush()选项：

    // 跳转时，刷新目标页
    this.$appPush({ name: 'GoodsDataList', refresh: true })

    // 跳转时，先关闭目标页，再重新打开（不会刷新目标页，只是将目标页的标签提前到这个页面标签的后）
    this.$appPush({ name: 'GoodsDataList', closeTo: true })

    // 跳转时，关闭当前页
    this.$appPush({ name: 'GoodsDataList', closeFrom: true })