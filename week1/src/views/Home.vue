<template>
  <div class="flex h-full">
    <div class="flex flex-col w-4/12 p-16 h-full">
      <VStepper :items="todoList"></VStepper>

      <!-- 增加新任務 -->
      <div class="flex-grow p-6 bg-gray-100 rounded-md font-noto">
        <h3 class="text-lg text-gray-400 cursor-pointer inline-block">
          <span class="mr-3">+</span>
          增加新任務
        </h3>
      </div>
    </div>

    <div class="w-8/12 p-16 h-full bg-gray-100 text-gray-400 flex">
      <div class="w-6/12">
        <div class="text-lg font-noto">今日任務已完成</div>
        <div class="text-4xl">4/15</div>
      </div>

      <div class="w-6/12 flex justify-end">
        <div class="text-right">
          <div class="text-lg font-noto">今日任務已完成</div>
          <div class="text-4xl test">4/15</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'

export { default as VStepper } from '@/components/VStepper'
export { default as VTimer } from '@/components/VTimer'

export default {
  name: 'Home'
}

export const todoList = ref([
  {
    title: '任務1',
    mode: 'focus'
  },
  {
    title: '休息時間',
    mode: 'break'
  },
  {
    title: 'The Mission A',
    mode: 'focus'
  },
  {
    title: '休息時間',
    mode: 'break'
  },
  {
    title: '任務3',
    mode: 'focus'
  },
  {
    title: '休息時間',
    mode: 'break'
  },
  {
    title: '任務4',
    mode: 'focus'
  },
  {
    title: '休息時間',
    mode: 'longBreak'
  },
  {
    title: '任務5',
    mode: 'focus'
  }
])
</script>
