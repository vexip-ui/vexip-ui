<template>
  <Button type="primary" @click="captcha?.reset()">
    重置验证
  </Button>
  <br />
  <br />
  <Captcha
    ref="captcha"
    type="point"
    :image="getImage"
    :texts="texts"
  ></Captcha>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { CaptchaExposed } from 'vexip-ui'

const captcha = ref<CaptchaExposed>()
const texts = ['A', 'B', 'C', 'D']

async function getImage() {
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

  drawText('A', 220, 130, 0.3)
  drawText('B', 550, 380, 0.9)
  drawText('C', 100, 450, 0.5)
  drawText('D', 850, 300, 1.3)

  return canvas.toDataURL()
}
</script>
