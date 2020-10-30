<template>
  <div>
    <div v-for="(item, i) in items" :key="i">
      <div v-if="item.mode !== 'break'" class="flex items-center h-16 relative">
        <div
          v-if="i === 0"
          class="flex items-center justify-center w-10 h-10 border-2 border-red-400 text-red-400 rounded-full mr-5 current-step"
        >
          <fa-icon :icon="['fas', 'play']" class="text-lg ml-1"></fa-icon>
        </div>

        <div
          v-else
          class="w-4 h-4 rounded-full bg-red-400 step mr-8"
          :class="{ 'last-step': i === items.length - 1 }"
        ></div>

        <div
          :class="{
            'text-2xl': i === 0,
            'text-base': i !== 0,
            'font-light': i !== 0,
            'font-noto': true,
            'leading-5': true,
            'tracking-wide': true
          }"
        >
          {{ item.title }}
        </div>
      </div>
    </div>
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
</script>

<style lang="postcss" scoped>
.step {
  @apply ml-3;
}

.step::before {
  @apply absolute top-0 w-px bg-red-400;
  content: '';
  left: 20px;
  height: 24px;
}

.step::after {
  @apply absolute bottom-0 w-px bg-red-400;
  content: '';
  left: 20px;
  height: 24px;
}

.current-step::after {
  @apply absolute bottom-0 h-3 w-px bg-red-400;
  content: '';
  left: 20px;
}

.last-step::after {
  @apply hidden;
}
</style>
