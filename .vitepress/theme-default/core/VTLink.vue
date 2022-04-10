<script setup lang="ts">
import { computed } from 'vue'
import VTIconExternalLink from './icons/VTIconExternalLink.vue'

const props = defineProps<{
  href?: string
  noIcon?: boolean
}>()
const isExternal = computed(() => props.href && /^[a-z]+:/i.test(props.href))
</script>

<template>
  <component
    :is="href ? 'a' : 'span'" class="vt-link" :class="{ link: href }"
    :href="href"
    :target="isExternal ? '_blank' : undefined"
    :ref="isExternal ? 'noopener noreferrer' : undefined"
  >
    <slot />
    <VTIconExternalLink v-if="isExternal && !noIcon" class="vt-link__icon" />
  </component>
</template>

<style scoped>
.vt-link__icon {
  display: inline-block;
  margin-top: -2px;
  margin-left: 4px;
  width: 11px;
  height: 11px;
  fill: var(--vt-c-text-3);
  transition: fill 0.25s;
}
</style>
