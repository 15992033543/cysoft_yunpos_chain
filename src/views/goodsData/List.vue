<template>
  <div class="goods-data-list">
    <!-- 表单部分 -->
    <el-form :inline="true" :model="formData" style="overflow: hidden">
      <!-- 左边按钮部分 -->
      <div style="float: left">
        <el-form-item>
          <el-button type="primary" @click="add">
            <i class="fa fa-plus"></i> 新增商品
          </el-button>
        </el-form-item>

        <el-form-item>
          <el-dropdown split-button trigger="click" placement="bottom">
            <i class="fa fa-cloud-upload"></i> 批量导入
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>采集器导入</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-form-item>

        <el-form-item>
          <el-dropdown split-button trigger="click" placement="bottom" @click="exportExcel">
            <i class="fa fa-cloud-download"></i> 导出Excel
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item @click.native="exportTxt">导出采集器文件</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </el-form-item>

        <el-form-item>
          <el-button @click="batchDel">
            <i class="fa fa-trash"></i> 批量删除
          </el-button>
        </el-form-item>
      </div>

      <!-- 右边表单部分 -->
      <div class="text-align-right" style="float: right">
        <div>
          <el-form-item>
            <el-input class="w-160" v-model="formData.barcode" placeholder="商品条码" clearable></el-input>
          </el-form-item>

          <el-form-item>
            <el-input class="w-160" v-model="formData.bm" placeholder="商品编码" clearable></el-input>
          </el-form-item>

          <el-form-item>
            <el-input class="w-160" v-model="formData.mc" placeholder="商品名称" clearable></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="query">
              <i class="fa fa-search"></i> 查询
            </el-button>
          </el-form-item>

          <el-form-item>
            <el-button @click="moreInfoVisible = !moreInfoVisible">更多条件 <i class="fa fa-level-down"></i></el-button>
          </el-form-item>
        </div>

        <!-- 隐藏的表单部分 -->
        <el-collapse-transition>
          <div v-show="moreInfoVisible">
            <div>
              <el-form-item label="状态">
                <el-select v-model="formData.flag_state" filterable style="width: 100px">
                  <el-option label="全部" value=""/>
                  <el-option label="正常" value="1"/>
                  <el-option label="停用" value="2"/>
                </el-select>
              </el-form-item>

              <el-form-item label="供应商">
                <el-select v-model="formData.id_gys" filterable class="w-150">
                  <el-option label="全部供应商" value=""/>
                  <el-option v-for="item in supplierList" :key="item.id" :label="item.mc" :value="item.id"/>
                </el-select>
              </el-form-item>

              <el-form-item label="计量方式">
                <el-select v-model="formData.flag_czfs" filterable class="w-150">
                  <el-option label="全部" value=""/>
                  <el-option label="普通" value="0"/>
                  <el-option label="称重" value="1"/>
                  <el-option label="计件" value="2"/>
                </el-select>
              </el-form-item>

              <el-form-item label="品牌">
                <el-select v-model="formData.id_pp" filterable class="w-150">
                  <el-option label="全部品牌" value=""/>
                  <el-option v-for="item in brandList" :key="item.id" :label="item.mc" :value="item.id"/>
                </el-select>
              </el-form-item>
            </div>

            <div>
              <el-form-item label="助记码">
                <el-input v-model="formData.zjm" placeholder="助记码" clearable class="w-150"></el-input>
              </el-form-item>

              <el-form-item label="规格">
                <el-input v-model="formData.gg" placeholder="规格" clearable class="w-150"></el-input>
              </el-form-item>

              <el-form-item label="产地">
                <el-input v-model="formData.cd" placeholder="产地" clearable class="w-150"></el-input>
              </el-form-item>
            </div>
          </div>
        </el-collapse-transition>
      </div>
    </el-form>

    <!-- 中间部分（分类以及表格） -->
    <div>
      <div class="goods-classification" ref="classification">
        <el-card class="classification-card" shadow="hover">
          <div slot="header" class="header">
            <span style="margin-right: 10px">商品分类</span>
            <el-button type="text">编辑</el-button>
            <el-button type="text" @click="fetchClassificationList">刷新</el-button>
          </div>
          <div v-loading="cLoading">
            <el-input
              placeholder="搜索分类"
              prefix-icon="el-icon-search"
              v-model="keyword"
              clearable>
            </el-input>
            <el-tree
              ref="elTree"
              empty-text="暂无分类数据"
              label="name"
              :data="classificationList"
              :highlight-current="true"
              :expand-on-click-node="false"
              :props="treeProps"
              :default-expanded-keys="['0']"
              :filter-node-method="treeFilter"
              @node-click="query"
              node-key="id"
              class="tree-custom"></el-tree>
          </div>
        </el-card>
      </div>

      <div class="table-container">
        <app-table
          ref="goodsList"
          :column-defs="columnDefs"
          :row-data="tableData"
          :loading="tLoading"
          :grid-ready="tableReady"
          @columns-ready="columns => columnDefs = columns"/>
      </div>
    </div>

    <!-- 分页部分 -->
    <div class="pagination-container">
      <app-pagination
        @change="paginationChange"
        :current-page="formData.page"
        :page-size="formData.pageSize"
        :total="total"/>
    </div>

    <!-- 其它部分（组件） -->
    <terminal-modal ref="terminalModal" @terminal-select="terminalSelect"/>
    <confirm-modal ref="confirmModal"/>
  </div>
