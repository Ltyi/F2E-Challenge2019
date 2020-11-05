import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { v4 as uuidv4 } from 'uuid'

export default createStore({
  state: {
    missionList: []
  },

  mutations: {
    missionAdd(state, title) {
      state.missionList.push({
        id: uuidv4(),
        title: title,
        mode: 'focus',
        done: false
      })
    },

    missionRemove(state, id) {
      const idx = state.missionList.findIndex(item => item.id === id)
      state.missionList.splice(idx, 1)
    }
  },

  actions: {},
  modules: {},
  plugins: [createPersistedState()]
})
