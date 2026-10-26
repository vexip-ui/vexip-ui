<template>
  <div style="max-width: 800px; max-height: 450px">
    <Video src="/video-1.mp4" :segments="segments"></Video>
  </div>
</template>

<script setup lang="ts">
const segments = [0, { time: 9, title: '高能章节' }, { time: 23 }]
</script>
