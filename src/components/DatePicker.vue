<template>
  <el-date-picker
    v-model="d"
    align="left"
    :type="type"
    placeholder="选择日期"
    :picker-options="pickerOptions"
    @change="dateChange"
    :value-format="type === 'date' ? 'yyyy-MM-dd' : 'yyyy-MM-dd hh:mm:ss'"
    :style="{ width: type === 'date' ? '160px' : '190px' }">
  </el-date-picker>
</template>

<script>
export default {
  props: {
    value: String,
    type: {
      type: String,
      default: 'date'
    }
  },
  data () {
    return {
      pickerOptions: {
        shortcuts: [
          {
            text: '今天',
            onClick (picker) {
              picker.$emit('pick', new Date())
            }
          },
          {
            text: '一周前',
            onClick (picker) {
              const date = new Date()
              date.setTime(date.getTime() - 3600 * 1000 * 24 * 7)
              picker.$emit('pick', date)
            }
          }
        ]
      },
      d: ''
    }
  },
  created () {
    this.d = this.value
  },
  methods: {
    dateChange (date) {
      this.$emit('change', date)
    }
  }
}
</script>
