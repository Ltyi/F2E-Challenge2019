<template>
  <base-dialog :model-value="modelValue" @update:modelValue="close">
    <div class="font-noto">
      <input
        v-model="title"
        type="text"
        placeholder="請輸入計畫名稱"
        class="outline-none border-2 rounded px-4 py-2 w-full mb-4"
      />

      <div class="flex">
        <div
          class="w-6 h-6 bg-yellow-base rounded cursor-pointer mr-1"
          :class="color === 'yellow' ? activeClass : ''"
          @click="color = 'yellow'"
        ></div>

        <div
          class="w-6 h-6 bg-green-600 rounded cursor-pointer"
          :class="color === 'green' ? activeClass : ''"
          @click="color = 'green'"
        ></div>
      </div>

      <div class="flex justify-end">
        <base-btn class="mr-2" color="red" @click="add">新增計畫</base-btn>
        <base-btn @click="close">取消</base-btn>
      </div>
    </div>
  </base-dialog>
</template>

<script>
import { ref } from 'vue'
import { useStore } from 'vuex'

export default {
  name: 'PlanAdd',

  props: {
    modelValue: Boolean
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const { title, color, activeClass, add, close } = usePlanAdd(emit)

    return {
      title,
      color,
      activeClass,
      add,
      close
    }
  }
}

// 組件功能
function usePlanAdd(emit) {
  const store = useStore()

  const title = ref('')
  const color = ref('yellow')
  const activeClass = { 'border-2': true, 'border-gray-500': true }

  const add = () => {
    const payload = {
      title: title.value,
      color: color.value
    }

    store.commit('plans/planAdd', payload)
    title.value = ''
    close()
  }

  const close = () => emit('update:modelValue', false)

  return {
    title,
    color,
    activeClass,
    add,
    close
  }
}
</script>
