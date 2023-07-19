<template>
  <Button type="primary" @click="captcha?.reset()">
    重置验证
  </Button>
  <br />
  <br />
  <Captcha ref="captcha" image="/picture-3.jpg"></Captcha>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { CaptchaExposed } from 'vexip-ui'

const captcha = ref<CaptchaExposed>()
</script>
