<script setup lang="ts">
import { useSidebar } from '../composables/sidebar'
import VPSidebarGroup from './VPSidebarGroup.vue'

const { sidebar, hasSidenar } = useSidebar()
</script>

<template>
  <aside v-if="hasSidenar" class="vp-sidebar">
    <nav class="vp-sidebar__nav">
      <slot name="top" />
      <div v-for="group in sidebar" :key="group.text" class="group">
        <VPSidebarGroup :text="group.text" :items="group.items" />
        <slot name="bottom" />
      </div>
    </nav>
  </aside>
</template>

<style scoped>
.vp-sidebar {
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  padding: 0 32px 96px;
  width: calc(100vw - 64px);
  max-width: var(--vt-sidebar-width-mobile);
  opacity: 0;
  background-color: var(--vt-c-bg);
  overflow-x: hidden;
  overflow-y: auto;
  z-index: var(--vt-z-index-sidebar);
  transform: translateX(-100%);
  transition: background-color 0.5s, opacity 0.5s, transform 0.3s ease;
}
.vp-sidebar__nav {
  padding-top: 24px;
  outline: 0;
}
@media (min-width: 960px) {
  .vp-sidebar {
    top: var(--vt-nav-height);
    border-right: 1px solid var(--vt-c-divider-light);
    width: var(--vt-sidebar-width-small);
    max-width: 100%;
    opacity: 1;
    transform: translateX(0);
    transition: border-color 0.5s, background-color 0.5s;
  }
}
@media (min-width: 1440px) {
  .vp-sidebar {
    padding: 0 32px 96px calc((100% - var(--vt-screen-max-width)) / 2);
    width: calc((100% - var(--vt-screen-max-width)) / 2 + var(--vt-screen-width-small));
  }
}
</style>