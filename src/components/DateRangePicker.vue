<template>
  <el-date-picker
    v-model="dateRange"
    :type="type"
    range-separator="至"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    @change="dateChange"
    :value-format="type === 'daterange' ? 'yyyy-MM-dd' : 'yyyy-MM-dd hh:mm:ss'"
    :style="{ width: type === 'daterange' ? '260px' : '350px', marginTop: '1px' }"
    :picker-options="pickerOptions"/>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'daterange'
    },

    begin: String,

    end: String
  },

  watch: {
    begin () {
      this.setDefault()
    },

    end () {
      this.setDefault()
    }
  },

  created () {
    this.setDefault()
  },

  data () {
    return {
      dateRange: [],
      pickerOptions: {
        shortcuts: [{
          text: '最近一周',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近一个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
            picker.$emit('pick', [start, end])
          }
        }, {
          text: '最近三个月',
          onClick (picker) {
            const end = new Date()
            const start = new Date()
            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
            picker.$emit('pick', [start, end])
          }
        }]
      }
    }
  },

  methods: {
    setDefault () {
      this.dateRange = []
      this.begin && this.dateRange.push(this.begin)
      this.end && this.dateRange.push(this.end)
    },

    dateChange (date) {
      const begin = date ? date[0] : ''
      const end = date ? date[1] : ''
      this.$emit('change', begin, end)
    }
  }
}
</script>
