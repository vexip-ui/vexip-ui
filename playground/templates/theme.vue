<template>
  <div style="padding: 20px 0">
    <span style="margin-right: 10px"> Toggle Theme: </span>
    <Switch
      v-model:value="isDark"
      class="theme-switch"
      :open-icon="Moon"
      :close-icon="Sun"
    ></Switch>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

import { Moon, Sun } from '@vexip-ui/icons'
import { isClient } from '@vexip-ui/utils'

const className = 'dark'
const isDark = ref(false)

if (isClient) {
  const rootCls = document.documentElement.classList

  if (isDark.value) {
    rootCls.add(className)
  }

  watch(isDark, value => {
    value ? rootCls.add(className) : rootCls.remove(className)
  })
}
</script>

<style>
body {
  color: var(--vxp-content-color-base);
  background-color: var(--vxp-bg-color-base);
  transition: var(--vxp-transition-color), var(--vxp-transition-background);
}

.theme-switch {
  border: 1px solid var(--vxp-border-color-base);
}

html.dark .theme-switch {
  --vxp-switch-bg-color-open: rgba(255, 255, 255, 5%);
  --vxp-switch-signal-bg-color: #000;
  --vxp-switch-icon-color: var(--vxp-content-color-secondary);
  --vxp-switch-shadow-focus: unset;
}
</style>
