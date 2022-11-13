<template>
  <FullScreen ref="fullScreen">
    <div class="container">
      <span>I am FullScreen Content</span>
      <br />
      <br />
      <div>
        <Button type="primary" @click="toggle('window')">
          Window
        </Button>
        <Button type="primary" @click="toggle('browser')">
          Browser
        </Button>
      </div>
    </div>
  </FullScreen>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { FullScreenTriggerType, FullScreen } from 'vexip-ui'

const fullScreen = ref<InstanceType<typeof FullScreen>>()

const toggle = (type: FullScreenTriggerType) => {
  fullScreen.value?.toggle(type)
}
</script>

<style scoped>
.container {
  width: 100%;
  height: 100%;
  padding: 16px;
  background-color: var(--vxp-bg-color-base);
  border: var(--vxp-border-light-1);
  border-radius: var(--vxp-radius-base);
}
</style>
