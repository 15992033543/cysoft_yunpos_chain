<template>
  <div class="login">
    <ul class="tag-container">
      <li
        v-for="(item, index) in tags"
        :class="[ 'tag', item.type === currentType && 'active' ]"
        :key="index"
        @click="tagClick(item.type)">{{ item.title }}</li>
    </ul>

    <el-form ref="form" :model="form" size="medium" style="margin-top: 20px">
      <el-form-item>
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="form.password"></el-input>
      </el-form-item>
      <el-form-item>
        <el-checkbox v-model="form.remember">忘记密码</el-checkbox>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">登录</el-button>
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
        { title: '快捷登录', type: 'employee' }
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
    }
    .el-input--medium .el-input__inner {
      height: 45px;
      line-height: 45px;
    }
    .el-form-item {
      margin-bottom: 20px;
    }
    .el-button--medium {
      padding: 15px 20px;
      width: 100%;
    }
  }
</style>
