<template>
  <div v-if="visible" class="h-full font-noto flex flex-col">
    <div class="flex flex-grow p-16">
      <div class="w-5/12">
        <div class="flex items-center h-10 mb-12">
          <fa-icon
            :icon="['far', 'chart-bar']"
            class="text-3xl mt-1 mr-6 text-gray-600"
          ></fa-icon>
          <span class="text-3xl font-bold text-gray-600">成效回顧</span>
        </div>

        <div class="flex">
          <div class="w-6/12 rounded bg-gray-200 p-8 font-semibold">
            <div class="text-gray-600 text-lg font-medium">今日完成</div>
            <div class="text-gray-600 text-xl">{{ doneString }}</div>

            <div class="mt-8 text-gray-600 text-lg font-medium">本週完成</div>
            <div class="text-gray-600 text-xl">{{ weekDoneString }}</div>
          </div>

          <div class="w-6/12 px-4">
            <div class="mb-4 text-gray-600 text-lg font-medium text-center">
              本週計畫執行比例
            </div>
            <PieChart></PieChart>
          </div>
        </div>
      </div>

      <div class="w-8/12 flex flex-col justify-end">
        <div class="mb-4 text-gray-600 text-lg font-medium text-center">
          本週完成任務趨勢
        </div>
        <VerticalBar></VerticalBar>
      </div>
    </div>

    <div class="p-16 bg-gray-100">
      <div class="mb-5 text-gray-600 text-lg font-medium">本周工作區間</div>
      <HorizontalBar></HorizontalBar>
    </div>
  </div>

  <div v-else class="flex items-center justify-center h-full">
    <div class="text-3xl font-bold text-gray-600">至少完成一項任務後可瀏覽數據</div>
  </div>
</template>

<script setup>
import VerticalBar from '@/components/analytics/VerticalBar'
import HorizontalBar from '@/components/analytics/HorizontalBar'
import PieChart from '@/components/analytics/PieChart'

// 可複用功能
import useMissionList from '@/composables/useMissionList'
import { computed } from 'vue'

export default {
  name: 'Analytics',

  components: {
    VerticalBar,
    HorizontalBar,
    PieChart
  }
}

export const { doneString, weekDoneString, missionWeekList } = useMissionList()
export const visible = computed(() => missionWeekList.value.filter(x => x.done).length)
</script>
