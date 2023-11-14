<template>
  <Button
    type="warning"
    @click="Message.warning({ content: 'A message with custom icon', icon: CircleQuestion })"
  >
    Custom Icon
  </Button>
  <Button
    type="error"
    @click="Message.error({ content: 'A message with custom icon color', iconColor: 'green' })"
  >
    Custom Icon Color
  </Button>
  <Button type="success" @click="sendCustomizedIconMessage">
    Render Method
  </Button>
</template>

<script setup lang="ts">
import { h } from 'vue'

import { Icon, Message } from 'vexip-ui'
import { CircleQuestion, Share } from '@vexip-ui/icons'

function sendCustomizedIconMessage() {
  Message.success({
    content: 'A message that using icon render method',
    icon: () => {
      return h(Icon, {
        icon: Share,
        flip: 'horizontal'
      })
    }
  })
}
</script>
