const isExist = (tagPages, name) => tagPages.some(e => e.name === name)

const findIndex = (tagPages, name) => tagPages.findIndex(e => e.name === name)

const updateTagPages = tagPages => window.sessionStorage.setItem('tagPages', JSON.stringify(tagPages))

const updateActive = active => window.sessionStorage.setItem('tagActive', JSON.stringify(active))

const getTagPages = () => JSON.parse(window.sessionStorage.getItem('tagPages'))

const getActive = () => JSON.parse(window.sessionStorage.getItem('tagActive'))

const tag = {
  state: {
    tagPages: getTagPages() || [],
    active: getActive() || { name: 'Home' }
  },

  mutations: {
    addTagPages (state, routerInfo) {
      const fromName = routerInfo.fromName
      const to = routerInfo.to
      if (!isExist(state.tagPages, to.name)) {
        const fromNameIndex = findIndex(state.tagPages, fromName)
        const { name, meta, params, query } = to
        const obj = { name, meta, params, query }
        if (fromNameIndex !== -1) {
          state.tagPages.splice(fromNameIndex + 1, 0, obj)
        } else {
          if (fromName === 'Home') {
            state.tagPages.unshift(obj)
          } else {
            state.tagPages.push(obj)
          }
        }
      }
      updateTagPages(state.tagPages)
    },

    delTagPages (state, name) {
      const index = findIndex(state.tagPages, name)
      if (index !== -1) {
        state.tagPages.splice(index, 1)
      }
      updateTagPages(state.tagPages)
    },

    setTagPages (state, tagPages) {
      state.tagPages = tagPages
      updateTagPages(state.tagPages)
    },

    setActive (state, route) {
      const { name, meta, params, query } = route
      state.active = { name, meta, params, query }
      updateActive(state.active)
    }
  }
}

export default tag
