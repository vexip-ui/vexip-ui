<script setup lang="ts">
import { onMounted, ref } from 'vue'

import { AlignLeft, AlignRight } from '@vexip-ui/icons'
import { isClient } from '@vexip-ui/utils'

const rootCls = isClient ? document.documentElement.classList : undefined
const rtl = ref<boolean>(false)

onMounted(() => {
  rtl.value = !!rootCls && rootCls.contains('rtl')
})

function toggleRtl(value: boolean) {
  if (!isClient || !rootCls) return

  requestAnimationFrame(() => {
    rtl.value = value

    if (value) {
      rootCls.add('rtl')
    } else {
      rootCls.remove('rtl')
    }

    localStorage.setItem('vexip-docs-direction-prefer-rtl', String(value))
  })
}
</script>

<template>
  <div class="direction-switch" role="switch" @click="toggleRtl(!rtl)">
    <Icon :icon="rtl ? AlignRight : AlignLeft" :scale="1.25"></Icon>
  </div>
</template>

<style lang="scss">
.direction-switch {
  display: inline-flex;
  cursor: pointer;
  transition: var(--vxp-transition-color);

  &:hover {
    color: var(--vxp-color-primary-base);
  }
}
</style>
