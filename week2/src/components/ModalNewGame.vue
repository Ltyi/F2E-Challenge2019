<template>
  <v-modal :model-value="modelValue" @update:modelValue="$emit('update:modelValue', $event)">
    <div class="flex flex-col items-center">
      <img :src="require('@/assets/kings/king_joy.png')" class="w-14 mb-4">

      <p class="tracking-widest text-xl font-bold mb-5">
        START A NEW GAME
      </p>

      <p class="tracking-wider text-sm mb-16">
        Are you sure you want to give up?
      </p>

      <div>
        <v-btn @click="$emit('newGame')">
          NEW GAME
        </v-btn>
      </div>
    </div>
  </v-modal>
</template>

<script>
import VBtn from '@/components/VBtn'
import VModal from '@/components/VModal'

export default {
  name: 'ModalNewGame',

  components: {
    VBtn,
    VModal
  },

  props: {
    modelValue: Boolean
  },

  emits: ['update:modelValue', 'newGame']
}
</script>
