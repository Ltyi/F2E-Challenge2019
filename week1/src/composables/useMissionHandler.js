import { reactive, ref } from 'vue'
import store from '@/store'

export default function useMissionHandler() {
  const missionDialog = reactive({ add: false })
  const missionTitle = ref('')

  const missionAdd = () => {
    store.commit('mission/missionAdd', missionTitle.value)
    missionTitle.value = ''
    missionDialog.add = false
  }

  const missionDone = id => store.commit('mission/missionDone', id)
  const missionRemove = id => store.commit('mission/missionRemove', id)
  const missionSkip = id => store.commit('mission/missionSkip', id)

  return {
    missionDialog,
    missionTitle,
    missionAdd,
    missionDone,
    missionSkip,
    missionRemove
  }
}
