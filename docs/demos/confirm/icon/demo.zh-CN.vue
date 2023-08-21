<template>
  <Button type="error" @click="confirm()">
    删除
  </Button>
  <Button type="error" @click="confirm(false)">
    无图标
  </Button>
</template>

<script setup lang="ts">
import { Confirm, Message } from 'vexip-ui'
import { TriangleExclamation } from '@vexip-ui/icons'

async function confirm(hasIcon = true) {
  const isConfirm = await Confirm.open({
    content: '确认删除吗？',
    confirmType: 'error',
    icon: hasIcon && TriangleExclamation,
    iconProps: {
      style: { color: '#f03e3e' },
      scale: 2
    }
  })

  if (isConfirm) {
    Message.success('删除成功')
  } else {
    Message.warning('取消删除')
  }
}
</script>
