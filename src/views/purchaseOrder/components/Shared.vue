<template>
  <div class="purchase-order-share">
    <el-form :inline="true">
      <el-form-item>
        <el-button @click="importIn" type="primary"><i class="fa fa-cloud-upload"></i> 导入</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="importOut" type="primary"><i class="fa fa-cloud-download"></i> 导出</el-button>
      </el-form-item>
      <el-form-item>
        <el-input style="width: 210px" placeholder="输入条形码回车扫描" clearable>
          <el-button slot="append" icon="el-icon-document"></el-button>
        </el-input>
      </el-form-item>
    </el-form>

    <div class="order-card">
      <el-card shadow="hover">
        <div slot="header" class="card-header">
          <span>采购订货</span>
        </div>

        <div class="card-body">
          <el-form :inline="true" :model="formData" label-width="70px">
            <el-form-item label="开单日期" prop="rq">
              <date-picker type="date" :value="formData.rq" @change="date => formData.rq = date" style="width: 160px"/>
            </el-form-item>
            <el-form-item label="单号" prop="dh">
              <el-input v-model="formData.dh" placeholder="请输入单号" clearable class="w-160"></el-input>
            </el-form-item>
            <el-form-item label="订单类型">
              <el-select v-model="formData.flag_ddlx" filterable class="w-160">
                <el-option label="普通订单" :value="0"/>
                <el-option label="总量订单" :value="1"/>
              </el-select>
            </el-form-item>
            <el-form-item label="供应商" prop="dh">
              <el-input v-model="formData.dh" placeholder="请输入单号" clearable class="w-160"></el-input>
            </el-form-item>
            <el-form-item label="订货门店">
              <el-select v-model="formData.flag_ddlx" filterable class="w-160">
                <el-option label="普通订单" value="1"/>
                <el-option label="总量订单" value="2"/>
              </el-select>
            </el-form-item>
            <el-form-item label="经办人">
              <el-select v-model="formData.flag_ddlx" filterable class="w-160">
                <el-option label="普通订单" value="1"/>
                <el-option label="总量订单" value="2"/>
              </el-select>
            </el-form-item>
            <el-form-item label="备注" prop="dh">
              <el-input v-model="formData.dh" placeholder="请输入单号" clearable style="width: 405px"></el-input>
            </el-form-item>
            <el-form-item label="总金额" prop="dh">
              <el-input v-model="formData.dh" placeholder="请输入单号" clearable class="w-160"></el-input>
            </el-form-item>
          </el-form>

          <ag-grid-table
            ref="tableEl"
            :column-defs="columnDefs"
            :row-data="tableData"
            @columns-ready="columns => columnDefs = columns"
            no-data-tips="请添加商品"
            style="height: 300px"/>
        </div>

        <div class="card-btn">
          <el-button type="primary" @click="addRow">增加行</el-button>
          <el-button type="primary">批量修改</el-button>
          <el-button type="primary" @click="batchDel">批量删除</el-button>

          <div style="float: right">
            <div class="total-container">
              <span class="total-label">合计数量：</span>
              <span class="total-value">123</span>
            </div>
            <div class="total-container">
              <span class="total-label">合计金额：</span>
              <span class="total-value">￥222</span>
            </div>
          </div>
        </div>
      </el-card>
    </div>

    <div class="fixed-bottom-bar">
      <el-button type="primary">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>

    <goods-modal ref="goodsModal"/>
  </div>
</template>

<script>
import DatePicker from '@/components/DatePicker'
import AgGridTable from '@/components/agGrid/AgGridTable'
import CheckBoxHeader from '@/components/agGrid/CheckBoxHeader'
import CheckBoxCell from '@/components/agGrid/CheckBoxCell'
import DelectIndexCell from '@/components/agGrid/DelectIndexCell'
import ButtonCell from '@/components/agGrid/ButtonCell'
import GoodsModal from '@/components/GoodsModal'
import InputCell from '@/components/agGrid/InputCell'
import SelectCell from '@/components/agGrid/SelectCell'

