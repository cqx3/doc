<script setup lang="ts">
import { useData } from 'vitepress'
import { MenuItemWithLink } from '../types/menu'
import { isActive } from '../support/utils'

defineProps<{
  item: MenuItemWithLink
}>()
const { page } = useData()
</script>

<template>
  <a
    :class="{ link: true, active: isActive(page.relativePath, item.link) }"
    :href="item.link"
  >
    <p class="link-text">{{ item.text }}</p>
  </a>
</template>

<style scoped>
.link {
  display: block;
  padding: 6px 0;
}
@media (min-width: 960px) {
  .link {
    padding: 4px 0;
  }
}
.link:hover .link-text {
  color: var(--vt-c-brand-text-1);
  transition: color 0.25s;
}
.link.active .link-text {
  font-weight: 600;
  color: var(--vt-c-brand);
  transition: color 0.25s;
}
.link-text {
  line-height: 20px;
  font-size: 13px;
  font-weight: 500;
  color: var(--vt-c-text-2);
  transition: color 0.5s;
}
</style>