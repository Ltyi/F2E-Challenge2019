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
import { useStore } from 'vuex'

export default {
  name: 'PlanMissionAdd',

  props: {
    modelValue: Boolean,
    planID: {
      type: String,
      default: ''
    }
  },

  emits: ['update:modelValue', 'update:planID']
}

const store = useStore()

export const { title, add, close } = usePlanMissionAdd()

// 組件功能
function usePlanMissionAdd() {
  const title = ref('')

  const add = () => {
    const payload = {
      title: title.value,
      planID: props.planID
    }
    store.commit('plans/planMissionAdd', payload)
    close()
  }

  const close = () => {
    emit('update:modelValue', false)
    emit('update:planID', '')
  }

  return {
    title,
    add,
    close
  }
}
</script>
