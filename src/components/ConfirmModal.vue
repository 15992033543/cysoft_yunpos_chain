<template>
  <el-dialog
    width="400px"
    title="提示"
    :visible.sync="visible">
    <div class="confirm-modal-content">{{ message }}</div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hide">{{ cancelText }}</el-button>
      <el-button type="primary" @click="confirm" :loading="loading">{{ confirmText }}</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'ConfirmModal',

  props: {
    cancelText: {
      type: String,
      default: '取 消'
    },
    confirmText: {
      type: String,
      default: '确 定'
    }
  },

  data () {
    return {
      message: '确定进行此操作吗？',
      loading: false,
      visible: false
    }
  },

  methods: {
    confirm () {
      this.loading = true
      this.confirmCallback && this.confirmCallback()
    },

    show (message, confirmCallback, cancelCallback) {
      this.message = message
      this.confirmCallback = confirmCallback
      this.cancelCallback = cancelCallback
      this.visible = true
    },

    hide () {
      this.visible = false
      this.hideLoading()
      this.cancelCallback && this.cancelCallback()
    },

    hideLoading () {
      this.loading = false
    }
  }
}
</script>

<style scoped lang="scss">
  .confirm-modal-content {
    color: #000;
    .icon {
      float: left;
      width: 20px;
      margin-right: 10px;
      .el-icon-warning {
        color: #e6a23c;
      }
    }
    .content {
      overflow: hidden;
    }
  }
</style>
