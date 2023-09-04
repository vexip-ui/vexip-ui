<template>
  <Button type="primary" @click="handleClick">
    打开
  </Button>
</template>

<script setup lang="ts">
import { getCurrentInstance, h } from 'vue'

import { useModal } from 'vexip-ui'

const instance = getCurrentInstance()!

function handleClick() {
  const close = useModal({
    // 可以保证使用同一个 App 上下文，不传则会创建一个新的 App
    appContext: instance.appContext,
    title: '在 3 秒后自动关闭',
    width: '30vw',
    renderer: () => {
      return Array.from({ length: 3 }, () => h('p', '一些内容'))
    }
  })

  setTimeout(close, 3000)
}
</script>
