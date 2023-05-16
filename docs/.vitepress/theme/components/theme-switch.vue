<script setup lang="ts">
import { ref } from 'vue'
import { Moon, Sun } from '@vexip-ui/icons'
import { isClient } from '@vexip-ui/utils'

const rootCls = isClient ? document.documentElement.classList : undefined
const isDark = ref(rootCls && rootCls.contains('dark'))

function toggleDark(value: boolean) {
  if (!isClient) return

  requestAnimationFrame(() => {
    isDark.value = value

    if (value) {
      rootCls!.add('dark')
    } else {
      rootCls!.remove('dark')
    }

    localStorage.setItem('vexip-docs-theme-prefer-dark', String(value))
  })
}
</script>

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

<style lang="scss">
.theme-switch {
  border: 1px solid var(--vxp-border-color-base);

  html.dark & {
    --vxp-switch-bg-color-open: var(--vxp-fill-color-background);
    --vxp-switch-signal-bg-color: #000;
    --vxp-switch-icon-color: var(--vxp-content-color-secondary);
  }
}
</style>
