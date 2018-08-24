<template>
  <shared>
    <div class="login">
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
          <el-input v-model="formData.password" clearable placeholder="请输入密码" type="password" maxlength="20"></el-input>
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
    </div>

    <version-modal ref="versionModal" @select-version="selectVersion"/>
  </shared>
</template>

<script>
import Shared from './components/Shared'
import config from '@config'
import VersionModal from './components/VersionModal'

export default {
  name: 'AccountLogin',

  components: {
    Shared, VersionModal
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
        vaildcode: ''
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
    // 如果登录3次失败后，时间已经过了3分钟，那么不再显示识别码输入框
    initCodeVisible () {
      const failTime = window.localStorage.getItem('failTime')
      if (failTime) {
        const time = new Date().getTime() - Number(failTime)
        const duration = 60 * 3 * 1000 // 3分钟
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
          })
        } else {
          return false
        }
      })
    },

    // 登录处理程序
    loginHandler (res) {
      this.loading = false
      switch (res.Data.level) {
        // 登录错误，直接提示错误信息
        case 1:
          this.$message({ type: 'error', message: res.Message })
          break

        // 选择版本弹框
        case 2:
          break

        case 3:
          break

        case 4:
          break

        case 5:
          break

        case 6:
          this.failHandler(res)
          break

        case 7:
          break

        case 8:
          break

        case 9:
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
      this.$message({ type: 'error', message: res.Message })
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
      const url = process.env.NODE_ENV === 'development' ? `http://${location.host}#/home?token=${token}` : `${res.Data.redirect_url}#/home?token=${token}`
      window.location.href = url
      window.event.returnValue = false
      if (window.event.preventDefault) window.event.preventDefault()
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

    showVersionModal () {
      this.$refs.versionModal.show()
    },

    selectVersion (version) {
      if (version === 10) {
        console.log('单店')
      } else {
        console.log('连锁')
      }
    }
  }
}
</script>

<style lang="scss">
  .login {
    width: 380px;
    margin: 0 auto;
    background-color: white;
    padding: 20px;

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
