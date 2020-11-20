<template>
  <div class="h-full font-noto">
    <div>1</div>
    <div class="flex">
      <div class="w-4/12">
        <HorizontalBar></HorizontalBar>
      </div>
    </div>
  </div>
</template>

<script>
import HorizontalBar from '@/components/mission/HorizontalBar'

export default {
  name: 'Analytics',

  components: {
    HorizontalBar
  }
}
</script>
