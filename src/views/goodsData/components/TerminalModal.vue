<template>
  <div class="terminal-modal">
    <el-dialog
      title="选择终端类型"
      :visible.sync="visible"
      custom-class="goods-modal-custom">
      <div class="modal-content">
        <ag-grid-table
          style="height: 300px"
          ref="terminalList"
          :column-defs="columnDefs"
          :row-data="tableData"
          :loading="loading"
          :row-clicked="rowClick"
          :row-style="{ cursor: 'pointer' }"
          @columns-ready="columns => columnDefs = columns"/>

        <div class="pagination-container">
          <app-pagination
            @change="paginationChange"
            :current-page="page"
            :page-size="pageSize"
            :total="total"/>
        </div>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import AgGridTable from '@/components/agGrid/AgGridTable'
import AppPagination from '@/components/AppPagination'

export default {
  name: 'TerminalModal',

  components: {
    AgGridTable, AppPagination
  },

  data () {
    return {
      visible: false,
      page: 0,
      pageSize: this.$getLocalPageSize(),
      total: 0,
      tableData: [],
      loading: false,
      columnDefs: [
        {
          headerName: '序号',
          field: 'row_no',
          width: 60,
          suppressSizeToFit: true,
          valueFormatter: p => (p.node.rowIndex + 1) + this.page * this.pageSize
        },
        { headerName: '主用户', field: 'name_masteruser', width: 120 },
        { headerName: '名称', field: 'mc', width: 150 },
        { headerName: '导入导出标识', field: 'name_drlx', width: 100 },
        { headerName: '数据格式', field: 'name_format', width: 150 },
        { headerName: '固定字符', field: 'splitchar', width: 100 },
        { headerName: '备注', field: 'bz', width: 150 }
      ]
    }
  },

  created () {
    this.fetchTerminalList(0)
  },

  methods: {
    paginationChange (page, pageSize) {
      if (pageSize) {
        this.pageSize = pageSize
      }
      this.fetchTerminalList(page || 0)
    },

    fetchTerminalList (page) {
      this.loading = true
      this.page = page
      this.$httpAuth({
        url: '/cjqzdlx/GetListData',
        method: 'get',
        params: {
          page: this.page,
          pageSize: this.pageSize,
          flag_drlx: 2
        }
      }).then(res => {
        this.loading = false
        if (res.Success) {
          this.tableData = res.Data.Data
          this.total = res.Data.TotalCount
        }
      })
    },

    show () {
      this.visible = true
    },

    hide () {
      this.visible = false
    },

    rowClick (row) {
      this.$emit('terminal-select', row)
      this.hide()
    }
  }
}
</script>

<style lang="scss">
  .terminal-modal {
    .goods-modal-custom {
      width: 65%;
      min-width: 840px;
    }
  }
</style>
