<template>
  <div>
    <div class="text-align-right">
      <el-form :inline="true" :model="formData">
        <el-form-item>
          <el-button type="primary" @click="exportExcel">导出</el-button>
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
          <el-button type="primary" @click="query">
            <i class="fa fa-search"></i> 查询
          </el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import AppTable from '@/components/agGrid/AppTable'
import DateRangePicker from '@/components/DateRangePicker'
import AppPagination from '@/components/AppPagination'

export default {
  name: 'CashFlow',

  components: {
    AppTable, DateRangePicker, AppPagination
  },

  data () {
    return {
      formData: {
        rq_begin: this.$getFirstDate('yyyy-MM-dd hh:mm:ss'),
        rq_end: this.$getLastDate('yyyy-MM-dd hh:mm:ss')
      },
      shopList: []
    }
  },

  methods: {
    dateChange (begin, end) {
      this.formData.rq_begin = begin
      this.formData.rq_end = end
    },

    exportExcel () {},

    query () {}
  }
}
</script>

<style>

</style>
