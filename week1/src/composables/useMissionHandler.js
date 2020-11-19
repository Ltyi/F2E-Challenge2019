import store from '@/store'

export default function useMissionHandler() {
  const missionAdd = title => store.commit('mission/missionAdd', title)
  const missionImport = mission => store.commit('mission/missionImport', mission)
  const missionStart = id => store.commit('mission/missionStart', id)
  const missionDone = id => store.commit('mission/missionDone', id)
  const missionRemove = id => store.commit('mission/missionRemove', id)
  const missionSkip = id => store.commit('mission/missionSkip', id)

  return {
    missionAdd,
    missionImport,
    missionStart,
    missionDone,
    missionSkip,
    missionRemove
  }
}
