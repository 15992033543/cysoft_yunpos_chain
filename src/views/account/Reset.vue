<template>
  <shared>
    <el-card class="reset">
      <el-form ref="form" :model="formData" :rules="formRules" size="medium">
        <el-form-item label="手机号" :label-width="labelWidth" prop="phone">
          <el-input
            ref="phoneRef"
            v-model="formData.phone"
            clearable
            placeholder="请输入手机号"
            maxlength="11"/>
        </el-form-item>

        <el-form-item label="新密码" :label-width="labelWidth" prop="new_password">
          <el-input
            v-model="formData.new_password"
            clearable
            placeholder="密码长度不少于6位"
            maxlength="20"
            type="password"/>
        </el-form-item>

        <el-form-item label="确认密码" :label-width="labelWidth" prop="confirmNewPassword">
          <el-input
            v-model="formData.confirmNewPassword"
            clearable
            placeholder="密码长度不少于6位"
            maxlength="20"
            type="password"/>
        </el-form-item>

        <el-form-item label="识别码" :label-width="labelWidth" prop="img_code" class="code-item">
          <el-input ref="codeRef"
            v-model="formData.img_code"
            clearable
            placeholder="请输入识别码"
            maxlength="4">
            <div slot="append" class="append-layout" style="width: 102px">
              <img
                :src="codeUrl"
                class="code"
                alt="识别码"
                title="点击刷新"
                @click="codeUrl = fetchCode()">
            </div>
          </el-input>
        </el-form-item>

        <el-form-item label="验证码" :label-width="labelWidth" prop="phonevaildcode">
          <el-input
            v-model="formData.phonevaildcode"
            clearable
            placeholder="请输入验证码"
            maxlength="4">
            <div slot="append" class="append-layout">
              <el-button
                @click="getValidcode"
                type="text"
                :disabled="codeBtnDisabled"
                :loading="codeLoading">{{ codeBtnText }}</el-button>
            </div>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="operation-btn" @click="findPwd">立即找回</el-button>
        </el-form-item>

        <el-form-item class="text-item">
          <el-button type="text" class="text-btn" @click="goLogin">返回登录</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </shared>
</template>

<script>
import Shared from './components/Shared'
import config from '@config'

export default {
  name: 'AccountReset',

  components: {
    Shared
  },

  data () {
    return {
      labelWidth: '80px',
      formData: {
        phone: '',
        new_password: '',
        confirmNewPassword: '',
        img_code: '',
        phonevaildcode: ''
      },
      formRules: {
        phone: [
          { required: true, validator: this.phoneValidator, trigger: 'blur' }
        ],
        new_password: [
          { required: true, validator: this.passwordValidator, trigger: 'blur' }
        ],
        confirmNewPassword: [
          { required: true, validator: this.confirmPasswordValidator, trigger: 'blur' }
        ],
        img_code: [
          { required: true, message: '请输入识别码', trigger: 'blur' }
        ],
        phonevaildcode: [
          { required: true, message: '请输入验证码', trigger: 'blur' }
        ]
      },
      baseUrl: config.dev.proxyTable['/api'].target,
      codeUrl: '',
      codeBtnText: '获取验证码',
      codeBtnDisabled: false,
      codeLoading: false
    }
  },

  created () {
    this.codeUrl = this.fetchCode()
  },

  methods: {
    // 手机验证器
    phoneValidator (rule, value, callback) {
      if (!value) {
        callback(new Error('请输入手机号码'))
      }
      if (!this.$phoneReg.test(value)) {
        callback(new Error('请输入正确格式的手机号码'))
      }
      callback()
    },

    // 密码验证器
    passwordValidator (rule, value, callback) {
      if (!value) {
        callback(new Error('请输入密码'))
      }
      if (!this.$passwordReg.test(value)) {
        callback(new Error('密码长度6~20个英文或数字字符'))
      }
      callback()
    },

    // 确认密码验证器
    confirmPasswordValidator (rule, value, callback) {
      if (!value) {
        callback(new Error('请输入确认密码'))
      }
      if (value !== this.formData.password) {
        callback(new Error('两次密码必须相同'))
      }
      callback()
    },

    // 跳转到登录页
    goLogin () {
      this.$appPush({ name: 'AccountLogin' })
    },

    // 获取识别码（区分开发和线上地址）
    fetchCode () {
      return `${process.env.NODE_ENV === 'development' ? `${this.baseUrl}/utility/vaildcode` : '/utility/vaildcode'}?t=${new Date().getTime()}`
    },

    // 获取手机验证码
    getValidcode () {
      // 先验证手机
      this.$refs.form.validateField('phone', valid => {
        if (valid) {
          this.$refs.phoneRef.focus()
        } else {
          // 再验证识别码
          this.$refs.form.validateField('img_code', valid => {
            if (valid) {
              this.$refs.codeRef.focus()
            } else {
              this.codeLoading = true
              this.codeBtnText = '请稍后...'
              this.$http({
                url: '/utility/phonevaildcode',
                method: 'post',
                data: this.$toFormData({
                  vaildphone: this.formData.phone,
                  vaildcode: this.formData.img_code
                })
              }).then(res => {
                this.codeLoading = false
                if (res.Success) {
                  this.$message({
                    message: res.Message,
                    type: 'success'
                  })
                  this.setInterval()
                } else {
                  this.codeBtnText = '获取验证码'
                  this.$message({
                    message: res.Message,
                    type: 'error'
                  })
                }
              })
            }
          })
        }
      })
    },

    // 验证码计时
    setInterval () {
      this.codeBtnDisabled = true
      let duration = 40
      const interval = window.setInterval(() => {
        this.codeBtnText = `已发送(${duration})`
        duration -= 1
        if (duration === 0) {
          window.clearInterval(interval)
          this.codeBtnDisabled = false
          this.codeBtnText = '获取验证码'
        }
      }, 1000)
    },

    findPwd () {
      this.$refs.form.validate(valid => {
        if (valid) {
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style lang="scss">
  .reset {
    width: 380px;
    margin: 0 auto;
    background-color: white;

    .el-form-item__label, .el-input .el-input__inner {
      height: 40px;
      line-height: 40px;
    }
    .el-form-item:last-child {
      margin-bottom: 0;
    }
    .operation-btn {
      height: 40px;
      width: 100%;
      font-size: 18px;
    }
    .text-btn {
      font-size: 14px;
    }
    .text-item {
      .el-form-item__content {
        height: 20px;
        line-height: 20px;
      }

      .text-btn {
        padding: 0;
      }
    }
    .append-layout {
      width: 100px;
      text-align: center;
    }
    .code {
      width: 100%;
      height: 40px;
      vertical-align: bottom;
      cursor: pointer;
    }
    .el-input-group__append, .el-input-group__prepend {
      padding: 0;
    }
    .code-item .el-input-group__append {
      border: none;
    }
    .code-item .el-input__inner {
      border-right: none;
    }
  }
</style>
