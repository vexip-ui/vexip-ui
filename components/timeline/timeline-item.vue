<template>
  <div :class="className" :style="itemStyle">
    <div :class="nh.be('signal')" @click="handleSignalClick">
      <slot name="signal">
        <div :class="nh.be('pointer')"></div>
      </slot>
    </div>
    <div :class="nh.be('line')" :style="lineStyle"></div>
    <div ref="content" :class="nh.be('content')">
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts">
import {
  computed,
  defineComponent,
  inject,
  onBeforeUnmount,
  onMounted,
  onUpdated,
  reactive,
  ref,
  watch
} from 'vue'

import { emitEvent, useNameHelper, useProps } from '@vexip-ui/config'
import { timelineItemProps } from './props'
import { TIMELINE_STATE } from './symbol'

import type { ItemState, TimelinkItemType } from './symbol'

const timelineItemTypes = Object.freeze<TimelinkItemType[]>([
  'default',
  'success',
  'error',
  'warning',
  'disabled'
])

export default defineComponent({
  name: 'TimelineItem',
  props: timelineItemProps,
  emits: [],
  setup(_props) {
    const props = useProps('timelineItem', _props, {
      type: {
        default: 'default',
        validator: value => timelineItemTypes.includes(value)
      },
      color: '',
      label: {
        default: null,
        static: true
      },
      dashed: null,
      lineColor: null,
      spacing: null
    })

    const timelineState = inject(TIMELINE_STATE, null)

    const nh = useNameHelper('timeline')
    const currentLabel = ref(props.label)
    const content = ref<HTMLElement>()

    const className = computed(() => {
      return {
        [nh.be('item')]: true,
        [nh.bem('item', props.type)]: props.type !== 'default'
      }
    })
    const itemStyle = computed(() => {
      const spacing = props.spacing || props.spacing === 0 ? props.spacing : timelineState?.spacing
      const style: Record<string, any> = {
        [nh.cv('item-span')]: typeof spacing === 'number' ? `${spacing}px` : spacing
      }

      if (props.color) {
        style[nh.cv('pointer-color')] = props.color
        style[nh.cv('pointer-b-color')] = props.color
      }

      return style
    })
    const lineStyle = computed(() => {
      const isDashed = props.dashed ?? timelineState?.dashed ?? false
      const color = props.lineColor ?? timelineState?.lineColor

      return {
        borderLeftStyle: isDashed ? ('dashed' as const) : undefined,
        borderLeftColor: color
      }
    })

    if (timelineState) {
      const state: ItemState = reactive({
        label: currentLabel,
        index: 0,
        total: 0,
        height: 0
      })

      timelineState.increaseItem(state)

      watch(() => timelineState.bothSides, updateHeight)
      watch(() => timelineState.horizontal, updateHeight)

      onMounted(updateHeight)
      onUpdated(updateHeight)

      onBeforeUnmount(() => {
        timelineState.decreaseItem(state)
      })

      function updateHeight() {
        requestAnimationFrame(() => {
          if (timelineState?.horizontal && content.value) {
            state.height = content.value.scrollHeight
          }
        })
      }
    }

    function handleSignalClick() {
      emitEvent(props.onSignalClick, currentLabel.value)
      timelineState?.handleSignalClick(currentLabel.value)
    }

    return {
      nh,

      className,
      itemStyle,
      lineStyle,

      content,

      handleSignalClick
    }
  }
})
</script>
