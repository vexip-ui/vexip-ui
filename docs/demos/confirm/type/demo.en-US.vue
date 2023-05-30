<template>
  <Button type="error" @click="confirm">
    Delete
  </Button>
</template>

<script setup lang="ts">
import { Confirm, Message } from 'vexip-ui'

async function confirm() {
  const isConfirm = await Confirm.open({
    content: 'Confirm to delete?',
    confirmType: 'error'
  })

  if (isConfirm) {
    Message.success('Delete succeed')
  } else {
    Message.warning('Delete canceled')
  }
}
</script>
