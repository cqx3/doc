<script setup lang="ts">
import { useConfig } from '../composables/config'
import VPNavBarMenuLink from './VPNavBarMenuLink.vue'
import VPNavBarMenuGroup from './VPNavBarMenuGroup.vue'

const { config } = useConfig()
</script>

<template>
  <nav class="vp-navbar__menu">
    <template v-for="item in config.nav" :key="item.text">
      <VPNavBarMenuLink v-if="'link' in item" :item="item" />
      <VPNavBarMenuGroup v-else :item="item" />
    </template>
  </nav>
</template>

<style scoped>
.vp-navbar__menu {
  display: none;
}
@media (min-width: 768px) {
  .vp-navbar__menu {
    display: flex;
  }
}
</style>