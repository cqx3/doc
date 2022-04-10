<script setup lang="ts">
import { useData } from 'vitepress'
import { NavItemWithChildren } from '../config'
import VTFlyout from '../core/VTFlyout.vue'
import { isActive } from '../support/utils'

defineProps<{
  item: NavItemWithChildren
}>()
const { page } = useData()
</script>

<template>
  <VTFlyout
    :class="{
      'vp-navbar__group': true,
      active: isActive(page.relativePath, item.activeMatch, true)
    }"
    :button="item.text"
    :items="item.items"
  />
</template>

<style scoped>
.vp-navbar__group.active {
  border-bottom: 1px solid var(--vt-c-brand);
  height: var(--vt-nav-height);
}
</style>
