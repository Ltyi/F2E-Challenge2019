<template>
  <div class="flex flex-col fixed w-21 h-full bg-red-300 text-white">
    <router-link
      v-for="item in list"
      :key="item.icon"
      class="flex items-center justify-center h-21 text-3xl hover:bg-white hover:text-red-600"
      exact-active-class="active"
      :class="item.color"
      :to="item.path"
    >
      <fa-icon :icon="item.icon"></fa-icon>
    </router-link>

    <!-- 撐開中間高度 -->
    <div class="flex-grow"></div>

    <div class="pt-10 flex items-center wtiting-v-rl transform rotate-180 text-4xl">
      <router-link to="/">Pomodoro</router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TheSidebar',

  setup() {
    const list = [
      {
        icon: ['fas', 'list-ul'],
        color: 'bg-red-800',
        path: '/mission'
      },
      {
        icon: ['far', 'chart-bar'],
        color: 'bg-red-600',
        path: '/analytics'
      },
      {
        icon: ['fas', 'music'],
        color: 'bg-red-500',
        path: 'rington'
      }
    ]

    return { list }
  }
}
</script>

<style lang="postcss" scoped>
.active {
  @apply bg-white text-red-600;
}
</style>
