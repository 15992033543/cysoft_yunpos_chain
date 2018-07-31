<template>
  <div class="ag-grid-header-custom ag-grid-sort-header-custom" @click="sort" :style="{ color: type !== '' ? '#409EFF' : '#58666e' }">
    {{ params.displayName }}
    <i class="el-icon-d-caret" v-show="type === ''"></i>
    <i class="el-icon-caret-bottom" v-show="type === 'desc'"></i>
    <i class="el-icon-caret-top" v-show="type === 'asc'"></i>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      type: ''
    }
  },

  created () {
    this.params.ready && this.params.ready(this)
  },

  methods: {
    reset (column) {
      if (column === this.params.column.colId) return
      this.type = ''
    },

    sort () {
      this.type === 'desc' ? this.type = 'asc' : this.type = 'desc'
      this.params.sort && this.params.sort({ type: this.type, column: this.params.column.colId })
    }
  }
})
</script>

<style lang="scss">
  .ag-grid-sort-header-custom {
    cursor: pointer;
    position: relative;
  }
</style>
