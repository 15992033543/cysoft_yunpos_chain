<template>
  <div class="goods-unit-list">
    <el-form :inline="true" :model="formData" style="overflow: hidden">
      <div style="float: left">
        <el-form-item>
          <el-button type="primary" @click="add">
            <i class="fa fa-plus"></i> 新增单位
          </el-button>
        </el-form-item>
      </div>
      <div class="text-align-right" style="float: right">
        <el-form-item>
          <el-input placeholder="单位名称" class="w-160" clearable></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">
            <i class="fa fa-search"></i> 查询
          </el-button>
        </el-form-item>
      </div>
    </el-form>

    <ag-grid-table
      :column-defs="columnDefs"
      :row-data="tableData"
      :loading="loading"
      @columns-ready="columns => columnDefs = columns"/>

    <div class="pagination-container">
      <app-pagination
        @change="paginationChange"
        :current-page="formData.page"
        :page-size="formData.pageSize"
        :total="total"/>
    </div>

    <add-modal ref="addModal" @success="addSuccessed"/>
  </div>
</template>

<script>
import AgGridTable from '@/components/agGrid/AgGridTable'
import OperationCell from '@/components/agGrid/OperationCell'
import AppPagination from '@/components/AppPagination'
import AddModal from './components/AddModal'

export default {
  name: 'GoodsUnitList',

  components: {
    AgGridTable, AppPagination, AddModal
  },

  data () {
    return {
      formData: {
        page: 0,
        pageSize: this.$getLocalPageSize()
      },
      total: 0,
      columnDefs: [
        {
          headerName: '序号',
          field: 'row_no',
          width: 100,
          suppressSizeToFit: true,
          valueFormatter: p => (p.node.rowIndex + 1) + this.formData.page * this.formData.pageSize
        },
        {
          headerName: '单位名称',
          field: 'mc',
          width: 200
        },
        {
          headerName: '操作',
          field: 'op',
          width: 150,
          suppressSizeToFit: true,
          cellRendererFramework: OperationCell,
          cellRendererParams: {
            btns: [
              { btnClass: 'fa fa-trash', btnName: '删除', callback: this.del }
            ]
          }
        }
      ],
      tableData: [],
      loading: false
    }
  },

  created () {
  },

  methods: {
    add () {
      this.$refs.addModal.show()
    },

    del () {
    },

    paginationChange (page, pageSize) {
    },

    addSuccessed () {
      console.log('bbb')
    }
  }
}
</script>

<style lang="scss">
</style>
