<template>
  <div>
    <Button type="primary" @click="active = !active">
      Open
    </Button>
    <Drawer
      v-model:active="active"
      transfer
      title="First Drawer"
      :width="480"
    >
      <Button type="primary" @click="nestingActive = !nestingActive">
        Open Second Drawer
      </Button>
      <Drawer v-model:active="nestingActive" title="Second Drawer">
        <p>Some content</p>
        <p>Some content</p>
        <p>Some content</p>
      </Drawer>
    </Drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(false)
const nestingActive = ref(false)
</script>
