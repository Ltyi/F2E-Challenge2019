<template>
  <div class="font-base flex">
    <!-- main wraper -->
    <main class="flex flex-col flex-grow relative max-w-full min-h-screen">
      <!-- sidebar -->
      <TheSidebar></TheSidebar>

      <!-- content -->
      <div class="pl-21 h-full">
        <!-- container -->
        <div class="mx-auto h-full">
          <router-view />
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import TheSidebar from '@/components/TheSidebar'

export default {
  name: 'App',

  components: {
    TheSidebar
  }
}
</script>
