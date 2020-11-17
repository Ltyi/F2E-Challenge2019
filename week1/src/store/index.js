import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'

export default createStore({
  state: {
    mode: 'focus',
    isCounting: false,
    missionList: []
  },

  mutations: {
    missionAdd(state, title) {
      const mission = {
        id: uuidv4(),
        title: title,
        done: false,
        date: dayjs().format('YYYY-MM-DD')
      }

      state.missionList.push(mission)
    },

    missionDone(state, id) {
      const mission = state.missionList.find(item => item.id === id)
      mission.done = true
    },

    setIsCounting(state, isCounting) {
      state.isCounting = isCounting
    },

    setMode(state, mode) {
      state.mode = mode
    }
  },

  getters: {
    missionToday(state) {
      return state.missionList.filter(x => {
        const today = dayjs().format('YYYY-MM-DD')

        return x.date === today
      })
    }
  },

  plugins: [createPersistedState({ paths: ['missionList'] })]
})
