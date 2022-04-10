<script setup lang="ts">
// import { useConfig } from '../composables/config'
import VPNav from './VPNav.vue'
import VPSidebar from './VPSidebar.vue'
import VPContent from './VPContent.vue'

// const { config } = useConfig()
// console.log('>>>',config)
</script>

<template>
  <div class="vp-app">
    <VPNav />
    <VPSidebar>
      <template #top>
        <slot name="sidebar-top" />
      </template>
      <template #bottom>
        <slot name="sidebar-bottom" />
      </template>
    </VPSidebar>
    <VPContent />
  </div>
</template>

<style scoped></style>