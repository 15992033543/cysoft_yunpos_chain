<template>
  <div>
    <div class="text-align-right">
      <el-form ref="formEl" :inline="true" :model="formData">
        <el-form-item>
          <el-button type="primary" @click="exportFile">导出</el-button>
        </el-form-item>
        <el-form-item>
          <date-picker
            type="date"
            :value="formData.rq_begin"
            @change="date => formData.rq_begin = date"
            placeholder="开始时间"/>
          <span>-</span>
          <date-picker
            type="date"
            :value="formData.rq_end"
            @change="date => formData.rq_end = date"
            placeholder="结束时间"/>
        </el-form-item>
        <el-form-item>
          <el-select v-model="formData.id_shop" placeholder="请选择门店" filterable class="w-140">
            <el-option label="全部门店" value=""></el-option>
            <el-option v-for="shop in shopList" :key="shop.id_shop" :label="shop.mc" :value="shop.id_shop"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-select v-model="formData.id_gys" placeholder="请选择供应商" filterable class="w-140">
            <el-option label="全部供应商" value=""></el-option>
            <el-option v-for="supplier in supplierList" :key="supplier.id" :label="supplier.mc" :value="supplier.id"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input class="w-140" v-model="formData.barcode" placeholder="商品条码" :clearable="true"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input class="w-140" v-model="formData.mc_sp" placeholder="商品名称" :clearable="true"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input class="w-140" v-model="formData.dh" placeholder="单号" :clearable="true"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query">
            <i class="fa fa-search"></i> 查询
          </el-button>
        </el-form-item>
      </el-form>
    </div>

    <div>
      <el-table
        :data="tableData"
        :height="490"
        empty-text="没有查询到相关数据"
        border
        show-summary
        :summary-method="getSummaries"
        v-loading="loading"
        style="width: 100%">
        <el-table-column
          prop="row_no"
          label="序号"
          width="60"
          align="center"
          show-overflow-tooltip/>

        <el-table-column
          prop="mc_shop"
          label="门店"
          width="140"
          align="center"
          show-overflow-tooltip>
        </el-table-column>

        <el-table-column
          prop="mc_gys"
          label="供应商"
          width="140"
          align="center"
          show-overflow-tooltip/>

        <el-table-column
          prop="rq"
          label="日期"
          width="100"
          align="center"
          show-overflow-tooltip/>

        <el-table-column
          prop="dh"
          label="单号"
          width="160"
          align="center"
          show-overflow-tooltip/>

        <el-table-column
          prop="mc_sp"
          label="商品名称"
          width="160"
          align="center"
          show-overflow-tooltip/>

        <el-table-column
          prop="dw"
          label="单位"
          width="60"
          align="center"
          show-overflow-tooltip/>

        <el-table-column
          prop="sl"
          label="进货数量"
          width="100"
          align="right"
          header-align="center"
          show-overflow-tooltip/>

        <el-table-column
          prop="dj"
          label="进货价"
          width="100"
          align="right"
          header-align="center"
          show-overflow-tooltip/>

        <el-table-column
          prop="je"
          label="进货金额"
          width="100"
          align="right"
          header-align="center"
          show-overflow-tooltip/>

        <el-table-column
          prop="dj_ls"
          label="零售价"
          width="100"
          align="right"
          header-align="center"
          show-overflow-tooltip/>

        <el-table-column
          prop="je_ls"
          label="零售金额"
          width="100"
          align="right"
          header-align="center"
          show-overflow-tooltip/>

        <el-table-column
          prop="barcode"
          label="商品条码"
          width="160"
          align="center"
          show-overflow-tooltip/>

        <el-table-column
          prop="mc_spfl"
          label="商品分类"
          width="130"
          align="center"
          show-overflow-tooltip/>

        <el-table-column
          prop="mc_djlx"
          label="业务类型"
          width="130"
          align="center"
          show-overflow-tooltip/>
      </el-table>
    </div>
  </div>
</template>

<script>
import DatePicker from '@/components/DatePicker'

export default {
  name: 'PurchaseHistory',

  components: {
    DatePicker
  },

  data () {
    return {
      formData: {
        rq_begin: this.$getFirstDate(),
        rq_end: this.$getLastDate(),
        id_shop: '',
        id_gys: '',
        barcode: '',
        mc_sp: '',
        dh: '',
        id_sp: '',
        id_kcsp: '',
        page: 0,
        pageSize: this.$getLocalPageSize()
      },
      shopList: [],
      supplierList: [],
      tableData: [],
      total: 0,
      summaryData: {},
      loading: false
    }
  },

  created () {
    this.fetchShopList()
    this.fetchSupplierList()
  },

  methods: {
    exportFile () {
    },

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

    fetchSupplierList () {
      this.$httpAuth({
        url: '/Gys/GetGysApi',
        method: 'POST'
      }).then(res => {
        if (Array.isArray(res)) {
          this.supplierList = res
        }
      })
    },

    query () {
      this.fetchTableData()
    },

    fetchTableData () {
      this.loading = true
      this.$httpAuth({
        url: '/report/spjhmxreportapi',
        data: this.formData,
        method: 'POST'
      }).then(res => {
        this.loading = false
        const data = res.rList
        this.tableData = Array.isArray(data) ? data : []
        this.summaryData = this.tableData.pop()
        this.total = isNaN(res.outstr) ? 0 : Number(res.outstr)
      })
    },

    getSummaries (param) {
      const columns = param.columns
      const sums = []
      const summaryColumns = [ 'sl', 'je', 'je_ls' ]
      columns.forEach((c, index) => {
        if (index === 0) {
          sums.push('合计')
          return
        }
        if (summaryColumns.indexOf(c.property) !== -1) {
          sums.push(this.summaryData[c.property])
        } else {
          sums.push('')
        }
      })
      return sums
    }
  }
}
</script>

<style>

</style>
