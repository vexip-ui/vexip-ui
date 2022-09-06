<template>
  <div
    :class="className"
    role="progressbar"
    :aria-valuenow="percentValue"
    aria-valuemin="0"
    aria-valuemax="100"
  >
    <div :class="nh.be('track')" :style="trackStyle">
      <div :class="nh.be('filler')" :style="fillerStyle"></div>
      <div v-if="props.infoType === 'inside'" :class="nh.be('info')" :style="infoStyle">
        <slot>
          <span :class="nh.be('percentage')">
            {{ `${percentValue}%` }}
          </span>
        </slot>
      </div>
      <div v-else-if="useBubble" :class="nh.be('reference')" :style="infoStyle">
        <Bubble
          :class="nh.be('bubble')"
          :style="bubbleStyle"
          :placement="bubbleType"
          :content-class="nh.be('info')"
        >
          <slot>
            <span :class="nh.be('percentage')">
              {{ `${percentValue}%` }}
            </span>
          </slot>
        </Bubble>
      </div>
    </div>
    <div v-if="props.infoType === 'outside'" :class="nh.be('info')">
      <slot>
        <span :class="nh.be('percentage')">
          {{ `${percentValue}%` }}
        </span>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { Bubble } from '@/components/bubble'
import { useNameHelper, useProps, booleanProp } from '@vexip-ui/config'
import { toFixed } from '@vexip-ui/utils'

import type { PropType, CSSProperties } from 'vue'

export type ProgressInfoType =
  | 'outside'
  | 'inside'
  | 'bubble'
  | 'bubble-top'
  | 'bubble-bottom'
  | 'none'

type StrokeColor = string | [string, string] | ((percentage: number) => string | [string, string])

const infoTypes = Object.freeze<ProgressInfoType>([
  'outside',
  'inside',
  'bubble',
  'bubble-top',
  'bubble-bottom',
  'none'
])

export default defineComponent({
  name: 'Progress',
  components: {
    Bubble
  },
  props: {
    percentage: Number,
    strokeWidth: Number,
    infoType: String as PropType<ProgressInfoType>,
    precision: Number,
    activated: booleanProp,
    strokeColor: [String, Array, Function] as PropType<StrokeColor>
  },
  setup(_props) {
    const props = useProps('progress', _props, {
      percentage: {
        default: 0,
        validator: value => value >= 0 && value <= 100,
        static: true
      },
      strokeWidth: 8,
      infoType: {
        default: 'outside',
        validator: value => infoTypes.includes(value)
      },
      precision: 2,
      activated: false,
      strokeColor: {
        default: null,
        validator: value => !(Array.isArray(value) && (!value[0] || !value[1]))
      }
    })

    const nh = useNameHelper('progress')

    const className = computed(() => {
      return [
        nh.b(),
        nh.bs('vars'),
        nh.bm(`info-${props.infoType}`),
        {
          [nh.bm('activated')]: props.activated
        }
      ]
    })
    const trackStyle = computed(() => {
      return {
        height: `${props.strokeWidth}px`,
        borderRadius: `${props.strokeWidth}px`
      }
    })
    const fillerStyle = computed(() => {
      const style: CSSProperties = {
        borderRadius: `${props.strokeWidth}px`,
        transform: `translateX(${(props.percentage - 100) / 2}%) scaleX(${props.percentage / 100})`
      }

      let strokeColor = props.strokeColor

      if (typeof strokeColor === 'function') {
        strokeColor = strokeColor(props.percentage)
      }

      if (typeof strokeColor === 'string') {
        style.backgroundColor = strokeColor
      } else if (Array.isArray(strokeColor)) {
        style.backgroundImage = `linear-gradient(to right, ${strokeColor[0]} 0%, ${strokeColor[1]} 100%)`
      }

      return style
    })
    const infoStyle = computed(() => {
      return {
        transform: `translateX(${props.percentage - 100}%)`
      }
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
        [type]: `${props.strokeWidth}px`
      }
    })
    const percentValue = computed(() => toFixed(props.percentage, props.precision))

    return {
      props,
      nh,

      className,
      trackStyle,
      fillerStyle,
      infoStyle,
      useBubble,
      bubbleType,
      bubbleStyle,
      percentValue
    }
  }
})
</script>
