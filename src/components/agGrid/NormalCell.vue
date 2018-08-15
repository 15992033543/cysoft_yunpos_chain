<template>
  <div :class="cellClass" :style="cellStyle">{{ value }}</div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  data () {
    return {
      value: '',
      cellClass: [ 'ag-grid-normal-cell' ],
      cellStyle: {}
    }
  },

  created () {
    this.value = this.params.value
    this.initStyle()
    this.initClass()
    this.initFilter()
  },

  methods: {
    initStyle () {
      const value = this.params.cellStyle
      if (value) {
        const type = typeof value
        const obj = type === 'function' ? value(this.params) : type === 'object' ? value : null
        this.cellStyle = obj
      }
    },

    initClass () {
      const value = this.params.cellClass
      if (value) {
        const type = typeof value
        if (type === 'function') {
          const classStr = value(this.params)
          if (classStr) {
            const arr = classStr.split(' ')
            if (Array.isArray(arr)) {
              arr.forEach(e => {
                this.cellClass.push(e)
              })
            }
          }
        } else if (type === 'string') {
          this.cellClass.push(value)
        }
      }
    },

    initFilter () {
      if (this.params.filter) {
        this.value = this.params.filter(this.params)
      }
    }
  }
})
</script>

<style lang="scss">
  .ag-grid-normal-cell {
    height: 40px;
    line-height: 40px;
  }
</style>
