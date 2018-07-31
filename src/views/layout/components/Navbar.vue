<template>
  <nav>
    <ul class="tag-list" ref="tagList">
      <li :class="[ 'tag-item', $store.state.tag.active.name === 'Home' && 'active' ]">
        <div class="name" @click="$appPush({ name: 'Home' })" title="首页">首页</div>
      </li>

      <li
        :class="[ 'tag-item', $store.state.tag.active.name === item.name && 'active' ]"
        v-for="(item, index) in $store.state.tag.tagPages"
        :key="index"
        @mouseenter="showCloseIcon($event.currentTarget)"
        @mouseleave="hideCloseIcon($event.currentTarget)"
        @click="goTag(item)">
        <div class="name" :title="item.meta.title">{{ item.meta.title }}</div>
        <i class="close" @click.stop="closeTag(item.name)">×</i>
      </li>
    </ul>
    <el-dropdown class="more-tag-btn" placement="bottom" trigger="click" v-show="dropTags.length > 0">
      <el-button icon="el-icon-caret-bottom" circle></el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          class="el-dropdown-custom"
          v-for="item in dropTags"
          :key="item.name"
          @click.native="goTag(item)"
          @mouseenter.native="showCloseIcon($event.currentTarget)"
          @mouseleave.native="hideCloseIcon($event.currentTarget)"
          :style="{ position: 'relative', padding: '7px 30px', backgroundColor: $store.state.tag.active.name === item.name ? '#ECF5FF' : '' }">
          {{ item.meta.title }}
          <i class="close" :style="getCloseStyle()" @click.stop="closeDropTag(item.name)">×</i>
        </el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </nav>
</template>

<script>
export default {
  name: 'Navbar',

  data () {
    return {
      dropTags: []
    }
  },

  watch: {
    '$store.state.tag.tagPages' () {
      this.resizeEvent()
    }
  },

  mounted () {
    this.addResizeEvent()
    this.$root.$on('navbarResize', this.resizeEvent)
  },

  beforeDestroy () {
    this.removeResizeEvent()
    this.$root.$off('navbarResize', this.resizeEvent)
  },

  methods: {
    showCloseIcon (target) {
      target.querySelector('.close').style.display = 'block'
    },

    hideCloseIcon (target) {
      target.querySelector('.close').style.display = 'none'
    },

    goTag (route) {
      this.$appPush(route)
    },

    closeTag (name) {
      const preTagName = this.getPreTagName(name)
      this.$store.commit('delTagPages', name)
      this.$store.commit('delAlivePages', name)
      if (this.$store.state.tag.active.name === name) {
        this.$appPush({ name: preTagName })
      }
    },

    getPreTagName (name) {
      const tags = this.$store.state.tag.tagPages
      const index = tags.findIndex(e => e.name === name)
      return index === 0 ? 'Home' : tags[index - 1].name
    },

    addResizeEvent () {
      window.addEventListener('resize', this.resizeEvent)
      this.resizeEvent()
    },

    removeResizeEvent () {
      window.removeEventListener('resize', this.resizeEvent)
    },

    resizeEvent () {
      const tagWidth = document.querySelector('.tag-item').offsetWidth
      const tagListEl = this.$refs.tagList
      const navWidth = tagListEl.clientWidth
      const tagLength = this.$store.state.tag.tagPages.length + 1
      const maxLength = Math.floor(navWidth / tagWidth)
      this.dropTags = this.$store.state.tag.tagPages.slice(maxLength - 1, tagLength)
    },

    closeDropTag (name) {
      this.closeTag(name)
      const index = this.dropTags.findIndex(e => e.name === name)
      index !== -1 && this.dropTags.splice(index, 1)
    },

    getCloseStyle () {
      return {
        fontStyle: 'normal',
        fontSize: '20px',
        position: 'absolute',
        right: '2px',
        top: '0',
        color: '#969fa4',
        cursor: 'pointer',
        fontWeight: '500',
        height: '18px',
        lineHeight: '16px',
        display: 'none'
      }
    }
  }
}
</script>

<style scoped lang="scss">
  nav {
    position: absolute;
    color: #999;
    right: 460px;
    left: 0;

    .more-tag-btn {
      position: absolute;
      top: 50%;
      transform: translateY(-50%);
      right: 0;
    }

    .tag-list {
      height: 50px;
      overflow: hidden;

      .tag-item {
        float: left;
        height: 100%;
        position: relative;
        border-right: 1px solid #efefef;
        font-size: 14px;
        cursor: pointer;

        .close {
          font-style: normal;
          font-size: 20px;
          position: absolute;
          right: 2px;
          top: 0;
          color: #969fa4;
          cursor: pointer;
          font-weight: 500;
          height: 18px;
          line-height: 16px;
          display: none;
        }

        &:hover {
          background-color: #F7F7F7;
        }

        &.active {
          background-color: #F7F7F7;
        }

        .name {
          width: 90px;
          height: 100%;
          line-height: 50px;
          text-align: center;
          user-select: none;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
</style>
