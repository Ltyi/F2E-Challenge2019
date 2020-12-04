<template>
  <div class="h-full font-noto p-16">
    <div class="flex items-center h-10 mb-12">
      <fa-icon
        :icon="['fas', 'music']"
        class="text-3xl mt-1 mr-6 text-gray-600"
      ></fa-icon>
      <span class="text-3xl font-bold text-gray-600">鈴聲</span>
    </div>

    <div class="flex">
      <div class="w-6/12 mr-12">
        <div class="title bg-red-300">工作鈴聲</div>

        <div class="p-8 bg-red-100 rounded-b-md flex flex-wrap">
          <div v-for="(item, i) in ringFoucs" :key="i" class="w-6/12 mb-3">
            <div class="flex items-center">
              <label>
                <input
                  v-model="focusSelected"
                  type="radio"
                  :value="item.value"
                  class="mr-4"
                />
                <span class="text-xl">{{ item.title }}</span>
              </label>
            </div>
          </div>
        </div>
      </div>

      <div class="w-6/12">
        <div class="title bg-green-600">休息鈴聲</div>

        <div class="p-8 bg-green-300 rounded-b-md flex flex-wrap">
          <div v-for="(item, i) in ringBreak" :key="i" class="w-6/12 mb-3">
            <div class="flex items-center">
              <label>
                <input
                  v-model="breakSelected"
                  type="radio"
                  :value="item.value"
                  class="mr-4"
                />
                <span class="text-xl">{{ item.title }}</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'Rington',

  setup() {
    const ringFoucs = ref([
      { title: 'Default', value: 0 },
      { title: 'Test', value: 1 },
      { title: 'Test', value: 2 },
      { title: 'Test', value: 3 },
      { title: 'Test', value: 4 },
      { title: 'Test', value: 5 }
    ])

    const ringBreak = ref([
      { title: 'Default', value: 0 },
      { title: 'Test', value: 1 },
      { title: 'Test', value: 2 },
      { title: 'Test', value: 3 },
      { title: 'Test', value: 4 },
      { title: 'Test', value: 5 }
    ])

    const focusSelected = ref(0)
    const breakSelected = ref(0)

    return {
      ringFoucs,
      ringBreak,
      focusSelected,
      breakSelected
    }
  }
}
</script>

<style scoped>
.title {
  @apply flex items-center font-medium text-white text-lg py-3 px-6 rounded-t-md;
}
</style>
