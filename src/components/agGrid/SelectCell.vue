<template>
  <div class="ag-grid-select-cell">
    <el-select filterable value="瓶" style="width: 100%">
      <el-option label="瓶" value="1"/>
      <el-option label="位" value="2"/>
    </el-select>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
})
</script>

<style lang="scss">
  .ag-grid-select-cell {
    .el-input {
      bottom: 1px;
      font-size: 12px;
      input[type=text] {
        padding-left: 5px;
        padding-right: 5px;
      }
      .el-input__suffix {
        right: 0;
      }
    }
  }
</style>
