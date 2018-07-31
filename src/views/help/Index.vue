<template>
  <div>
    <!-- 图片部分 -->
    <div class="help-img" v-if="imgVisible">
      <img class="img" :src="helpImg" alt="helpImg">
      <img class="btn" :src="helpImgBtn" alt="helpImgBtn" @click="imgVisible = false">
    </div>

    <!-- 视频部分 -->
    <video width="866" controls="controls" autoplay v-else ref="video">
      <source src="http://yun.pos.cn/images/guide_video.mp4" type="video/mp4">
      您的浏览器不支持此视频的播放！请使用最新版谷歌或者火狐浏览器
    </video>

    <!-- 步骤部分 -->
    <el-steps direction="vertical" style="margin-top: 20px; height: 330px">
      <el-step title="第一步" status="process">
        <div slot="description">
          <h2 class="title">新增商品资料</h2>
          <div class="content">
            <p class="describe">在系统中添加商品后，就可以开始收银</p>
            <el-button style="float: right" @click="$appPush({ name: 'GoodsDataList' })">前往</el-button>
          </div>
        </div>
      </el-step>
      <el-step title="第二步" status="process">
        <div slot="description">
          <h2 class="title">下载收银软件</h2>
          <div class="content">
            <p class="describe">提供Windows、安卓平板、安卓手机版本，按照实际情况下载</p>
            <el-button style="float: right" @click="download">下载</el-button>
          </div>
        </div>
      </el-step>
      <el-step title="第三步" status="process">
        <div slot="description">
          <h2 class="title">登录收银软件</h2>
          <div class="content">
            <p class="describe">数据下载后，扫描商品条码，进行收款，即可完成销售</p>
          </div>
        </div>
      </el-step>
    </el-steps>
  </div>
</template>

<script>
import helpImg from '@/assets/img/help-img.jpg'
import helpImgBtn from '@/assets/img/help-img-btn.png'

export default {
  name: 'Help',

  data () {
    return {
      helpImg: helpImg,
      helpImgBtn: helpImgBtn,
      imgVisible: true
    }
  },

  deactivated () {
    // 页面离开时，暂停播放
    this.$refs.video && this.$refs.video.pause()
  },

  methods: {
    download () {
      window.open('http://yun.pos.cn/download.html')
    }
  }
}
</script>

<style scoped lang="scss">
  .title {
    color: #409EFF;
    font-size: 20px;
    margin: 10px 0;
  }

  .content {
    margin: 10px 0;
    overflow: hidden;
    line-height: 32px;
    width: 650px;

    .describe {
      font-size: 16px;
      float: left;
      color: grey;
      margin-right: 100px;
    }
  }
  .help-img {
    position: relative;
    .btn {
      position: absolute;
      left: 66px;
      bottom: 80px;
      cursor: pointer;
    }
  }
</style>
