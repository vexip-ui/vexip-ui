<template>
  <FullScreen ref="fullScreen" style="background-color: white;">
    <div style="padding: 5px; border: var(--vxp-border-base);">
      <p>I am FullScreen Content</p>
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
