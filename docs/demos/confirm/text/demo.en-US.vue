<template>
  <Button type="success" @click="confirm">
    Uninstall
  </Button>
</template>

<script setup lang="ts">
import { Confirm, Message } from 'vexip-ui'

async function confirm() {
  const isConfirm = await Confirm.open({
    content: 'Are you sure want to uninstall?',
    confirmType: 'success',
    confirmText: 'Uninstall',
    cancelText: 'Reconsider'
  })

  if (isConfirm) {
    Message.success('Uninstall succeed')
  } else {
    Message.warning('Why not stick to your thinking?')
  }
}
</script>
