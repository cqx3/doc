<script setup lang="ts">
import { useData } from 'vitepress'
import { isActive } from '../support/utils'
import { MenuItemWithLink } from '../types/menu'
import VPSidebarLink from './VPSidebarLink.vue'

const props = defineProps<{
  text: string
  items: MenuItemWithLink[]
}>()

const { page } = useData()
function hasActiveLink() {
  const { relativePath } = page.value
  return props.items.some((item) => isActive(relativePath, item.link))
}
</script>

<template>
  <section class="vp-sidebar__group">
    <div class="title">
      <h2 class="title-text" :class="{ active: hasActiveLink() }">{{ text }}</h2>
    </div>
    <template v-for="item in items" :key="item.link">
      <VPSidebarLink :item="item" />
    </template>
  </section>
</template>

<style scoped>
.title {
  padding: 6px 0;
}
@media (min-width: 96px) {
  .title {
    padding: 4px 0;
  }
}
.title-text {
  line-height: 20px;
  font-size: 13px;
  font-weight: 600;
  color: var(--vt-c-text-1);
  transition: color 0.5s;
}
</style>
