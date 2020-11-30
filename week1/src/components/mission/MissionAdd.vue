<template>
  <base-dialog :model-value="modelValue" @update:modelValue="close">
    <div class="font-noto">
      <input
        v-model="title"
        type="text"
        placeholder="請輸入任務名稱"
        class="outline-none border-2 rounded px-4 py-2 w-full mb-4"
      />

      <div class="flex justify-end">
        <base-btn class="mr-2" color="red" @click="add">新增任務</base-btn>
        <base-btn @click="close">取消</base-btn>
      </div>
    </div>
  </base-dialog>
</template>

<script setup="props, { emit }">
import { ref } from 'vue'

// 可複用功能
import useMissionHandler from '@/composables/useMissionHandler'

export default {
  naem: 'MissionAdd',

  props: {
    modelValue: Boolean
  },

  emits: ['update:modelValue']
}

export const { missionAdd } = useMissionHandler()
export const { title, add, close } = useMissionAdd()

// 組件功能
function useMissionAdd() {
  const title = ref('')

  const add = () => {
    missionAdd(title.value)
    close()
  }

  const close = () => {
    title.value = ''
    emit('update:modelValue', false)
  }

  return {
    title,
    add,
    close
  }
}
</script>
