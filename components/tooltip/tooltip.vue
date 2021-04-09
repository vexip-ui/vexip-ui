<template>
  <div
    :class="prefix"
    @mouseenter="handleTriggerEnter"
    @mouseleave="handleTriggerLeave"
    @clickoutside="handleClickOutside"
  >
    <div
      ref="reference"
      :class="`${prefix}__trigger`"
      @click="handleTriggerClick"
    >
      <slot></slot>
    </div>
    <transition v-if="!disabled" :name="transitionName">
      <div
        v-show="currentVisible"
        ref="popper"
        :class="{
          [`${prefix}__popper`]: true,
          [`${prefix}__popper--${theme}`]: true,
          [`${prefix}__popper--no-hover`]: noHover
        }"
        @click.stop
        @mouseenter="handleTriggerEnter"
        @mouseleave="handleTriggerLeave"
      >
        <div :class="[`${prefix}__tip`, tipClass]">
          <div :class="`${prefix}__arrow`"></div>
          <slot name="tip"></slot>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { placementWhileList, usePopper } from '@/mixins/popper'
import { useConfigurableProps } from '@/config/properties'
import { CLICK_OUTSIDE, observe, disconnect } from '@/utils/event'

const { prefix } = require('@/style/basis/variable')

const props = useConfigurableProps({
  trigger: {
    default: 'hover',
    validator(value) {
      return ['hover', 'click', 'custom'].includes(value)
    }
  },
  transitionName: {
    type: String,
    default: `${prefix}-ease`
  },
  visible: {
    type: Boolean,
    default: false
  },
  placement: {
    default: 'top',
    validator(value) {
      return placementWhileList.includes(value)
    }
  },
  outsideClose: {
    type: Boolean,
    default: true
  },
  // 设置 pointer-event: none
  noHover: {
    type: Boolean,
    default: false
  },
  tipClass: {
    type: [String, Array, Object],
    default: null
  },
  disabled: {
    type: Boolean,
    default: false
  },
  theme: {
    default: 'light',
    validator(value) {
      return ['light', 'dark'].includes(value)
    }
  }
})

export default {
  name: 'Tooltip',
  mixins: [usePopper()],
  model: {
    prop: 'visible',
    event: 'on-toggle'
  },
  props,
  emits: [
    'on-toggle',
    'on-click-outside',
    'on-outside-close',
    'on-tip-enter',
    'on-tip-leave'
  ],
  data() {
    return {
      prefix: `${prefix}-tooltip`,
      currentVisible: this.visible,
      hoverTimer: null
    }
  },
  watch: {
    visible(value) {
      this.currentVisible = value
    },
    disabled(value) {
      if (value) {
        this.destroyPopper()
      } else {
        this.updatePopper()
      }
    },
    currentVisible(value) {
      this.$emit('on-toggle', value)
    }
  },
  mounted() {
    observe(this.$el, CLICK_OUTSIDE)

    this.$nextTick(() => {
      this.createPopper()
    })
  },
  updated() {
    if (!this.disabled) {
      this.updatePopper()
    }
  },
  beforeDestroy() {
    disconnect(this.$el, CLICK_OUTSIDE)
  },
  methods: {
    toggleVisible(able = !this.currentVisible) {
      this.currentVisible = able
    },
    handleClickOutside() {
      if (
        this.outsideClose &&
        this.trigger !== 'custom' &&
        this.currentVisible
      ) {
        this.currentVisible = false
        this.$emit('on-outside-close')
      }
    },
    handleTriggerClick() {
      if (this.disabled) return

      if (this.trigger === 'click') {
        this.toggleVisible()
      }
    },
    handleTriggerEnter() {
      if (this.disabled) return

      if (this.trigger === 'hover') {
        clearTimeout(this.hoverTimer)

        this.hoverTimer = setTimeout(() => {
          this.toggleVisible(true)
        }, 250)
      }

      this.$emit('on-tip-enter')
    },
    handleTriggerLeave() {
      if (this.disabled) return

      if (this.trigger === 'hover') {
        clearTimeout(this.hoverTimer)

        this.hoverTimer = setTimeout(() => {
          this.toggleVisible(false)
        }, 250)
      }

      this.$emit('on-tip-leave')
    }
  }
}
</script>
