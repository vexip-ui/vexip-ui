<template>
  <p>
    Show all:
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
  '/picture-1.jpg',
  '/picture-2.jpg',
  '/picture-3.jpg',
  '/picture-4.jpg',
  '/picture-5.jpg'
]
</script>