export default {
  components: {
    DatePicker,
    AgGridTable,
    GoodsModal
  },

  props: {
    type: {
      type: String,
      required: true
    },
    id: String
  },

  data () {
    return {
      formData: {
        rq: this.$getNowDate(),
        dh: '',
        flag_ddlx: ''
      },
      columnDefs: [],
      tableData: [],
      allCheckedComponent: null,
      allGiveCheckedComponent: null
    }
  },

  created () {
    this.initColumns()
    this.initTableData()
  },

  methods: {
    initColumns () {
      this.columnDefs = [
        {
          field: 'checked',
          width: 60,
          headerComponentFramework: CheckBoxHeader,
          headerComponentParams: {
            changeCallback: this.selectAll,
            ready: vue => {
              this.allCheckedComponent = vue
            }
          },
          cellRendererFramework: CheckBoxCell,
          cellRendererParams: {
            changeCallback: this.selectSingle
          }
        },
        {
          headerName: '序号',
          field: 'index',
          width: 60,
          suppressSizeToFit: true,
          cellRendererFramework: DelectIndexCell,
          cellRendererParams: {
            delCallback: this.delRow
          }
        },
        {
          width: 65,
          field: 'giveChecked',
          headerComponentFramework: CheckBoxHeader,
          headerComponentParams: {
            label: '赠送',
            changeCallback: this.selectGiveAll,
            ready: vue => {
              this.allGiveCheckedComponent = vue
            }
          },
          cellRendererFramework: CheckBoxCell,
          cellRendererParams: {
            changeCallback: this.selectGiveSingle
          }
        },
        {
          headerName: '商品条码',
          field: 'barcode',
          width: 130,
          cellRendererFramework: InputCell,
          cellRendererParams: {
            placeholder: '条码'
          }
        },
        {
          headerName: '商品编码',
          field: 'bm',
          width: 130
        },
        {
          headerName: '商品名称',
          field: 'mc',
          width: 180,
          cellRendererFramework: ButtonCell,
          cellRendererParams: {
            clickCallback: this.showGoodsModal
          }
        },
        {
          headerName: '单位',
          field: 'dw',
          width: 80,
          cellRendererFramework: SelectCell
        },
        {
          headerName: '数量',
          field: 'sl',
          width: 100,
          valueFormatter: p => this.$accRound(p.value, 2),
          cellRendererFramework: InputCell,
          cellRendererParams: {
            placeholder: '数量',
            align: 'right'
          }
        },
        {
          headerName: '单价',
          field: 'dj',
          width: 100,
          valueFormatter: p => this.$accRound(p.value, 2),
          cellRendererFramework: InputCell,
          cellRendererParams: {
            placeholder: '单价',
            align: 'right'
          }
        },
        {
          headerName: '金额',
          field: 'je',
          width: 100,
          valueFormatter: p => this.$accRound(p.value, 2),
          cellRendererFramework: InputCell,
          cellRendererParams: {
            placeholder: '金额',
            align: 'right'
          }
        },
        {
          headerName: '零售价',
          field: 'dj_ls',
          width: 100,
          cellClass: 'text-align-right',
          valueFormatter: p => this.$accRound(p.value, 2)
        },
        {
          headerName: '库存数量',
          field: 'sl_kc',
          width: 100,
          cellClass: 'text-align-right',
          valueFormatter: p => this.$accRound(p.value, 2)
        },
        { headerName: '规格', field: 'gg', width: 100 },
        {
          headerName: '备注',
          field: 'bz',
          width: 130,
          cellRendererFramework: InputCell,
          cellRendererParams: {
            placeholder: '备注'
          }
        }
      ]
    },

    // 导入
    importIn () {},

    // 导出
    importOut () {},

    // 新增一行
    addRow () {
      this.tableData.push(this.getDefaultRow())
    },

    // 获取默认一行
    getDefaultRow () {
      return {
        checked: false,
        giveChecked: false,
        sl: 0,
        dj: 0,
        je: 0,
        dj_ls: 0,
        sl_kc: 0,
        mc: '哈哈哈哈商品商品名称'
      }
    },

    // 删除一行
    delRow (params) {
      const index = params.rowIndex
      this.tableData.splice(index, 1)
    },

    // 初始化数据
    initTableData () {
      for (let i = 0; i < 6; i++) {
        this.tableData.push(this.getDefaultRow())
      }
    },

    // 全选
    selectAll (checked) {
      this.tableData.forEach(e => {
        e.checked = checked
      })
    },

    // 单选
    selectSingle (index, checked) {
      this.tableData[index].checked = checked
      this.allCheckedComponent.setChecked(this.tableData.every(e => e.checked))
    },

    // 赠送全选
    selectGiveAll (checked) {
      this.tableData.forEach(e => {
        e.giveChecked = checked
      })
    },

    // 赠送单选
    selectGiveSingle (index, checked) {
      this.tableData[index].giveChecked = checked
      this.allGiveCheckedComponent.setChecked(this.tableData.every(e => e.giveChecked))
    },

    // 显示商品模态框
    showGoodsModal (params) {
      this.$refs.goodsModal.show()
    },

    // 批量删除
    batchDel () {
      if (this.isNoCheckedData()) {
        this.$message({ message: '请先勾选商品！', type: 'warning' })
        return
      }
      for (let i = this.tableData.length - 1; i > -1; i--) {
        if (this.tableData[i].checked) {
          this.tableData.splice(i, 1)
        }
      }
    },

    // 没有勾选数据？
    isNoCheckedData () {
      return this.tableData.every(e => !e.checked)
    },

    cancel () {
      this.$appPush({ name: 'PurchaseOrderList', closeFrom: true })
    }
  }
}
</script>

<style lang="scss">
</style>
