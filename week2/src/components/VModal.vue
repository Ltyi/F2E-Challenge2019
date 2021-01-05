<template>
  <transition leave-active-class="duration-200">
    <div v-show="modelValue" class="fixed z-10 inset-0 overflow-y-auto">
      <div
        class="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center"
      >
        <transition
          enter-from-class="opacity-0"
          enter-to-class="opacity-100"
          enter-active-class="ease-out duration-300"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
          leave-active-class="ease-in duration-200"
        >
          <div v-show="modelValue" class="fixed inset-0 transition-opacity">
            <div class="absolute inset-0 bg-gray-500 opacity-75"></div>
          </div>
        </transition>

        <transition
          enter-active-class="duration-300 ease-out"
          enter-class="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
          enter-to-class="translate-y-0 opacity-100 sm:scale-100"
          leave-active-class="duration-200 ease-in"
          leave-class="translate-y-0 opacity-100 sm:scale-100"
          leave-to-class="translate-y-4 opacity-0 sm:translate-y-0 sm:scale-95"
        >
          <div
            v-show="modelValue"
            class="p-8 bg-white w-full max-w-2xl rounded-lg overflow-hidden shadow-xl transform transition-all"
          >
            <div class="flex justify-end">
              <span class="cursor-pointer">
                <fa-icon
                  :icon="['fas', 'times']"
                  size="lg"
                  @click="close"
                ></fa-icon>
              </span>
            </div>

            <div class="text-left">
              <slot></slot>
            </div>
          </div>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'VModal',

  props: {
    modelValue: Boolean
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const close = () => {
      emit('update:modelValue', false)
    }

    return { close }
  }
}
</script>

<style lang="postcss" scoped>
.overlay-enter-active {
  animation: opacity 0.5s;
}

.overlay-leave-active {
  animation: opacity 0.5s reverse;
}

@keyframes opacity {
  0% {
    opacity: 0;
  }
  100% {
    opacity: 100;
  }
}

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.25);
  }
  100% {
    transform: scale(1);
  }
}
</style>
