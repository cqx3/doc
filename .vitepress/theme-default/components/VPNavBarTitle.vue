<script setup lang="ts">
import { useData } from 'vitepress'

const {site} = useData()
</script>

<template>
  <a class="vp-navbar__title" href="/">
    <span class="text">{{site.title}}</span>
  </a>
</template>

<style scoped>
.vp-navbar__title {
  display: flex;
  align-items: center;
  padding-top: 1px;
  height: var(--vt-nav-height);
  transition: opacity 0.25s;
}
.vp-navbar__title:hover {
  opacity: 0.6;
}
.text {
  font-size: 16px;
  font-weight: 500;
}
</style>