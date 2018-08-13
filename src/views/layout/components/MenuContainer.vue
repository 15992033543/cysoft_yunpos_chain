<template>
  <div class="menu-container" v-show="visible" ref="container">
    <div class="menu-column" v-for="(column, index) in menuData" :key="index">
      <div class="group-container" v-for="(group, index) in column" :key="index">
        <span class="group-name" v-show="group.groupName">{{ group.groupName }}</span>
        <ul>
          <li
            class="menu-item"
            v-for="(menu, index) in group.children"
            :key="index"
            @click="goPage(menu.router)">{{ menu.name }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Menu',

  props: {
    menuData: Array
  },

  data () {
    return {
      visible: false
    }
  },

  methods: {
    show (parentEl, isOpen) {
      this.visible = true
      this.setPosition(parentEl, isOpen)
    },

    hide () {
      this.visible = false
    },

    setPosition (parentEl, isOpen) {
      this.$nextTick(() => {
        const el = this.$refs.container
        const height = el.clientHeight
        // const parentOffsetTop = parentEl.offsetTop + 55
        const parentOffsetTop = parentEl.getBoundingClientRect().top
        const screenHeight = document.body.clientHeight
        const differ = (height + parentOffsetTop) - screenHeight
        el.style.top = differ > 0 ? (parentOffsetTop - differ - 1 + 'px') : (parentOffsetTop - 1 + 'px')
        el.style.left = isOpen ? (185 + 'px') : (62 + 'px')
      })
    },

    goPage (name) {
      this.$appPush({ name })
      this.hide()
    }
  }
}
</script>

<style scoped lang="scss">
  .menu-container {
    position: fixed;
    box-shadow: 2px 2px 3px #999;
    background-color: white;
    color: #000;
    font-size: 14px;
    z-index: 2000;

    &::before {
      content: '';
      position: absolute;
      height: 2px;
      background-color: #3e95e4;
      top: 0;
      left: 0;
      right: 0;
    }

    .menu-column {
      display: inline-block;
      width: 150px;
      vertical-align: top;
    }

    .group-container {
      .group-name {
        font-size: 16px;
        color: #409EFF;
        font-weight: 700;
        padding: 0 8px;
      }

      .menu-item {
        padding: 0 8px;
        cursor: pointer;

        &:hover {
          background-color: #3E95E4;
          color: white;
        }
      }
    }
  }
</style>
