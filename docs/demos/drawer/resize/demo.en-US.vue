<template>
  <div>
    <Button type="primary" @click="horizontalActive = !horizontalActive">
      Adjust left and right
    </Button>
    <Button type="primary" @click="verticalActive = !verticalActive">
      Adjust top and bottom
    </Button>
    <Drawer
      v-model:active="horizontalActive"
      transfer
      resizable
      title="Adjust Width"
    >
      <p>Some content</p>
      <p>Some content</p>
      <p>Some content</p>
    </Drawer>
    <Drawer
      v-model:active="verticalActive"
      transfer
      resizable
      placement="bottom"
      title="Adjust Height"
    >
      <p>Some content</p>
      <p>Some content</p>
      <p>Some content</p>
    </Drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const horizontalActive = ref(false)
const verticalActive = ref(false)
</script>
