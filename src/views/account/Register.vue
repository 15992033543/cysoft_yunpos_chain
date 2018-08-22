<template>
  <shared>
    <div class="register">
      <el-form ref="form" :model="formData" size="medium">
        <el-form-item label="版本" :label-width="labelWidth">
          <el-select
            v-model="formData.version"
            placeholder="请选择版本"
            style="width: 330px"
            filterable>
            <el-option
              v-for="item in versions"
              :key="item.value"
              :value="item.value"
              :label="item.label"/>
          </el-select>
        </el-form-item>

        <el-form-item label="行业" :label-width="labelWidth">
          <el-select
            v-model="formData.version"
            placeholder="请选择行业"
            style="width: 330px"
            filterable>
            <el-option
              :value="'item.value'"
              :label="'item.label'"/>
          </el-select>
        </el-form-item>

        <el-form-item label="服务商" :label-width="labelWidth">
          <el-input v-model="formData.password" clearable placeholder="请输入服务商编码，可不填"></el-input>
        </el-form-item>

        <el-form-item label="账号" :label-width="labelWidth">
          <el-input v-model="formData.password" clearable placeholder="请输入手机号"></el-input>
        </el-form-item>

        <el-form-item label="密码" :label-width="labelWidth">
          <el-input v-model="formData.password" clearable placeholder="密码长度不少于6位"></el-input>
        </el-form-item>

        <el-form-item label="确认密码" :label-width="labelWidth">
          <el-input v-model="formData.password" clearable placeholder="必须与密码一致"></el-input>
        </el-form-item>

        <el-form-item label="识别码" :label-width="labelWidth">
          <el-input v-model="formData.password" clearable placeholder="请输入识别码"></el-input>
        </el-form-item>

        <el-form-item label="验证码" :label-width="labelWidth">
          <el-input v-model="formData.password" clearable placeholder="请输入验证码">
            <el-button slot="append" disabled>获取验证码</el-button>
          </el-input>
        </el-form-item>

        <el-form-item>
          <el-checkbox label="我已阅读并同意" name="type"></el-checkbox>
          <el-button type="text" class="text-btn" @click="showClause">《用户服务协议》</el-button>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" class="operation-btn">注册</el-button>
        </el-form-item>
        <el-form-item>
          <div>
            <span style="color: grey">已有账号，</span>
            <el-button type="text" class="text-btn" @click="goLogin">去登录</el-button>
          </div>
        </el-form-item>
      </el-form>
    </div>

    <clause-modal ref="clauseModal"/>
  </shared>
</template>

<script>
import Shared from './components/Shared'
import ClauseModal from './components/ClauseModal'

export default {
  name: 'Register',

  components: {
    Shared, ClauseModal
  },

  data () {
    return {
      labelWidth: '70px',
      formData: {
        version: 10
      },
      versions: [
        { label: '云POS单店版收银管理软件V1.0', value: 10 },
        { label: '云POS连锁版收银管理软件V1.0', value: 20 },
        { label: '云POS集团版收银管理软件V1.0', value: 30 }
      ]
    }
  },

  methods: {
    goLogin () {
      this.$appPush({ name: 'Login' })
    },

    showClause () {
      this.$refs.clauseModal.show()
    }
  }
}
</script>

<style lang="scss">
  .register {
    width: 400px;
    margin: 0 auto;
    background-color: white;
    padding: 20px;

    .el-form-item__label, .el-input .el-input__inner {
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
