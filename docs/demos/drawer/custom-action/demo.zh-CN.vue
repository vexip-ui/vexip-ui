<template>
  <Button type="primary" @click="active = !active">
    打开
  </Button>
  <Drawer
    v-model:active="active"
    transfer
    title="标题"
    footer
    confirm-type="success"
    cancel-type="error"
    action-size="default"
  >
    <p>一些内容</p>
    <p>一些内容</p>
    <p>一些内容</p>
  </Drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(false)
</script>
