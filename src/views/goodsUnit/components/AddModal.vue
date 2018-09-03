<template>
  <el-dialog
    width="400px"
    title="新增单位"
    :visible.sync="visible"
    @closed="dialogClosed">
    <div>
      <el-form ref="form" :model="formData" :rules="formRules" label-width="80px">
        <el-form-item label="单位名称" prop="dw">
          <el-input v-model="formData.dw"></el-input>
        </el-form-item>
      </el-form>
    </div>
    <span slot="footer" class="dialog-footer">
      <el-button @click="hide">取消</el-button>
      <el-button type="primary" @click="confirm" :loading="loading">确定</el-button>
    </span>
  </el-dialog>
</template>

<script>
export default {
  name: 'GoodsUnitAddModal',

  data () {
    return {
      visible: false,
      formData: {
        dw: ''
      },
      formRules: {
        dw: [
          { required: true, message: '请输入单位名称' }
        ]
      },
      loading: false
    }
  },

  methods: {
    confirm () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.loading = true
          this.$httpAuth({
            url: '/dw/Add',
            method: 'post',
            params: this.formData
          }).then(res => {
            this.loading = false
            if (res.status === 'success') {
              this.visible = false
              this.$message({
                type: 'success',
                message: res.message
              })
              this.$emit('success')
            } else {
              this.$message({
                type: 'error',
                message: res.message
              })
            }
          })
        } else {
          return false
        }
      })
    },
    show () {
      this.visible = true
    },

    hide () {
      this.visible = false
    },

    dialogClosed () {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style>

</style>
