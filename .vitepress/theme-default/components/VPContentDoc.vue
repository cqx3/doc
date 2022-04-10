<script setup lang="ts">
import { useData } from 'vitepress'
import { Config } from '../config'
import VPContentDocOutline from './VPContentDocOutline.vue'

const { frontmatter, page } = useData<Config>()
</script>

<template>
  <div class="vp-content__doc" :class="{ 'is-sidebar': frontmatter.aside !== false }">
    <div class="container">
      <div v-if="frontmatter.outline !== false" class="aside">
        <div class="aside-container">
          <slot name="aside-top" />
          <VPContentDocOutline v-if="page.headers && frontmatter.outline !== false" />
          <slot name="aside-mid" />
          <slot name="aside-bottom" />
        </div>
      </div>
      <div class="content">
        <slot name="content-top" />
        <main>
          <Content class="vt-doc" />
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
.vp-content__doc {
  padding: 32px 24px 96px;
}
.aside {
  position: relative;
  display: none;
  flex-shrink: 0;
  padding-left: 64px;
  width: 320px;
}
.aside-container {
  position: sticky;
  width: 224px;
  top: calc(var(--vt-nav-height) + 24px);
  bottom: 0;
}
.aside-container::-webkit-scrollbar {
  display: none;
}
.content {
  margin: 0 auto;
  max-width: 688px;
  position: relative;
}
.vt-doc {
  margin-bottom: 54px;
}
@media (min-width: 1280px) {
  .vp-content__doc {
    padding: 64px 0 96px 64px;
  }
  .vp-content__doc:not(.is-sidebar) {
    padding-left: calc((100vw - 688px - 320px) / 2);
  }
  .container {
    display: flex;
  }
  .content {
    min-width: 620px;
    margin: 0;
    order: 1;
  }
  .aside {
    display: block;
    order: 2;
  }
}
</style>