<template>
  <div class="flex h-full">
    <div class="flex flex-col w-4/12 p-16 h-full">
      <VStepper :items="stepperList"></VStepper>

      <div class="flex-grow"></div>

      <!-- 增加新任務 -->
      <div class="h-40 p-6 bg-gray-100 rounded-md font-noto">
        <h3
          class="text-lg text-gray-400 cursor-pointer inline-block"
          @click="addMissionDialog = true"
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
      <div v-if="currentMission" class="w-full flex justify-center">
        <div class="w-6/12">
          <VTimer :mode="currentMission.mode" @mission:done="missionDone"></VTimer>
        </div>
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

    {{ currentMission }}
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
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

export const { timerList, stepperList, currentMission, missionDone } = useMissionList()
export const { missionDialog, missionTitle, missionAdd } = useMissionHandler()

// [ 任務列表 ]
function useMissionList() {
  // 番茄鐘任務列表
  const timerList = ref([])

  // 任務流程列表
  const stepperList = computed(() => {
    return timerList.value.filter(item => !item.done && item.mode !== 'break').slice(0, 6)
  })

  // 當前執行任務
  const currentMission = computed(() => {
    return timerList.value.find(item => !item.done)
  })

  // 任務結束觸發
  const missionDone = () => {
    const currentMission = timerList.value.find(item => !item.done)
    currentMission.done = true
  }

  onMounted(() => {
    const missionList = computed(() => store.state.missionList)

    missionList.value.forEach((item, i) => {
      if ((i + 1) % 4 === 0) {
        timerList.value.push(item, {
          title: '休息時間',
          mode: 'longBreak',
          done: false
        })
      } else {
        timerList.value.push(item, {
          title: '休息時間',
          mode: 'break',
          done: false
        })
      }
    })
  })

  return {
    timerList,
    stepperList,
    currentMission,
    missionDone
  }
}

// [ 新增任務 ]
function useMissionHandler() {
  const missionDialog = ref(false)
  const missionTitle = ref('')

  const missionAdd = () => store.commit('missionAdd', missionTitle.value)

  return { missionDialog, missionTitle, missionAdd }
}
</script>
