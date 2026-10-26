<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { isClient } from '@vexip-ui/utils'

const rootCls = isClient ? document.documentElement.classList : undefined
const active = ref(false)

onMounted(() => {
  active.value = !!rootCls && rootCls.contains('padding')
})

function togglePadding(value: boolean) {
  if (!isClient || !rootCls) return

  requestAnimationFrame(() => {
    active.value = value

    if (value) {
      rootCls.add('padding')
    } else {
      rootCls.remove('padding')
    }

    localStorage.setItem('vexip-dev-prefer-no-padding', String(!value))
  })
}
</script>

<template>
  <div
    :class="['toggle-padding', active && 'toggle-padding--active']"
    @click="togglePadding(!active)"
  >
    Padding
  </div>
</template>

<style lang="scss">
.toggle-padding {
  display: flex;
  align-items: center;
  padding: 2px 10px;
  color: var(--vxp-color-error-base);
  cursor: pointer;
  user-select: none;
  background-color: var(--vxp-color-error-opacity-8);
  border: 1px solid var(--vxp-color-error-opacity-6);
  border-radius: var(--vxp-radius-base);
  transition:
    var(--vxp-transition-color), var(--vxp-transition-background), var(--vxp-transition-border);

  &--active {
    color: var(--vxp-color-success-base);
    background-color: var(--vxp-color-success-opacity-8);
    border: 1px solid var(--vxp-color-success-opacity-6);
  }
}
</style>
