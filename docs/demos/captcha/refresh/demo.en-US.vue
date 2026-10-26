<template>
  <Captcha
    ref="captcha"
    :image="image"
    :slide-target="target"
    :loading="loading"
    @refresh="queryImage"
  ></Captcha>
</template>

<script setup lang="ts">
import { nextTick, ref } from 'vue'

import type { CaptchaExposed } from 'vexip-ui'

const images = [
  { url: 'https://www.vexipui.com/picture-2.jpg', target: 40 },
  { url: 'https://www.vexipui.com/picture-4.jpg', target: 55 },
]

const image = ref(images[0].url)
const target = ref(images[0].target)
const loading = ref(false)

const captcha = ref<CaptchaExposed>()

async function queryImage() {
  if (loading.value) return

  loading.value = true
  await new Promise(resolve => setTimeout(resolve, 1000))

  const imageData = image.value === images[0].url ? images[1] : images[0]

  image.value = imageData.url

  if (captcha.value) {
    await nextTick()
    await captcha.value.imagePromise
  }

  target.value = imageData.target
  loading.value = false
}
</script>
