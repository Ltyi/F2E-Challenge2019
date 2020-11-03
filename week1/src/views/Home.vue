<template>
  <div class="flex h-full">
    <div class="flex flex-col w-4/12 p-16 h-full">
      <VStepper :items="stepperList"></VStepper>

      <!-- 增加新任務 -->
      <div class="flex-grow p-6 bg-gray-100 rounded-md font-noto">
        <h3
          class="text-lg text-gray-400 cursor-pointer inline-block"
          @click="test = true"
        >
          <span class="mr-3">+</span>
          增加新任務
        </h3>
      </div>
    </div>

    <div class="w-8/12 p-16 h-full bg-gray-100 text-gray-400 flex flex-wrap items-start">
      <div class="w-6/12">
        <div class="text-lg font-noto">今日任務已完成</div>
        <div class="text-4xl">4/15</div>
      </div>

      <div class="w-6/12 flex justify-end">
        <div class="text-right">
          <div class="text-lg font-noto">2019 / 07 / 09</div>
          <div class="text-4xl test">13:00</div>
        </div>
      </div>

      <!-- Timer -->
      <div class="w-full flex justify-center">
        <div class="w-6/12">
          <VTimer :mode="currentMission.mode" @mission:done="missionDone"></VTimer>
        </div>
      </div>

      <div class="w-full text-2xl self-end">
        <fa-icon :icon="['fas', 'circle']" class="mr-4"></fa-icon>
        <span>The thing is doing now</span>
      </div>
    </div>
  </div>

  <BaseDialog v-model="test"></BaseDialog>
</template>

<script setup>
import { computed, ref } from 'vue'

export { default as VStepper } from '@/components/VStepper'
export { default as VTimer } from '@/components/VTimer'
export { default as BaseDialog } from '@/components/BaseDialog'

export default {
  name: 'Home'
}

export const test = ref(false)

// [ Timer 任務列表 ]
export const timerList = ref([
  {
    title: '任務1',
    mode: 'focus',
    done: false
  },
  {
    title: '休息時間',
    mode: 'break',
    done: false
  },
  {
    title: '任務2',
    mode: 'focus',
    done: false
  },
  {
    title: '休息時間',
    mode: 'break',
    done: false
  },
  {
    title: '任務3',
    mode: 'focus',
    done: false
  },
  {
    title: '休息時間',
    mode: 'break',
    done: false
  },
  {
    title: '任務4',
    mode: 'focus',
    done: false
  },
  {
    title: '休息時間',
    mode: 'loneBreak',
    done: false
  },
  {
    title: '任務5',
    mode: 'focus',
    done: false
  },
  {
    title: '休息時間',
    mode: 'break',
    done: false
  }
])

// [ 任務佇列表 ]
export const stepperList = computed(() => {
  return timerList.value.filter(item => !item.done && item.mode !== 'break').slice(0, 6)
})

// [ 當前執行任務 ]
export const currentMission = computed(() => {
  return timerList.value.find(item => !item.done)
})

// [ 任務結束觸發 ]
export const missionDone = () => {
  const currentMission = timerList.value.find(item => !item.done)
  currentMission.done = true
}
</script>
