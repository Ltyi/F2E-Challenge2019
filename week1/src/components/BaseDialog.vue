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
            class="p-4 bg-white w-full max-w-lg rounded-lg overflow-hidden shadow-xl transform transition-all"
          >
            <slot></slot>
          </div>
        </transition>
      </div>
    </div>
  </transition>
</template>

<script setup="props, { emit }">
export default {
  name: 'BaseDialog',

  props: {
    modelValue: Boolean
  },

  emits: ['update:modelValue']
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
