<template>
  <div class="goods-data-share">
    {{ type === 'add' ? '新增商品' : '编辑商品' }}
    <h1>{{ loading ? 'Loading...' : 'Finish!' }}</h1>
    <div class="fixed-bottom-bar">
      <el-button type="primary">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Share',

  props: {
    type: {
      type: String,
      required: true
    },
    id: String
  },

  data () {
    return {
      formData: {
        barcode: '',
        headImgUrl: ''
      },
      loading: true
    }
  },

  created () {
    setTimeout(() => {
      this.loading = false
    }, 2000)
  },

  methods: {
    cancel () {
      this.$appPush({ name: 'GoodsDataList', closeFrom: true })
    }
  }
}
</script>

<style lang="scss">
  .goods-data-share {
  }
</style>
