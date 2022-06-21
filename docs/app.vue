<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { reactive, watch, provide } from 'vue'
import { createEventEmitter } from '@vexip-ui/utils'

import type { Store } from './symbol'

const emitter = createEventEmitter()

const computedStyle = getComputedStyle(document.documentElement)

const media = computedStyle.getPropertyValue('--vxp-break-point-lg').trim()
const query = matchMedia(`only screen and ${media}`)

const store = reactive<Store>({
  isLg: query.matches,
  scrollY: 0,
  isAffix: false
})

query.addEventListener('change', () => {
  store.isLg = query.matches
  store.isAffix = !store.isLg && store.scrollY >= 50
})

watch(
  () => store.isAffix,
  value => {
    emitter.emit('toggle-affix', value)
  }
)

provide('store', store)
provide('emitter', emitter)
</script>
