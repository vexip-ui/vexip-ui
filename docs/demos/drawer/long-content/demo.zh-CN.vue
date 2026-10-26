<template>
  <Button type="primary" @click="active = !active">
    打开
  </Button>
  <Drawer
    v-model:active="active"
    transfer
    title="标题"
    drawer-class="demo-drawer"
  >
    <NativeScroll use-y-bar height="100%" scroll-style="padding: 14px;">
      <p v-for="n in 50" :key="n">
        一些内容
      </p>
    </NativeScroll>
  </Drawer>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const active = ref(false)
</script>

<style scoped>
:global(.demo-drawer .vxp-drawer__content) {
  padding: 0;
}
</style>
