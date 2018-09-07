<template>
  <div>
    <div class="text-align-right">
      <!-- 按商品表单 -->
      <el-form ref="formEl" :inline="true" :model="goodsFormData" v-show="this.tagSelected === 'goods'">
        <el-form-item>
          <el-button type="primary" @click="exportGoods">
            <i class="fa fa-cloud-download"></i> 导出
          </el-button>
        </el-form-item>
        <el-form-item>
          <date-picker
            :value="goodsFormData.rq_begin"
            @change="date => goodsFormData.rq_begin = date"
            placeholder="开始时间"/>
          <span>-</span>
          <date-picker
            :value="goodsFormData.rq_end"
            @change="date => goodsFormData.rq_end = date"
            placeholder="结束时间"/>
        </el-form-item>
        <el-form-item>
          <el-select v-model="goodsFormData.id_shop" placeholder="请选择门店" filterable class="w-140">
            <el-option label="全部门店" value=""></el-option>
            <el-option v-for="(shop, index) in shopList" :key="index" :label="shop.mc" :value="shop.id_shop"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-cascader
            class="w-140"
            placeholder="商品分类"
            v-model="goodsClassificationSelected"
            :options="allClassificationList"
            :props="cascaderProps"
            :clearable="true"
            :change-on-select="true"
            :show-all-levels="false"
            filterable></el-cascader>
        </el-form-item>
        <el-form-item>
          <el-input
            class="w-140"
            v-model="goodsFormData.barcode"
            placeholder="商品条码"
            :clearable="true"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input
            class="w-140"
            v-model="goodsFormData.mc_sp"
            placeholder="商品名称"
            :clearable="true"></el-input>
        </el-form-item>
        <el-form-item>
          <el-checkbox>仅查退货商品</el-checkbox>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="query">
            <i class="fa fa-search"></i> 查询
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-radio-group v-model="tagSelected">
      <el-radio-button v-for="item in tags" :key="item.label" :label="item.label">{{ item.name }}</el-radio-button>
    </el-radio-group>
    <div style="margin-top: 18px">
      <ag-grid-table
        v-show="tagSelected === 'goods'"
        ref="goodsEl"
        token="goods"
        :column-defs="goodsColumnDefs"
        :row-data="goodsList"
        :summary="goodsSummary"
        :loading="goodsLoading"
        @columns-ready="columns => goodsColumnDefs = columns"/>
    </div>
    <div class="pagination-container">
      <app-pagination
        v-show="tagSelected === 'goods'"
        @change="goodsPaginationChange"
        :current-page="goodsFormData.page"
        :page-size="goodsFormData.pageSize"
        :total="goodsTotal"/>
    </div>
  </div>
</template>

<script>
import AgGridTable from '@/components/agGrid/AgGridTable'
import AppPagination from '@/components/AppPagination'
import DatePicker from '@/components/DatePicker'

