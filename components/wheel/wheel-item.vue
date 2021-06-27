<template>
  <li ref="wrapper" :class="`${prefix}__item`" :style="style">
    <slot></slot>
  </li>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  computed,
  inject,
  onMounted,
  onBeforeUnmount,
  toRef
} from 'vue'
import { WHEEL_STATE } from './symbol'

const props = {
  value: {
    type: [Number, String],
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
  }
}

export default defineComponent({
  name: 'WheelItem',
  props,
  setup(props) {
    const wheelState = inject(WHEEL_STATE, null)

    const width = ref(0)
    const height = ref(0)

    const wrapper = ref<HTMLElement | null>(null)

    const state = reactive({
      width,
      height,
      el: wrapper,
      value: toRef(props, 'value'),
      disabled: toRef(props, 'disabled')
    })

    const style = computed(() => {
      return {
        width: width.value ? `${width.value}px` : null,
        height: height.value ? `${height.value}px` : null
      }
    })

    if (wheelState) {
      onMounted(() => {
        wheelState.increaseItem(state)
      })

      onBeforeUnmount(() => {
        wheelState.decreaseItem(state)
      })
    }

    return {
      prefix: 'vxp-wheel',
      style,
      wrapper
    }
  }
})
</script>
