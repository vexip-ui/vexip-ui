<template>
  <Button type="primary" @click="sendCustomizedMessage">
    Custom Render
  </Button>
</template>

<script setup lang="ts">
import { h } from 'vue'

import { Icon, Message } from 'vexip-ui'

function sendCustomizedMessage() {
  Message.open({
    duration: 5000,
    closable: true,
    renderer: () => {
      return h('span', [
        h(Icon, {
          name: 'bell-slash',
          style: {
            marginRight: '5px',
            color: '#339af0',
          },
        }),
        'A custom ',
        h(
          'span',
          {
            style: {
              color: '#fab005',
              fontStyle: 'italic',
            },
          },
          'message',
        ),
      ])
    },
  })
}
</script>
