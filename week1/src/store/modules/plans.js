import { v4 as uuidv4 } from 'uuid'

const state = () => ({
  planList: []
})

const mutations = {
  planAdd(state, { title, color }) {
    state.planList.push({
      planID: uuidv4(),
      title,
      color,
      missions: []
    })
  },

  planRemove(state, planID) {
    const idx = state.planList.findIndex(x => x.planID === planID)
    state.planList.splice(idx, 1)
  },

  planMissionAdd(state, { planID, title }) {
    const target = state.planList.find(x => x.planID === planID)

    if (target) {
      target.missions.push({
        id: uuidv4(),
        planID: planID,
        title: title,
        done: false,
        skip: false,
        createdDate: '',
        startDate: '',
        endDate: ''
      })
    }
  },

  planMissionRemove(state, { planID, id }) {
    const plan = state.planList.find(x => x.planID === planID)
    const idx = plan.missions.findIndex(x => x.id === id)

    plan.missions.splice(idx, 1)
  }
}

export default {
  namespaced: true,
  state,
  mutations
}
