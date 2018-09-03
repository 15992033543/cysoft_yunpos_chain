<template>
  <el-dialog
    class="register-version-modal"
    title="请选择登录的版本"
    :visible.sync="visible"
    width="420px">
    <div>
      <el-form :inline="true" size="medium">
        <el-form-item label="版本">
          <el-select
            v-model="version"
            placeholder="请选择版本"
            filterable
            style="width: 350px">
            <el-option
              v-for="item in versionList"
              :key="item.listdata"
              :value="item.listdata"
              :label="item.listdisplay"/>
          </el-select>
        </el-form-item>
      </el-form>
    </div>
    <div slot="footer" class="dialog-footer">
      <el-button @click="hide">取消</el-button>
      <el-button type="primary" @click="confirm">确定</el-button>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'RegisterVersionModal',

  data () {
    return {
      visible: false,
      version: '',
      versionList: []
    }
  },

  created () {
    this.fetchVersionList()
  },

  methods: {
    fetchVersionList () {
      this.$http({
        url: '/account/GetRegisterData',
        method: 'post'
      }).then(res => {
        if (res.Success) {
          this.versionList = res.Data.versionList
          this.version = this.versionList[0].listdata
        }
      })
    },

    show () {
      this.visible = true
    },

    hide () {
      this.visible = false
    },

    confirm () {
      this.hide()
      this.$emit('register-version', this.version)
    }
  }
}
</script>

<style lang="scss">
  .register-version-modal {
    .el-form-item:last-child {
      margin-bottom: 0
    }
  }
</style>
