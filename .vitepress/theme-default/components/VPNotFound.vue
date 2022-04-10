<script setup lang="ts">
import { useData, useRoute } from 'vitepress'

const { theme } =useData()
const route = useRoute()
</script>

<template>
  <div class="vt-doc">
    <h1>抱歉，页面未找到</h1>
    <p><span class="not-found-path">{{ route.path }}</span>链接不存在</p>
  </div>
</template>

<style scoped>
.vt-doc {
  padding: 32px 48px;
  margin: 32px;
  border-radius: 8px;
  background-color: var(--vt-c-bg-soft);
}
.not-found-path {
  font-family: var(--vt-font-family-mono);
  color: var(--vt-c-text-code);
}
</style>