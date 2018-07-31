<template>
  <ag-grid-vue
    ref="agGridVue"
    class="ag-theme-balham"
    :grid-options="gridOptions"
    style="height: 505px; width: 100%"
    :row-height="40"
    :header-height="40"
    :column-defs="columnDefs"
    :row-data="rowData"
    :enable-col-resize="enableColResize"
    :overlay-no-rows-template="overlayNoRowsTemplate"
    :overlay-loading-template="overlayLoadingTemplate"
    :suppress-drag-leave-hides-columns="true"
    :grid-ready="onGridReady"
    :default-col-def="defaultColDef"
    :column-resized="onColumnResize"
    :column-moved="onColumnMoved"
    :row-clicked="rowClicked"/>
</template>

<script>
import { AgGridVue } from 'ag-grid-vue'
import NormalHeader from './NormalHeader'

export default {
  components: {
    AgGridVue
  },

  props: {
    token: {
      type: String,
      default: 'token'
    },

    columnDefs: {
      required: true,
      type: Array
    },

    rowData: {
      required: true,
      type: Array
    },

    enableColResize: {
      type: Boolean,
      default: true
    },

    noDataTips: {
      type: String,
      default: '没有查询到相关数据'
    },

    loadingTips: {
      type: String,
      default: '请稍候...'
    },

    summary: Array,

    gridReady: Function,

    loading: Boolean,

    rowClicked: Function,

    rowStyle: Object
  },

  data () {
    return {
      gridOptions: {
        suppressPropertyNamesCheck: true,
        suppressCellSelection: true
      },
      defaultColDef: {
        headerComponentFramework: NormalHeader,
        cellClass: 'text-align-center'
      },
      id: `${this.$parent.$options.name}-${this.token}`,
      exportField: '',
      overlayNoRowsTemplate: `<span class="nodate-tips">${this.noDataTips}</span>`,
      overlayLoadingTemplate: `<div class="loading-tips"><i class="el-icon-loading"></i>${this.loadingTips}</div>`
    }
  },

  created () {
    this.rowStyle && (this.gridOptions.rowStyle = this.rowStyle)
  },

  watch: {
    loading () {
      if (this.loading) {
        this.showLoadingOverlay()
      } else {
        this.hideOverlay()
      }
    }
  },

  methods: {
    setPinnedBottomRowData (data) {
      const o = {}
      const keys = this.summary
      this.gridOptions.columnDefs.forEach(e => {
        const index = keys.indexOf(e.field)
        if (index !== -1) {
          o[e.field] = data && data[keys[index]] ? data[keys[index]] : 0
        } else {
          o[e.field] = undefined
        }
      })
      this.gridOptions.api.setPinnedBottomRowData([o])
    },

    onGridReady (params) {
      const columns = this.initColumns()
      this.$emit('columns-ready', columns)
      this.hideOverlay()
      this.$nextTick(() => {
        this.summary && this.setPinnedBottomRowData()
        const isFit = this.isFit(columns)
        if (isFit) {
          this.sizeColumnsTofit()
        }
      })
      this.gridReady && this.gridReady(params)
    },

    isFit (columns) {
      const clientWidth = this.$refs.agGridVue.$el.clientWidth
      let totalWidth = 0
      if (Array.isArray(columns)) {
        columns.forEach(e => {
          totalWidth += e.width
        })
      }
      return clientWidth > totalWidth
    },

    // 如果没本地数据，平均分配列宽
    sizeColumnsTofit () {
      this.getLocalColumns().length === 0 && this.gridOptions.api.sizeColumnsToFit()
    },

    // 初始化列宽以及位置
    initColumns () {
      const localColumns = this.getLocalColumns(this.id)
      const columns = this.$deepClone(this.columnDefs)
      if (localColumns.length === 0) return columns
      for (let i = 0; i < columns.length; i++) {
        const col = columns[i]
        for (let j = 0; j < localColumns.length; j++) {
          const loalCol = localColumns[j]
          if (col.field === loalCol.field) {
            col.width = loalCol.width
            col.index = loalCol.index
            break
          }
        }
      }
      return columns.sort((e1, e2) => {
        return Number(e1.index) - Number(e2.index)
      })
    },

    // 列宽拖动事件
    onColumnResize (params) {
      if (params.finished) {
        this.setLocalColumns(params)
      }
    },

    // 列拖动事件
    onColumnMoved (params) {
      this.setLocalColumns(params)
    },

    // 将信息保存到本地
    setLocalColumns (params) {
      const localColumns = []
      params.columnApi.getAllGridColumns().forEach((ele, index) => {
        const o = {
          width: ele.actualWidth,
          field: ele.colDef.field,
          index: index
        }
        localColumns.push(o)
      })
      window.localStorage.setItem(this.id, JSON.stringify(localColumns))
    },

    // 获取本地列信息
    getLocalColumns () {
      const localStr = window.localStorage.getItem(this.id)
      return localStr ? JSON.parse(localStr) : []
    },

    showLoadingOverlay () {
      this.gridOptions.api.showLoadingOverlay()
    },

    hideOverlay () {
      this.gridOptions.api.hideOverlay()
    },

    showNoRowsOverlay () {
      this.gridOptions.api.showNoRowsOverlay()
    },

    getExportField () {
      const visibleColumns = []
      let index = 0
      this.gridOptions.columnApi.getAllGridColumns().forEach(ele => {
        if (ele.visible) {
          const headerName = ele.colDef.headerName
          const field = ele.colDef.field
          const o = {
            Index: index,
            ColumnName: headerName,
            ColumnValue: field,
            Addition: false
          }
          visibleColumns.push(o)
          index++
        }
      })
      return JSON.stringify(visibleColumns)
    }
  }
}
</script>
