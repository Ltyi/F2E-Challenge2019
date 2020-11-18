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

            <div class="cursor-pointer" @click="skip">
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
import { inject, computed, ref, watch } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'VStepper'
}

const dayjs = inject('dayjs')
const store = useStore()

export const { timerClass, textClass } = useStyle()

export const {
  mode,
  percent,
  start,
  pause,
  skip,
  isCounting,
  countDownFormat
} = useTimer()

// [ Functions ]
function useStyle() {
  const timerClass = computed(() => {
    return {
      timer: true,
      'timer-break': mode.value === 'break',
      'timer-focus': mode.value === 'focus',
      'timer--start': isCounting.value
    }
  })

  const textClass = computed(() => {
    return {
      'text-white': isCounting.value,
      'text-green-900': !isCounting.value && mode.value === 'break',
      'text-red-600': !isCounting.value && mode.value === 'focus'
    }
  })

  return { timerClass, textClass }
}

function useTimer() {
  const mode = computed(() => store.state.mission.mode)
  const duration = computed(() => (mode.value === 'focus' ? 5 : 5)) // timer 倒數模式 2500/300
  const timer = ref(null) // interval
  const counter = ref(0) // 目前執行秒數
  const percent = computed(() => (100 / duration.value) * counter.value) // 進度百分比

  // 進度轉換為 hh:mm 計時器
  const countDownFormat = computed(() => {
    const current = duration.value * 1000 - counter.value * 1000
    const currentDuration = dayjs.duration(current)

    return dayjs(currentDuration.asMilliseconds()).format('mm:ss')
  })

  // 監看 interval 是否執行中，將狀態同步到 vuex
  watch(timer, val => store.commit('setIsCounting', !!val), { immediate: true })

  const isCounting = computed(() => {
    return store.state.mission.isCounting
  })

  const start = () => {
    timer.value = setInterval(() => {
      counter.value++

      // 主工作時間結束後轉為短休息模式
      // 短休息模式結束後將任務狀態改為完成後重置狀態
      if (mode.value === 'focus' && percent.value === 100) {
        store.commit('mission/setMode', 'break')
        counter.value = 0
      } else if (mode.value === 'break' && percent.value === 100) {
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
    store.commit('mission/setMode', 'focus')
  }

  const skip = () => {
    emit('mission:skip')
    reset()
  }

  return {
    mode,
    percent,
    start,
    pause,
    skip,
    isCounting,
    countDownFormat
  }
}
</script>

<style lang="postcss" scoped>
.timer {
  @apply transform -rotate-90 border-3 rounded-full w-full h-full transition-all duration-500;
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
