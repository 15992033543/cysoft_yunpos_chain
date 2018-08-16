<template>
  <div class="goods-data-share">
    商品资料
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
      }
    }
  },

  created () {
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
