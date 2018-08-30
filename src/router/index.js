/**
 * 1、所有路由与其指向的component都必须给name，且两都必须一致（为了实现全局keepAlive）
 * 2、path的命名规范为：模块名/页面名，比如商品资料列表：goodsData/list
 * 3、name的命名规范为：模块名+页面名（大写驼峰式），比如商品资料列表：GoodsDataList
 * 4、页面需要缓存时，跳转的时候请使用this.$appPush({ name: 'xxx', ... })
 */
const routes = [
  { path: '', redirect: { path: '/account' } },
  // 账户
  { path: '/account', redirect: { name: 'AccountLogin' } },
  // 登录页面
  {
    path: '/account/login',
    name: 'AccountLogin',
    component: () => import('@/views/account/Login'),
    meta: { title: '登录' }
  },
  // 注册页面
  {
    path: '/account/register',
    name: 'AccountRegister',
    component: () => import('@/views/account/Register'),
    meta: { title: '注册' }
  },
  // 找回密码
  {
    path: '/account/reset',
    name: 'AccountReset',
    component: () => import('@/views/account/Reset'),
    meta: { title: '找回密码' }
  },

  // 错误
  { path: '/error', redirect: { name: '404' } },
  // 404找不到页面
  { path: '*', redirect: { name: '404' } },
  {
    path: '/error/404',
    name: '404',
    component: () => import('@/views/error/404'),
    meta: { title: '找不到页面' }
  },
  // 401没有权限错误
  {
    path: '/error/401',
    name: '401',
    component: () => import('@/views/error/401'),
    meta: { title: '没有权限' }
  },

  // 主体
  {
    path: '',
    component: () => import('@/views/layout/Index'),
    name: 'Layout',
    children: [
      // ------------------------------- 主页 -------------------------------
      {
        path: 'home',
        name: 'Home',
        component: () => import('@/views/home/Index'),
        meta: {
          notag: true, // 此页面不会添加到tag中
          title: '首页'
        }
      },

      // ------------------------------- 应用中心 -------------------------------
      {
        path: 'appCenter',
        name: 'AppCenter',
        component: () => import('@/views/appCenter/Index'),
        meta: {
          title: '应用中心',
          permission: 'valadded/list'
        }
      },

      // ------------------------------- 商品资料模块 -------------------------------
      { path: 'goodsData', redirect: 'goodsData/list' }, // 模块地址redirect至模块下的任意一个页面（通常是第一个菜单），防止直接访问此地址时404
      // 商品资料列表
      {
        path: 'goodsData/list',
        name: 'GoodsDataList',
        component: () => import('@/views/goodsData/List'),
        meta: {
          title: '商品资料',
          permission: 'shopsp/list'
        }
      },
      // 新增商品
      {
        path: 'goodsData/add',
        name: 'GoodsDataAdd',
        component: () => import('@/views/goodsData/Add'),
        meta: {
          title: '新增商品',
          permission: 'shopsp/add'
        }
      },
      // 编辑商品
      {
        path: 'goodsData/edit',
        name: 'GoodsDataEdit',
        component: () => import('@/views/goodsData/Edit'),
        meta: {
          title: '编辑商品',
          permission: 'shopsp/edit'
        }
      },

      // ------------------------------- 商品单位 -------------------------------
      { path: 'goodsUnit', redirect: 'goodsUnit/list' },
      {
        path: 'goodsUnit/list',
        name: 'GoodsUnitList',
        component: () => import('@/views/goodsUnit/List'),
        meta: {
          title: '商品单位',
          permission: 'dw/list'
        }
      },

      // ------------------------------- 商品分类 -------------------------------
      { path: 'goodsCategory', redirect: 'goodsCategory/list' },
      {
        path: 'goodsCategory/list',
        name: 'GoodsCategoryList',
        component: () => import('@/views/goodsCategory/List'),
        meta: {
          title: '商品分类',
          permission: 'spfl/list'
        }
      },

      // ------------------------------- 品牌资料 -------------------------------
      { path: 'brandData', redirect: 'brandData/list' },
      {
        path: 'brandData/list',
        name: 'BrandDataList',
        component: () => import('@/views/brandData/List'),
        meta: {
          title: '品牌资料',
          permission: 'pp/list'
        }
      },

      // ------------------------------- 采购订单模块 -------------------------------
      { path: 'purchaseOrder', redirect: 'purchaseOrder/list' },
      // 采购订单列表
      {
        path: 'purchaseOrder/list',
        name: 'PurchaseOrderList',
        component: () => import('@/views/purchaseOrder/List'),
        meta: {
          title: '采购订单',
          permission: 'dh/list'
        }
      },
      // 新增订货单
      {
        path: 'purchaseOrder/add',
        name: 'PurchaseOrderAdd',
        component: () => import('@/views/purchaseOrder/Add'),
        meta: {
          title: '新增订货'
        }
      },

      // ------------------------------- 报表 -------------------------------
      { path: 'report', redirect: 'report/goodsRetailFlow' },
      // 商品零售流水
      {
        path: 'report/goodsRetailFlow',
        name: 'GoodsRetailFlow',
        component: () => import('@/views/report/GoodsRetailFlow'),
        meta: {
          title: '商品零售流水'
        }
      },
      // 商品零售汇总
      {
        path: 'report/goodsRetailSummary',
        name: 'GoodsRetailSummary',
        component: () => import('@/views/report/GoodsRetailSummary'),
        meta: {
          title: '商品零售汇总'
        }
      },
      // 收银流水
      {
        path: 'report/cashFlow',
        name: 'CashFlow',
        component: () => import('@/views/report/CashFlow'),
        meta: {
          title: '收银流水'
        }
      },
      // 门店销售日报
      {
        path: 'report/storeSalesDay',
        name: 'StoreSalesDay',
        component: () => import('@/views/report/StoreSalesDay'),
        meta: {
          title: '门店销售日报'
        }
      },
      // 库存报损查询
      {
        path: 'report/stockScrap',
        name: 'StockScrap',
        component: () => import('@/views/report/StockScrap'),
        meta: {
          title: '库存报损查询'
        }
      },
      // 库存报损查询
      {
        path: 'report/purchaseHistory',
        name: 'PurchaseHistory',
        component: () => import('@/views/report/PurchaseHistory'),
        meta: {
          title: '历史进货查询'
        }
      },

      // ------------------------------- 刷新路由，用于刷新当前页 -------------------------------
      {
        path: 'share/refresh',
        name: 'Refresh',
        component: () => import('@/views/shared/Refresh'),
        meta: { title: '刷新中...', notag: true, nocache: true }
      },

      // ------------------------------- 新手引导 -------------------------------
      {
        path: 'help',
        name: 'Help',
        component: () => import('@/views/help/Index'),
        meta: { title: '新手引导' }
      }
    ]
  }
]

export default routes
