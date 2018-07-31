<template>
  <div class="ag-grid-operation-cell">
    <a
      v-for="(item, index) in params.btns"
      :key="index"
      v-if="!visible(item)"
      :class="item.btnClass"
      :title="item.btnName"
      @click="btnClick(item)"></a>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  created () {
  },

  methods: {
    visible (item) {
      if (typeof item.hide === 'boolean') {
        return item.hide
      }
      if (typeof item.hide === 'function') {
        return item.hide(this.params)
      }
      return false
    },

    btnClick (item) {
      item.callback && item.callback(this.params)
    }
  }
})
</script>

<style lang="scss">
  .ag-grid-operation-cell {
    line-height: 39px;
    text-align: left;
    a {
      cursor: pointer;
      color: #7c8389;
      font-size: 14px;
      width: 28px;
      height: 28px;
      line-height: 28px;
      border-radius: 100%;
      text-align: center;
      &:not(:first-child) {
        margin-left: 7px;
      }
    }
  }

  .ag-pinned-right-cols-container .ag-row:hover, .ag-body-container .ag-row:hover {
    a {
      color: #FFF;
      &.fa-eye {
        background-color: #0c80e5;
      }
      &.fa-copy {
        background-color: #58d7fa;
      }
      &.fa-pencil {
        background-color: #36c77c;
      }
      &.fa-trash {
        background-color: #fb523d;
      }
      &.fa-user {
        background-color: #8211e6;
      }
      &.fa-ban {
        background-color: #f28f43;
      }
      &.fa-ambulance {
        background-color: #2abae6;
      }
    }
  }
</style>
