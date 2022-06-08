<template>
  <div>
    <Button type="primary" @click="active = !active">
      打开
    </Button>
    <Drawer
      v-model:active="active"
      transfer
      title="标题"
    >
      <p>一些内容</p>
      <p>一些内容</p>
      <p>一些内容</p>
    </Drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(false)
</script>
