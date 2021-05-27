<template>
  <div :class="className">
    <div :class="`${prefix}__track`" :style="trackStyle">
      <div :class="`${prefix}__filler`" :style="fillerStyle">
        <div v-if="infoType === 'inside'" :class="`${prefix}__info`">
          <slot>
            <span :class="`${prefix}__percentage`">
              {{ `${percentage}%` }}
            </span>
          </slot>
        </div>
        <div v-else-if="useBubble" :class="`${prefix}__reference`">
          <Bubble
            :class="`${prefix}__bubble`"
            :style="bubbleStyle"
            :placement="bubbleType"
            :content-class="`${prefix}__info`"
          >
            <slot>
              <span :class="`${prefix}__percentage`">
                {{ `${percentage}%` }}
              </span>
            </slot>
          </Bubble>
        </div>
      </div>
    </div>
    <div v-if="infoType === 'outside'" :class="`${prefix}__info`">
      <slot>
        <span :class="`${prefix}__percentage`">
          {{ `${percentage}%` }}
        </span>
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from 'vue'
import { Bubble } from '@/components/bubble'
import { useConfiguredProps } from '@/common/config/install'

import type { PropType, CSSProperties } from 'vue'

export type ProgressInfoType =
  | 'outside'
  | 'inside'
  | 'bubble'
  | 'bubble-top'
  | 'bubble-bottom'
  | 'none'

type StrokeColor = string | [string, string] | ((percentage: number) => string | [string, string])

const props = useConfiguredProps('progress', {
  percentage: {
    type: Number,
    default: 0,
    validator(value: number) {
      return value >= 0 && value <= 100
    }
  },
  strokeWidth: {
    type: Number,
    default: 8
  },
  infoType: {
    default: 'outside' as ProgressInfoType,
    validator(value: ProgressInfoType) {
      return ['outside', 'inside', 'bubble', 'bubble-top', 'bubble-bottom', 'none'].includes(value)
    }
  },
  activated: {
    type: Boolean,
    default: false
  },
  strokeColor: {
    type: [String, Array, Function] as PropType<StrokeColor>,
    default: null,
    validator(value: StrokeColor) {
      return !(Array.isArray(value) && (!value[0] || !value[1]))
    }
  }
})

export default defineComponent({
  name: 'Progress',
  components: {
    Bubble
  },
  props,
  setup(props) {
    const prefix = 'vxp-progress'

    const className = computed(() => {
      return [prefix, `${prefix}--info-${props.infoType}`]
    })
    const trackStyle = computed(() => {
      return {
        height: `${props.strokeWidth}px`,
        borderRadius: `${props.strokeWidth}px`
      }
    })
    const fillerStyle = computed(() => {
      const style: CSSProperties = {
        width: `${props.percentage}%`,
        borderRadius: `${props.strokeWidth}px`
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
    const referenceStyle = computed(() => {
      return {
        height: `${props.strokeWidth}px`,
        marginRight: `${props.strokeWidth / 2}px`
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
      prefix,

      className,
      trackStyle,
      fillerStyle,
      referenceStyle,
      useBubble,
      bubbleType,
      bubbleStyle
    }
  }
})
</script>
