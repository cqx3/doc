<script setup lang="ts">
import { ref } from 'vue'
import { MenuItem, MenuItemChild } from '../types/menu'
import { useFocusContainer } from '../support/focusContainer'
import VTMenu from './VTMenu.vue'
import VTIconChevronDown from './icons/VTIconChevronDown.vue'
import VTIconMoreHorizontal from './icons/VTIconMoreHorizontal.vue'

const props = defineProps<{
  button?: string
  items?: (MenuItem | MenuItemChild)[]
  label?: string
}>()
const open = ref(false)
const elRef = ref<HTMLElement>()
const onBlur = () => { open.value = false }
useFocusContainer({elRef, onBlur})
</script>

<template>
  <div
    class="vt-flyout"
    ref="elRef"
    @mouseenter="open = true"
    @mouseleave="open = false"
  >
    <button
      type="button"
      class="vt-flyout__button"
      aria-haspopup="true"
      :aria-expanded="open"
      :aria-label="label"
      @click="open = !open"
    >
      <span v-if="props.button" class="vt-flyout__text">
        {{ props.button }}
        <VTIconChevronDown class="vt-flyout__down" />
      </span>
      <VTIconMoreHorizontal v-else class="vt-flyout__more" />
    </button>
    <div class="vt-flyout__menu">
      <VTMenu :items="items"><slot /></VTMenu>
    </div>
  </div>
</template>

<style scoped>
.vt-flyout {
  position: relative;
}
.vt-flyout:hover {
  color: var(--vt-c-bland);
  transition: color .25s;
}
.vt-flyout:hover .vt-flyout__text {
  color: var(--vt-c-text-2);
}
.vt-flyout:hover .vt-flyout__down {
  fill: var(--vt-c-text-2);
}
.vt-flyout:hover .vt-flyout__menu,
.vt-flyout__button[aria-expanded="true"] + .vt-flyout__menu {
  opacity: 1;
  visibility: visible;
  transform: translateY(0);
}
.vt-flyout__button {
  display: flex;
  align-items: center;
  padding: 0 12px;
  height: var(--vt-nav-height);
  color: var(--vt-c-text-1);
  transition: color .5s;
}
.vt-flyout__text {
  display: flex;
  align-items: center;
  line-height: var(--vt-nav-height);
  font-size: 13px;
  font-weight: 500;
  color: var(--vt-c-text-1);
  transition: color .25s;
}
.vt-flyout__down {
  margin-left: 4px;
  width: 14px;
  height: 14px;
  fill: currentColor;
}
.v-flyout__more {
  width: 20px;
  height: 20px;
  fill: currentColor;
  transition: fill .25s;
}
.vt-flyout__menu {
  position: absolute;
  top: calc(var(--vt-nav-height) / 2 + 15px);
  right: 0;
  opacity: 0;
  visibility: hidden;
  transform: translateY(-4px);
  transition: opacity .25s, visibility .25s transform .25s;
}
</style>
