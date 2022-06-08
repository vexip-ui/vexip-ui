<template>
  <div>
    <Button type="primary" @click="active = !active">
      打开
    </Button>
    <Drawer
      v-model:active="active"
      transfer
      title="一级抽屉"
      :width="480"
    >
      <Button type="primary" @click="nestingActive = !nestingActive">
        打开二级抽屉
      </Button>
      <Drawer v-model:active="nestingActive" title="二级抽屉">
        <p>一些内容</p>
        <p>一些内容</p>
        <p>一些内容</p>
      </Drawer>
    </Drawer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(false)
const nestingActive = ref(false)
</script>
