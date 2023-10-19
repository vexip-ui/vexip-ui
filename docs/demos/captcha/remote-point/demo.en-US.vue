<template>
  <Button type="primary" @click="captcha?.reset()">
    Reset Captcha
  </Button>
  <br />
  <br />
  <Captcha
    ref="captcha"
    type="point"
    :image="url"
    :texts="texts"
    remote-point
    :on-before-test="handleVerify"
    @refresh="handleRefresh"
  ></Captcha>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { CaptchaExposed } from 'vexip-ui'

const { getTarget, verify } = useMockRemote()

const captcha = ref<CaptchaExposed>()
const url = ref('')
const texts = ref<string[]>([])

let state: number

handleRefresh()

function handleRefresh() {
  getTarget().then(result => {
    state = result.state
    url.value = result.url
    texts.value = result.texts
  })
}

async function handleVerify(positions: number[]) {
  await verify(state, positions)
}

function useMockRemote() {
  const targetCache = new Map<number, ReturnType<typeof getConfig>>()

  let index = 0

  function getConfig() {
    const configPool = [
      { text: 'A', x: 0.22, y: 0.22, radian: 0.3 },
      { text: 'B', x: 0.55, y: 0.63, radian: 0.9 },
      { text: 'C', x: 0.1, y: 0.75, radian: 0.5 },
      { text: 'D', x: 0.85, y: 0.5, radian: 1.3 },
      { text: 'E', x: 0.32, y: 0.58, radian: 0.45 },
      { text: 'F', x: 0.6, y: 0.46, radian: 1.8 },
      { text: 'G', x: 0.72, y: 0.26, radian: 0.85 },
      { text: 'H', x: 0.3, y: 0.85, radian: 1.1 }
    ]

    const indexSet = new Set<number>()

    while (indexSet.size < 4) {
      indexSet.add(Math.round(Math.random() * (configPool.length - 1)))
    }

    return configPool.filter((_, i) => indexSet.has(i))
  }

  async function verify(state: number, positions: number[]) {
    await new Promise<void>(resolve => setTimeout(resolve, 1000))

    const textsConfig = targetCache.get(state)

    if (!textsConfig) return false

    for (let i = 0, len = textsConfig.length; i < len; ++i) {
      const config = textsConfig[i]
      const x = positions[i * 2]
      const y = positions[i * 2 + 1]

      if (Math.abs(x - config.x * 100) > 5 || Math.abs(y - config.y * 100) > 5) {
        return false
      }
    }
  }

  let srcFlag = false

  async function getMockImage(textsConfig: ReturnType<typeof getConfig>) {
    let image!: HTMLImageElement

    await new Promise<void>(resolve => {
      image = new Image()

      image.src = srcFlag ? '/picture-3.jpg' : '/picture-4.jpg'
      srcFlag = !srcFlag
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

  async function getTarget() {
    const config = getConfig()
    const base64 = await getMockImage(config)
    const state = index++
    const texts = config.map(c => c.text)

    return { state, url: base64, texts }
  }

  return { verify, getTarget }
}
</script>
