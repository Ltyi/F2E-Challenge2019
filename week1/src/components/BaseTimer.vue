<template>
  <div class="relative">
    <svg width="100" height="100" viewBox="0 0 31.831 31.831" :class="timerClass">
      <circle
        r="15.9155"
        cx="15.9155"
        cy="15.9155"
        fill="transparent"
        stroke-width="31.831"
        :stroke-dasharray="`${percent} 100`"
      ></circle>
    </svg>

    <div class="absolute top-0 left-0 w-full h-full flex justify-center items-center">
      <div
        class="relative text-100 font-bold"
        :class="isCounting ? 'text-white' : 'text-green-900'"
      >
        <span>05:00</span>

        <div
          class="absolute w-full text-lg flex px-2"
          :class="isCounting ? 'justify-between' : 'justify-center'"
        >
          <template v-if="isCounting">
            <div class="cursor-pointer" @click="pause">
              <fa-icon :icon="['far', 'stop-circle']"></fa-icon>
              暫停
            </div>

            <div class="cursor-pointer">
              <fa-icon :icon="['fas', 'times']"></fa-icon>
              作廢
            </div>
          </template>

          <template v-else>
            <div class="cursor-pointer" @click="start">
              開始
              <fa-icon :icon="['fas', 'play']"></fa-icon>
            </div>
          </template>
        </div>
      </div>
    </div>

    {{ test }}
  </div>
</template>

<script setup="props">
import { computed, ref } from 'vue'
import dayjs from 'dayjs'
import duration from 'dayjs/plugin/duration'

dayjs.extend(duration)

export default {
  name: 'BaseTimer',

  props: {
    break: Boolean
  }
}

export const { timerClass } = useStyle()
export const { percent, start, pause, isCounting } = useTimer()

export const test = ref(dayjs.duration(300000).asSeconds())

// [ SVG 樣式套用 ]
function useStyle() {
  const timerClass = computed(() => {
    return {
      timer: true,
      'timer-break': props.break,
      'timer-break--start': isCounting.value,
      'timer-focus': !props.break
    }
  })

  return { timerClass }
}

// [ 計時器 ]
function useTimer() {
  const timer = ref(null)
  const counter = ref(0)
  const duration = computed(() => (props.break ? 300 : 1500))
  const percent = computed(() => (100 / duration.value) * counter.value)

  const isCounting = computed(() => {
    return !!timer.value
  })

  const start = () => {
    timer.value = setInterval(() => {
      counter.value++
      console.log(percent.value)

      if (percent.value === 100) {
        pause()
      }
    }, 1000)
  }

  const pause = () => {
    clearInterval(timer.value)
    timer.value = null
  }

  return {
    percent,
    start,
    pause,
    isCounting
  }
}
</script>

<style lang="postcss" scoped>
.timer {
  @apply transform -rotate-90 border-3 rounded-full w-full h-full;
  font-size: 8px;
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
