<script setup lang="ts">
import { useConfig } from '../composables/config'
import VTSwitchAppearance from '../core/VTSwitchAppearance.vue'
const { config } = useConfig()
</script>

<template>
  <div v-if="config.appearance" class="vp-navbar__appearance">
    <VTSwitchAppearance />
  </div>
</template>

<style scoped>
.vp-navbar__appearance {
  display: none;
}
@media (min-width: 1280px) {
  .vp-navbar__appearance {
    display: block;
  }
}
</style>