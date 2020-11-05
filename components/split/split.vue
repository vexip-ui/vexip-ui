<template>
  <div :class="className" @transitionend="removeTransition">
    <div
      :class="[
        `${prefix}__pane`,
        `${prefix}__pane--${vertical ? 'top' : 'left'}`
      ]"
      :style="leftPaneStyle"
    >
      <slot :name="position[0]"></slot>
    </div>
    <div
      :class="[
        `${prefix}__pane`,
        `${prefix}__pane--${vertical ? 'bottom' : 'right'}`
      ]"
      :style="rightPaneStyle"
    >
      <slot :name="position[1]"></slot>
    </div>
    <div :class="`${prefix}__trigger`" :style="triggerStyle">
      <div :class="`${prefix}__handle`" @mousedown="handleTriggerDown">
        <template v-if="canFull">
          <div
            :class="[
              `${prefix}__button`,
              `${prefix}__button--${vertical ? 'top' : 'left'}-full`
            ]"
            @mousedown.stop
            @click.left="handleFull(-1)"
          >
            <Icon
              :name="`chevron-${vertical ? 'down' : 'right'}`"
              :scale="0.6"
            ></Icon>
          </div>
          <div
            :class="[
              `${prefix}__button`,
              `${prefix}__button--${vertical ? 'bottom' : 'right'}-full`
            ]"
            @mousedown.stop
            @click.left="handleFull(1)"
          >
            <Icon
              :name="`chevron-${vertical ? 'up' : 'left'}`"
              :scale="0.6"
            ></Icon>
          </div>
        </template>
        <template v-else>
          <span
            v-for="n in 6"
            :key="n"
            :class="`${prefix}__pointer`"
          ></span>
        </template>
      </div>
    </div>
    <div ref="guide" :class="`${prefix}__guide`"></div>
  </div>
</template>

<script>
import Icon from '../icon'
import { throttle } from '../../src/utils/common'
import '../../icons/chevron-up'
import '../../icons/chevron-right'
import '../../icons/chevron-down'
import '../../icons/chevron-left'

const { prefix } = require('../../src/style/basis/variable')

export default {
  name: 'Split',
  components: {
    Icon
  },
  model: {
    event: 'on-change'
  },
  props: {
    value: {
      type: Number,
      default: 0.5,
      validator(value) {
        return value > 0 && value < 1
      }
    },
    min: {
      type: Number,
      default: 100
    },
    vertical: {
      type: Boolean,
      default: false
    },
    noTransition: {
      type: Boolean,
      default: false
    },
    lazy: {
      type: Boolean,
      default: false
    },
    canFull: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefix: `${prefix}-split`,
      currentValue: this.value,
      moving: false,
      currentFull: 0,
      transition: false
    }
  },
  computed: {
    className() {
      const { prefix, vertical, moving, currentFull, transition } = this

      let fullType = null

      if (currentFull) {
        if (vertical) {
          fullType = currentFull < 0 ? 'top' : 'bottom'
        } else {
          fullType = currentFull < 0 ? 'left' : 'right'
        }
      }

      return {
        [prefix]: true,
        [`${prefix}--${vertical ? 'vertical' : 'horizontal'}`]: true,
        [`${prefix}--moving`]: moving,
        [`${prefix}--${fullType}-full`]: fullType,
        [`${prefix}--transition`]: transition
      }
    },
    offset() {
      return this.vertical ? 'offsetHeight' : 'offsetWidth'
    },
    position() {
      return this.vertical ? ['top', 'bottom'] : ['left', 'right']
    },
    leftPaneStyle() {
      const { position, currentValue, currentFull } = this

      return {
        [position[1]]:
          currentFull < 0
            ? '0'
            : currentFull > 0
              ? '100%'
              : `${(1 - currentValue) * 100}%`
      }
    },
    rightPaneStyle() {
      const { position, currentValue, currentFull } = this

      return {
        [position[0]]:
          currentFull < 0
            ? '100%'
            : currentFull > 0
              ? '0'
              : `${currentValue * 100}%`
      }
    },
    triggerStyle() {
      const { position, currentValue, currentFull } = this

      return {
        [position[0]]:
          currentFull < 0
            ? '100%'
            : currentFull > 0
              ? '0'
              : `calc(${currentValue * 100}% - 3px)`
      }
    }
  },
  watch: {
    value(value) {
      if (value.toFixed(5) !== this.currentValue.toFixed(5)) {
        this.currentValue = value
        this.setTransition()
      }
    },
    currentValue(value) {
      this.$emit('on-change', value)
    },
    currentFull(value) {
      this.setTransition()

      if (value) {
        if (this.vertical) {
          value = value < 0 ? 'top' : 'bottom'
        } else {
          value = value < 0 ? 'left' : 'right'
        }

        this.$emit('on-full', value)
      } else {
        this.$emit('on-reset')
      }
    }
  },
  created() {
    this.computeTriggerMove = throttle(event => {
      const { outer, origin, direction, start, min, max, lazy } = this.moveState
      const offset = event[direction] - origin
      const value = Math.min(Math.max(min, (start + offset) / outer), max)

      if (lazy) {
        this.$refs.guide.style[this.position[0]] = `${value * 100}%`
        this.moveState.target = value
      } else {
        this.currentValue = value
      }

      this.$emit('on-move', value)
    }, 10)
  },
  methods: {
    handleTriggerDown(event) {
      event.preventDefault()
      event.stopPropagation()

      if (this.currentFull) {
        return false
      }

      this.moving = true

      const outer = this.$el[this.offset]
      const min = this.min / outer
      const direction = this.vertical ? 'pageY' : 'pageX'
      const style = this.vertical ? 'top' : 'left'

      this.moveState = {
        outer,
        min,
        max: 1 - min,
        direction,
        style,
        origin: event[direction],
        start: this.currentValue * outer,
        target: this.currentValue,
        lazy: this.lazy
      }

      if (this.lazy) {
        this.$refs.guide.style[this.position[0]] = `${this.currentValue * 100}`
        this.$refs.guide.style.display = 'block'
      }

      document.addEventListener('mousemove', this.handleTriggerMove)
      document.addEventListener('mouseup', this.handleTriggerUp)

      this.$emit('on-move-start', this.currentValue)
    },
    handleTriggerMove(event) {
      event.preventDefault()
      event.stopPropagation()

      this.computeTriggerMove(event)
    },
    handleTriggerUp() {
      document.removeEventListener('mousemove', this.handleTriggerMove)
      document.removeEventListener('mouseup', this.handleTriggerUp)

      this.moving = false
      this.$refs.guide.style.display = ''

      if (this.lazy) {
        if (Math.abs(this.moveState.target - this.currentValue) > 0.01) {
          this.setTransition()
        }

        this.currentValue = this.moveState.target
      }

      this.$emit('on-move-end', this.currentValue)
    },
    setTransition() {
      this.transition = !this.noTransition && !this.moving
    },
    removeTransition() {
      this.transition = false
    },
    handleFull(type) {
      if (!this.canFull) {
        return
      }

      if (this.currentFull) {
        this.currentFull = 0

        return
      }

      this.currentFull = type
    }
  }
}
</script>
