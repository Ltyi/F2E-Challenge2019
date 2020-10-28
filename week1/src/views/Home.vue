<template>
  <div class="w-3/12">
    <BaseTimer></BaseTimer>
    <BaseTimer break></BaseTimer>
  </div>
</template>

<script setup>
export { default as BaseTimer } from '@/components/BaseTimer'

export default {
  name: 'Home'
}
</script>
