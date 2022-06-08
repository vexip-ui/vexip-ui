<template>
  <div>
    <Button type="primary" @click="active = !active">
      Open
    </Button>
    <Drawer
      v-model:active="active"
      transfer
      title="Title"
      hide-mask
    >
      <p>Some content</p>
      <p>Some content</p>
      <p>Some content</p>
      <Button @click="active = false">
        Close
      </Button>
    </Drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(false)
</script>
