<script setup lang="ts">
import { Tooltip } from '@/components/tooltip'
import { Renderer } from '@/components/renderer'

import { computed, ref } from 'vue'

import { useHoverDelay, useNameHelper, useProps } from '@vexip-ui/config'
import { placementWhileList, useSetTimeout } from '@vexip-ui/hooks'
import { getRangeWidth } from '@vexip-ui/utils'
import { ellipsisProps } from './props'

import type { EllipsisSlots } from './symbol'

defineOptions({ name: 'Ellipsis' })

const nh = useNameHelper('ellipsis')

const _props = defineProps(ellipsisProps)
const props = useProps('ellipsis', _props, {
  placement: {
    default: 'top',
    validator: value => placementWhileList.includes(value),
  },
  transfer: 'body',
  noHover: false,
  transitionName: () => nh.ns('fade'),
  tooltipTheme: {
    default: 'dark',
    validator: value => ['light', 'dark'].includes(value),
  },
  tipClass: null,
  maxLines: null,
  tipMaxWidth: 500,
  tipDisabled: false,
  tipShift: false,
  slots: () => ({}),
})

defineSlots<EllipsisSlots>()

const hoverDelay = useHoverDelay()
const visible = ref(false)
const content = ref('')

const { timer } = useSetTimeout()

const wrapper = ref<HTMLElement>()

const className = computed(() => {
  return {
    [nh.b()]: true,
    [nh.bm('inherit')]: props.inherit,
    [nh.bm('multiple')]: props.maxLines,
  }
})
const ellipsisStyle = computed(() => {
  return props.maxLines > 0 ? { '-webkit-line-clamp': props.maxLines } : ''
})
const tipStyle = computed(() => {
  return {
    maxWidth:
      typeof props.tipMaxWidth === 'string'
        ? parseFloat(props.tipMaxWidth) || props.tipMaxWidth
        : `${props.tipMaxWidth}px`,
  }
})

defineExpose({
  visible,
  wrapper,
})

function handleTriggerEnter() {
  clearTimeout(timer.hover)

  if (props.tipDisabled) return

  timer.hover = setTimeout(() => {
    if (!wrapper.value || !wrapper.value.childNodes.length) {
      visible.value = false
      return
    }

    // In the case of multiple lines, use visual height and
    // real content height to control whether to display
    if (props.maxLines > 0) {
      const scrollHeight = wrapper.value.scrollHeight
      const clientHeight = wrapper.value.clientHeight

      visible.value = scrollHeight > clientHeight
    } else {
      visible.value = getRangeWidth(wrapper.value) > wrapper.value.getBoundingClientRect().width
    }

    content.value = visible.value ? (wrapper.value.textContent ?? '') : ''
  }, hoverDelay.value)
}

function handleTriggerLeave() {
  clearTimeout(timer.hover)

  if (props.tipDisabled) return

  timer.hover = setTimeout(() => {
    visible.value = false
  }, hoverDelay.value)
}
</script>

<template>
  <Tooltip
    :visible="visible"
    trigger="custom"
    :disabled="props.tipDisabled"
    :transfer="props.transfer"
    :placement="props.placement"
    :no-hover="props.noHover"
    :transition-name="props.transitionName"
    :tip-class="props.tipClass"
    :tip-style="tipStyle"
    :reverse="props.tooltipTheme === 'dark'"
    :shift="props.tipShift"
    @tip-enter="handleTriggerEnter"
    @tip-leave="handleTriggerLeave"
  >
    <template #trigger>
      <div
        ref="wrapper"
        v-bind="$attrs"
        :class="className"
        :style="ellipsisStyle"
        @mouseenter="handleTriggerEnter"
        @mouseleave="handleTriggerLeave"
      >
        <slot>
          <Renderer :renderer="props.slots.default"></Renderer>
        </slot>
      </div>
    </template>
    <slot name="content" :content="content">
      <Renderer :renderer="props.slots.content" :data="{ content }">
        {{ content }}
      </Renderer>
    </slot>
  </Tooltip>
</template>
