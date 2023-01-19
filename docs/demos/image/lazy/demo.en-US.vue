<template>
  <NativeScroll
    id="image-lazy-wrapper"
    width="200"
    height="100"
    use-y-bar
  >
    <Space vertical>
      <Image
        v-for="img in images"
        :key="img"
        :src="img"
        width="160"
        height="100"
        lazy
        root="#image-lazy-wrapper"
        @load="loaded.add(img)"
      ></Image>
    </Space>
  </NativeScroll>
  <p>
    Loaded:
    {{ [...loaded] }}
  </p>
</template>

<script setup lang="ts">
import { reactive } from 'vue'

const loaded = reactive(new Set())
const images = [
  '/picture-1.jpg',
  '/picture-2.jpg',
  '/picture-3.jpg',
  '/picture-4.jpg',
  '/picture-5.jpg'
]
</script>
