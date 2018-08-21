<template>
  <div class="login">
    <ul class="tag-container">
      <li
        v-for="(item, index) in tags"
        :class="[ 'tag', item.type === currentType && 'active', index === 0 && 'radius-left', index === tags.length - 1 && 'radius-right' ]"
        :key="index"
        @click="tagClick(item.type)">{{ item.title }}</li>
    </ul>

    <el-form ref="form" :model="form" style="margin-top: 15px">
      <el-form-item v-show="currentType === 'employee'">
        <el-input v-model="form.username" clearable placeholder="请输入企业号"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.username" clearable placeholder="请输入用户名"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.password" clearable placeholder="请输入密码"></el-input>
      </el-form-item>
      <el-form-item>
        <div style="float: left">
          <el-checkbox v-model="form.remember">记住密码</el-checkbox>
        </div>
        <div style="float: right">
          <el-button type="text" style="font-size: 14px">找回密码</el-button>
        </div>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" class="operation-btn">登录</el-button>
      </el-form-item>
      <el-form-item>
        <div style="float: left">
          <el-button type="text" style="font-size: 14px">演示账号</el-button>
        </div>
        <div style="float: right">
          <span style="color: grey">没有账号？</span>
          <el-button type="text" style="font-size: 14px">免费注册</el-button>
        </div>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data () {
    return {
      currentType: 'quick',
      tags: [
        { title: '快捷登录', type: 'quick' },
        { title: '员工登录', type: 'employee' }
      ],
      form: {
        username: '',
        password: '',
        remember: false
      }
    }
  },

  methods: {
    tagClick (type) {
      this.currentType = type
    }
  }
}
</script>

<style lang="scss">
  .login {
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
    }
    .operation-btn {
      height: 45px;
      width: 100%;
      font-size: 18px;
    }
  }
</style>
