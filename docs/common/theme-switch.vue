<template>
  <Switch
    :value="isDark"
    class="theme-switch"
    :open-icon="Moon"
    :close-icon="Sun"
    aria-label="theme"
    @change="toggleDark"
  ></Switch>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Sun, Moon } from '@vexip-ui/icons'

const rootCls = document.documentElement.classList
const isDark = ref(rootCls.contains('dark'))

function toggleDark(value: boolean) {
  requestAnimationFrame(() => {
    isDark.value = value

    if (value) {
      rootCls.add('dark')
    } else {
      rootCls.remove('dark')
    }

    localStorage.setItem('vexip-docs-theme-prefer-dark', String(value))
  })
}
</script>

<style lang="scss">
.theme-switch {
  border: 1px solid var(--vxp-border-color-base);

  html.dark & {
    --vxp-switch-bg-color-open: #{rgba(#fff, 0.05)};
    --vxp-switch-signal-bg-color: #000;
    --vxp-switch-icon-color: var(--vxp-content-color-secondary);
    --vxp-switch-shadow-focus: unset;
  }
}
</style>
