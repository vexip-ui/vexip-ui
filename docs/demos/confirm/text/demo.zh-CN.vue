<template>
  <Button type="success" @click="confirm">
    卸载
  </Button>
</template>

<script setup lang="ts">
import { Confirm, Message } from 'vexip-ui'

async function confirm() {
  const isConfirm = await Confirm.open({
    content: '看我这么可怜，真的要卸载我吗？',
    confirmType: 'success',
    confirmText: '残忍卸载',
    cancelText: '容我三思'
  })

  if (isConfirm) {
    Message.success('卸载成功')
  } else {
    Message.warning('为什么不坚持你的想法？')
  }
}
</script>
