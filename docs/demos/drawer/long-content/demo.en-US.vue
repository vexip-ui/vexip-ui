<template>
  <Button type="primary" @click="active = !active">
    Open
  </Button>
  <Drawer
    v-model:active="active"
    transfer
    title="Title"
    drawer-class="demo-drawer"
  >
    <NativeScroll use-y-bar height="100%" scroll-style="padding: 14px;">
      <p v-for="n in 50" :key="n">
        Some content
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
