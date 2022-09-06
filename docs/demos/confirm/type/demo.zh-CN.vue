<template>
  <Button type="error" @click="confirm">
    删除
  </Button>
</template>

<script setup lang="ts">
import { Confirm, Message } from 'vexip-ui'

async function confirm() {
  const isConfirm = await Confirm.open({
    content: '确认删除吗？',
    confirmType: 'error'
  })

  if (isConfirm) {
    Message.success('删除成功')
  } else {
    Message.warning('取消删除')
  }
}
</script>
