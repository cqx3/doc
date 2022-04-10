<script setup lang="ts">
import { MenuItem, MenuItemChild } from '../types/menu'
import VTMenuLink from './VTMenuLink.vue'
import VTMenuGroup from './VTMenuGroup.vue'

defineProps<{
  items?: (MenuItem | MenuItemChild)[]
}>()
</script>

<template>
  <div class="vp-menu">
    <div v-if="items" class="vp-menu__item">
      <template v-for="item in items" :key="item.text">
        <VTMenuLink v-if="'link' in item" :item="item" />
        <VTMenuGroup v-else :text="item.text" :items="item.items" />
      </template>
    </div>
  </div>
</template>

<style scoped>
.vp-menu {
  border-radius: 8px;
  padding: 12px 0;
  min-width: 192px;
  border: 1px solid transparent;
  background: var(--vt-c-bg);
  box-shadow: var(--vt-shadow-3);
  transition: background-color .5s;
}
.dark .vp-menu {
  background: var(--vt-c-bg);
  box-shadow: var(--vt-shadow-1);
  border: 1px solid var(--vt-c-divider-light);
}
.vp-menu__item {
  transition: border-color .5s;
}
</style>
