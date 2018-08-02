<template>
  <div class="sidebar-container" ref="sidebar">
    <div class="header">
      <div class="hidden-layout">
        <img :src="logoImg">
        <img
          class="close-btn"
          :src="closeImg"
          @click="slideMenu">
      </div>
      <i
        class="open-btn"
        @click="slideMenu"
        v-show="!isOpen">›</i>
    </div>
    <div class="content">
      <ul class="menu-list">
        <li
          class="menu-item"
          v-for="(item, index) in menu"
          :key="index"
          @mouseenter="showMenu(index, $event.currentTarget)"
          @mouseleave="hideMenu(index)"
          @click="go(item.router)">
          <div class="hidden-layout">
            <div class="menu-icon">
              <i :class="item.iconClass"></i>
            </div>
            <span class="menu-name">{{ item.name }}</span>
          </div>

          <menu-container ref="menuContainer" :menu-data="item.children"/>
        </li>
      </ul>
    </div>

    <a class="client-download" href="http://yun.pos.cn/download.html" target="_blank" title="收银端下载">
      <img :src="downloadImg">
      <span>收银端下载</span>
    </a>
  </div>
</template>

<script>
import menu from '@/menu'
import MenuContainer from './MenuContainer'
import logoImg from '@/assets/img/menu-logo.png'
import closeImg from '@/assets/img/menu-close.png'
import downloadImg from '@/assets/img/client-download.png'

export default {
  name: 'Sidebar',

  components: {
    MenuContainer
  },

  data () {
    return {
      isOpen: true,
      menu: menu,
      logoImg: logoImg,
      closeImg: closeImg,
      downloadImg: downloadImg
    }
  },

  created () {
    this.menuHandler()
  },

  methods: {
    menuHandler () {
      this.deleteLowest()
      this.deleteGroup()
      this.deleteColumn()
      this.deleteMenu()
    },

    deleteLowest () {
      menu.forEach(m => {
        const columns = m.children
        if (Array.isArray(columns)) {
          columns.forEach(c => {
            if (Array.isArray(c)) {
              c.forEach(g => {
                const items = g.children
                if (Array.isArray(items)) {
                  for (let i = items.length - 1; i >= 0; i--) {
                    if (items[i].hide) {
                      items.splice(i, 1)
                    }
                  }
                }
              })
            }
          })
        }
      })
    },

    deleteGroup () {
      menu.forEach(m => {
        const columns = m.children
        if (Array.isArray(columns)) {
          columns.forEach(c => {
            if (Array.isArray(c)) {
              for (let i = c.length - 1; i >= 0; i--) {
                if (c[i].hide || c[i].children.length === 0) {
                  c.splice(i, 1)
                }
              }
            }
          })
        }
      })
    },

    deleteColumn () {
      menu.forEach(m => {
        const columns = m.children
        if (Array.isArray(columns)) {
          for (let i = columns.length - 1; i >= 0; i--) {
            if (columns[i].length === 0) {
              columns.splice(i, 1)
            }
          }
        }
      })
    },

    deleteMenu () {
      for (let i = menu.length - 1; i >= 0; i--) {
        if (menu[i].hide || (menu[i].children && menu[i].children.length) === 0) {
          menu.splice(i, 1)
        }
      }
    },

    showMenu (index, target) {
      this.$refs.menuContainer[index].show(target, this.isOpen)
    },

    hideMenu (index) {
      this.$refs.menuContainer[index].hide()
    },

    openMenu (name) {
      this.$appPush({ name, nocache: true })
    },

    slideMenu () {
      const el = this.$refs.sidebar
      if (this.isOpen) {
        el.style.width = '62px'
      } else {
        el.style.width = '185px'
      }
      this.isOpen = !this.isOpen
      setTimeout(() => {
        this.$root.$emit('navbarResize')
      }, 300)
    },

    go (name) {
      if (name) {
        this.$appPush({ name })
      }
    }
  }
}
</script>

<style scoped lang="scss">
  .hidden-layout {
    width: 100%;
    height: 100%;
    overflow: hidden;
    white-space: nowrap;
    cursor: pointer;
  }
  .sidebar-container {
    width: 185px;
    background-color: #2F3847;
    height: 100%;
    float: left;
    color: white;
    transition: width 0.2s;
    white-space: nowrap;
    position: relative;

    .close {
      width: 62px;
    }

    .open {
      width: 185px;
    }

    .header {
      height: 50px;
      line-height: 50px;
      position: relative;

      img {
        vertical-align: middle;
        margin-left: 12px;
      }

      .close-btn {
        margin-top: 2px;
        cursor: pointer;
      }

      .open-btn {
        font-style: normal;
        font-size: 30px;
        position: absolute;
        width: 15px;
        height: 38px;
        line-height: 32px;
        text-align: center;
        border-top-right-radius: 3px;
        border-bottom-right-radius: 3px;
        top: 55%;
        right: -15px;
        z-index: 50;
        background-color: #2F3847;
        transform: translateY(-50%);
        cursor: pointer;
        user-select: none;
      }
    }

    .content {
      margin-top: 5px;
      top: 50px;
      position: absolute;
      left: 0;
      right: 0;
      bottom: 0;
      overflow-x: hidden;
      overflow-y: auto;
      z-index: 3000;

      .menu-list {
        .menu-item {
          height: 45px;
          line-height: 45px;
          padding: 0 3px;
          position: relative;
          white-space: nowrap;
          user-select: none;

          &:hover {
            background-color: #3E95E4;
            color: white;
          }

          .menu-icon {
            display: inline-block;
            width: 55px;
            text-align: center;

            .fa {
              font-size: 24px;
              position: relative;
              top: 2px;
            }
          }

          .menu-name {
            font-size: 15px;
          }
        }
      }
    }

    .client-download {
      height: 50px;
      line-height: 50px;
      z-index: 3001;
      overflow: hidden;
      background-color: #28C760;
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      text-decoration: none;
      color: white;

      img {
        vertical-align: middle;
        margin-bottom: 4px;
        margin-left: 20px;
        margin-right: 15px;
      }
    }
  }
</style>
