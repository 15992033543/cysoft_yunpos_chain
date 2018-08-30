<template>
  <div class="ag-grid-header-custom">
    <el-checkbox v-model="checked" v-if="params.label" :label="params.label" @change="checkedChange"></el-checkbox>
    <el-checkbox v-model="checked" v-else @change="checkedChange"></el-checkbox>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      checked: false
    }
  },

  created () {
    this.params.ready && this.params.ready(this)
  },

  methods: {
    setChecked (checked) {
      this.checked = checked
    },

    checkedChange (checked) {
      this.params.changeCallback && this.params.changeCallback(checked)
    }
  }
})
</script>

<style lang="scss">
  .ag-grid-header-custom {
    .el-checkbox__input {
      bottom: 1px;
    }
  }
</style>
