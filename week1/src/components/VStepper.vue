<template>
  <div v-for="(item, i) in items" :key="i">
    <template v-if="item.mode !== 'break'">
      <div class="flex items-center relative">
        <div class="w-10 h-10 flex items-center justify-center mr-6">
          <div
            v-if="i === 0"
            class="flex items-center justify-center w-full h-full rounded-full border-2 border-red-400 text-red-400"
          >
            <fa-icon :icon="['fas', 'play']" class="text-lg ml-1"></fa-icon>
          </div>

          <div v-else class="rounded-full w-5 h-5 bg-red-400"></div>
        </div>

        <div
          :class="{
            'text-2xl': i === 0,
            'text-lg': i !== 0,
            'font-light': i !== 0,
            'font-noto': true,
            'leading-4': true
          }"
        >
          {{ item.title }}
        </div>
      </div>

      <div
        v-if="i !== items.length - 1"
        class="border-l-2 border-red-400 h-12 ml-5"
      ></div>
    </template>
  </div>
</template>

<script setup>
export default {
  name: 'VStepper',

  props: {
    items: {
      type: Array,
      default: () => []
    }
  }
}

// export const textClass = ref({
//   'font-light':
// })
</script>

<style lang="postcss" scoped>
.test::after {
  content: '';
  height: 10px;
  width: 2px;
  top: 0;
  left: 20px;
  @apply absolute bg-red-400;
}

.test::before {
  content: '';
  height: 10px;
  width: 2px;
  bottom: 0;
  left: 20px;
  @apply absolute bg-red-400;
}
</style>
