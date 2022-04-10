<script setup lang="ts">
import { useData } from 'vitepress'
import VPFooter from './VPFooter.vue'

const { frontmatter } = useData()
</script>

<template>
  <div class="vp-content__page">
    <Content />
    <slot name="footer-before" />
    <VPFooter v-if="frontmatter.footer !== false" />
    <slot name="footer-after" />
  </div>
</template>