<template>
  <Space vertical>
    <RadioGroup v-model:value="currentShape" button :options="shapes"></RadioGroup>
    <Captcha
      ref="captcha"
      image="/picture-3.jpg"
      :hollow-shape="currentShape === 'circle' ? circlePath : currentShape"
    ></Captcha>
    <Button type="primary" @click="captcha?.reset()">
      重置验证
    </Button>
  </Space>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'

import type { CaptchaExposed, CaptchaHollowProcess } from 'vexip-ui'

const shapes = ['square', 'puzzle', 'shield', 'heart', 'circle'] as const
const currentShape = ref(shapes[0])

const captcha = ref<CaptchaExposed>()

watch(currentShape, () => captcha.value?.reset())

const circlePath: CaptchaHollowProcess = ({ ctx, x, y, width, height }) => {
  const side = Math.min(width, height) * 0.25
  const halfSide = side * 0.5

  ctx.arc(x, y, halfSide, 0, 2 * Math.PI)

  // 一定要返回一个 Rect 数组指定镂空的范围
  return [x - halfSide, y - halfSide, side, side]
}
</script>
