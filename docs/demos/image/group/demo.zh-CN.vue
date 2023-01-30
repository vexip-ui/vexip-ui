<template>
  <p>
    显示全部：
    <Switch v-model:value="showAll"></Switch>
  </p>
  <ImageGroup preview :show-all="showAll">
    <Image
      v-for="img in images"
      :key="img"
      :src="img"
      width="300"
      height="200"
    ></Image>
  </ImageGroup>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const showAll = ref(false)
const images = [
  'https://www.vexipui.com/picture-1.jpg',
  'https://www.vexipui.com/picture-2.jpg',
  'https://www.vexipui.com/picture-3.jpg',
  'https://www.vexipui.com/picture-4.jpg',
  'https://www.vexipui.com/picture-5.jpg'
]
</script>
