<template>
  <router-view></router-view>
</template>

<script setup lang="ts">
import { provide, reactive, watch } from 'vue'

import { createEventEmitter, isClient } from '@vexip-ui/utils'

import type { Store } from './symbol'

const emitter = createEventEmitter()

let query: MediaQueryList | undefined

if (isClient) {
  const computedStyle = getComputedStyle(document.documentElement)

  const media = computedStyle.getPropertyValue('--vxp-break-point-lg').trim()
  query = matchMedia(`only screen and ${media}`)
}

const store = reactive<Store>({
  isLg: query ? query.matches : false,
  scrollY: 0,
  affixed: false,
  expanded: false
})

query &&
  query.addEventListener('change', () => {
    store.isLg = query!.matches
    store.affixed = !store.isLg && store.scrollY >= 50
  })

watch(
  () => store.affixed,
  value => {
    emitter.emit('toggle-affix', value)
  }
)

provide('store', store)
provide('emitter', emitter)
</script>
