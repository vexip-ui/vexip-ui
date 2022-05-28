<template>
  <Button type="primary" @click="sendMessage">
    可关闭消息
  </Button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Message } from 'vexip-ui'

export default defineComponent({
  setup() {
    function sendMessage() {
      Message.info({ content: '一条可关闭的消息', closable: true })
    }

    return { sendMessage }
  }
})
</script>
