<template>
  <Switcher
    :value="isDark"
    class="theme-switch"
    :icon="isDark ? Moon : Sun"
    @on-change="toggleDark"
  ></Switcher>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Sun, Moon } from '@vexip-ui/icons'

const isDark = ref(document.documentElement.classList.contains('dark'))

function toggleDark(value: boolean) {
  requestAnimationFrame(() => {
    if (value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  })
}
</script>

<style lang="scss">
.theme-switch {
  border: 1px solid var(--vxp-border-color-base);

  html.dark & {
    --vxp-switcher-bg-color-open: #{rgba(#fff, 0.05)};
    --vxp-switcher-signal-bg-color: #000;
    --vxp-switcher-icon-color: var(--vxp-content-color-secondary);
    --vxp-switcher-shadow-focus: unset;
  }
}
</style>
