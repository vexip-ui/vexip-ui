<script setup lang="ts">
import { Bubble } from '@/components/bubble'
import { Renderer } from '@/components/renderer'

import { computed } from 'vue'

import { createStateProp, useNameHelper, useProps } from '@vexip-ui/config'
import { callIfFunc, toFixed } from '@vexip-ui/utils'
import { progressProps } from './props'
import { infoTypes } from './symbol'

import type { CSSProperties } from 'vue'

defineOptions({ name: 'Progress' })

const _props = defineProps(progressProps)
const props = useProps('progress', _props, {
  percentage: {
    default: 0,
    validator: value => value >= 0 && value <= 100,
    static: true,
  },
  state: createStateProp(),
  strokeWidth: 8,
  infoType: {
    default: 'outside',
    validator: value => infoTypes.includes(value),
  },
  precision: 2,
  activated: false,
  strokeColor: {
    default: null,
    validator: value => !(Array.isArray(value) && (!value[0] || !value[1])),
  },
  slots: () => ({}),
})

const nh = useNameHelper('progress')

const className = computed(() => {
  return [
    nh.b(),
    nh.bs('vars'),
    nh.bm(`info-${props.infoType}`),
    {
      [nh.bm('inherit')]: props.inherit,
      [nh.bm(props.state)]: props.state !== 'default',
      [nh.bm('activated')]: props.activated,
    },
  ]
})
const style = computed(() => {
  return { [nh.cv('percentage')]: props.percentage }
})
const trackStyle = computed(() => {
  return {
    height: `${props.strokeWidth}px`,
    borderRadius: `${props.strokeWidth}px`,
  }
})
const fillerStyle = computed(() => {
  const style: CSSProperties = {
    borderRadius: `${props.strokeWidth}px`,
  }

  const strokeColor = callIfFunc(props.strokeColor, props.percentage)

  if (typeof strokeColor === 'string') {
    style.backgroundColor = strokeColor
  } else if (Array.isArray(strokeColor)) {
    style.backgroundImage = `linear-gradient(to right, ${strokeColor[0]} 0%, ${strokeColor[1]} 100%)`
  }

  return style
})
const useBubble = computed(() => {
  return props.infoType.includes('bubble')
})
const bubbleType = computed(() => {
  if (useBubble.value) {
    return props.infoType.split('-').pop() === 'bottom' ? 'bottom' : 'top'
  }

  return 'top'
})
const bubbleStyle = computed(() => {
  if (!useBubble.value) return {}

  const type = bubbleType.value === 'top' ? 'bottom' : 'top'

  return {
    [type]: `${props.strokeWidth}px`,
  }
})
const percentValue = computed(() => toFixed(props.percentage, props.precision))

defineExpose({ percentValue })
</script>

<template>
  <div
    :class="className"
    :style="style"
    role="progressbar"
    :aria-valuenow="percentValue"
    :aria-valuetext="`${percentValue}%`"
    aria-valuemin="0"
    aria-valuemax="100"
  >
    <div :class="nh.be('track')" :style="trackStyle">
      <div :class="nh.be('filler')" :style="fillerStyle"></div>
      <div v-if="props.infoType === 'inside'" :class="nh.be('info')">
        <slot>
          <Renderer :renderer="props.slots.default">
            <span :class="nh.be('percentage')">
              {{ `${percentValue}%` }}
            </span>
          </Renderer>
        </slot>
      </div>
    </div>
    <div v-if="useBubble" :class="nh.be('reference')">
      <Bubble
        inherit
        :class="nh.be('bubble')"
        :style="bubbleStyle"
        :placement="bubbleType"
        :content-class="nh.be('info')"
      >
        <slot>
          <Renderer :renderer="props.slots.default">
            <span :class="nh.be('percentage')">
              {{ `${percentValue}%` }}
            </span>
          </Renderer>
        </slot>
      </Bubble>
    </div>
    <div v-else-if="props.infoType === 'outside'" :class="nh.be('info')">
      <slot>
        <Renderer :renderer="props.slots.default">
          <span :class="nh.be('percentage')">
            {{ `${percentValue}%` }}
          </span>
        </Renderer>
      </slot>
    </div>
  </div>
</template>
