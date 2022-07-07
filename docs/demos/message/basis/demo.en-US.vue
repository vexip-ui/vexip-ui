<template>
  <Button type="primary" @click="sendMessage">
    Open
  </Button>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  methods: {
    sendMessage() {
      this.$message.open('A message')
    }
  }
})
</script>
