<template>
  <Portal :to="transferTo">
    <div
      ref="rootRef"
      :class="className"
      :style="{ [nh.cv('z-index')]: zIndexRef }"
      v-bind="$attrs"
    >
      <slot :enter="enter" :exit="exit" :toggle="toggle"></slot>
    </div>
  </Portal>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from 'vue'
import { Portal } from '@/components/portal'
import { useNameHelper } from '@vexip-ui/config'
import { useFullScreen } from '@vexip-ui/hooks'

import type { FullScreenTriggerType } from './symbol'

export default defineComponent({
  name: 'FullScreen',
  components: {
    Portal
  },
  inheritAttrs: false,
  setup() {
    const isEntered = ref(false)
    const zIndexRef = ref<number>()
    const state = ref<FullScreenTriggerType>()

    const nh = useNameHelper('full-screen')
    const className = computed(() => [nh.b(), nh.bs('vars'), { [nh.bm('full')]: isEntered.value }])

    const transferTo = computed(() => (isEntered.value ? 'body' : ''))

    const { enter: browserEnter, exit: browserExit, target: rootRef } = useFullScreen()

    const enter = (type: FullScreenTriggerType = 'window', zIndex?: number) => {
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

    const exit = () => {
      zIndexRef.value = undefined
      isEntered.value = false

      browserExit()
    }

    const toggle = (type: FullScreenTriggerType = 'window', zIndex?: number) => {
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
      className,
      rootRef,
      zIndexRef,
      isEntered,
      transferTo,
      enter,
      exit,
      toggle
    }
  }
})
</script>
