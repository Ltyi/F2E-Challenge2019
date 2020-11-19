import { createStore } from 'vuex'
import createPersistedState from 'vuex-persistedstate'

import mission from './modules/mission'
import plans from './modules/plans'

export default createStore({
  modules: {
    mission,
    plans
  },

  plugins: [createPersistedState({ paths: ['mission.missionList', 'plans.planList'] })]
})
