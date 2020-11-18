import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'
import mission from './modules/mission'

export default createStore({
  modules: {
    mission
  },

  plugins: [createPersistedState({ paths: ['mission.missionList'] })]
})
