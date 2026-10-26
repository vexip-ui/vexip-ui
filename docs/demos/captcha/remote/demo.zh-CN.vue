<template>
  <Button type="primary" @click="captcha?.reset()">
    重置验证
  </Button>
  <br />
  <br />
  <Captcha
    ref="captcha"
    image="/picture-1.jpg"
    :slide-target="target"
    :tolerance="tolerance"
    :loading="loading"
    :on-before-test="handleVerify"
    @refresh="handleRefresh"
  ></Captcha>
</template>

<script setup lang="ts">
import { ref } from 'vue'

import type { CaptchaExposed } from 'vexip-ui'

const { loading, getTarget, verify } = useMockRemote()

const captcha = ref<CaptchaExposed>()
const target = ref(0)
const tolerance = ref(0)

let state: number

handleRefresh()

async function handleVerify(percent: number, matched: boolean) {
  // 前端验证通过时再发送至远程
  if (matched) {
    return await verify(state, percent)
  }
}

function handleRefresh() {
  getTarget().then(result => {
    state = result.state
    target.value = result.target
    tolerance.value = result.tolerance
  })
}

// Mock remote
function useMockRemote() {
  const targetCache = new Map<number, number>()
  const tolerance = 2

  const loading = ref(false)

  let index = 0

  async function getTarget() {
    loading.value = true

    await waitSecond()

    const target = Math.round(Math.random() * 50) + 25 // 25 ~ 75
    const state = index++

    targetCache.set(state, target)
    loading.value = false

    return { state, target, tolerance }
  }

  async function verify(state: number, target: number) {
    await waitSecond()

    const cachedTarget = targetCache.get(state)

    return !!(cachedTarget && Math.abs(target - cachedTarget) <= tolerance)
  }

  function waitSecond() {
    return new Promise<void>(resolve => setTimeout(resolve, 1000))
  }

  return { loading, getTarget, verify }
}
</script>
