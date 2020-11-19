<template>
  <div class="flex h-full">
    <div class="flex flex-col w-4/12 p-16 h-full">
      <VStepper :items="missionToDoList"></VStepper>

      <div class="flex flex-grow justify-center items-center font-noto">
        <span v-if="!missionToDoList.length" class="text-gray-400">目前尚無任務</span>
      </div>

      <!-- 增加新任務 -->
      <div class="h-40 p-6 bg-gray-100 rounded-md font-noto">
        <h3
          class="text-lg text-gray-400 cursor-pointer inline-block"
          @click="dialog.missionAdd = true"
        >
          <span class="mr-3">+</span>
          增加新任務
        </h3>
      </div>
    </div>

    <div
      class="w-8/12 p-16 h-full flex flex-wrap items-start transition-all duration-500"
      :class="bgClass"
    >
      <div class="w-6/12">
        <div class="text-lg font-noto">今日任務已完成</div>
        <div class="text-4xl">{{ doneString }}</div>
      </div>

      <div class="w-6/12 flex justify-end">
        <div class="text-right">
          <div class="text-lg font-noto">{{ currentDate }}</div>
          <div class="text-4xl">{{ currentTime }}</div>
        </div>
      </div>

      <!-- Timer -->
      <div class="w-full flex justify-center">
        <div v-if="missionToDoList.length" class="w-6/12">
          <VTimer
            @mission:start="missionStart(currentMission.id)"
            @mission:done="missionDone(currentMission.id)"
            @mission:skip="missionSkip(currentMission.id)"
          ></VTimer>
        </div>

        <div v-else class="w-6/12 text-center font-noto">請先新增任務</div>
      </div>

      <div v-if="missionToDoList.length" class="w-full text-2xl self-end font-noto">
        <fa-icon :icon="['fas', 'circle']" class="mr-4"></fa-icon>
        <span>{{ currentMission.title }}</span>
      </div>
    </div>

    <!-- 新增任務 Dialog -->
    <MissionAdd v-model="dialog.missionAdd"></MissionAdd>
  </div>
</template>

<script setup>
import { computed, inject, onMounted, onUnmounted, reactive, ref } from 'vue'
import { useStore } from 'vuex'

// 可複用功能
import useMissionHandler from '@/composables/useMissionHandler'
import useMissionList from '@/composables/useMissionList'

// 組件
import MissionAdd from '@/components/mission/MissionAdd'
import VStepper from '@/components/VStepper'
import VTimer from '@/components/VTimer'

export default {
  name: 'Home',

  components: {
    VStepper,
    VTimer,
    MissionAdd
  }
}

const store = useStore()
const dayjs = inject('dayjs')

// 任務處理
export const { missionStart, missionDone, missionSkip } = useMissionHandler()

// 任務列表/樣式
export const { missionToDoList, currentMission, doneString } = useMissionList()
export const { bgClass } = useStyle()
export const { currentDate, currentTime } = useCurrentDate()

// 彈窗控制
export const dialog = reactive({ missionAdd: false })

// 組件邏輯
function useStyle() {
  const isCounting = computed(() => store.state.mission.isCounting)
  const mode = computed(() => store.state.mission.mode)

  const textClass = computed(() => {
    return isCounting.value && mode.value === 'focus' ? 'text-white' : 'text-gray-400'
  })

  const bgClass = computed(() => {
    return {
      'bg-gray-100': !isCounting.value,
      'bg-red-300': isCounting.value && mode.value === 'focus',
      'bg-green-100': isCounting.value && mode.value === 'break',
      [textClass.value]: true
    }
  })

  return { bgClass }
}

function useCurrentDate() {
  const timer = ref(null) // interval
  const currentDate = computed(() => dayjs().format('YYYY-MM-DD'))
  const currentTime = ref('') // 當前時間

  const start = () => {
    timer.value = setInterval(() => {
      currentTime.value = dayjs().format('HH:mm')
    })
  }

  onMounted(() => {
    start()
  })

  onUnmounted(() => {
    clearInterval(timer.value)
    timer.value = null
  })

  return { currentDate, currentTime }
}
</script>
