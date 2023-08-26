<template>
  <Button type="primary" @click="confirm">
    Submit
  </Button>
</template>

<script setup lang="ts">
import { h } from 'vue'
import { Button, Confirm, Message } from 'vexip-ui'

async function confirm() {
  const isConfirm = await Confirm.open({
    content: 'Confirm to submit?',
    renderer: (options, confirm, cancel) => {
      return h(
        'div',
        {
          style: 'display: flex; align-items: center; padding: 10px'
        },
        [
          h('span', options.content),
          h('span', { style: 'flex: auto' }),
          h(Button, { size: 'small', onClick: cancel }, 'Cancel'),
          h(Button, { type: 'primary', size: 'small', onClick: confirm }, 'Confirm')
        ]
      )
    }
  })

  if (isConfirm) {
    Message.success('Submit succeed')
  } else {
    Message.warning('Submit canceled')
  }
}
</script>
