<template>
  <Button type="primary" @click="captcha?.reset()">
    重置验证
  </Button>
  <br />
  <br />
  <Captcha
    ref="captcha"
    type="point"
    image="/picture-3.jpg"
    :texts="texts"
  ></Captcha>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { CaptchaExposed } from 'vexip-ui'

const captcha = ref<CaptchaExposed>()
const texts = ['A', 'B', 'C', 'D']
</script>
