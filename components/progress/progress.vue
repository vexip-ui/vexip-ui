<template>
  <div :class="className">
    <div :class="`${prefix}__track`" :style="trackStyle">
      <div :class="`${prefix}__filler`" :style="fillerStyle"></div>
      <div v-if="props.infoType === 'inside'" :class="`${prefix}__info`" :style="infoStyle">
        <slot>
          <span :class="`${prefix}__percentage`">
            {{ `${props.percentage}%` }}
          </span>
        </slot>
      </div>
      <div v-else-if="useBubble" :class="`${prefix}__reference`" :style="infoStyle">
        <Bubble
          :class="`${prefix}__bubble`"
          :style="bubbleStyle"
          :placement="bubbleType"
          :content-class="`${prefix}__info`"
        >
          <slot>
            <span :class="`${prefix}__percentage`">
              {{ `${props.percentage}%` }}
            </span>
          </slot>
        </Bubble>
      </div>
    </div>
    <div v-if="props.infoType === 'outside'" :class="`${prefix}__info`">
      <slot>
        <span :class="`${prefix}__percentage`">
          {{ `${props.percentage}%` }}
        </span>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { Bubble } from '@/components/bubble'
import { useProps, booleanProp } from '@vexip-ui/config'

import type { PropType, CSSProperties } from 'vue'

export type ProgressInfoType =
  | 'outside'
  | 'inside'
  | 'bubble'
  | 'bubble-top'
  | 'bubble-bottom'
  | 'none'

type StrokeColor = string | [string, string] | ((percentage: number) => string | [string, string])

const infoTypes = Object.freeze<ProgressInfoType>(['outside', 'inside', 'bubble', 'bubble-top', 'bubble-bottom', 'none'])

export default defineComponent({
  name: 'Progress',
  components: {
    Bubble
  },
  props: {
    percentage: Number,
    strokeWidth: Number,
    infoType: String as PropType<ProgressInfoType>,
    // TODO: 实现添加进度条流动效果
    activated: booleanProp,
    strokeColor: [String, Array, Function] as PropType<StrokeColor>
  },
  setup(_props) {
    const props = useProps('progress', _props, {
      percentage: {
        default: 0,
        validator: (value: number) => value >= 0 && value <= 100,
        static: true
      },
      strokeWidth: 8,
      infoType: {
        default: 'outside' as ProgressInfoType,
        validator: (value: ProgressInfoType) => infoTypes.includes(value)
      },
      activated: false,
      strokeColor: {
        default: null,
        validator: (value: StrokeColor) => !(Array.isArray(value) && (!value[0] || !value[1]))
      }
    })

    const prefix = 'vxp-progress'

    const className = computed(() => {
      return [
        prefix,
        `${prefix}-vars`,
        `${prefix}--info-${props.infoType}`,
        {
          [`${prefix}--activated`]: props.activated
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

    return {
      props,
      prefix,

      className,
      trackStyle,
      fillerStyle,
      infoStyle,
      useBubble,
      bubbleType,
      bubbleStyle
    }
  }
})
</script>
