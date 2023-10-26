<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'

import { AlignLeft, AlignRight } from '@vexip-ui/icons'
import { isClient } from '@vexip-ui/utils'

const emit = defineEmits(['change'])

const rootCls = isClient ? document.documentElement.classList : undefined
const rtl = ref(false)

watch(
  rtl,
  () => {
    emit('change', rtl.value)
  },
  { flush: 'post' }
)

onMounted(() => {
  rtl.value = !!rootCls && rootCls.contains('rtl')
})

function toggleRtl(value: boolean) {
  if (!isClient || !rootCls) return

  requestAnimationFrame(() => {
    rtl.value = value

    if (value) {
      rootCls.add('rtl')
      document.documentElement.dir = 'rtl'
    } else {
      rootCls.remove('rtl')
      document.documentElement.dir = 'ltr'
    }

    localStorage.setItem('vexip-docs-direction-prefer-rtl', String(value))
  })
}
</script>

<template>
  <div
    class="direction-switch"
    role="switch"
    tabindex="0"
    @click="toggleRtl(!rtl)"
  >
    <Icon :icon="rtl ? AlignRight : AlignLeft" :scale="1.25"></Icon>
  </div>
</template>

<style lang="scss">
.direction-switch {
  display: inline-flex;
  cursor: pointer;
  outline: 0;
  transition: var(--vxp-transition-color);

  &:hover,
  &:focus {
    color: var(--vxp-color-primary-base);
  }
}
</style>
