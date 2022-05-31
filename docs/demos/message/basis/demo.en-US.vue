<template>
  <Button type="primary" @click="sendMessage">
    打开消息
  </Button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    sendMessage() {
      this.$message.open('一条消息')
    }
  }
})
</script>
