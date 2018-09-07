<template>
  <shared>
    <el-card class="login">
      <ul class="tag-container">
        <li
          v-for="(item, index) in tags"
          :class="[ 'tag', item.type === currentType && 'active', index === 0 && 'radius-left', index === tags.length - 1 && 'radius-right' ]"
          :key="index"
          @click="tagClick(item.type)">{{ item.title }}</li>
      </ul>

      <el-form ref="form" :model="formData" :rules="formRules" style="margin-top: 15px" size="medium">
        <el-form-item v-if="currentType === 'employee'" prop="company">
          <el-input v-model="formData.company" clearable placeholder="请输入企业号">
            <div slot="append">
              <el-tooltip class="item" effect="dark" content="企业号参见“系统设置>企业资料”" placement="right">
                <i class="el-icon-question"></i>
              </el-tooltip>
            </div>
          </el-input>
        </el-form-item>

        <el-form-item prop="username">
          <el-input v-model="formData.username" clearable placeholder="请输入用户名"></el-input>
        </el-form-item>

        <el-form-item prop="password">
          <el-input v-model="formData.password" clearable placeholder="请输入密码" type="password" maxlength="20" @keyup.enter.native="login"></el-input>
        </el-form-item>

        <el-form-item prop="vaildcode" class="code-item" v-if="codeVisible">
          <el-input ref="codeRef"
            v-model="formData.vaildcode"
            clearable
            placeholder="请输入识别码"
            maxlength="4">
            <div slot="append" class="append-layout">
              <img
                :src="codeUrl"
                class="code"
                alt="识别码"
                title="点击刷新"
                @click="codeUrl = fetchCode()">
            </div>
          </el-input>
        </el-form-item>

        <el-form-item class="text-item">
          <div style="float: left">
            <el-checkbox v-model="remember">记住密码</el-checkbox>
          </div>
          <div style="float: right">
            <el-button type="text" class="text-btn" @click="goReset">找回密码</el-button>
          </div>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="operation-btn" @click="login" :loading="loading">{{ loading ? '登录中...' : '登录' }}</el-button>
        </el-form-item>

        <el-form-item class="text-item">
          <div style="float: left">
            <el-button type="text" class="text-btn" @click="showVersionModal">演示账号</el-button>
          </div>
          <div style="float: right">
            <span style="color: grey">没有账号？</span>
            <el-button type="text" class="text-btn" @click="goRegister">免费注册</el-button>
          </div>
        </el-form-item>
      </el-form>
    </el-card>

    <version-modal ref="versionModal" @select-version="selectVersion"/>
    <register-version-modal ref="registerVersionModal" @register-version="registerVersion"/>
  </shared>
</template>

<script>
import Shared from './components/Shared'
import config from '@config'
import VersionModal from './components/VersionModal'
import RegisterVersionModal from './components/RegisterVersionModal'

