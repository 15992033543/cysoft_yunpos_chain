<template>
  <div class="goods-modal">
    <el-dialog
      title="选择商品"
      :visible.sync="visible"
      custom-class="goods-modal-custom">
      <div class="modal-content">
        <div class="left">
          <el-card class="classification-card" shadow="none">
            <div class="header" slot="header">
              <span>商品分类</span>
            </div>
            <div>
              <el-input
                placeholder="搜索分类"
                prefix-icon="el-icon-search"
                clearable>
              </el-input>
              <el-tree
                :data="classification"
                :highlight-current="true"
                :expand-on-click-node="false"
                style="margin-top: 10px"></el-tree>
            </div>
          </el-card>
        </div>

        <div class="right">
          <div>
            <el-form :inline="true" :model="formData" style="overflow: hidden">
              <div style="float: left">
                <el-form-item>
                  <el-button type="primary" @click="addGoods">
                    <i class="fa fa-plus"></i> 新增商品
                  </el-button>
                </el-form-item>
              </div>
              <div class="text-align-right" style="float: right">
                <el-form-item>
                  <el-select v-model="formData.flag_state" filterable class="w-160">
                    <el-option label="全部供应商" value=""/>
                    <el-option label="正常" value="1"/>
                    <el-option label="停用" value="2"/>
                  </el-select>
                </el-form-item>
                <el-form-item>
                  <el-input v-model="formData.barcode" placeholder="商品条码/编码/名称/助记码" clearable></el-input>
                </el-form-item>
                <el-form-item>
                  <el-button type="primary">
                    <i class="fa fa-search"></i> 查询
                  </el-button>
                </el-form-item>
              </div>
            </el-form>
          </div>
          <ag-grid-table
            :column-defs="columnDefs"
            :row-data="tableData"
            @columns-ready="columns => columnDefs = columns"
            style="height: 380px"/>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="hide">取 消</el-button>
        <el-button type="primary" @click="hide">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
import AgGridTable from '@/components/agGrid/AgGridTable'
import AppPagination from '@/components/AppPagination'
import CheckBoxHeader from '@/components/agGrid/CheckBoxHeader'
import CheckBoxCell from '@/components/agGrid/CheckBoxCell'

export default {
  name: 'GoodsModal',

  components: {
    AgGridTable, AppPagination
  },

  data () {
    return {
      visible: false,
      classification: [{
        label: '一级 1',
        children: [{
          label: '二级 1-1',
          children: [{
            label: '三级 1-1-1'
          }]
        }]
      }, {
        label: '一级 2',
        children: [{
          label: '二级 2-1',
          children: [{
            label: '三级 2-1-1'
          }]
        }, {
          label: '二级 2-2',
          children: [{
            label: '三级 2-2-1'
          }]
        }]
      }, {
        label: '一级 3',
        children: [{
          label: '二级 3-1',
          children: [{
            label: '三级 3-1-1'
          }]
        }, {
          label: '二级 3-2',
          children: [{
            label: '三级 3-2-1'
          }]
        }]
      }],
      columnDefs: [
        {
          headerName: '序号',
          field: 'checked',
          width: 60,
          suppressSizeToFit: true,
          headerComponentFramework: CheckBoxHeader,
          cellRendererFramework: CheckBoxCell
        },
        { headerName: '序号', field: 'row_no', width: 60, suppressSizeToFit: true },
        { headerName: '商品条码', field: 'rq', width: 130 },
        { headerName: '商品编码', field: 'week', width: 130 },
        { headerName: '商品名称', field: 'mc_shop', width: 180 },
        { headerName: '商品分类', field: 'je_xs', width: 110 },
        { headerName: '单位', field: 'je_yh', width: 100 },
        { headerName: '零售价', field: 'je_ys', width: 100 },
        { headerName: '进货价', field: 'je_cb', width: 100 },
        { headerName: '会员价', field: 'je_ml', width: 100 },
        { headerName: '批发价', field: 'mll', width: 100 },
        { headerName: '配送价', field: 'sl_cust', width: 100 },
        { headerName: '规格', field: 'gg', width: 100 },
        { headerName: '状态', field: 'afd', width: 100 }
      ],
      tableData: [{}, {}, {}, {}, {}, {}, {}],
      formData: {}
    }
  },

  methods: {
    show () {
      this.visible = true
    },

    hide () {
      this.visible = false
    },

    addGoods () {
      this.hide()
      this.$appPush({ name: 'GoodsDataAdd' })
    }
  }
}
</script>

<style lang="scss">
  .goods-modal {
    .goods-modal-custom {
      width: 80%;
      min-width: 1000px;
    }
    .modal-content {
      overflow: hidden;
      .el-form-item {
        margin-bottom: 10px;
      }
      .left {
        width: 200px;
        float: left;
        margin-right: 12px;
        height: 421px;
      }
      .right {
        overflow: hidden;
      }
    }
  }
</style>
