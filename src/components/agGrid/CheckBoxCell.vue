<template>
  <div class="ag-grid-checkbox-cell">
    <el-checkbox
      v-if="params.label"
      :label="params.label"
      :value="params.data[params.colDef.field]"
      @change="checkedChange"/>
    <el-checkbox
      v-else
      :value="params.data[params.colDef.field]"
      @change="checkedChange"/>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  created () {
  },
  methods: {
    checkedChange (value) {
      this.params.changeCallback && this.params.changeCallback(this.params.rowIndex, value)
    }
  }
})
</script>

<style lang="scss">
  .ag-grid-checkbox-cell {
    .el-checkbox__input {
      bottom: 2px;
    }
  }
</style>
