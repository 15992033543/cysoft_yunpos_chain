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

      <el-form ref="form" :model="formData" style="margin-top: 15px" size="medium">
        <el-form-item v-show="currentType === 'employee'">
          <el-input v-model="formData.username" clearable placeholder="请输入企业号"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formData.username" clearable placeholder="请输入用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="formData.password" clearable placeholder="请输入密码" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <div style="float: left">
            <el-checkbox v-model="formData.remember">记住密码</el-checkbox>
          </div>
          <div style="float: right">
            <el-button type="text" class="text-btn">找回密码</el-button>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" class="operation-btn" @click="login" :loading="loading">{{ loading ? '登录中...' : '登录' }}</el-button>
        </el-form-item>
        <el-form-item>
          <div style="float: left">
            <el-button type="text" class="text-btn">演示账号</el-button>
          </div>
          <div style="float: right">
            <span style="color: grey">没有账号？</span>
            <el-button type="text" class="text-btn" @click="goRegister">免费注册</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>
  </shared>
</template>

<script>
import Shared from './components/Shared'

export default {
  name: 'Login',

  components: {
    Shared
  },

  data () {
    return {
      currentType: 'quick',
      tags: [
        { title: '快捷登录', type: 'quick' },
        { title: '员工登录', type: 'employee' }
      ],
      formData: {
        username: '',
        password: '',
        remember: false
      },
      loading: false
    }
  },

  methods: {
    tagClick (type) {
      this.currentType = type
    },

    goRegister () {
      this.$appPush({ name: 'Register' })
    },

    login () {
      this.loading = true
      this.$http({
        url: '/account/login',
        method: 'post',
        data: this.formData
      }).then(res => {
        this.loginHandler(res)
      })
    },

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
          break

        case 7:
          break

        case 8:
          break

        case 9:
          break

        // 登录成功
        case 10:
          const token = res.Data.token
          const url = process.env.NODE_ENV === 'development' ? `http://${location.host}?token=${token}/#/home` : `${res.Data.redirect_url}?token=${token}`
          window.location.href = url
          break
      }
    }
  }
}
</script>

<style lang="scss">
  .login {
    width: 400px;
    margin: 0 auto;
    background-color: white;
    padding: 20px;

    .tag-container {
      width: 100%;
      overflow: hidden;

      .tag {
        height: 45px;
        line-height: 45px;
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
      height: 45px;
      line-height: 45px;
    }
    .el-form-item {
      margin-bottom: 15px;

      &:last-child {
        margin-bottom: 0;
      }
    }
    .operation-btn {
      height: 45px;
      width: 100%;
      font-size: 18px;
    }
    .text-btn {
      font-size: 14px;
    }
  }
</style>
