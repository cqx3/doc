<template>
  <button type="button" class="vt-switch" role="switch">
    <span class="vt-switch__check">
      <span v-if="$slots.default" class="vt-switch__icon">
        <slot />
      </span>
    </span>
  </button>
</template>

<style scoped>
.vt-switch {
  position: relative;
  border-radius: 11px;
  display: block;
  width: 40px;
  height: 22px;
  flex-shrink: 0;
  border: 1px solid var(--vt-c-divider);
  background-color: var(--vt-c-bg-mute);
  transition: border-color 0.25s, background-color 0.25s;
}
.vt-switch:hover {
  border-color: var(--vt-c-gray);
}
.vt-switch__check {
  position: absolute;
  top: 1px;
  left: 1px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: var(--vt-c-white);
  box-shadow: var(--vt-shadow-1);
  transition: background-color 0.25s, transform 0.25s;
}
.dark .vt-switch__check {
  background-color: var(--vt-c-black);
}
.vt-switch__icon {
  position: relative;
  display: block;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  overflow: hidden;
}
</style>