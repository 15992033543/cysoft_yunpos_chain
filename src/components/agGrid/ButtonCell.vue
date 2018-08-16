<template>
  <div class="ag-grid-button-cell">
    <div class="single-line-ellipsis" :title="params.value">{{ params.value }}</div>
    <el-button class="btn" size="mini" type="primary" @click="clickHandler">{{ params.btnName || '选择' }}</el-button>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  methods: {
    clickHandler () {
      this.params.clickCallback && this.params.clickCallback(this.params)
    }
  }
})
</script>

<style lang="scss">
  .ag-grid-button-cell {
    position: relative;
    height: 40px;
    line-height: 39px;
    .btn {
      position: absolute;
      right: 0;
      top: 5px;
      display: none;
    }
  }
  .ag-row:hover .ag-grid-button-cell .btn {
    display: block;
  }
</style>
