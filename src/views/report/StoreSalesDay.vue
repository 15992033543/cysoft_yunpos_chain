<template>
  <div>
    <div class="text-align-right">
      <el-form :inline="true" :model="formData">
        <el-form-item>
          <el-button type="primary" @click="exportExcel">导出</el-button>
        </el-form-item>
        <el-form-item>
          <date-picker
            :value="formData.rq_begin"
            @change="date => formData.rq_begin = date"
            placeholder="开始时间"/>
          <span>-</span>
          <date-picker
            :value="formData.rq_end"
            @change="date => formData.rq_end = date"
            placeholder="结束时间"/>
        </el-form-item>
        <el-form-item>
          <el-select v-model="formData.id_shop" placeholder="请选择门店" filterable class="w-140">
            <el-option label="全部门店" value=""></el-option>
            <el-option v-for="(shop, index) in shopList" :key="index" :label="shop.mc" :value="shop.id_shop"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item style="margin-right: 0">
          <el-button type="primary" @click="query">
            <i class="fa fa-search"></i> 查询
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <div>
      <ag-grid-table
        ref="tableEl"
        token="tableEl"
        :column-defs="columnDefs"
        :row-data="tableData"
        :summary="summary"
        :loading="loading"
        @columns-ready="columns => columnDefs = columns"/>
    </div>

    <div class="pagination-container">
      <app-pagination
        @change="paginationChange"
        :current-page="formData.page"
        :page-size="formData.pageSize"
        :total="total"/>
    </div>
  </div>
</template>

<script>
import AgGridTable from '@/components/agGrid/AgGridTable'
import DatePicker from '@/components/DatePicker'
import AppPagination from '@/components/AppPagination'

export default {
  name: 'StoreSalesDay',

  components: {
    AgGridTable, DatePicker, AppPagination
  },

  data () {
    return {
      shopList: [],
      formData: {
        rq_begin: this.$getFirstDate(),
        rq_end: this.$getLastDate(),
        id_shop: '',
        page: 0,
        pageSize: this.$getLocalPageSize()
      },
      columnDefs: [
        { headerName: '序号', field: 'row_no', width: 80, suppressSizeToFit: true },
        { headerName: '日期', field: 'rq', width: 100 },
        { headerName: '星期', field: 'week', width: 100, valueFormatter: p => this.$dateToWeek(p.data.rq) },
        { headerName: '门店', field: 'mc_shop', width: 130, cellClass: 'text-align-left' },
        { headerName: '应销售额', field: 'je_xs', width: 100, cellClass: 'text-align-right', valueFormatter: p => this.$accRound(p.value, 2) },
        { headerName: '折扣金额', field: 'je_yh', width: 100, cellClass: 'text-align-right', valueFormatter: p => this.$accRound(p.value, 2) },
        { headerName: '实际销售额', field: 'je_ys', width: 100, cellClass: 'text-align-right', valueFormatter: p => this.$accRound(p.value, 2) },
        { headerName: '成本', field: 'je_cb', width: 100, cellClass: 'text-align-right', valueFormatter: p => this.$accRound(p.value, 2) },
        { headerName: '毛利', field: 'je_ml', width: 100, cellClass: 'text-align-right', valueFormatter: p => this.$accRound(p.value, 2) },
        { headerName: '毛利率', field: 'mll', width: 100, cellClass: 'text-align-right' },
        { headerName: '客单量', field: 'sl_cust', width: 100, cellClass: 'text-align-right' },
        { headerName: '客单价', field: 'kdj', width: 100, cellClass: 'text-align-right' }
      ],
      tableData: [],
      total: 0,
      summary: [ 'je_xs', 'je_yh', 'je_ys', 'je_cb', 'je_ml' ], // 要合计的列
      loading: false
    }
  },

  created () {
    this.fetchShopList()
  },

  methods: {
    query () {
      // 点击按钮才查询
      this.fetchTableData(0)
    },

    // 获取门店下拉列表
    fetchShopList () {
      this.$httpAuth({
        url: '/SearchCondition/GetShop',
        method: 'POST'
      }).then(res => {
        if (Array.isArray(res)) {
          this.shopList = res
        }
      })
    },

    // 获取表格数据
    fetchTableData (page) {
      this.formData.page = page
      this.loading = true
      this.$httpAuth({
        url: '/report/xshzshopdayreportapi',
        method: 'POST',
        data: this.formData
      }).then(res => {
        this.loading = false
        const list = res.rList
        this.total = Number(res.outstr)
        if (Array.isArray(list)) {
          // 列表最后一条为合计数据
          const summaryData = list.pop()
          // 设置合计数据
          this.$refs.tableEl.setPinnedBottomRowData(summaryData)
          list.forEach(e => {
            e.mll = this.countMaoriRate(e)
            e.kdj = this.countPrice(e)
          })
          this.tableData = list
        }
      })
    },

    // 计算毛利率
    countMaoriRate (data) {
      let maoriRate = 0
      const maori = data.je_ml
      const amount = data.je_ys
      if (maori && amount) {
        maoriRate = this.$accMul(this.$accDiv(maori, amount), 100) // maori / amount * 100
      }
      return `${this.$accRound(maoriRate, 2)}%`
    },

    // 计算客单价
    countPrice (data) {
      let price = 0
      const count = data.sl_cust
      const amount = data.je_ys
      if (count && amount) {
        price = this.$accDiv(amount, count) //  ys / sl
      }
      return this.$accRound(price, 2)
    },

    // 分页回调
    paginationChange (page, pageSize) {
      if (pageSize) {
        this.formData.pageSize = pageSize
      }
      this.fetchTableData(page || 0)
    },

    // 导出
    exportExcel () {
      // 获取表格列的状态，用于导出的excel表格列的顺序与表格列的顺序一致
      this.formData.ExportField = this.$refs.tableEl.getExportField()
      this.$exportFile('/report/outxshzshopdayreportdata', this.formData)
    }
  }
}
</script>
