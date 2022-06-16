<template>
  <div>
    <Button type="primary" @click="active = !active">
      打开
    </Button>
    <Modal
      v-model:active="active"
      transfer
      :width="500"
      resizable
      title="标题"
    >
      <p>一些内容</p>
      <p>一些内容</p>
      <p>一些内容</p>
    </Modal>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(false)
</script>

<style scoped>
.vxp-modal {
  min-width: 500px;
}
</style>
