<script setup lang="ts">
import { useData } from 'vitepress'
import { NavItemWithLink } from '../config'
import VTLink from '../core/VTLink.vue'
import { isActive } from '../support/utils'

defineProps<{
  item: NavItemWithLink
}>()
const { page } =useData()
</script>

<template>
  <VTLink
    :class="{
      'vp-navbar__link': true,
      active: isActive(page.relativePath,item.activeMatch||item.link,!!item.activeMatch)
    }"
    :href="item.link"
    :no-icon="true"
  >{{ item.text }}</VTLink>
</template>

<style scoped>
.vp-navbar__link {
  display: block;
  padding: 0 12px;
  line-height: calc(var(--vt-nav-height) - 1px);
  font-size: 13px;
  font-weight: 500;
  color: var(--vt-c-text-1);
  transition: color 0.25s;
}
.vp-navbar__link.active {
  border-bottom: 1px solid var(--vt-c-brand);
}
.vp-navbar__link:hover {
  color: var(--vt-c-brand);
}
</style>
