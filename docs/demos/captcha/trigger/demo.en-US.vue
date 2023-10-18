<template>
  <Button type="primary" @click="captcha?.reset()">
    Reset Captcha
  </Button>
  <br />
  <br />
  <div style="max-width: 300px">
    <Captcha ref="captcha" use-trigger image="/picture-3.jpg"></Captcha>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { CaptchaExposed } from 'vexip-ui'

const captcha = ref<CaptchaExposed>()
</script>
