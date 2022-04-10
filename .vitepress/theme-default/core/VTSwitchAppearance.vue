<script setup lang="ts">
import VTSwitch from './VTSwitch.vue'
import VTIconSun from './icons/VTIconSun.vue'
import VTIconMoon from './icons/VTIconMoon.vue'

const storageKey = 'wow-theme-appearance'
const toggle = typeof localStorage !== 'undefined' ? useAppearance() : () => {}

function useAppearance() {
  const auto:string = 'auto'
  const dark:string = 'dark'
  const userPreference = localStorage.getItem(storageKey) || auto
  const query = window.matchMedia(`(prefers-color-scheme: ${dark})`)
  const classList = document.documentElement.classList
  const matches = query.matches
  // 是否日光模式
  const isSun = userPreference === auto
  // 当前是否有设置护眼模式
  let isDark = isSun ? matches : userPreference === dark
  const setClass = (val: boolean) => classList[val ? 'add' : 'remove'](dark)
  query.onchange = (e) => {
    isSun && setClass(isDark = e.matches)
  }
  const toggle = () => {
    setClass((isDark = !isDark))
    const content = isDark
      ? matches 
        ? auto : dark
      : matches
        ? 'light' : auto
    localStorage.setItem(storageKey, content)
  }
  return toggle
}
</script>

<template>
  <VTSwitch class="vt-switch__appearance" aria-label="toggle dark mode" @click="toggle">
    <VTIconSun class="vt-switch__sun" />
    <VTIconMoon class="vt-switch__moon" />
  </VTSwitch>
</template>

<style scoped>
.vt-switch__sun {
  opacity: 1;
}
.vt-switch__moon {
  opacity: 0;
}
.dark .vt-switch__sun {
  opacity: 0;
}
.dark .vt-switch__moon {
  opacity: 1;
}
</style>
