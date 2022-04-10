<script setup lang="ts">
import VTLink from './VTLink.vue'
import { MenuItemWithLink } from '../types/menu'

defineProps<{ item: MenuItemWithLink }>()
</script>

<template>
  <VTLink class="vp-menu__link" :href="item.link">{{ item.text }}</VTLink>
</template>

<style scoped>
.vp-menu__link {
  display: block;
  padding: 0 18px;
  line-height: 28px;
  font-size: 13px;
  font-weight: 400;
  color: var(--vt-c-text-1);
  white-space: nowrap;
  transition: color 0.25s;
}
.vp-menu__link:hover {
  color: var(--vt-c-brand);
}
</style>
