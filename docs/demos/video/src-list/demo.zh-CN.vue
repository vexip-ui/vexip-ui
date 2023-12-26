<template>
  {{ src }}
  <div style="max-width: 800px; max-height: 450px">
    <Video v-model:src="src" :src-list="list"></Video>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const list = ['/video-1.mp4', '/video-2.mp4']
const src = ref(list[0])
</script>
