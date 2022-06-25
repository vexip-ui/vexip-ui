<template>
  <Viewer ref="viewer" width="1000" height="500">
    <img :src="images[active]" />
  </Viewer>
  <div class="image-list">
    <img
      v-for="(img, index) in images"
      :key="index"
      :src="img"
      :class="{
        'is-active': active === index
      }"
      @click="active = index"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

import type { Viewer } from 'vexip-ui'

const viewer = ref<InstanceType<typeof Viewer> | null>(null)
const active = ref(0)
const images = [
  '/picture-1.jpg',
  '/picture-2.jpg',
  '/picture-3.jpg',
  '/picture-4.jpg',
  '/picture-5.jpg'
]

watch(active, reset)

function reset() {
  viewer.value?.handleReset()
}
</script>

<style scoped>
.image-list {
  display: flex;
  justify-content: center;
  width: 1000px;
  margin-top: 10px;
}

.image-list img {
  width: 100px;
  height: 60px;
  margin-right: 10px;
  user-select: none;
  opacity: 60%;
}

.image-list img:last-child {
  margin-right: 0;
}

.image-list img.is-active {
  opacity: 100%;
}
</style>
