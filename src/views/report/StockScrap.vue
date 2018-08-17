<template>
  <div>
    <div class="text-align-right">
      <el-form ref="formEl" :inline="true" :model="formData">
        <el-form-item>
          <el-button type="primary" @click="exportFile">导出</el-button>
        </el-form-item>
        <el-form-item>
          <date-range-picker
            :begin="formData.rq_begin"
            :end="formData.rq_end"
            @change="dateChange"/>
        </el-form-item>
        <el-form-item>
          <el-select v-model="formData.id_shop" placeholder="请选择门店" filterable class="w-140">
            <el-option label="全部门店" value=""></el-option>
            <el-option v-for="(shop, index) in shopList" :key="index" :label="shop.mc" :value="shop.id_shop"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-input class="w-140" v-model="formData.barcode" placeholder="商品条码" :clearable="true"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input class="w-140" v-model="formData.mc_sp" placeholder="商品名称" :clearable="true"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query">
            <i class="fa fa-search"></i> 查询
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-radio-group v-model="tagSelected">
      <el-radio-button label="summary">汇总</el-radio-button>
      <el-radio-button label="detail">明细</el-radio-button>
    </el-radio-group>

    <div style="margin-top: 18px">
      <!-- 汇总报表 -->
      <div v-show="tagSelected === 'summary'">
        <app-table
          ref="summaryEl"
          token="summaryEl"
          :column-defs="summaryColumnDefs"
          :row-data="summaryList"
          :summary="summaryTotal"
          @columns-ready="columns => summaryColumnDefs = columns"/>
      </div>

      <!-- 明细报表 -->
      <div v-show="tagSelected === 'detail'">
        <app-table
          ref="detailEl"
          token="detailEl"
          :column-defs="detailColumnDefs"
          :row-data="detailList"
          :summary="detailTotal"
          @columns-ready="columns => detailColumnDefs = columns"/>
      </div>
    </div>
  </div>
</template>

<script>
import AppTable from '@/components/agGrid/AppTable'
import DateRangePicker from '@/components/DateRangePicker'
import AppPagination from '@/components/AppPagination'

export default {
  name: 'StockScrap',

  components: {
    AppTable, DateRangePicker, AppPagination
  },

  data () {
    return {
      formData: {
        id_spfl: '',
        mc_sp: '',
        barcode: '',
        id_shop: '',
        rq_begin: this.$getFirstDate(),
        rq_end: this.$getLastDate(),
        id_sp: '',
        id_kcsp: ''
      },
      shopList: [],
      tagSelected: 'summary',
      summaryColumnDefs: [
        { headerName: '序', field: 'rownumber', width: 80, suppressSizeToFit: true },
        { headerName: '门店', field: 'mc_shop', width: 110 },
        { headerName: '商品名称', field: 'mc_sp', width: 150 },
        { headerName: '单位', field: 'dw', width: 60 },
        { headerName: '报损数量', field: 'sl', width: 100, cellClass: 'text-align-right', valueFormatter: p => this.$accRound(p.value, 2) },
        { headerName: '商品条码', field: 'barcode', width: 150 },
        { headerName: '商品分类', field: 'mc_spfl', width: 120 }
      ],
      summaryList: [],
      summaryTotal: [ 'sl' ],
      detailColumnDefs: [
        { headerName: '序号', field: 'rownumber', width: 80, suppressSizeToFit: true },
        { headerName: '日期', field: 'rq', width: 100 },
        { headerName: '门店', field: 'mc_shop', width: 110 },
        { headerName: '单号', field: 'dh', width: 120 },
        { headerName: '商品名称', field: 'mc_sp', width: 150 },
        { headerName: '单位', field: 'dw', width: 60 },
        { headerName: '报损数量', field: 'sl', width: 100, cellClass: 'text-align-right', valueFormatter: p => this.$accRound(p.value, 2) },
        { headerName: '原库存数量', field: 'sl_kc', width: 100, cellClass: 'text-align-right', valueFormatter: p => this.$accRound(p.value, 2) },
        { headerName: '商品条码', field: 'barcode', width: 150 },
        { headerName: '商品分类', field: 'mc_spfl', width: 120 }
      ],
      detailList: [],
      detailTotal: [ 'sl', 'sl_kc' ]
    }
  },

  created () {
    this.fetchShopList()
  },

  methods: {
    exportFile () {},

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

    dateChange (begin, end) {
      this.formData.rq_begin = begin
      this.formData.rq_end = end
    },

    query () {
    }
  }
}
</script>

<style>

</style>
