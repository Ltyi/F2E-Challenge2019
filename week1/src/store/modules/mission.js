import dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'

const state = () => ({
  mode: 'focus',
  isCounting: false,
  missionList: []
})

const mutations = {
  missionAdd(state, title) {
    const mission = {
      id: uuidv4(),
      title: title,
      done: false,
      skip: false,
      date: dayjs().format('YYYY-MM-DD')
    }

    state.missionList.push(mission)
  },

  missionDone(state, id) {
    const mission = state.missionList.find(item => item.id === id)
    mission.done = true
  },

  // 任務作廢
  missionSkip(state, id) {
    const mission = state.missionList.find(item => item.id === id)
    mission.skip = true
  },

  missionRemove(state, id) {
    const i = state.missionList.findIndex(item => item.id === id)
    state.missionList.splice(i, 1)
  },

  setIsCounting(state, isCounting) {
    state.isCounting = isCounting
  },

  setMode(state, mode) {
    state.mode = mode
  }
}

const getters = {
  // 已完成任務列表
  missionDoneList(state) {
    return state.missionList.filter(x => x.done)
  },

  // 作廢任務列表
  missionSkipList(state) {
    return state.missionList.filter(x => x.skip)
  },

  // 未完成任務列表
  missionToDoList(state) {
    return state.missionList.filter(x => !x.done && !x.skip)
  },

  // 當日任務列表
  missionToday(state) {
    return state.missionList.filter(x => {
      const today = dayjs().format('YYYY-MM-DD')

      return x.date === today
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters
}
