/**
 * name：菜单名
 * groupName：组名
 * iconClass：一级菜单icon
 * router：路由名称
 * children：子菜单
 * hide：true为隐藏此菜单
 * children中采用二维数组是用于给子菜单分列，如果想在新列中加菜单，添加一个数组即可
 */
const menu = [
  { name: '应用中心', iconClass: 'fa fa-th-large', router: 'AppCenter' },

  // 基础资料
  {
    name: '基础资料',
    iconClass: 'fa fa-desktop',
    children: [
      // 第一列
      [
        {
          groupName: '商品',
          hide: true,
          children: [
            { name: '商品资料', router: 'GoodsDataList' },
            { name: '商品单位', router: 'GoodsUnitList' },
            { name: '商品分类' },
            { name: '品牌资料' },
            { name: '商品加工(组合)关系' },
            { name: '商品分割(拆分)关系' },
            { name: '商品调价' },
            { name: '商品资料维护' },
            { name: '商品提成设置' }
          ]
        }
      ],
      // 第二列
      [
        {
          groupName: '客户',
          children: [
            { name: '客户分类' },
            { name: '客户资料' }
          ]
        },
        {
          groupName: '供应商',
          children: [
            { name: '供应商分类' },
            { name: '供应商资料' }
          ]
        },
        {
          groupName: '其它',
          children: [
            { name: '期初查询' },
            { name: '申请支付宝/微信' }
          ]
        }
      ]
    ]
  },

  // 促销管理
  {
    name: '促销管理',
    iconClass: 'fa fa-tags',
    children: [
      // 第一列
      [
        {
          groupName: '折扣促销',
          children: [
            { name: '单品折扣促销' },
            { name: '品类折扣促销' },
            { name: '单组折扣促销' },
            { name: '整单折扣促销' },
            { name: '时段折扣促销' }
          ]
        },
        {
          groupName: '其它',
          children: [
            { name: '特价促销' },
            { name: '组合促销' },
            { name: '促销规则' }
          ]
        }
      ],
      // 第二列
      [
        {
          groupName: '买送促销',
          children: [
            { name: '单品买减促销' },
            { name: '单组买送促销' },
            { name: '整类买送促销' },
            { name: '整单买送促销' }
          ]
        },
        {
          groupName: '加价换购',
          children: [
            { name: '单组加价换购' },
            { name: '整单加价换购' }
          ]
        },
        {
          groupName: '促销查询',
          children: [
            { name: '促销查询' },
            { name: '当前促销' }
          ]
        }
      ]
    ]
  },

  // 会员管理
  {
    name: '会员管理',
    iconClass: 'fa fa-user',
    children: [
      // 第一列
      [
        {
          children: [
            { name: '会员资料' },
            { name: '会员等级' },
            { name: '会员规则' },
            { name: '充值规则' },
            { name: '会员次卡' },
            { name: '积分调整' },
            { name: '批量充值' }
          ]
        }
      ]
    ]
  },

  // 进货管理
  {
    name: '进货管理',
    iconClass: 'fa fa-shopping-cart',
    children: [
      // 第一列
      [
        {
          children: [
            { name: '采购订单', router: 'PurchaseOrderList' },
            { name: '采购收货' },
            { name: '采购退货' },
            { name: '供应商报价' }
          ]
        }
      ]
    ]
  },

  // 销售管理
  {
    name: '销售管理',
    iconClass: 'fa fa-sitemap',
    children: [
      // 第一列
      [
        {
          children: [
            { name: '销售订单' },
            { name: '销售出库' },
            { name: '销售退货' },
            { name: '客户商品价格' }
          ]
        }
      ]
    ]
  },

  // 配送管理
  {
    name: '配送管理',
    iconClass: 'fa fa-truck',
    children: [
      // 第一列
      [
        {
          groupName: '配送',
          children: [
            { name: '补货申请', hide: true },
            { name: '配送出库', hide: true },
            { name: '配送入库', hide: true }
          ]
        },
        {
          groupName: '调拨',
          children: [
            { name: '调拨出库' },
            { name: '调拨入库' }
          ]
        }
      ],
      [
        {
          groupName: '返配',
          children: [
            { name: '返配申请' },
            { name: '返配通知' },
            { name: '返配出库' },
            { name: '返配入库' }
          ]
        },
        {
          groupName: '补货',
          children: [
            { name: '补货设置' }
          ]
        }
      ]
    ]
  },

  // 库存管理
  {
    name: '库存管理',
    iconClass: 'fa fa-university',
    children: [
      // 第一列
      [
        {
          groupName: '盘点管理',
          children: [
            { name: '盘点计划' },
            { name: '盘点录入' },
            { name: '盘点盈亏确认' },
            { name: '盘盈单' },
            { name: '盘亏单' }
          ]
        }
      ],
      // 第二列
      [
        {
          groupName: '其它',
          children: [
            { name: '库存调整' },
            { name: '快速盘点' },
            { name: '库存报损' },
            { name: '库存调价' },
            { name: '商品加工(组合)' },
            { name: '商品分割(拆分)' }
          ]
        }
      ]
    ]
  },

  // 账务管理
  {
    name: '账务管理',
    iconClass: 'fa fa-pie-chart',
    children: [
      // 第一列
      [
        {
          groupName: '付款',
          children: [
            { name: '付款' },
            { name: '应付款查询' },
            { name: '应付款明细' }
          ]
        },
        {
          groupName: '费用',
          children: [
            { name: '费用资料' },
            { name: '供应商费用' },
            { name: '客户费用' }
          ]
        }
      ],
      // 第二列
      [
        {
          groupName: '收款',
          children: [
            { name: '收款' },
            { name: '应收款查询' },
            { name: '应收款明细' }
          ]
        }
      ]
    ]
  },

  // 报表管理
  {
    name: '报表管理',
    iconClass: 'fa fa-bar-chart',
    children: [
      // 第一列
      [
        {
          groupName: '零售',
          children: [
            { name: '商品零售流水', router: 'GoodsRetailFlow' },
            { name: '商品零售汇总', router: 'GoodsRetailSummary' },
            { name: '收银汇总' },
            { name: '收银流水', router: 'CashFlow' },
            { name: '门店销售汇总' },
            { name: '门店销售日报', router: 'StoreSalesDay' },
            { name: '门店销售月报' },
            { name: '营业员报表' },
            { name: '商品零售汇总' },
            { name: '商品销售排行榜' },
            { name: '供应商销售汇总' }
          ]
        }
      ],
      // 第二列
      [
        {
          groupName: '库存',
          children: [
            { name: '商品库存查询' },
            { name: '商品进销存' },
            { name: '商品进销存明细' },
            { name: '库存调整明细' },
            { name: '快速盘点明细' },
            { name: '库存报损查询', router: 'StockScrapQuery' },
            { name: '库存预警查询' },
            { name: '库存上下限' }
          ]
        },
        {
          groupName: '其它',
          children: [
            { name: '未审核单据' },
            { name: '商品调价明细' },
            { name: '微订单查询' }
          ]
        }
      ],
      // 第三列
      [
        {
          groupName: '配送',
          children: [
            { name: '补货配送查询' },
            { name: '商品补货汇总' },
            { name: '配送出入库查询' },
            { name: '返配出入库明细' },
            { name: '调拨出入库明细' }
          ]
        },
        {
          groupName: '进货',
          children: [
            { name: '进货统计' },
            { name: '订单收货查询' },
            { name: '历史进货查询' }
          ]
        }
      ],
      // 第四列
      [
        {
          groupName: '会员',
          children: [
            { name: '会员储值情况' },
            { name: '会员充值明细' },
            { name: '会员积分流水' },
            { name: '会员销售情况' },
            { name: '会员次卡查询' }
          ]
        },
        {
          groupName: '批发',
          children: [
            { name: '销售订单查询' },
            { name: '销售订货汇总' },
            { name: '批发汇总' },
            { name: '批发明细' }
          ]
        }
      ]
    ]
  },

  // 系统管理
  {
    name: '系统管理',
    iconClass: 'fa fa-cog',
    children: [
      // 第一列
      [
        {
          children: [
            { name: '参数设置' },
            { name: '员工管理' },
            { name: '角色管理' },
            { name: '企业资料' },
            { name: '店组管理' },
            { name: '门店管理' },
            { name: '采集器格式' },
            { name: '数据总清' }
          ]
        }
      ]
    ]
  },

  // 微商城
  {
    name: '微商城',
    iconClass: 'fa fa-cart-plus',
    children: [
      // 第一列
      [
        {
          groupName: '商城设置',
          children: [
            { name: '商品管理' },
            { name: '商城配置' },
            { name: '参数配置' }
          ]
        },
        {
          groupName: '商城促销',
          children: [
            { name: '商品促销' },
            { name: '整单促销' }
          ]
        }
      ],
      // 第二列
      [
        {
          groupName: '分销管理',
          children: [
            { name: '分销商等级' },
            { name: '分销商资料' },
            { name: '拓展会员记录' },
            { name: '会员消费明细' },
            { name: '分销商提现明细' }
          ]
        },
        {
          groupName: '其它',
          children: [
            { name: '微订单查询' }
          ]
        }
      ]
    ]
  },

  // 无人便利店
  {
    name: '无人便利店',
    iconClass: 'fa fa-home',
    children: [
      // 第一列
      [
        {
          children: [
            { name: '无人店流水' },
            { name: '门店配置' }
          ]
        }
      ]
    ]
  }
]

export default menu
