<template>
  <Button type="primary" @click="confirm">
    Submit
  </Button>
</template>

<script setup lang="ts">
import { Confirm, Message } from 'vexip-ui'

async function confirm() {
  const isConfirm = await Confirm.open({
    title: 'Async Confirm',
    content: 'Confirm to submit (will be waited 3 seconds)?',
    closable: true,
    loadingLock: true,
    onBeforeConfirm: () =>
      new Promise(resolve => {
        setTimeout(resolve, 3000)
      }),
  })

  if (isConfirm) {
    Message.success('Submit succeed')
  } else {
    Message.warning('Submit canceled')
  }
}

// Close manually.
// Confirm.close()
</script>
