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
      <div class="relative text-100 font-bold" :class="textClass">
        <span>{{ countDownFormat }}</span>

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
  </div>
</template>

<script setup="props, { emit }">
import { inject, computed, ref } from 'vue'

export default {
  name: 'VStepper',

  props: {
    mode: {
      type: String,
      default: 'focus'
    }
  }
}

const dayjs = inject('dayjs')

export const { timerClass, textClass } = useStyle()
export const { percent, start, pause, isCounting, countDownFormat } = useTimer()

// [ SVG 樣式套用 ]
function useStyle() {
  const timerClass = computed(() => {
    return {
      timer: true,
      'timer-break': props.break,
      'timer-focus': !props.break,
      'timer--start': isCounting.value
    }
  })

  const textClass = computed(() => {
    return {
      'text-white': isCounting.value,
      'text-green-900': !isCounting.value && props.break,
      'text-red-600': !isCounting.value && !props.break
    }
  })

  return { timerClass, textClass }
}

// [ 計時器 ]
function useTimer() {
  const modeDuration = () => {
    switch (props.mode) {
      case 'break':
        return 300
      case 'longBreak':
        return 900
      case 'focus':
        return 10
      default:
        return 10
    }
  }
  const timer = ref(null) // interval
  const counter = ref(0) // 目前執行秒數
  const percent = computed(() => (100 / modeDuration()) * counter.value) // 進度百分比

  // 進度轉換為 hh:mm 計時器
  const countDownFormat = computed(() => {
    const current = modeDuration() * 1000 - counter.value * 1000
    const currentDuration = dayjs.duration(current)

    return dayjs(currentDuration.asMilliseconds()).format('mm:ss')
  })

  // interval 是否計時中
  const isCounting = computed(() => {
    return !!timer.value
  })

  const start = () => {
    timer.value = setInterval(() => {
      counter.value++

      if (percent.value === 100) {
        emit('mission:done')
        reset()
      }
    }, 1000)
  }

  const pause = () => {
    clearInterval(timer.value)
    timer.value = null
  }

  const reset = () => {
    clearInterval(timer.value)
    timer.value = null
    counter.value = 0
  }

  return {
    percent,
    start,
    pause,
    reset,
    isCounting,
    countDownFormat
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

.timer-focus {
  @apply bg-red-100 border-red-400;
}

.timer-focus circle {
  @apply stroke-current text-red-500;
}

.timer-break.timer--start {
  @apply bg-green-800 border-green-900;
}

.timer-focus.timer--start {
  @apply bg-red-700 border-red-900;
}

circle {
  transition: stroke-dasharray 0.3s;
}
</style>
