<template>
  <div style="max-width: 800px; max-height: 450px">
    <Video :video="video">
      <template #player>
        <video ref="video" src="/video-1.mp4"></video>
      </template>
    </Video>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const video = ref<HTMLVideoElement>()
</script>

<style scoped>
video {
  width: 100%;
  height: 100%;
  outline-color: transparent;
}
</style>
