<script setup lang="ts">
import { useSidebar } from '../composables/sidebar'
import VPNavBar from './VPNavBar.vue'
const { hasSidenar } = useSidebar()
</script>

<template>
  <header class="vp-nav nav-bar" :class="{stick:!hasSidenar}">
    <VPNavBar />
  </header>
</template>

<style scoped>
.vp-nav {
  position: relative;
  top: 0;
  left: 0;
  z-index: var(--vt-z-index-nav);
}
@media (min-width: 960px) {
  .vp-nav {
    position: fixed;
    width: 100%;
  }
}
</style>