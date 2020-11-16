import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import { v4 as uuidv4 } from 'uuid'

export default createStore({
  state: {
    missionList: []
  },

  mutations: {
    missionAdd(state, title) {
      const mission = {
        id: uuidv4(),
        title: title,
        mode: 'focus',
        done: false
      }

      const length = state.missionList.length

      if ((length + 2) % 8 === 0) {
        state.missionList.push(mission, {
          title: '休息時間',
          mode: 'longBreak',
          done: false
        })
      } else {
        state.missionList.push(mission, {
          title: '休息時間',
          mode: 'break',
          done: false
        })
      }
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
