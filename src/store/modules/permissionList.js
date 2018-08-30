let data = window.localStorage.getItem('permissionList')
try {
  data = JSON.parse(data)
} catch (err) {
  data = []
}

const permissionList = {
  state: {
    data
  },

  mutations: {
    setPermissionList (state, data) {
      state.data = data
      data && window.localStorage.setItem('permissionList', JSON.stringify(data))
    }
  }
}

export default permissionList
