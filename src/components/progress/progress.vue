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

<script>
import Bubble from '../bubble'

const { prefix } = require('../../style/basis/variable')

export default {
  name: 'Progress',
  components: {
    Bubble
  },
  props: {
    percentage: {
      type: Number,
      default: 0,
      validator(value) {
        return value >= 0 && value <= 100
      }
    },
    strokeWidth: {
      type: Number,
      default: 8
    },
    infoType: {
      default: 'outside',
      validator(value) {
        return [
          'outside',
          'inside',
          'bubble',
          'bubble-top',
          'bubble-bottom',
          'none'
        ].includes(value)
      }
    },
    activated: {
      type: Boolean,
      default: false
    },
    strokeColor: {
      type: [String, Array, Function],
      default: null,
      validator(value) {
        return !(Array.isArray(value) && (!value[0] || !value[1]))
      }
    }
  },
  data() {
    return {
      prefix: `${prefix}-progress`
    }
  },
  computed: {
    className() {
      const { prefix, infoType } = this

      return [prefix, `${prefix}--info-${infoType}`]
    },
    trackStyle() {
      const { strokeWidth } = this

      return {
        height: `${strokeWidth}px`,
        borderRadius: `${strokeWidth}px`
      }
    },
    fillerStyle() {
      const { percentage, strokeWidth } = this
      const style = {
        width: `${percentage}%`,
        borderRadius: `${strokeWidth}px`
      }

      let strokeColor = this.strokeColor

      if (typeof strokeColor === 'function') {
        strokeColor = strokeColor(this.percentage)
      }

      if (typeof strokeColor === 'string') {
        style.backgroundColor = strokeColor
      } else if (Array.isArray(strokeColor)) {
        style.backgroundImage = `linear-gradient(to right, ${strokeColor[0]} 0%, ${strokeColor[1]} 100%)`
      }

      return style
    },
    referenceStyle() {
      const { strokeWidth } = this

      return {
        height: `${strokeWidth}px`,
        marginRight: `${strokeWidth / 2}px`
      }
    },
    useBubble() {
      return this.infoType.includes('bubble')
    },
    bubbleType() {
      const { useBubble, infoType } = this

      if (useBubble) {
        return infoType.split('-').pop() === 'bottom' ? 'bottom' : 'top'
      }

      return 'top'
    },
    bubbleStyle() {
      if (!this.useBubble) return null

      const { strokeWidth, bubbleType } = this
      const type = bubbleType === 'top' ? 'bottom' : 'top'

      return {
        [type]: `${strokeWidth}px`
      }
    }
  }
}
</script>
