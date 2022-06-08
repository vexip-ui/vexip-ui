<template>
  <div>
    <Button type="primary" @click="horizontalActive = !horizontalActive">
      左右调整
    </Button>
    <Button type="primary" @click="verticalActive = !verticalActive">
      上下调整
    </Button>
    <Drawer
      v-model:active="horizontalActive"
      transfer
      resizable
      title="调整宽度"
    >
      <p>一些内容</p>
      <p>一些内容</p>
      <p>一些内容</p>
    </Drawer>
    <Drawer
      v-model:active="verticalActive"
      transfer
      resizable
      placement="bottom"
      title="调整高度"
    >
      <p>一些内容</p>
      <p>一些内容</p>
      <p>一些内容</p>
    </Drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const horizontalActive = ref(false)
const verticalActive = ref(false)
</script>
