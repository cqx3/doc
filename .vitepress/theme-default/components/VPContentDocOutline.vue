<script setup lang="ts">
import { useData } from 'vitepress'
import { computed, inject, ref } from 'vue'
import { resolveHeaders, useActiveAnchor } from '../composables/outline'

const { page, frontmatter } = useData()
const filterHeaders = inject('filter-headers', null) as any
const filteredHeaders =computed(() => {
  return filterHeaders ? filterHeaders(page.value.headers) : page.value.headers
})
const container = ref()
const marker = ref()
useActiveAnchor(container, marker)
function handleClick({target: el}: Event) {
  const id = '#' + (el as HTMLAnchorElement).href!.split('#')[1]
  const heading = document.querySelector(decodeURIComponent(id)) as HTMLAnchorElement
  heading?.focus()
}
</script>

<template>
  <div ref="container" class="vp-content__outline">
    <div ref="marker" class="outline-marker" />
    <nav>
      <ul class="root">
        <li v-for="{ text, link, children } in resolveHeaders(filteredHeaders)">
          <a class="outline-link" :href="link" @click="handleClick">{{ text }}</a>
          <ul v-if="children && frontmatter.outline === 'deep'">
            <li v-for="{ text, link } in children">
              <a class="outline-link nested" :href="link" @click="handleClick">{{ text }}</a>
            </li>
          </ul>
        </li>
      </ul>
    </nav>
  </div>
</template>

<style scoped>
.vp-content__outline {
  font-size: 13px;
  font-weight: 500;
  position: relative;
}
.outline-marker {
  opacity: 0;
  position: absolute;
  background-color: var(--vt-c-green);
  border-radius: 4px;
  width: 4px;
  height: 20px;
  top: 5px;
  left: -12px;
  z-index: 0;
  transition: top 0.25s cubic-bezier(0, 1, 0.5, 1), opacity 0.25s, background-color 0.5s;
}
.root {
  position: relative;
  z-index: 1;
}
.outline-link {
  color: var(--vt-c-text-2);
  transition: color 0.5s;
  line-height: 28px;
  display: block;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.outline-link:hover,
.outline-link.active {
  color: var(--vt-c-text-1);
  transition: color 0.25s;
}
.outline-link.nested {
  padding-left: 1em;
}
</style>
