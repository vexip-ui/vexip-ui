<template>
  <Button type="primary" @click="sendCustomizedMessage">
    自定义渲染
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
            color: '#339af0'
          }
        }),
        '一条自定义的',
        h(
          'span',
          {
            style: {
              color: '#fab005',
              fontStyle: 'italic'
            }
          },
          '消息'
        )
      ])
    }
  })
}
</script>
