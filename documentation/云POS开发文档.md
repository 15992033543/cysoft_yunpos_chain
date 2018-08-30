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
  * mixin -- 混入
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

## 路由控制（重要）

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
      name: 'GoodsDataList', // 与路由的name保持一致
      ...
    }

3、为了灵活的控制缓存，跳转时，要使用this.$appPush()方法，并且必须使用name作为路由的标志，不能使用path，其它参数与vue-router的push保持一致即可。比如：

    this.$appPush({ name: 'GoodsDataList', ... })

$appPush()选项：

|   名称   |       说明      |  默认值 | 是否必传 |
| ------- | --------------- | ------ | -------  |
|  name   | 路由的name       |   无   |  是 |
| refresh | 跳转时，刷新目标页 | false | 否 |
| closeTo | 跳转时，先关闭目标页，再重新打开（不会刷新目标页，只是将目标页的标签提前到这个页面标签的后） | false | 否 |
| closeFrom | 跳转时，关闭当前页（某些页面有返回按钮，点击返回时可将当前页关闭） | false | 否 |
| replace | 与vue-router的replace()方法一样，将当前页从history中清除 | false | 否 |

4、配置路由时，需要将模块地址redirect到当前模块的某个页面，比如account模块：

    // redirect到登录页
    { path: '/account', redirect: { name: 'Login' } },
    // 登录页面
    {
      path: '/account/login',
      name: 'AccountLogin',
      ...
    }

这样做避免了用户直接访问<http://localhost:8080/#/account>时出现404错误

5、Layout下的路由meta的属性如下：

|   名称   |       说明      |  默认值 |
| ------- | --------------- | ------ |
|  title | 显示在浏览器标签上的标题，以云pos - xxx的格式出现 | 无 |
|  notag | 为ture时，表示不将此页面添加到标签页中 | false |
|  nocache | 为ture时，表示永远不缓存此路由 | false |
|  permission | 路由权限，因为需要与服务器返回的菜单匹配，所以此项是必须的，否则不能打开页面 | 无 |

6、关于路由的permission权限，如果某个页面不需要权限，则不用配置。如果某个页面是菜单级别的，必须配置权限，否则不能打开菜单，因为菜单是后台动态返回的，为了让路由与菜单匹配，采用了路由权限与菜单的controller/action进行匹配

## 权限列表

* 应用中心 - valadded/list
* 基础资料
  * 商品资料
    * 列表 - shopsp/list
    * 新增 - shopsp/add
  * 商品单位
    * 列表 - dw/list