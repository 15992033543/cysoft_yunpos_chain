<template>
  <el-pagination
    background
    @size-change="pageSizeChange"
    @current-change="currentPageChange"
    :current-page="currentPage + 1"
    :page-sizes="pageSizes"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="total">
  </el-pagination>
</template>

<script>
export default {
  props: {
    pageSizes: {
      type: Array,
      default: () => [ 10, 20, 30, 50, 80, 100, 200, 300, 400, 500 ]
    },
    pageSize: {
      type: Number,
      default: Number(window.localStorage.getItem('pageSize')) || 10
    },
    currentPage: {
      type: Number,
      default: 1
    },
    total: {
      type: Number,
      default: 0
    }
  },

  methods: {
    pageSizeChange (pageSize) {
      window.localStorage.setItem('pageSize', pageSize)
      this.$emit('change', null, pageSize)
    },

    currentPageChange (currentPage) {
      this.$emit('change', currentPage - 1, null)
    }
  }
}
</script>

<style>

</style>
