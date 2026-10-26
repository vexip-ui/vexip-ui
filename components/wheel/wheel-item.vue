<script setup lang="ts">
import { computed, inject, onBeforeUnmount, onMounted, reactive, ref, toRef } from 'vue'

import { useNameHelper } from '@vexip-ui/config'
import { WHEEL_STATE } from './symbol'

defineOptions({ name: 'WheelItem' })

const props = defineProps({
  value: {
    type: [Number, String],
    default: null,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  active: {
    type: Boolean,
    default: false,
  },
  meta: {
    type: [String, Number, Object],
    default: null,
  },
})

const nh = useNameHelper('wheel')

const wheelState = inject(WHEEL_STATE, null)

const width = ref(0)
const height = ref(0)

const wrapper = ref<HTMLElement>()

const state = reactive({
  width,
  height,
  el: wrapper,
  value: toRef(props, 'value'),
  disabled: toRef(props, 'disabled'),
  meta: toRef(props, 'meta'),
})

const style = computed(() => {
  return {
    width: width.value ? `${width.value}px` : undefined,
    height: height.value ? `${height.value}px` : undefined,
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

defineExpose({ wrapper })
</script>

<template>
  <li
    ref="wrapper"
    :class="[
      nh.be('item'),
      disabled && nh.bem('item', 'disabled'),
      active && nh.bem('item', 'active')
    ]"
    role="option"
    :aria-disabled="disabled ? 'true' : undefined"
    :aria-selected="active"
    :style="style"
  >
    <slot>
      {{ value }}
    </slot>
  </li>
</template>
