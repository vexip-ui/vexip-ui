<template>
  <Captcha :image="image" :loading="loading" @refresh="queryImage"></Captcha>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const images = ['https://www.vexipui.com/picture-2.jpg', 'https://www.vexipui.com/picture-4.jpg']

const image = ref(images[0])
const loading = ref(false)

async function queryImage() {
  if (loading.value) return

  loading.value = true
  await new Promise(resolve => setTimeout(resolve, 1000))

  image.value = image.value === images[0] ? images[1] : images[0]
  loading.value = false
}
</script>
