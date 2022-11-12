<template>
  <div ref="rootRef" :class="className">
    <slot :enter="enter" :exit="exit"></slot>
  </div>
</template>

<script lang="ts">
import { useFullScreen } from '@vexip-ui/hooks'
import { useNameHelper, useProps } from '@vexip-ui/config'
import { ref, computed, defineComponent } from 'vue'
import { fullScreenProps, fullScreenTypeProps } from './props'

export default defineComponent({
  name: 'FullScreen',
  props: fullScreenProps,
  setup(_props) {
    const props = useProps('fullScreen', _props, {
      type: {
        default: 'window',
        validator: val => fullScreenTypeProps.includes(val)
      }
    })

    const rootRef = ref(null)

    const nh = useNameHelper('full-screen')
    const defaultCls = nh.b()

    const className = ref('')

    const windowEnter = () => {
      className.value = defaultCls
    }
    const windowExit = () => {
      className.value = ''
    }

    const { enter: browserEnter, exit: browserExit } = useFullScreen(rootRef)

    const enter = computed(() => (props.type === 'browser' ? browserEnter : windowEnter))
    const exit = computed(() => (props.type === 'browser' ? browserExit : windowExit))

    return {
      nh,
      className,
      enter,
      exit
    }
  }
})
</script>
