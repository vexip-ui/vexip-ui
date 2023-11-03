<template>
  <Button type="primary" @click="confirm">
    无取消
  </Button>
</template>

<script setup lang="ts">
import { Confirm, Message } from 'vexip-ui'

async function confirm() {
  const isConfirm = await Confirm.open({
    content: '一些必须确认的事项',
    cancelable: false
  })

  if (isConfirm) {
    Message.success('已确认')
  }
}
</script>