export default {
  name: 'GoodsRetailSummary',

  components: {
    AgGridTable, DatePicker, AppPagination
  },

  data () {
    return {
      tags: [
        { label: 'goods', name: '按商品' },
        { label: 'little', name: '按小类' },
        { label: 'big', name: '按大类' },
        { label: 'cashier', name: '按收银员' },
        { label: 'brand', name: '按品牌' },
        { label: 'shop', name: '按门店' }
      ],
      tagSelected: 'goods',
      shopList: [],
      allClassificationList: [],
      bigClassificationList: [],
      cascaderProps: {
        value: 'id',
        label: 'text'
      },
      goodsFormData: {
        rq_begin: this.$getFirstDate(),
        rq_end: this.$getLastDate(),
        id_shop: '',
        id_spfl: '',
        page: 0,
        pageSize: this.$getLocalPageSize()
      },
      goodsColumnDefs: [
        { headerName: '序', field: 'row_no', width: 80, suppressSizeToFit: true },
        { headerName: '日期', field: 'rq', width: 80 },
        { headerName: '门店', field: 'mc_shop', width: 120 },
        { headerName: '商品条码', field: 'barcode', width: 150 },
        { headerName: '商品编码', field: 'bm', width: 150 },
        { headerName: '商品名称', field: 'mc_sp', width: 150 },
        { headerName: '单位', field: 'dw', width: 60 },
        { headerName: '零售数量', field: 'sl', width: 100, cellClass: 'text-align-right', valueFormatter: p => this.$accRound(p.value, 2) },
        { headerName: '零售金额', field: 'je', width: 100, cellClass: 'text-align-right', valueFormatter: p => this.$accRound(p.value, 2) },
        { headerName: '退货数量', field: 'sl_th', width: 100, cellClass: 'text-align-right', valueFormatter: p => this.$accRound(p.value, 2) },
        { headerName: '退货金额', field: 'je_th', width: 100, cellClass: 'text-align-right', valueFormatter: p => this.$accRound(p.value, 2) },
        { headerName: '数量小计', field: 'sl_total', width: 100, cellClass: 'text-align-right', valueFormatter: p => this.$accRound(p.value, 2) },
        { headerName: '金额小计', field: 'je_total', width: 100, cellClass: 'text-align-right', valueFormatter: p => this.$accRound(p.value, 2) },
        { headerName: '成本', field: 'je_cb', width: 100, cellClass: 'text-align-right', valueFormatter: p => this.$accRound(p.value, 2) },
        { headerName: '毛利', field: 'je_ml', width: 100, cellClass: 'text-align-right', valueFormatter: p => this.$accRound(p.value, 2) },
        { headerName: '毛利率', field: 'mll', width: 100, cellClass: 'text-align-right', valueFormatter: p => `${this.$accRound(this.$accMul(p.value, 100), 2)}%` },
        { headerName: '商品分类', field: 'mc_spfl', width: 120 }
      ],
      goodsList: [],
      goodsLoading: false,
      goodsClassificationSelected: [],
      goodsSummary: [ 'sl', 'je', 'sl_th', 'je_th', 'sl_total', 'je_total', 'je_cb', 'je_ml', 'mll' ],
      goodsTotal: 0
    }
  },

  created () {
    this.fetchShopList()
    this.fetchAllClassificationList()
    this.fetchBigClassificationList()
  },

  methods: {
    // 获取下拉门店列表
    fetchShopList () {
      this.$httpAuth({
        url: '/SearchCondition/GetShop',
        method: 'get'
      }).then(res => {
        if (Array.isArray(res)) {
          this.shopList = res
        }
      })
    },

    // 获取所有分类
    fetchAllClassificationList () {
      this.$httpAuth({
        url: '/shopsp/get_left_tree',
        method: 'get'
      }).then(res => {
        if (Array.isArray(res)) {
          this.allClassificationList = this.$recursionDataHandler(res, '0')
        }
      })
    },

    // 获取大分类
    fetchBigClassificationList () {
      this.$httpAuth({
        url: '/SearchCondition/GetFirstSpflTree',
        method: 'get'
      }).then(res => {
        if (Array.isArray(res)) {
          this.bigClassificationList = res
        }
      })
    },

    // 按商品查询
    fetchGoodsList () {
      this.goodsLoading = true
      this.goodsFormData.id_spfl = this.goodsClassificationSelected.join(',')
      this.$httpAuth({
        url: '/report/spxshzreportapi',
        method: 'get',
        params: this.goodsFormData
      }).then(res => {
        this.goodsLoading = false
        if (Array.isArray(res.rList)) {
          const summaryData = res.rList.pop()
          this.goodsTotal = Number(res.outstr)
          this.$refs.goodsEl.setPinnedBottomRowData(summaryData)
          this.goodsList = res.rList
        }
      })
    },

    // 按商品导出
    exportGoods () {},

    goodsPaginationChange (page, pageSize) {
      this.goodsFormData.page = page
      this.goodsFormData.pageSize = pageSize
      this.fetchGoodsList()
    },

    query () {
      this.goodsFormData.page = 0
      this.fetchGoodsList()
    }
  }
}
</script>

<style>
</style>
