<template>
  <div class="select-none rounded-md bg-white border border-gray transition-opacity ease-out">
    <img :src="imageSrc">
  </div>
</template>

<script>
import { computed } from 'vue'

export default {
  name: 'Card',

  props: {
    fileName: {
      type: String,
      default: ''
    }
  },

  setup(props) {
    const imageSrc = computed(() => {
      return props.fileName ? require(`@/assets/cards/${props.fileName}.png`) : ''
    })

    return { imageSrc }
  }
}
</script>
