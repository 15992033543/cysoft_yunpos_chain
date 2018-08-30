import config from '../config'
import store from '@/store'
import { MessageBox } from 'element-ui'
import { logout } from '@/common'

const baseTitle = config.baseTitle
const maxTagCount = config.maxTagCount - 1

const addAlive = (vm, to) => {
  (to.meta && !to.meta.nocache) && vm.$store.commit('addAlivePages', to.name)
}

const addTag = (vm, to, from) => {
  const notag = to.meta && to.meta.notag
  const fromName = from.name
  !notag && vm.$store.commit('addTagPages', { fromName, to })
  vm.$store.commit('setActive', to)
}

const deleteTag = (vm, name) => {
  vm.$store.commit('delTagPages', name)
}

const deleteAlive = (vm, name) => {
  vm.$store.commit('delAlivePages', name)
}

const isBelongToLayout = to => to.matched[0].name === 'Layout'

const limitTag = vm => {
  const tagPages = vm.$store.state.tag.tagPages
  if (tagPages.length > maxTagCount) {
    let name
    const lastName = tagPages[tagPages.length - 1].name
    if (lastName !== vm.$store.state.tag.active.name) {
      name = lastName
    } else {
      name = tagPages[tagPages.length - 2].name
    }
    deleteTag(vm, name)
    deleteAlive(vm, name)
  }
}

const titleMixin = {
  beforeRouteEnter (to, from, next) {
    document.title = to.meta ? `${baseTitle} - ${to.meta.title}` : baseTitle
    next()
  }
}

const permissionMixin = {
  beforeRouteEnter (to, from, next) {
    const permissionList = store.state.permissionList.data || []
    const permission = to.meta && to.meta.permission
    if (isBelongToLayout(to) && permission) {
      // permissionList.indexOf(permission) === -1 ? next({ name: '401' }) : next()
      if (permissionList.indexOf(permission) === -1) {
        MessageBox.alert('<span style="color: red">抱歉！您没有权限进行以下操作，如有疑问请联系客服！</span>', '温馨提示', {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          showClose: false
        })
      } else {
        next()
      }
    } else {
      next()
    }
  }
}

const tagMixin = {
  beforeRouteEnter (to, from, next) {
    next(vm => {
      if (isBelongToLayout(to)) {
        addAlive(vm, to)
        addTag(vm, to, from)
        limitTag(vm)
      }
    })
  }
}

const redirectMixin = {
  beforeRouteEnter (to, from, next) {
    const token = store.state.user.token
    if (to.name === 'AccountLogin') {
      token ? next({ name: 'Home' }) : next()
    } else if (isBelongToLayout(to) && !token) {
      if (to.name === 'Home' && to.query.token) {
        next()
      } else {
        logout()
      }
    } else {
      next()
    }
  }
}

const AppPlugin = {
  install (Vue) {
    Vue.mixin(redirectMixin)
    Vue.mixin(permissionMixin)
    Vue.mixin(titleMixin)
    Vue.mixin(tagMixin)

    Vue.prototype.$appPush = function (options = {}) {
      const name = options.name
      if (!name) {
        throw new Error('先确定后台返回的菜单列表与权限列表是否对应，如果对应，到router中配置permission，并保持router的name与组件的name一致')
      }
      options.path && delete options.path
      const closeFrom = options.closeFrom || false
      const closeTo = options.closeTo || false
      const refresh = options.refresh || false
      if (closeFrom) {
        const fromName = this.$store.state.tag.active.name
        deleteTag(this, fromName)
        deleteAlive(this, fromName)
      }
      closeTo && deleteTag(this, name)
      refresh && deleteAlive(this, name)
      options.replace ? this.$router.replace(options) : this.$router.push(options)
    }

    Vue.prototype.$refresh = function () {
      this.$appPush({ name: 'Refresh', params: { options: this.$store.state.tag.active } })
    }
  }
}

export default AppPlugin
