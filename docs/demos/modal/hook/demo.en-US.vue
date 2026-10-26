<template>
  <Button type="primary" @click="handleClick">
    Open
  </Button>
</template>

<script setup lang="ts">
import { getCurrentInstance, h } from 'vue'

import { useModal } from 'vexip-ui'

const instance = getCurrentInstance()!

function handleClick() {
  const close = useModal({
    // It is guaranteed to use the same App context, otherwise a new App will be created
    appContext: instance.appContext,
    title: 'Auto close after 3 seconds',
    width: '30vw',
    renderer: () => {
      return Array.from({ length: 3 }, () => h('p', 'Some content'))
    },
  })

  setTimeout(close, 3000)
}
</script>
