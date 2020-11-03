<template>
  <a href="#" :class="btnClasses">
    <slot></slot>
  </a>
</template>

<script setup="props">
import { computed } from 'vue'

export default {
  name: 'BaseBtn',

  props: {
    color: {
      type: String,
      default: 'gray',
      required: false
    }
  }
}

export const btnClasses = computed(() => {
  const color = `btn--${props.color}`

  return {
    btn: true,
    [color]: true
  }
})
</script>

<style lang="postcss" scoped>
.btn {
  @apply px-3 py-1 rounded shadow-2xl transition duration-75 ease-in-out;
}

.btn--gray {
  @apply bg-gray-300 text-white;
}

.btn--grat:active {
  @apply bg-gray-500;
}

.btn--red {
  @apply bg-red-300 text-white;
}

.btn--red:active {
  @apply bg-red-600;
}
</style>
