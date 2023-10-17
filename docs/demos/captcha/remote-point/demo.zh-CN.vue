<template>
  <Button type="primary" @click="captcha?.reset()">
    重置验证
  </Button>
  <br />
  <br />
  <Captcha
    ref="captcha"
    type="point"
    :image="getMockImage"
    :texts="texts"
    remote-point
    :on-before-test="beforeTest"
  ></Captcha>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { CaptchaExposed } from 'vexip-ui'

const captcha = ref<CaptchaExposed>()

const textsConfig = [
  { text: 'A', x: 0.22, y: 0.22, radian: 0.3 },
  { text: 'B', x: 0.55, y: 0.63, radian: 0.9 },
  { text: 'C', x: 0.1, y: 0.75, radian: 0.5 },
  { text: 'D', x: 0.85, y: 0.5, radian: 1.3 }
]
const texts = textsConfig.map(config => config.text)

async function beforeTest(positions: number[]) {
  await new Promise<void>(resolve => setTimeout(resolve, 1000))

  for (let i = 0, len = textsConfig.length; i < len; ++i) {
    const config = textsConfig[i]
    const x = positions[i * 2]
    const y = positions[i * 2 + 1]

    if (Math.abs(x - config.x * 100) > 5 || Math.abs(y - config.y * 100) > 5) {
      return false
    }
  }
}

async function getMockImage() {
  let image!: HTMLImageElement

  await new Promise<void>(resolve => {
    image = new Image()

    image.src = '/picture-3.jpg'
    image.onload = () => {
      resolve()
    }
  })

  const canvas = document.createElement('canvas')
  canvas.width = 1000
  canvas.height = 600

  const ctx = canvas.getContext('2d')!
  ctx.drawImage(image, 0, 0, canvas.width, canvas.height)

  ctx.textBaseline = 'middle'
  ctx.textAlign = 'center'
  ctx.font = 'bold 108px sans-serif'
  ctx.fillStyle = '#000'
  ctx.lineWidth = 2
  ctx.strokeStyle = '#fff'

  const drawText = (text: string, x: number, y: number, radian = 0) => {
    ctx.save()
    ctx.translate(x, y)
    radian && ctx.rotate(radian * Math.PI)
    ctx.fillText(text, 0, 0)
    ctx.strokeText(text, 0, 0)
    ctx.restore()
  }

  textsConfig.forEach(({ text, x, y, radian }) => {
    drawText(text, x * 1000, y * 600, radian)
  })

  return canvas.toDataURL()
}
</script>
