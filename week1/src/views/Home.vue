<template>
  <div class="flex h-full">
    <div class="flex flex-col w-4/12 p-16 h-full">
      <VStepper :items="timerList"></VStepper>

      <div class="flex flex-grow justify-center items-center font-noto">
        <span v-if="!timerList.length" class="text-gray-400">目前尚無任務</span>
      </div>

      <!-- 增加新任務 -->
      <div class="h-40 p-6 bg-gray-100 rounded-md font-noto">
        <h3
          class="text-lg text-gray-400 cursor-pointer inline-block"
          @click="missionDialog = true"
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
        <div class="text-4xl">4/15</div>
      </div>

      <div class="w-6/12 flex justify-end">
        <div class="text-right">
          <div class="text-lg font-noto">{{ currentDate }}</div>
          <div class="text-4xl test">{{ currentTime }}</div>
        </div>
      </div>

      <!-- Timer -->
      <div class="w-full flex justify-center">
        <div v-if="timerList.length" class="w-6/12">
          <VTimer @mission:done="missionDone(currentMission.id)"></VTimer>
        </div>

        <div v-else class="w-6/12 text-center font-noto">請先新增任務</div>
      </div>

      <div class="w-full text-2xl self-end">
        <fa-icon :icon="['fas', 'circle']" class="mr-4"></fa-icon>
        <span>The thing is doing now</span>
      </div>
    </div>

    <!-- 新增任務 Dialog -->
    <BaseDialog v-model="missionDialog">
      <div class="font-noto">
        <input
          v-model="missionTitle"
          type="text"
          placeholder="請輸入任務名稱"
          class="outline-none border-2 rounded px-4 py-2 w-full mb-4"
        />

        <div class="flex justify-end">
          <base-btn class="mr-2" color="red" @click="missionAdd">新增任務</base-btn>
          <base-btn @click="missionDialog = false">取消</base-btn>
        </div>
      </div>
    </BaseDialog>
  </div>
</template>

<script setup>
import { computed, inject, onMounted, ref } from 'vue'
import { useStore } from 'vuex'

import VStepper from '@/components/VStepper'
import VTimer from '@/components/VTimer'
import BaseBtn from '@/components/BaseBtn'
import BaseDialog from '@/components/BaseDialog'

export default {
  name: 'Home',

  components: {
    VStepper,
    VTimer,
    BaseDialog,
    BaseBtn
  }
}

const store = useStore()
const dayjs = inject('dayjs')

// 樣式套用
export const { bgClass } = useStyle()

// 任務列表
export const { timerList, currentMission } = useMissionList()

// 當前日期及時間
export const { currentDate, currentTime } = useCurrentDate()

// 任務處理
export const {
  missionDialog,
  missionTitle,
  missionAdd,
  missionDone
} = useMissionHandler()

// [ functions ]
function useStyle() {
  const isCounting = computed(() => store.state.isCounting)
  const mode = computed(() => store.state.mode)

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

function useMissionList() {
  // 番茄鐘任務列表
  const timerList = computed(() => {
    return store.state.missionList.filter(item => !item.done)
  })

  // 當前執行任務
  const currentMission = computed(() => {
    return timerList.value.find(item => !item.done)
  })

  return {
    timerList,
    currentMission
  }
}

function useMissionHandler() {
  const missionDialog = ref(false)
  const missionTitle = ref('')

  const missionAdd = () => {
    store.commit('missionAdd', missionTitle.value)
    missionTitle.value = ''
    missionDialog.value = false
  }

  const missionDone = id => {
    store.commit('missionDone', id)
  }

  return { missionDialog, missionTitle, missionAdd, missionDone }
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

  return { currentDate, currentTime }
}
</script>
