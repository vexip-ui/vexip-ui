<script setup lang="ts">
import { Option } from '@/components/option'
import { Tooltip } from '@/components/tooltip'

import { computed, inject, onBeforeUnmount, ref, watch } from 'vue'

import { emitEvent, useNameHelper, useProps } from '@vexip-ui/config'
import { listToMap } from '@vexip-ui/utils'
import { videoControlProps } from './props'
import { VIDEO_STATE } from './symbol'

import type { VideoControlOption } from './symbol'

defineOptions({ name: 'VideoControl' })

const _props = defineProps(videoControlProps)
const props = useProps('videoControl', _props, {
  type: 'button',
  label: {
    static: true,
    default: '',
  },
  tipClass: null,
  disabled: false,
  shortcut: {
    static: true,
    default: '',
  },
  focusable: false,
  value: null,
  options: () => [],
})

defineSlots<{
  selected: (params: { option: VideoControlOption }) => any,
  default: () => any,
  label: () => any,
  panel: () => any,
  option: (params: { option: VideoControlOption, index: number, selected: boolean }) => any
}>()

const nh = useNameHelper('video')

const videoState = inject(VIDEO_STATE)!

const currentValue = ref(props.value)

const className = computed(() => {
  return {
    [nh.be('control')]: true,
    [nh.bem('control', props.type)]: props.type !== 'button',
    [nh.bem('control', 'disabled')]: props.disabled,
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
const optionMap = computed(() => listToMap(objectOptions.value, 'value', undefined, true))
const currentOption = computed(() => optionMap.value.get(currentValue.value))

let removeShortcut: (() => void) | undefined

watch(
  () => props.shortcut,
  value => {
    removeShortcut?.()

    if (value) {
      removeShortcut = videoState.addShortcut(value, handleClick)
    }
  },
  { immediate: true },
)

onBeforeUnmount(() => removeShortcut?.())

function handleClick() {
  !props.disabled && emitEvent(props.onClick)
}

function handleSelect(option: VideoControlOption) {
  if (props.disabled || option.disabled) return

  currentValue.value = option.value
  emitEvent(props.onSelect, option)
}
</script>

<template>
  <div :class="className">
    <Tooltip
      :trigger="props.focusable ? 'hover-focus' : 'hover'"
      raw
      shift
      :transfer="videoState.placeId && `#${videoState.placeId}`"
      :tip-class="[tipClass, props.tipClass]"
      :no-hover="props.type === 'button'"
      :disabled="props.type === 'button' ? !props.label : props.disabled"
      @tip-enter="emitEvent(props.onEnter)"
      @tip-leave="emitEvent(props.onLeave)"
    >
      <template #trigger>
        <button
          :class="nh.be('control-button')"
          type="button"
          @focus="emitEvent(props.onFocus, $event)"
          @blur="emitEvent(props.onBlur, $event)"
          @click="handleClick"
        >
          <slot v-if="currentOption" name="selected" :option="currentOption">
            {{ currentOption.selectedLabel || currentOption.label || currentOption.value }}
          </slot>
          <slot v-else></slot>
        </button>
      </template>
      <template v-if="props.type === 'button'">
        <span :class="nh.be('control-name')">
          <slot name="label">
            {{ props.label }}
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
