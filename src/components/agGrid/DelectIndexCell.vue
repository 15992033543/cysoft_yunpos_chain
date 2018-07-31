<template>
  <div class="ag-grid-delect-index-cell">
    <span>{{ params.rowIndex + 1 }}</span>
    <i class="del-icon fa fa-trash" @click="del"></i>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  methods: {
    del () {
      this.params.delCallback && this.params.delCallback(this.params)
    }
  }
})
</script>

<style lang="scss">
  .ag-grid-delect-index-cell {
    position: relative;
    .del-icon {
      background: #fb523d;
      border-radius: 14px;
      width: 28px;
      height: 28px;
      line-height: 28px;
      font-size: 14px;
      color: #fff;
      position: absolute;
      top: 50%;
      left: 50%;
      margin: -15px 0 0 -14px;
      cursor: pointer;
      display: none;
    }
  }
  .ag-row:hover .ag-grid-delect-index-cell .del-icon {
    display: block;
  }
</style>