export default {
  name: 'AccountLogin',

  components: {
    Shared, VersionModal, RegisterVersionModal
  },

  data () {
    return {
      remember: false,
      currentType: 'quick',
      tags: [
        { title: '快捷登录', type: 'quick' },
        { title: '员工登录', type: 'employee' }
      ],
      formData: {
        company: '',
        username: '',
        password: '',
        vaildcode: '',
        version: '',
        yanshi: false
      },
      formRules: {
        company: [
          { required: true, message: '请输入企业号', trigger: 'blur' }
        ],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' }
        ],
        vaildcode: [
          { required: true, message: '请输入识别码', trigger: 'blur' }
        ]
      },
      loading: false,
      baseUrl: config.dev.proxyTable['/api'].target,
      codeUrl: '',
      codeVisible: false
    }
  },

  created () {
    this.codeUrl = this.fetchCode()
    this.initCodeVisible()
    this.initRememberInfo()
  },

  methods: {
    // 如果登录3次失败后，时间已经过了60分钟，那么不再显示识别码输入框
    initCodeVisible () {
      const failTime = window.localStorage.getItem('failTime')
      if (failTime) {
        const time = new Date().getTime() - Number(failTime)
        const duration = 60 * 60 * 1000 // 60分钟
        this.codeVisible = time < duration
      }
    },

    // 获取保存在本地的账号信息
    initRememberInfo () {
      const rememberInfo = window.localStorage.getItem('rememberInfo')
      if (rememberInfo) {
        try {
          const { type, username, password, company } = JSON.parse(rememberInfo)
          this.currentType = type
          this.formData.username = username
          this.formData.password = password
          this.formData.company = company
          this.remember = password !== ''
        } catch (e) {
          console.log(e)
        }
      }
    },

    // 切换登录方式
    tagClick (type) {
      this.currentType = type
    },

    // 跳转到注册页
    goRegister () {
      this.$appPush({ name: 'AccountRegister' })
    },

    // 跳转到找回密码页
    goReset () {
      this.$appPush({ name: 'AccountReset' })
    },

    // 登录
    login () {
      this.$refs.form.validate(valid => {
        if (valid) {
          this.formData.yanshi = false
          this.loginRequest()
        } else {
          return false
        }
      })
    },

    // 演示账号登录
    demoLogin () {
      this.formData.yanshi = true
      this.loginRequest()
    },

    // 登录请求
    loginRequest () {
      const { company, ...data } = this.formData
      if (this.currentType === 'employee') {
        data.username = `${company}:${data.username}`
      }
      this.loading = true
      this.$http({
        url: '/account/login',
        method: 'post',
        data: data
      }).then(res => {
        this.loginHandler(res)
      }).catch(() => {
        this.loading = false
      })
    },

    // 登录处理程序
    loginHandler (res) {
      this.loading = res.Level === 10
      switch (res.Level) {
        // 登录错误，直接提示错误信息
        case 1:
          this.$message({ type: 'error', message: res.Message.toString() })
          break

        // 弹出选择版本弹框
        case 2:
          this.$refs.registerVersionModal.show()
          break

        // 服务器错误，直接提示错误信息
        case 3:
          this.$message({ type: 'error', message: res.Message.toString() })
          break

        // 服务门店超过了总门店数，弹框让用户选择要留下的门店，选择完之后才能登录
        case 4:
          break

        // 服务已过期，弹框提示已过期，并给出购买地址
        case 5:
          this.$confirm(`<span style="color: red">${res.Message}</span>`, '温馨提示', {
            dangerouslyUseHTMLString: true,
            confirmButtonText: '购买服务',
            cancelButtonText: '放弃购买'
          }).then(() => {
            window.open(res.Data.buy_url)
          })
          break

        // 登录失败，记录失败次数，大于等于3次后显示识别码
        case 6:
          this.failHandler(res)
          break

        // 服务即将过期，弹框提醒用户购买，但可以点击稍后购买进入首页
        case 7:
          this.$confirm(`<span style="color: red">${res.Message}</span>`, '温馨提示', {
            dangerouslyUseHTMLString: true,
            confirmButtonText: '购买服务',
            cancelButtonText: '稍后购买服务',
            distinguishCancelAndClose: true
          }).then(() => {
            window.open(res.Data.buy_url)
          }).catch(action => {
            // 稍后购买服务，直接跳转到首页
            if (action === 'cancel') {
              this.successHandler(res)
            }
          })
          break

        // 登录成功
        case 10:
          this.successHandler(res)
          break
      }
    },

    // 获取识别码（区分开发和线上地址）
    fetchCode () {
      return `${process.env.NODE_ENV === 'development' ? `${this.baseUrl}/utility/vaildcode` : '/utility/vaildcode'}?t=${new Date().getTime()}`
    },

    // 登录失败处理程序
    failHandler (res) {
      this.$message({ type: 'error', message: res.Message.toString() })
      const failCount = res.Data.fail_count
      // 如果失败次数>=3，显示识别码，并记录失败次数和时间，用于刷新后判断是否显示识别码
      if (failCount >= 3) {
        window.localStorage.setItem('failTime', new Date().getTime())
        this.codeVisible = true
      }
    },

    // 登录成功处理程序
    successHandler (res) {
      // 登录成功后清除失败时间
      this.clearFailTime()
      // 记住账号信息
      this.setRememberInfo()
      const token = res.Data.token
      const url = process.env.NODE_ENV === 'development' ? `${location.origin}#/home?token=${token}` : `${res.Data.redirect_url}#/home?token=${token}`
      window.location.href = url
    },

    // 登录成功后，清除失败时间，意思就是一旦登录成功，下次就不用显示识别码了
    clearFailTime () {
      window.localStorage.setItem('failTime', null)
    },

    // 登录成功后，账号和登录方式一定要记住，密码如果勾选了记住密码也要记住，下次打开登录页时保持上一次登录的状态
    setRememberInfo () {
      const data = {
        type: this.currentType,
        username: this.formData.username,
        password: this.remember ? this.formData.password : '', // 是否记住密码
        company: this.currentType === 'quick' ? '' : this.formData.company
      }
      window.localStorage.setItem('rememberInfo', JSON.stringify(data))
    },

    // 显示演示账号选择版本模态框
    showVersionModal () {
      this.$refs.versionModal.show()
    },

    // 演示账号选择版本（账号密码直接写死）
    selectVersion (version) {
      if (version === 10) { // 单店
        this.formData.username = '13533285171'
        this.formData.password = 'cysoft'
      } else { // 连锁
        this.formData.username = '13360019127'
        this.formData.password = '123456'
      }
      this.demoLogin()
    },

    // 选择注册版本，给version赋值，再次调用登录接口
    registerVersion (version) {
      this.formData.version = version
      this.login()
    }
  }
}
</script>

<style lang="scss">
  .login {
    width: 380px;
    margin: 0 auto;
    background-color: white;

    .tag-container {
      width: 100%;
      overflow: hidden;

      .tag {
        height: 40px;
        line-height: 40px;
        text-align: center;
        border: 1px solid #dcdfe6;
        float: left;
        box-sizing: border-box;
        width: 50%;
        cursor: pointer;
        color: grey;

        &:not(:first-child) {
          border-left: none;
        }

        &.active {
          background-color: #409EFF;
          color: white;
          border-color: #409EFF;
        }
      }

      .radius-left {
        border-top-left-radius: 4px;
        border-bottom-left-radius: 4px;
      }

      .radius-right {
        border-top-right-radius: 4px;
        border-bottom-right-radius: 4px;
      }
    }
    .el-input .el-input__inner {
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
    .el-icon-question {
      font-size: 18px;
      cursor: pointer;
      padding: 10px 20px;
    }
  }
</style>
