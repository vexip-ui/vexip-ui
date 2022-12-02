<template>
  <Button type="primary" @click="confirm">
    Submit
  </Button>
</template>

<script setup lang="ts">
import { Confirm, Message } from 'vexip-ui'

async function confirm() {
  const isConfirm = await Confirm.open('Confirm to submit?')

  if (isConfirm) {
    Message.success('Submit succeed')
  } else {
    Message.warning('Submit canceled')
  }
}
</script>
