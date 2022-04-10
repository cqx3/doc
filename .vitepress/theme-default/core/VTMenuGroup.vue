<script setup lang="ts">
import { MenuItemChild } from '../types/menu'
import VTMenuLink from './VTMenuLink.vue'

defineProps<{
  text?: string
  items: MenuItemChild[]
}>()
</script>

<template>
  <div class="vt-menu__group">
    <p v-if="text" class="vt-menugroup__title">{{ text }}</p>
    <template v-for="item in items">
      <VTMenuLink v-if="'link' in item" :item="item" />
    </template>
  </div>
</template>

<style scoped>
.vt-menu__group {
  padding: 0 0 12px;
}
.vt-menu__group + .vt-menu__group {
  border-top: 1px solid var(--vt-c-divider-light);
  padding: 11px 0 12px;
}
.vt-menu__group:last-child {
  padding-bottom: 0;
}
.vt-menu__group + .vt-menu__items{
  border-top: 1px solid var(--vt-c-divider-light);
  padding: 11px 16px 0;
}
.vt-menugroup__title {
  padding: 0 18px;
  line-height: 28px;
  font-size: 10px;
  font-weight: 600;
  color: var(--vt-c-text-3);
  text-transform: uppercase;
  transition: color .25s;
}
</style>
