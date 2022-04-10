<script setup lang="ts">
import { useData, useRoute } from 'vitepress'
import VPNotFound from './VPNotFound.vue'
import VPContentPage from './VPContentPage.vue'
import VPContentDoc from './VPContentDoc.vue'
import { useSidebar } from '../composables/sidebar'

const route = useRoute()
const { frontmatter } = useData()
const { hasSidenar } = useSidebar()
</script>

<template>
  <div
    class="vp-content"
    :class="{ 'is-sidebar': hasSidenar }"
  >
    <VPNotFound v-if="route.component === VPNotFound" />
    <VPContentPage v-else-if="!!frontmatter.page">
      <template #footer-before><slot name="footer-before" /></template>
      <template #footer-after><slot name="footer-after" /></template>
    </VPContentPage>
    <VPContentDoc v-else :class="{ 'is-sidebar': hasSidenar }">
      <template #content-top><slot name="content-top" /></template>
      <template #content-bottom><slot name="content-bottom" /></template>
      <template #aside-top><slot name="aside-top" /></template>
      <template #aside-mid><slot name="aside-mid" /></template>
      <template #aside-bottom><slot name="aside-bottom" /></template>
    </VPContentDoc>
  </div>
</template>

<style scoped>
@media (min-width: 960px) {
  .vp-content {
    padding-top: var(--vt-nav-height);
  }
  .vp-content.is-sidebar {
    padding-left: var(--vt-sidebar-width-small);
  }
}
@media (max-width: 768px) {
  .vp-content {
    overflow-x: hidden;
  }
}
</style>
