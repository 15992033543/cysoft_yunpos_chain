<template>
  <el-dialog
    title="请选择体验版本"
    :visible.sync="visible"
    width="400px">
    <div>
      <el-row :gutter="15">
        <el-col :span="12">
          <el-card class="single-card" @click.native="selectVersion(10)">
            <div class="version-box">单店版</div>
          </el-card>
        </el-col>
        <el-col :span="12">
          <el-card class="chain-card" @click.native="selectVersion(20)">
            <div class="version-box">连锁版</div>
          </el-card>
        </el-col>
      </el-row>
    </div>
  </el-dialog>
</template>

<script>
export default {
  name: 'VersionModal',

  data () {
    return {
      visible: false
    }
  },

  methods: {
    show () {
      this.visible = true
    },

    selectVersion (version) {
      this.$emit('select-version', version)
    }
  }
}
</script>

<style lang="scss" scoped>
  .single-card {
    background-color: #409eff;
    border-color: #409eff;
    cursor: pointer;
  }
  .chain-card {
    background-color: #67c23a;
    border-color: #67c23a;
    cursor: pointer;
  }
  .version-box {
    color: white;
    font-size: 16px;
    height: 60px;
    text-align: center;
    line-height: 60px;
  }
</style>
