import { computed } from 'vue'
import store from '@/store'

export default function useMission() {
  // 當日任務列表 (未完成&已完成&已作廢)
  const missionToDoList = computed(() => store.getters['mission/missionToDoList'])
  const missionDoneList = computed(() => store.getters['mission/missionDoneList'])
  const missionSkipList = computed(() => store.getters['mission/missionSkipList'])

  // 所有已完成任務列表
  const missionDoneAllList = computed(() => store.getters['mission/missionDoneAllList'])

  // 本週任務列表
  const missionWeekList = computed(() => store.getters['mission/missionWeekList'])

  // 當前執行任務
  const currentMission = computed(() => {
    return missionToDoList.value[0]
  })

  // 今日任務已完成 ?/?
  const doneString = computed(() => {
    const missionToday = store.getters['mission/missionToday']
    const length = missionToday.length
    const doneLength = missionToday.filter(x => x.done).length

    return `${doneLength}/${length}`
  })

  // 本週任務已完成 ?/?
  const weekDoneString = computed(() => {
    const length = missionWeekList.value.length
    const doneLength = missionWeekList.value.filter(x => x.done).length

    return `${doneLength}/${length}`
  })

  return {
    missionToDoList,
    missionDoneList,
    missionSkipList,
    missionDoneAllList,
    missionWeekList,
    currentMission,
    doneString,
    weekDoneString
  }
}
