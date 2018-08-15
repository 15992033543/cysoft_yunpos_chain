<template>
  <div class="purchase-order-list">
    <el-form :inline="true" :model="formData" style="overflow: hidden">
      <div style="float: left">
        <el-form-item>
          <el-button type="primary" @click="add">
            <i class="fa fa-plus"></i> 新增订货
          </el-button>
        </el-form-item>
      </div>

      <div class="text-align-right" style="float: right">
        <el-form-item>
          <el-input class="w-160" v-model="formData.keyword" placeholder="单号/备注" clearable></el-input>
        </el-form-item>

        <el-form-item>
          <date-range-picker
            :begin="formData.start_time"
            :end="formData.start_time_end"
            @change="dateChange"
            type="daterange"/>
        </el-form-item>

        <el-form-item>
          <el-select class="w-140" v-model="formData.id_gys" filterable>
            <el-option label="全部供应商" value=""/>
            <el-option label="供应商1" value="1"/>
            <el-option label="供应商2" value="2"/>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-select class="w-140" v-model="formData.id_shop" filterable>
            <el-option label="全部订货门店" value=""/>
            <el-option v-for="item in shopList" :key="item.id_shop" :label="item.mc" :value="item.id_shop"/>
          </el-select>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="query">
            <i class="fa fa-search"></i> 查询
          </el-button>
        </el-form-item>
      </div>
    </el-form>

    <div>
      <app-table
        :column-defs="columnDefs"
        :row-data="orderList"
        :loading="loading"
        :grid-ready="gridReady"
        @columns-ready="columns => columnDefs = columns"/>
    </div>

    <div class="text-align-center" style="margin-top: 20px">
      <app-pagination
          @change="paginationChange"
          :current-page="formData.page"
          :page-size="formData.pageSize"
          :total="total"/>
    </div>
  </div>
</template>

<script>
import DateRangePicker from '@/components/DateRangePicker'
import AppTable from '@/components/agGrid/AppTable'
import OperationCell from '@/components/agGrid/OperationCell'
import NormalCell from '@/components/agGrid/NormalCell'
import AppPagination from '@/components/AppPagination'

export default {
  name: 'PurchaseOrderList',

  components: {
    DateRangePicker, AppTable, AppPagination
  },

  data () {
    return {
      formData: {
        keyword: '',
        start_time: this.$getFirstDate(),
        start_time_end: this.$getLastDate(),
        id_gys: '',
        id_shop: '',
        page: 0,
        pageSize: this.$getLocalPageSize()
      },
      total: 0,
      orderList: [],
      loading: false,
      shopList: [],
      columnDefs: [
        {
          headerName: '序号',
          field: 'row_no',
          width: 50,
          suppressSizeToFit: true,
          cellRendererParams: {
            filter: p => (p.node.rowIndex + 1) + this.formData.page * this.formData.pageSize
          }
        },
        {
          headerName: '开单日期',
          field: 'rq',
          width: 100,
          cellRendererParams: {
            filter: p => this.$dateTransformer(p.value)
          }
        },
        { headerName: '单号', field: 'dh', width: 100 },
        { headerName: '订货门店', field: 'shop_name', width: 130 },
        { headerName: '供应商', field: 'gys_name', width: 130 },
        { headerName: '经办人', field: 'jbr_name', width: 130 },
        { headerName: '订货金额', field: 'je_mxtotal', width: 100, valueFormatter: p => this.$accRound(p.value, 2) },
        {
          headerName: '单据状态',
          field: 'state',
          width: 120,
          cellRendererFramework: NormalCell,
          cellRendererParams: {
            cellClass: p => {
              return p.data.flag_sh === 1 ? 'verify-text-color' : 'no-verify-text-color'
            },
            filter: p => {
              return p.data.flag_sh === 1 ? '已审核' : '未审核'
            }
          }
        },
        { headerName: '备注', field: 'bz', width: 150 },
        {
          headerName: '操作',
          field: 'op',
          width: 185,
          lockPinned: true, // 锁定，不能移动
          pinned: 'right', // 固定在右侧
          suppressResize: true, // 禁止改变列宽
          suppressMovable: true, // 禁止移动列
          cellRendererFramework: OperationCell, // 操作拦组件
          cellRendererParams: {
            btns: [ // 操作栏按钮
              { btnClass: 'fa fa-eye', btnName: '查看', callback: this.detail },
              {
                btnClass: 'fa fa-pencil',
                btnName: '编辑',
                callback: this.edit,
                hide: p => p.data.flag_sh === 1
              },
              { btnClass: 'fa fa-copy', btnName: '复制', callback: this.copy },
              {
                btnClass: 'fa fa-ban',
                btnName: '作废',
                callback: this.void,
                hide: p => p.data.flag_cancel === 1 || p.data.flag_sh === 0 || p.data.finish_jh === 1
              },
              {
                btnClass: 'fa fa-trash',
                btnName: '删除',
                callback: this.del,
                hide: p => p.data.flag_sh === 1
              },
              {
                btnClass: 'fa fa-user',
                btnName: '审核',
                callback: this.del,
                hide: p => p.data.flag_sh === 1
              },
              {
                btnClass: 'fa fa-ambulance',
                btnName: '收货',
                callback: this.take,
                hide: p => p.data.flag_cancel === 1 || p.data.flag_sh === 0 || p.data.finish_jh === 1
              }
            ]
          }
        }
      ]
    }
  },

  created () {
    this.fetchShopList()
  },

  methods: {
    gridReady () {
      // 放这里请求列表数据是因为需要用到table的加载效果（放created或者mounted中不会有效果）
      this.fetchOrderList(0)
    },

    query () {
      this.fetchOrderList(0)
    },

    add () {
      this.$appPush({ name: 'PurchaseOrderAdd', closeTo: true })
    },

    dateChange (begin, end) {
      this.formData.start_time = begin
      this.formData.start_time_end = end
    },

    edit (data) {
      console.log(data)
    },

    copy (data) {
      console.log(data)
    },

    del (data) {
      console.log(data)
    },

    detail (data) {
      console.log(data)
    },

    void (data) {
    },

    take (data) {
    },

    fetchOrderList (page) {
      this.loading = true
      this.$httpAuth({
        url: '/DH/GetListData',
        method: 'get',
        params: this.formData
      }).then(res => {
        this.loading = false
        if (res.Success) {
          this.orderList = Array.isArray(res.Data.Data) ? res.Data.Data : []
          this.total = res.Data.TotalCount
        }
      })
    },

    paginationChange (page, pageSize) {
      if (pageSize) {
        this.formData.pageSize = pageSize
      }
      this.fetchOrderList(page || 0)
    },

    fetchShopList () {
      this.$httpAuth({
        url: '/SearchCondition/GetShop',
        method: 'get',
        params: { id_shop_add: '' }
      }).then(res => {
        if (Array.isArray(res)) {
          this.shopList = res
        }
      })
    }
  }
}
</script>

<style lang="scss">
</style>
