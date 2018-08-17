<template>
  <el-date-picker
    v-model="d"
    align="left"
    :type="type"
    :placeholder="placeholder"
    :picker-options="pickerOptions"
    @change="dateChange"
    :value-format="type === 'date' ? 'yyyy-MM-dd' : 'yyyy-MM-dd hh:mm:ss'"
    :style="{ width: type === 'date' ? '130px' : '185px' }">
  </el-date-picker>
</template>

<script>
export default {
  props: {
    value: String,
    type: {
      type: String,
      default: 'date'
    },
    placeholder: {
      type: String,
      default: '日期选择'
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
