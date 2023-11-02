<script setup lang="ts">
import { Portal } from '@/components/portal'

import { computed, ref, watch } from 'vue'

import { useNameHelper, useProps } from '@vexip-ui/config'
import { useFullScreen } from '@vexip-ui/hooks'
import { fullScreenProps } from './props'

import type { FullScreenSlotParams, FullScreenType } from './symbol'

defineOptions({ name: 'FullScreen' })

defineSlots<{ default: (params: FullScreenSlotParams) => any }>()

const nh = useNameHelper('full-screen')

const _props = defineProps(fullScreenProps)
const props = useProps('fullScreen', _props, {
  tag: 'div'
})

const isEntered = ref(false)
const zIndex = ref<number>()
const fullType = ref<FullScreenType>()

const full = computed(() => isEntered.value && fullType.value!)
const className = computed(() => [nh.b(), nh.bs('vars'), { [nh.bm('full')]: full.value }])

const transferTo = computed(() => (isEntered.value ? 'body' : ''))

const {
  enter: browserEnter,
  exit: browserExit,
  target: wrapper,
  full: browserFull
} = useFullScreen()

watch(browserFull, value => {
  if (!value) {
    isEntered.value = false
    fullType.value = undefined
  }
})

async function enter(type: FullScreenType = 'window', customZIndex?: number) {
  if (isEntered.value) {
    await exit()
  }

  isEntered.value = true

  if (type !== 'window') {
    browserEnter()
  }

  zIndex.value = customZIndex
  fullType.value = type
}

async function exit() {
  zIndex.value = undefined
  isEntered.value = false
  fullType.value = undefined

  await browserExit()
}

async function toggle(type: FullScreenType = 'window', zIndex?: number) {
  if (isEntered.value) {
    if (fullType.value !== type) {
      await enter(type, zIndex)
    } else {
      await exit()
    }
  } else {
    await enter(type, zIndex)
  }
}

defineExpose({
  full,
  wrapper,
  enter,
  exit,
  toggle
})
</script>

<template>
  <Portal :to="transferTo">
    <component
      :is="props.tag || 'div'"
      v-bind="$attrs"
      ref="wrapper"
      :class="className"
      :style="{ [nh.cv('z-index')]: zIndex }"
    >
      <slot
        :full="full"
        :enter="enter"
        :exit="exit"
        :toggle="toggle"
      ></slot>
    </component>
  </Portal>
</template>
