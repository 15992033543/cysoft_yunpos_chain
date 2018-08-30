let data = window.localStorage.getItem('menuList')
try {
  data = JSON.parse(data)
} catch (err) {
  data = []
}

const menuList = {
  state: {
    data
  },

  mutations: {
    setMenuList (state, data) {
      state.data = data
      data && window.localStorage.setItem('menuList', JSON.stringify(data))
    }
  }
}

export default menuList
