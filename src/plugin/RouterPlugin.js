import config from '../config'

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
    const permission = to.meta && to.meta.permission
    permission ? next({ name: '401' }) : next()
  }
}

const tagMixin = {
  beforeRouteEnter (to, from, next) {
    next(vm => {
      addAlive(vm, to)
      addTag(vm, to, from)
      limitTag(vm)
    })
  }
}

const AppPlugin = {
  install (Vue) {
    Vue.mixin(titleMixin)
    Vue.mixin(permissionMixin)
    Vue.mixin(tagMixin)

    Vue.prototype.$appPush = function (options = {}) {
      const name = options.name
      if (!name) {
        throw new Error('$appPush()方法必须传name，否则不能跳转！请查看开发文档')
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
