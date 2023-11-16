<script setup lang="ts">
import { Option } from '@/components/option'
import { Tooltip } from '@/components/tooltip'

import { computed, inject, ref } from 'vue'

import { emitEvent, useNameHelper, useProps } from '@vexip-ui/config'
import { useSetTimeout } from '@vexip-ui/hooks'
import { transformListToMap } from '@vexip-ui/utils'
import { videoControlProps } from './props'
import { VIDEO_STATE } from './symbol'

import type { VideoControlOption } from './symbol'

defineOptions({ name: 'VideoControl' })

const _props = defineProps(videoControlProps)
const props = useProps('videoControl', _props, {
  name: '',
  type: 'button',
  tipClass: null,
  disabled: false,
  shortcut: {
    static: true,
    default: ''
  },
  focusable: false,
  value: null,
  options: () => []
})

const nh = useNameHelper('video')

const videoState = inject(VIDEO_STATE)
const { timer } = useSetTimeout()

if (!videoState) {
  console.warn('[vexip-ui:Video] VideoControl must be used under Video')
}

const hovered = ref(false)
const focused = ref(false)
const currentValue = ref(props.value)

const active = computed(() => {
  return !props.disabled && (hovered.value || focused.value)
})
const className = computed(() => {
  return {
    [nh.be('control')]: true,
    [nh.bem('control', props.type)]: props.type !== 'button',
    [nh.bem('control', 'active')]: active.value,
    [nh.bem('control', 'disabled')]: props.disabled
  }
})
const tipClass = computed(() => {
  return props.type === 'button' ? nh.be('control-tip') : nh.be('control-panel')
})
const objectOptions = computed(() => {
  return props.options.map(option => {
    return typeof option === 'string' ? { value: option } : option
  })
})
const optionMap = computed(() => transformListToMap(objectOptions.value, 'value', undefined, true))
const currentOption = computed(() => optionMap.value.get(currentValue.value))

function handlePointerEnter() {
  clearTimeout(timer.hover)

  timer.hover = setTimeout(() => {
    hovered.value = true
    emitEvent(props.onEnter)
  }, 100)
}

function handlePointerLeave() {
  clearTimeout(timer.hover)

  timer.hover = setTimeout(() => {
    hovered.value = false
    emitEvent(props.onLeave)
  }, 100)
}

function handleFocus(event: FocusEvent) {
  if (!props.focusable) return

  focused.value = true
  emitEvent(props.onFocus, event)
}

function handleBlur(event: FocusEvent) {
  if (!props.focusable) return

  focused.value = false
  emitEvent(props.onBlur, event)
}

function handleSelect(option: VideoControlOption) {
  currentValue.value = option.value
  emitEvent(props.onSelect, option)
}
</script>

<template>
  <div :class="className" @pointerenter="handlePointerEnter" @pointerleave="handlePointerLeave">
    <Tooltip
      trigger="custom"
      :visible="hovered || focused"
      raw
      shift
      :transfer="`#${nh.bs(`tooltip-place-${videoState?.idIndex}`)}`"
      :tip-class="[tipClass, props.tipClass]"
      :no-hover="props.type === 'button'"
      :disabled="!videoState || (props.type === 'button' ? !props.name : props.disabled)"
      @tip-enter="handlePointerEnter"
      @tip-leave="handlePointerLeave"
    >
      <template #trigger>
        <button
          :class="nh.be('control-button')"
          type="button"
          @focus="handleFocus"
          @blur="handleBlur"
          @click="emitEvent(props.onClick)"
        >
          <slot v-if="currentOption" name="selected" :option="currentOption">
            {{ currentOption.selectedLabel || currentOption.label || currentOption.value }}
          </slot>
          <slot v-else></slot>
        </button>
      </template>
      <template v-if="props.type === 'button'">
        <span :class="nh.be('control-name')">
          <slot name="name">
            {{ props.name }}
            <span v-if="props.shortcut" :class="nh.be('control-shortcut')">
              {{ `(${props.shortcut})` }}
            </span>
          </slot>
        </span>
      </template>
      <slot v-else name="panel">
        <ul v-if="props.type === 'select'" :class="nh.be('control-options')">
          <Option
            v-for="(option, index) in objectOptions"
            :key="option.value"
            :class="{
              [nh.be('control-option')]: true,
              [nh.bem('control-option', 'selected')]: option.value === currentValue
            }"
            :label="option.label"
            :value="option.value"
            :disabled="option.disabled"
            :divided="option.disabled"
            :title="option.title"
            no-hover
            @select="handleSelect(option)"
          >
            <slot
              name="option"
              :option="option"
              :index="index"
              :selected="option.value === currentValue"
            >
              {{ option.label || option.value }}
            </slot>
          </Option>
        </ul>
      </slot>
    </Tooltip>
  </div>
</template>
