<template>
  <div ref="rootRef" :class="className" :style="{ zIndex: zIndexRef }">
    <slot :enter="enter" :exit="exit" :toggle="toggle"></slot>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent } from 'vue'
import { useNameHelper } from '@vexip-ui/config'
import { useBrowserFullScreen, fullScreenMaxZIndex } from './utils'
import { FullScreenTriggerType } from './types'

export default defineComponent({
  name: 'FullScreen',
  setup() {
    const rootRef = ref(null)
    const isEnterted = ref(false)
    const zIndexRef = ref(fullScreenMaxZIndex)
    const state = ref<FullScreenTriggerType>()

    const nh = useNameHelper('full-screen')
    const defaultCls = nh.b()
    const className = ref('')

    const { browserEnter, browserExit } = useBrowserFullScreen(rootRef, className, defaultCls)

    const windowEnter = () => {
      className.value = defaultCls
    }

    const windowExit = () => {
      className.value = ''
    }

    const enter = (type: FullScreenTriggerType = 'window', zIndex = fullScreenMaxZIndex) => {
      if (isEnterted.value) {
        exit()
      }

      isEnterted.value = true

      if (type === 'window') {
        windowEnter()
      } else {
        browserEnter()
      }

      zIndexRef.value = zIndex
      state.value = type
    }

    const exit = () => {
      isEnterted.value = false

      windowExit()
      browserExit()
    }
    const toggle = (type: FullScreenTriggerType = 'window', zIndex = fullScreenMaxZIndex) => {
      if (isEnterted.value) {
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
      enter,
      exit,
      toggle
    }
  }
})
</script>
