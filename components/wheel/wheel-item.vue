<template>
  <li ref="wrapper" :class="[nh.be('item'), disabled && nh.bem('item', 'disabled')]" :style="style">
    <slot>
      {{ value }}
    </slot>
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
import { useNameHelper } from '@vexip-ui/config'
import { WHEEL_STATE } from './symbol'

export default defineComponent({
  name: 'WheelItem',
  props: {
    value: {
      type: [Number, String],
      default: null
    },
    disabled: {
      type: Boolean,
      default: false
    },
    meta: {
      type: [String, Number, Object],
      default: null
    }
  },
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
      disabled: toRef(props, 'disabled'),
      meta: toRef(props, 'meta')
    })

    const style = computed(() => {
      return {
        width: width.value ? `${width.value}px` : undefined,
        height: height.value ? `${height.value}px` : undefined
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
      nh: useNameHelper('wheel'),
      style,
      wrapper
    }
  }
})
</script>
