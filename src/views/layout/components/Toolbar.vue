<template>
  <div class="toolbar-container">
    <span class="help" @click="$appPush({ name: 'Help' })">新手引导</span>

    <div class="time">到期时间：剩<span class="count">230</span>天</div>
    <el-button type="text">购买</el-button>
    <el-tooltip effect="light" placement="bottom" popper-class="tooltip-popper">
      <span class="service">
        专属客服
        <img src="../../../assets/img/service.png">
      </span>
      <div slot="content" class="service-content single-line-ellipsis">
        <p>客服电话：020-38480870转811</p>
        <p>客服QQ：<a>1067202601</a></p>
      </div>
    </el-tooltip>

    <el-tooltip effect="light" placement="bottom" popper-class="tooltip-popper">
      <img src="../../../assets/img/refresh.png" @click="refresh">
      <div slot="content" class="service-content single-line-ellipsis">
        <ul class="drop-list">
          <li @click="refresh">刷新当前页</li>
          <li @click="closeAllTag">关闭全部页面</li>
          <li @click="closeOtherTag">关闭其它页面</li>
        </ul>
      </div>
    </el-tooltip>

    <el-tooltip effect="light" placement="bottom" popper-class="tooltip-popper">
      <img src="../../../assets/img/user.png">
      <div slot="content" class="service-content single-line-ellipsis">
        <ul class="drop-list">
          <li>店长 13500000006</li>
          <li>修改密码</li>
          <li>购买记录</li>
          <li @click="logout">退出</li>
        </ul>
      </div>
    </el-tooltip>
  </div>
</template>

<script>
export default {
  name: 'Toolbar',

  methods: {
    refresh () {
      this.$refresh()
    },

    closeAllTag () {
      let tagPages = []
      let alivePages = [ 'Home' ]
      this.$store.commit('setTagPages', tagPages)
      this.$store.commit('setAlivePages', alivePages)
      this.$appPush({ name: 'Home' })
    },

    getPreTagName (name) {
      const tags = this.$store.state.tag.tagPages
      const index = tags.findIndex(e => e.name === name)
      return index === 0 ? 'Home' : tags[index - 1].name
    },

    closeOtherTag () {
      let tagPages = []
      let alivePages = [ 'Home' ]
      if (this.$store.state.tag.active.name !== 'Home') {
        tagPages = [ this.$store.state.tag.active ]
        alivePages.push(this.$store.state.tag.active.name)
      }
      this.$store.commit('setTagPages', tagPages)
      this.$store.commit('setAlivePages', alivePages)
    },

    logout () {
    }
  }
}
</script>

<style scoped lang="scss">
  .toolbar-container {
    position: absolute;
    width: 420px;
    height: 50px;
    line-height: 50px;
    right: 30px;
    color: #363f44;
    text-align: right;
    background-color: #FFF;

    .help {
      color: red;
      font-size: 12px;
      font-weight: 700;
      cursor: pointer;
    }

    .time {
      display: inline-block;
      font-size: 12px;
      margin-left: 20px;

      .count {
        font-weight: 700;
        font-size: 16px;
      }
    }
    .service {
      display: inline-block;
      font-size: 14px;
      height: 21px;
      line-height: 21px;
      cursor: pointer;
    }

    img {
      vertical-align: middle;
      position: relative;
      bottom: 3px;
      cursor: pointer;
    }
  }

  .service-content{
    p {
      margin: 20px 0;
      padding: 0 10px;
      color: #999;
    }
  }

  .drop-list {
    li {
      height: 40px;
      line-height: 40px;
      padding: 0 10px;
      cursor: pointer;
      text-align: center;
      color: #999;

      &:hover {
        background-color: #EEE;
      }
    }
  }

  .el-tooltip {
    margin-left: 20px;
  }
</style>