</template>

<script>
import AppTable from '@/components/agGrid/AppTable'
import AppPagination from '@/components/AppPagination'
import CheckBoxHeader from '@/components/agGrid/CheckBoxHeader'
import CheckBoxCell from '@/components/agGrid/CheckBoxCell'
import OperationCell from '@/components/agGrid/OperationCell'
import TerminalModal from './components/TerminalModal'
import ConfirmModal from '@/components/ConfirmModal'
import SortHeader from '@/components/agGrid/SortHeader'

export default {
  name: 'GoodsDataList',

  components: {
    AppTable,
    AppPagination,
    TerminalModal,
    ConfirmModal
  },

  data () {
    return {
      formData: {
        barcode: '',
        mc: '',
        bm: '',
        flag_state: '1',
        id_gys: '',
        flag_czfs: '',
        id_pp: '',
        zjm: '',
        gg: '',
        cd: '',
        special_order_field: '',
        special_order_descasc: '',
        page: 0,
        pageSize: this.$getLocalPageSize()
      },
      moreInfoVisible: false,
      classificationList: [],
      cLoading: true,
      treeProps: {
        label: 'name'
      },
      sortHeaderComponents: [],
      allCheckedComponent: null,
      columnDefs: [
        {
          field: 'checked',
          width: 40,
          suppressSizeToFit: true,
          headerComponentFramework: CheckBoxHeader,
          cellRendererFramework: CheckBoxCell,
          headerComponentParams: {
            changeCallback: this.selectAll,
            ready: vue => {
              this.allCheckedComponent = vue
            }
          },
          cellRendererParams: {
            changeCallback: this.selectSingle
          }
        },
        {
          headerName: '序号',
          field: 'row_no',
          width: 40,
          suppressSizeToFit: true,
          cellRendererParams: {
            filter: p => (p.node.rowIndex + 1) + this.formData.page * this.formData.pageSize
          }
        },
        {
          headerName: '商品条码',
          field: 'barcode',
          width: 100,
          suppressSizeToFit: true,
          headerComponentFramework: SortHeader,
          headerComponentParams: {
            sort: this.sort,
            ready: vue => { // ready返回组件实例
              this.pushSortHeader(vue)
            }
          }
        },
        {
          headerName: '商品编码',
          field: 'bm',
          width: 100,
          suppressSizeToFit: true,
          headerComponentFramework: SortHeader,
          headerComponentParams: {
            sort: this.sort,
            ready: vue => {
              this.pushSortHeader(vue)
            }
          }
        },
        {
          headerName: '商品名称',
          field: 'mc',
          width: 150,
          suppressSizeToFit: true,
          headerComponentFramework: SortHeader,
          headerComponentParams: {
            sort: this.sort,
            ready: vue => {
              this.pushSortHeader(vue)
            }
          }
        },
        { headerName: '商品分类', field: 'spfl_mc', width: 100 },
        { headerName: '单位', field: 'dw', width: 50 },
        {
          headerName: '零售价',
          field: 'dj_ls',
          width: 80,
          cellRendererParams: {
            cellClass: 'text-align-right',
            filter: p => this.$accRound(p.value, 2)
          }
        },
        {
          headerName: '进货价',
          field: 'dj_jh',
          width: 80,
          cellRendererParams: {
            cellClass: 'text-align-right',
            filter: p => this.$accRound(p.value, 2)
          }
        },
        {
          headerName: '会员价',
          field: 'dj_hy',
          width: 80,
          cellRendererParams: {
            cellClass: 'text-align-right',
            filter: p => this.$accRound(p.value, 2)
          }
        },
        {
          headerName: '批发价',
          field: 'dj_pf',
          width: 80,
          cellRendererParams: {
            cellClass: 'text-align-right',
            filter: p => this.$accRound(p.value, 2)
          }
        },
        {
          headerName: '配送价',
          field: 'dj_ps',
          width: 80,
          cellRendererParams: {
            cellClass: 'text-align-right',
            filter: p => this.$accRound(p.value, 2)
          }
        },
        { headerName: '规格', field: 'gg', width: 90 },
        {
          headerName: '状态',
          field: 'flag_state',
          width: 60,
          cellRendererParams: {
            cellClass: p => {
              return p.value === 1 ? 'verify-text-color' : 'no-verify-text-color'
            },
            filter: p => {
              return p.value === 1 ? '正常' : '停用'
            }
          }
        },
        {
          headerName: '操作',
          field: 'op',
          width: 120,
          suppressSizeToFit: true,
          lockPinned: true,
          pinned: 'right',
          suppressResize: true,
          suppressMovable: true,
          cellRendererFramework: OperationCell, // 操作拦组件
          cellRendererParams: {
            btns: [ // 操作栏按钮
              { btnClass: 'fa fa-copy', btnName: '复制', callback: this.copy },
              { btnClass: 'fa fa-pencil', btnName: '编辑', callback: this.edit },
              { btnClass: 'fa fa-trash', btnName: '删除', callback: this.del }
            ]
          }
        }
      ],
      tableData: [],
      tLoading: false,
      total: 0,
      supplierList: [],
      brandList: [],
      keyword: ''
    }
  },

  watch: {
    keyword (val) {
      this.$refs.elTree.filter(val)
    }
  },

  created () {
    this.fetchSupplierList()
    this.fetchBrandList()
  },

  methods: {
    // 删除
    del (row) {
      this.delSumbit(row.data.id)
    },

    // 批量删除
    batchDel () {
      const ids = this.getCheckedIds()
      if (!ids) {
        this.$message({
          type: 'info',
          message: '请先勾选一个商品！'
        })
        return
      }
      this.delSumbit(ids)
    },

    // 提交删除
    delSumbit (ids) {
      // this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
      //   confirmButtonText: '确定',
      //   cancelButtonText: '取消',
      //   type: 'warning',
      //   beforeClose: (action, instance, done) => {
      //     console.log(action, instance.$el, done)
      //   }
      // })

      // this.$refs.confirmModal.show('没发生任何业务的商品才能删除，您确认删除选中商品？', () => {
      //   this.$httpAuth({
      //     url: '/shopsp/delete',
      //     method: 'post',
      //     params: { spIDs: ids }
      //   }).then(res => {
      //     if (res.status === 'success') {
      //       this.$message({
      //         type: 'success',
      //         message: '删除成功！'
      //       })
      //       this.fetchGoodsList()
      //       this.$refs.confirmModal.hide()
      //     } else {
      //       this.$message({
      //         type: 'error',
      //         message: res.message
      //       })
      //       this.$refs.confirmModal.hideLoading()
      //     }
      //   })
      // })
    },

    // table初始化完成回调
    tableReady () {
      // 在这里获取分类是为了让table也处于loading状态
      this.fetchClassificationList()
    },

    // 多选
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

    // 新增
    add () {
      this.$appPush({ name: 'GoodsDataAdd', closeTo: true })
    },

    // 编辑
    edit () {
      this.$appPush({ name: 'GoodsDataEdit', query: { id: '3312' }, refresh: true })
    },

    // 分页回调
    paginationChange (page, pageSize) {
      this.formData.pageSize = pageSize
      this.formData.page = page
      this.fetchGoodsList()
    },

    // 获取品牌
    fetchBrandList () {
      this.$httpAuth({
        url: '/ShopSp/GetPpList',
        method: 'get'
      }).then(res => {
        if (res.Success) {
          this.brandList = res.Data
        }
      })
    },

    // 获取供应商列表
    fetchSupplierList () {
      this.$httpAuth({
        url: '/Gys/GetGysApi',
        method: 'get'
      }).then(res => {
        if (Array.isArray(res)) {
          this.supplierList = res
        }
      })
    },

    // 获取商品分类列表
    fetchClassificationList () {
      this.cLoading = true
      this.tLoading = true
      this.$httpAuth({
        url: '/SearchCondition/GetSpflTree',
        method: 'get'
      }).then(res => {
        this.cLoading = false
        if (Array.isArray(res)) {
          this.classificationList = this.$recursionDataHandler(res, '#')
          this.$nextTick(() => {
            this.$refs.elTree.setCurrentKey('0')
            this.query()
          })
        }
      })
    },

    // 获取商品列表
    fetchGoodsList () {
      this.tLoading = true
      this.formData.id_spfl = this.$refs.elTree.getCurrentKey()
      this.$httpAuth({
        url: '/shopsp/GetListData',
        method: 'get',
        params: this.formData
      }).then(res => {
        this.tLoading = false
        if (res.Success) {
          const list = res.Data.Data.rList
          list.forEach(e => {
            e.checked = false
          })
          this.tableData = list
          this.total = Number(res.Data.Data.outstr)
        }
      })
    },

    // 导出（有勾选只导出勾选的，没勾选导出全部）
    exportExcel () {
      this.formData.spIDs = this.getCheckedIds()
      this.$exportFile('/shopsp/export', this.formData)
    },

    // 采集器导出
    exportTxt () {
      this.$httpAuth({
        url: '/Cjqzdlx/GetDefaultZdlx',
        params: { flag_drlx: 2 },
        method: 'get'
      }).then(res => {
        // 如果成功，直接导出，不成功，则弹出一个选择终端类型的弹窗，选择终端后再导出
        if (res.Success) {
          this.formData.spIDs = this.getCheckedIds()
          this.formData.id_zdlx = res.Data // 传一个终端类型的id
          this.$exportFile('/Shopsp/ExportForCJQ', this.formData)
        } else {
          this.$refs.terminalModal.show()
        }
      })
    },

    // 选择终端回调
    terminalSelect (row) {
      console.log(row)
      // this.formData.spIDs = this.getCheckedIds()
      // this.formData.id_zdlx = data.Data // 传一个终端类型的id
      // this.$exportFile('/Shopsp/ExportForCJQ', this.formData)
    },

    // 获取勾选的数据的id
    getCheckedIds () {
      const ids = []
      this.tableData.forEach(e => {
        if (e.checked) {
          ids.push(e.id)
        }
      })
      return ids.join(',')
    },

    // 分类搜索
    treeFilter (value, data) {
      if (!value) return true
      return data.name.indexOf(value) !== -1
    },

    // 点击排序后的回调
    sort (instance) {
      const column = instance.column
      this.formData.special_order_field = column
      this.formData.special_order_descasc = instance.type
      this.query()
      this.resetSort(column)
    },

    // 点击一个排序后，重置其它排序的状态
    resetSort (column) {
      this.sortHeaderComponents.forEach(e => {
        e.reset(column)
      })
    },

    // 将所有排序header实例添加到数组中
    pushSortHeader (vue) {
      const index = this.sortHeaderComponents.findIndex(e => e.params.column.colId === vue.params.column.colId)
      index !== -1 && this.sortHeaderComponents.splice(index, 1)
      this.sortHeaderComponents.push(vue)
    },

    query () {
      this.formData.page = 0
      this.fetchGoodsList()
    }
  }
}
</script>

<style lang="scss">
  .goods-data-list {
    .el-dropdown__caret-button {
      border-left: 1px solid #dcdfe6;
    }
    .goods-classification {
      width: 200px;
      height: 504px;
      float: left;
      margin-right: 20px;
      position: relative;
      transition: margin-left 0.5s;

      .tree-custom {
        margin-top: 10px;
        height: 400px;
        width: 100%;
        overflow: auto;
      }
    }
    .table-container {
      overflow: hidden;
    }
  }
</style>
