<template>
  <button
    class="w-30 h-10 rounded-btn bg-black text-white transition-colors duration-100 font-bold text-sm focus:outline-none hover:bg-yellow"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  name: 'VBtn'
}
</script>
