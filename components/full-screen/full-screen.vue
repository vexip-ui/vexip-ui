<template>
  <Portal :to="transferTo">
    <div
      ref="rootRef"
      :class="className"
      :style="{ [nh.cv('z-index')]: zIndexRef }"
      v-bind="$attrs"
    >
      <slot
        :enter="enter"
        :exit="exit"
        :toggle="toggle"
        :full="isEntered"
      ></slot>
    </div>
  </Portal>
</template>

<script lang="ts">
import { Portal } from '@/components/portal'

import { computed, defineComponent, ref, watch } from 'vue'

import { useNameHelper } from '@vexip-ui/config'
import { useFullScreen } from '@vexip-ui/hooks'

import type { FullScreenType } from './symbol'

export default defineComponent({
  name: 'FullScreen',
  components: {
    Portal
  },
  inheritAttrs: false,
  setup() {
    const isEntered = ref(false)
    const zIndexRef = ref<number>()
    const state = ref<FullScreenType>()

    const nh = useNameHelper('full-screen')
    const className = computed(() => [nh.b(), nh.bs('vars'), { [nh.bm('full')]: isEntered.value }])

    const transferTo = computed(() => (isEntered.value ? 'body' : ''))

    const {
      enter: browserEnter,
      exit: browserExit,
      target: rootRef,
      full: browserFull
    } = useFullScreen()

    watch(browserFull, value => {
      if (!value) {
        isEntered.value = false
      }
    })

    function enter(type: FullScreenType = 'window', zIndex?: number) {
      if (isEntered.value) {
        exit()
      }

      isEntered.value = true

      if (type !== 'window') {
        browserEnter()
      }

      zIndexRef.value = zIndex
      state.value = type
    }

    function exit() {
      zIndexRef.value = undefined
      isEntered.value = false

      browserExit()
    }

    function toggle(type: FullScreenType = 'window', zIndex?: number) {
      if (isEntered.value) {
        if (state.value !== type) {
          enter(type, zIndex)
        } else {
          exit()
        }
      } else {
        enter(type, zIndex)
      }
    }

    return {
      nh,

      zIndexRef,
      isEntered,

      className,
      transferTo,

      rootRef,

      enter,
      exit,
      toggle
    }
  }
})
</script>
