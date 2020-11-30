import dayjs from 'dayjs'
import { v4 as uuidv4 } from 'uuid'

const state = () => ({
  mode: 'focus',
  isCounting: false,
  missionList: []
})

const mutations = {
  // 任務新增
  missionAdd(state, title) {
    const mission = {
      id: uuidv4(),
      planID: null,
      title: title,
      done: false,
      skip: false,
      createdDate: dayjs().format('YYYY-MM-DD HH:mm:ss'),
      startDate: '',
      endDate: ''
    }

    state.missionList.push(mission)
  },

  // 任務匯入
  missionImport(state, mission) {
    const obj = {
      ...mission,
      id: uuidv4(),
      createdDate: dayjs().format('YYYY-MM-DD HH:mm:ss')
    }
    state.missionList.push(obj)
  },

  // 任務開始
  missionStart(state, id) {
    const mission = state.missionList.find(item => item.id === id)

    if (!mission.startDate) {
      mission.startDate = dayjs().format('YYYY-MM-DD HH:mm:ss')
    }
  },

  // 任務完成
  missionDone(state, id) {
    const mission = state.missionList.find(item => item.id === id)
    mission.done = true
    mission.endDate = dayjs().format('YYYY-MM-DD HH:mm:ss')
  },

  // 任務作廢
  missionSkip(state, id) {
    const mission = state.missionList.find(item => item.id === id)
    mission.skip = true
  },

  // 任務刪除
  missionRemove(state, id) {
    const i = state.missionList.findIndex(item => item.id === id)
    state.missionList.splice(i, 1)
  },

  // 是否計時中
  setIsCounting(state, isCounting) {
    state.isCounting = isCounting
  },

  // 當前模式
  setMode(state, mode) {
    state.mode = mode
  }
}

const getters = {
  // 當日任務列表
  missionToday(state) {
    return state.missionList.filter(x => {
      const today = dayjs().format('YYYY-MM-DD')
      const createdDate = dayjs(x.createdDate).format('YYYY-MM-DD')

      return today === createdDate
    })
  },

  // 當日已完成任務列表
  missionDoneList(state, getters) {
    return getters.missionToday.filter(x => x.done)
  },

  // 當日作廢任務列表
  missionSkipList(state, getters) {
    return getters.missionToday.filter(x => x.skip)
  },

  // 當日未完成任務列表
  missionToDoList(state, getters) {
    return getters.missionToday.filter(x => !x.done && !x.skip)
  },

  // 所有完成任務列表
  missionDoneAllList(state) {
    return state.missionList.filter(x => x.done)
  },

  // 本週任務列表
  missionWeekList(state) {
    const thisWeek = []
    const start = dayjs().startOf('week')

    for (let i = 0; i < 7; i++) {
      thisWeek.push(start.add(i, 'd').format('YYYY-MM-DD'))
    }

    return state.missionList.filter(x => {
      const createdDate = dayjs(x.createdDate).format('YYYY-MM-DD')
      return thisWeek.some(d => d === createdDate)
    })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  getters
}
