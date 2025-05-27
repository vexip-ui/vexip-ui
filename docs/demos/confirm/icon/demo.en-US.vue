<template>
  <Button type="error" @click="confirm()">
    Delete
  </Button>
  <Button type="error" @click="confirm(false)">
    No Icon
  </Button>
</template>

<script setup lang="ts">
import { Confirm, Message } from 'vexip-ui'
import { TriangleExclamation } from '@vexip-ui/icons'

async function confirm(hasIcon = true) {
  const isConfirm = await Confirm.open({
    content: 'Confirm to delete?',
    confirmType: 'error',
    icon: hasIcon && TriangleExclamation,
    iconProps: {
      style: { color: '#f03e3e' },
      scale: 2,
    },
  })

  if (isConfirm) {
    Message.success('Delete succeed')
  } else {
    Message.warning('Delete canceled')
  }
}
</script>
