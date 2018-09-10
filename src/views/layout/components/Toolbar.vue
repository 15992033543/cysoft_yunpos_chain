<template>
  <div class="toolbar-container">
    <span class="help" @click="$appPush({ name: 'Help' })">新手引导</span>

    <div class="time">
      到期时间：<span v-if="dateDue">剩<span class="count">{{ dateDue }}</span>天</span>
      <span v-else class="count">永久使用</span>
    </div>
    <el-button type="text" @click="buyService">购买</el-button>
    <el-tooltip effect="light" placement="bottom" popper-class="tooltip-popper">
      <span class="service">
        专属客服
        <img src="../../../assets/img/service.png">
      </span>
      <div slot="content" class="service-content single-line-ellipsis">
        <p v-if="tel">客服电话：{{ tel }}</p>
        <p v-if="qq">客服QQ：<a :href="`http://wpa.qq.com/msgrd?v=3&site=qq&menu=yes&uin=${qq}`" target="_blank">{{ qq }}</a></p>
        <p v-if="email">邮箱：{{ email }}</p>
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
          <li>{{ name }}</li>
          <li>修改密码</li>
          <li>购买记录</li>
          <li @click="logout">退出</li>
        </ul>
      </div>
    </el-tooltip>
  </div>
</template>

<script>
import { logout } from '@/common'

export default {
  name: 'Toolbar',

  data () {
    const userInfo = this.$store.state.user
    return {
      tel: userInfo.customerService.tel,
      qq: userInfo.customerService.qq,
      email: userInfo.customerService.email,
      dateDue: userInfo.dateDue,
      name: userInfo.name
    }
  },

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
      logout()
    },

    buyService () {
      window.open(this.$store.state.sysOption.serviceUrl)
    }
  }
}
</script>

<style scoped lang="scss">
  .toolbar-container {
    position: absolute;
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
