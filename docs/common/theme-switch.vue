<template>
  <Switcher
    :value="isDark"
    class="theme-switch"
    :icon="isDark ? Moon : Sun"
    @change="toggleDark"
  ></Switcher>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue'
import { Sun, Moon } from '@vexip-ui/icons'

const rootCls = ref(Array.from(document.documentElement.classList))
const isDark = computed(() => rootCls.value.includes('dark'))

function toggleDark(value: boolean) {
  requestAnimationFrame(() => {
    if (value) {
      rootCls.value.push('dark')
      document.documentElement.classList.add('dark')
    } else {
      const i = rootCls.value.indexOf('dark')
      if (i > -1) {
        rootCls.value.splice(i, 1)
        document.documentElement.classList.remove('dark')
      }
    }

    localStorage.setItem('vexip-docs-theme-prefer-dark', String(value))
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
