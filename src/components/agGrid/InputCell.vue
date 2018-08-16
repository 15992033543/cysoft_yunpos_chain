<template>
  <div class="ag-grid-input-cell" ref="inputCell">
    <el-input
      :placeholder="params.placeholder"
      @keydown.native.stop="keyupHandler($event)"
      @focus="selectInput($event.currentTarget)"
      :value="params.data[params.colDef.field]"
      :id="`${params.rowIndex}-${params.colDef.field}`"
      :disabled="params.disabled"
      :readonly="params.readonly"></el-input>
  </div>
</template>

<script>
import Vue from 'vue'

export default Vue.extend({
  mounted () {
    this.initTextAlign()
  },
  methods: {
    initTextAlign () {
      const align = this.params.align || 'left'
      this.$refs.inputCell.querySelector('input[type=text]').style.textAlign = align
    },

    selectInput (target) {
      target.select()
    },

    keyupHandler (e) {
      const keyCode = e.keyCode
      if (keyCode === 13) {
        const nextInput = this.findNextInput()
        if (nextInput) {
          this.select(nextInput)
        } else {
          const nextRowFirstInput = this.findNextRowFirstInput()
          this.select(nextRowFirstInput)
        }
      } else if (keyCode === 40) {
        this.moveIndex('down', this.params.rowIndex + 1)
      } else if (keyCode === 38) {
        this.moveIndex('up', this.params.rowIndex - 1)
      }
    },

    // 寻找当前行下一个可以输入的input
    findNextInput () {
      const columns = this.params.columnApi.getAllGridColumns()
      const row = this.$refs.inputCell.parentNode.parentNode
      const index = columns.findIndex(e => e.colDef.field === this.params.colDef.field)
      for (let i = index + 1; i < columns.length; i++) {
        const field = columns[i].colDef.field
        const id = `${this.params.rowIndex}-${field}`
        const nextInput = row.querySelector(`input[id="${id}"]`)
        if (nextInput && !nextInput.getAttribute('disabled') && !nextInput.getAttribute('readonly')) {
          // this.scrollToColunm(row, field)
          return nextInput
        }
      }
      return null
    },

    // 寻找下一行第一个可以输入的input`
    findNextRowFirstInput () {
      const rowIndex = this.params.rowIndex + 1
      const parent = this.$refs.inputCell.parentNode.parentNode.parentNode
      const row = parent.querySelector(`.ag-row[row-index="${rowIndex}"]`)
      if (row) {
        const columns = this.params.columnApi.getAllGridColumns()
        for (let i = 0; i < columns.length; i++) {
          const id = `${rowIndex}-${columns[i].colDef.field}`
          const firstInput = row.querySelector(`input[id="${id}"]`)
          if (firstInput && !firstInput.getAttribute('disabled') && !firstInput.getAttribute('readonly')) {
            this.scrollToRow(row, rowIndex)
            return firstInput
          }
        }
      }
      return null
    },

    // 上下移动光标
    moveIndex (direction, rowIndex) {
      const parent = this.$refs.inputCell.parentNode.parentNode.parentNode
      const row = parent.querySelector(`.ag-row[row-index="${rowIndex}"]`)
      if (row) {
        const id = `${rowIndex}-${this.params.colDef.field}`
        const input = row.querySelector(`input[id="${id}"]`)
        if (input && !input.getAttribute('disabled') && !input.getAttribute('readonly')) {
          this.select(input)
          this.scrollToRow(row, rowIndex)
        } else {
          direction === 'up' ? this.moveIndex(direction, rowIndex - 1) : this.moveIndex(direction, rowIndex + 1)
        }
      }
    },

    // 滚动到指定行
    scrollToRow (target, rowIndex) {
      const parent = this.$refs.inputCell.parentNode.parentNode.parentNode.parentNode
      const rowHeight = target.offsetHeight
      const scrollTop = rowHeight * (rowIndex - 2)
      parent.scrollTo(0, scrollTop)
    },

    // 滚动到指定列
    scrollToColunm (target, field) {
      const parent = this.$refs.inputCell.parentNode.parentNode.parentNode.parentNode
      const columns = this.params.columnApi.getAllGridColumns()
      let scrollLeft = 0
      for (let i = 0; i < columns.length; i++) {
        if (columns[i].colDef.field !== field) {
          scrollLeft += columns[i].actualWidth
        } else {
          break
        }
      }
      parent.scrollTo(scrollLeft, 0)
    },

    select (target) {
      if (target) {
        this.$nextTick(() => {
          target.select()
        })
      }
    }
  }
})
</script>

<style lang="scss">
  .ag-grid-input-cell {
    height: 40px;
    line-height: 39px;
    .el-input {
      bottom: 1px;
      font-size: 12px;
      input[type=text] {
        padding-left: 5px;
        padding-right: 5px;
      }
    }
  }
</style>
