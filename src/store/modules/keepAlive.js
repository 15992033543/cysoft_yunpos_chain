const isExist = (array, name) => array.indexOf(name) !== -1
const findIndex = (array, name) => array.indexOf(name)

const keepAlive = {
  state: {
    alivePages: []
  },

  mutations: {
    addAlivePages (state, name) {
      !isExist(state.alivePages, name) && state.alivePages.push(name)
    },

    delAlivePages (state, name) {
      const index = findIndex(state.alivePages, name)
      index !== -1 && state.alivePages.splice(index, 1)
    },

    setAlivePages (state, alivePages) {
      state.alivePages = alivePages
    }
  }
}

export default keepAlive
