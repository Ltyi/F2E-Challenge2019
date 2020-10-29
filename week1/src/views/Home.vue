<template>
  <base-row>
    <base-col class="w-4/12">
      <VStepper :items="todoList"></VStepper>
    </base-col>

    <base-col class="w-8/12">
      <div class="bg-gray-500">1</div>
    </base-col>
  </base-row>
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
    title: '任務2',
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
  }
])
</script>
