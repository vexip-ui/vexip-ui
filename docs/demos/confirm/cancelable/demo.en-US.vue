<template>
  <Button type="primary" @click="confirm">
    No cancel
  </Button>
</template>

<script setup lang="ts">
import { Confirm, Message } from 'vexip-ui'

async function confirm() {
  const isConfirm = await Confirm.open({
    content: 'Some things that must be confirmed',
    cancelable: false
  })

  if (isConfirm) {
    Message.success('Confirmed')
  }
}
</script>
