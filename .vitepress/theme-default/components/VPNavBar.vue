<script setup lang="ts">
import VPNavBarTitle from './VPNavBarTitle.vue'
import VPNavBarMenu from './VPNavBarMenu.vue'
import VPNavBarAppearance from './VPNavBarAppearance.vue'
</script>

<template>
  <div class="vp-nav__bar">
    <div class="container">
      <VPNavBarTitle />
      <div class="content">
        <VPNavBarMenu class="menu" />
        <VPNavBarAppearance class="appearance" />
      </div>
    </div>
  </div>
</template>

<style scoped>
.vp-nav__bar {
  position: relative;
  border-bottom: 1px solid var(--vt-c-divider-light);
  padding: 0 12px 0 24px;
  height: var(--vt-nav-height);
  background-color: var(--vt-c-bg);
  transition: border-color 0.5s, background-color 0.5s;
} 
@media (min-width: 768px) {
  .vp-nav__bar {
    padding: 0 12px 0 32px;
  }
}
@media (min-width: 1280px) {
  .vp-nav__bar {
    padding: 0 32px;
  }
}
.container {
  display: flex;
  justify-content: space-between;
  margin: 0 auto;
  max-width: var(--vp-screen-max-width);
}
.content {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  flex-grow: 1;
}
</style>