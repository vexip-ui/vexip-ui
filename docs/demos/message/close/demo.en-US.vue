<template>
  <Button type="primary" @click="sendMessage">
    Closable
  </Button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { Message } from 'vexip-ui'

export default defineComponent({
  setup() {
    function sendMessage() {
      Message.info({ content: 'A closable message', closable: true })
    }

    return { sendMessage }
  }
})
</script>
