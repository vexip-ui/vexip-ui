<script setup lang="ts">
import { Tooltip } from '@/components/tooltip'

import { computed, ref } from 'vue'

import { useNameHelper } from '@vexip-ui/config'
import { useSetTimeout } from '@vexip-ui/hooks'

defineOptions({ name: 'VideoControl' })

const props = defineProps({
  name: {
    type: String,
    default: ''
  },
  popperType: {
    type: String,
    default: 'tip'
  },
  popperClass: {
    type: [String, Array, Object],
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
  }
})

const emit = defineEmits(['trigger'])

const nh = useNameHelper('video')

const { timer } = useSetTimeout()

const hovered = ref(false)
const focused = ref(false)

const active = computed(() => {
  return !props.disabled && (hovered.value || focused.value)
})
const className = computed(() => {
  return {
    [nh.be('control')]: true,
    [nh.bem('control', 'active')]: active.value,
    [nh.bem('control', 'disabled')]: props.disabled
  }
})
const tipClass = computed(() => {
  return props.popperType === 'tip' ? nh.be('control-tip') : nh.be('control-panel')
})

function handlePointerEnter() {
  clearTimeout(timer.hover)

  timer.hover = setTimeout(() => {
    hovered.value = true
  }, 250)
}

function handlePointerLeave() {
  clearTimeout(timer.hover)

  timer.hover = setTimeout(() => {
    hovered.value = false
  }, 250)
}
</script>

<template>
  <div :class="className" @pointerenter="handlePointerEnter" @pointerleave="handlePointerLeave">
    <Tooltip
      trigger="custom"
      :visible="hovered || focused"
      raw
      :transfer="false"
      :tip-class="[tipClass, props.popperClass]"
      :disabled="props.popperType === 'tip' && !props.name"
    >
      <template #trigger>
        <button
          :class="nh.be('control-button')"
          type="button"
          @focus="focused = true"
          @blur="focused = false"
          @click="emit('trigger')"
        >
          <slot></slot>
        </button>
      </template>
      <template v-if="props.popperType === 'tip'">
        {{ props.name }}
      </template>
      <slot v-else name="panel"></slot>
    </Tooltip>
  </div>
</template>
