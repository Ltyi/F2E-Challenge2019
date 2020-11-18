import { computed } from 'vue'
import store from '@/store'

export default function useMission() {
  // 任務列表 (未完成&已完成&已作廢)
  const missionToDoList = computed(() => store.getters['mission/missionToDoList'])
  const missionDoneList = computed(() => store.getters['mission/missionDoneList'])
  const missionSkipList = computed(() => store.getters['mission/missionSkipList'])

  // 當前執行任務
  const currentMission = computed(() => {
    return missionToDoList.value[0]
  })

  // 今日任務已完成 ?/?
  const missionToday = computed(() => store.getters['mission/missionToday'])

  const doneString = computed(() => {
    const length = missionToday.value.length
    const doneLength = missionToday.value.filter(x => x.done).length

    return `${doneLength}/${length}`
  })

  return {
    missionToDoList,
    missionDoneList,
    missionSkipList,
    currentMission,
    doneString
  }
}
