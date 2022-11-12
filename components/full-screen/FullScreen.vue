<template>
  <div ref="rootRef" :class="className" :style="{ [nh.cv('z-index')]: zIndexRef }">
    <slot :enter="enter" :exit="exit" :toggle="toggle"></slot>
  </div>
</template>

<script lang="ts">
import { ref, defineComponent, computed } from 'vue'
import { useNameHelper } from '@vexip-ui/config'
import { useFullScreen } from '@vexip-ui/hooks'
import { FullScreenTriggerType } from './symbol'

export default defineComponent({
  name: 'FullScreen',
  setup() {
    const rootRef = ref(null)
    const isEntered = ref(false)
    const zIndexRef = ref<number>()
    const state = ref<FullScreenTriggerType>()

    const nh = useNameHelper('full-screen')
    const className = computed(() => [nh.b(), nh.bs('vars'), { [nh.bm('full')]: isEntered.value }])

    const { enter: browserEnter, exit: browserExit } = useFullScreen(rootRef)

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
      enter,
      exit,
      toggle
    }
  }
})
</script>
