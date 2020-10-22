<template>
  <svg viewBox="0 0 31.831 31.831" :class="timerClass">
    <circle
      r="15.9155"
      cx="16"
      cy="16"
      fill="transparent"
      stroke-width="31.831"
      :stroke-dasharray="`${percent} 100`"
    ></circle>
  </svg>

  <button @click="start" class="mr-2 bg-gray-500 rounded px-4 py-1">start</button>
  <button @click="pause" class="bg-gray-500 rounded px-4 py-1">pause</button>
</template>

<script setup="props">
import { computed, ref } from 'vue'

export default {
  name: 'BasePieChart',

  props: {
    break: Boolean
  }
}

export const { timerClass } = useStyle()
export const { percent, start, pause } = useTimer()

// [ 共用狀態 ]
const counting = ref(false)

// [ 樣式套用 ]
function useStyle() {
  const timerClass = computed(() => {
    return {
      timer: true,
      'timer-break': props.break,
      'timer-break--start': counting.value,
      'timer-focus': !props.break
    }
  })

  return { timerClass }
}

// [ 計時器 ]
function useTimer() {
  let timer
  const counter = ref(0)
  const duration = computed(() => (props.break ? 300 : 1500))
  const percent = computed(() => (100 / duration.value) * counter.value)

  const start = () => {
    counting.value = true

    timer = setInterval(() => {
      counter.value++
      console.log(percent.value)

      if (percent.value === 100) {
        pause()
      }
    }, 1000)
  }

  const pause = () => {
    counting.value = false
    clearInterval(timer)
  }

  return {
    percent,
    start,
    pause
  }
}
</script>

<style lang="postcss" scoped>
.timer {
  @apply transform -rotate-90 border-3 rounded-full;
}

.timer-break {
  @apply bg-green-200 border-green-600;
}

.timer-break circle {
  @apply stroke-current text-green-500;
}

.timer-break--start {
  @apply bg-green-800 border-green-900;
}

circle {
  transition: stroke-dasharray 0.3s;
}
</style>
