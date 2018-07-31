<template>
  <div>
    <el-form :inline="true" :model="formData" label-width="100px">
      <el-row>
        <el-tabs>
          <el-tab-pane label="基本信息">
            <el-form-item label="商品条码：">
              <el-input v-model="formData.barcode">
                <el-button slot="append" type="primary">生成</el-button>
              </el-input>
            </el-form-item>

            <el-form-item>
              <el-button>设置一品多码</el-button>
            </el-form-item>

            <el-form-item label="商品编码：">
              <el-input v-model="formData.barcode"></el-input>
            </el-form-item>

            <el-form-item label="商品名称：">
              <el-input v-model="formData.barcode"></el-input>
            </el-form-item>

            <el-form-item label="计量方式：">
              <el-radio-group>
                <el-radio-button label="普通"></el-radio-button>
                <el-radio-button label="称重"></el-radio-button>
                <el-radio-button label="计件"></el-radio-button>
              </el-radio-group>
            </el-form-item>

            <el-form-item label="商品分类：">
              <el-input v-model="formData.barcode"></el-input>
            </el-form-item>

            <el-form-item label="默认供应商：">
              <el-input v-model="formData.barcode"></el-input>
            </el-form-item>

            <el-form-item label="商品单位：">
              <el-input v-model="formData.barcode"></el-input>
            </el-form-item>

            <el-form-item label="规格：">
              <el-input v-model="formData.barcode"></el-input>
            </el-form-item>

            <el-form-item label="默认供应商：">
              <el-input v-model="formData.barcode"></el-input>
            </el-form-item>

            <el-form-item label="商品单位：">
              <el-input v-model="formData.barcode"></el-input>
            </el-form-item>

          </el-tab-pane>
        </el-tabs>
      </el-row>

      <el-tabs>
        <el-tab-pane label="价格信息">
          价格信息
        </el-tab-pane>
      </el-tabs>

      <el-tabs>
        <el-tab-pane label="多包装">
          多包装
        </el-tab-pane>
      </el-tabs>

      <el-tabs>
        <el-tab-pane label="库存预警">
          库存预警
        </el-tab-pane>
      </el-tabs>

      <el-tabs>
        <el-tab-pane label="补货参数">
          补货参数
        </el-tab-pane>
      </el-tabs>
    </el-form>
    <div class="fixed-bottom-bar">
      <el-button type="primary">保存</el-button>
      <el-button @click="cancel">取消</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Share',

  props: {
    type: {
      type: String,
      required: true
    },
    id: String
  },

  data () {
    return {
      formData: {
        barcode: ''
      }
    }
  },

  created () {
  },

  methods: {
    cancel () {
      this.$appPush({ name: 'GoodsDataList', closeFrom: true })
    }
  }
}
</script>

<style>

</style>
