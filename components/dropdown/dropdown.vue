<template>
  <div
    :class="className"
    @mouseenter="handleTriggerEnter"
    @mouseleave="handleTriggerLeave"
    @clickoutside="handleClickOutside"
  >
    <div
      ref="reference"
      :class="[
        `${prefix}__trigger`,
        currentVisible ? `${prefix}__trigger--selected` : ''
      ]"
      @click="handleTriggerClick"
    >
      <slot></slot>
    </div>
    <transition :name="transitionName">
      <div
        v-show="currentVisible"
        ref="popper"
        :class="`${prefix}__popper`"
        @mouseenter="handleTriggerEnter"
        @mouseleave="handleTriggerLeave"
      >
        <slot name="drop"></slot>
      </div>
    </transition>
  </div>
</template>

<script>
import { usePopper } from '../../src/mixins/popper'
import { CLICK_OUTSIDE, observe, disconnect } from '../../src/utils/event'
import { findComponentUpward } from '../../src/utils/common'

const { prefix } = require('../../src/style/basis/variable')

const parentName = 'Dropdown'

export default {
  name: 'Dropdown',
  mixins: [usePopper({ isDrop: true })],
  model: {
    event: 'on-select'
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    value: {
      type: String,
      default: null
    },
    name: {
      type: [String, Number],
      default: null
    },
    outsideClose: {
      type: Boolean,
      default: true
    },
    trigger: {
      default: 'hover',
      validator(value) {
        return ['hover', 'click', 'custom'].includes(value)
      }
    },
    transitionName: {
      type: String,
      default: `${prefix}-drop`
    },
    useValue: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefix: `${prefix}-dropdown`,
      currentVisible: false,
      items: [],
      label: null,
      hoverTimer: null,
      currentValue: this.value,
      parentInstance: null
    }
  },
  computed: {
    className() {
      const { prefix, currentVisible, parentInstance } = this

      return {
        [prefix]: true,
        [`${prefix}--visible`]: currentVisible,
        [`${prefix}--sub`]: !!parentInstance
      }
    },
    isUseValue() {
      if (this.parentInstance) {
        return this.parentInstance.useValue
      }

      return this.useValue
    }
  },
  watch: {
    visible(value) {
      this.currentVisible = value
    },
    currentVisible(value) {
      this.updatePopper()
      this.$emit('on-toggle', value)
    },
    value(value) {
      this.currentValue = value
    }
  },
  mounted() {
    this.createPopper()

    const parentInstance = findComponentUpward(this, parentName)
    const parentItemInstance = this.$parent

    if (parentInstance) {
      this.parentInstance = parentInstance
      parentInstance.items.push(this)

      this.$nextTick(() => {
        this.popper && this.popper.setOptions({ placement: 'right-start' })
      })
    }

    if (
      parentItemInstance &&
      parentItemInstance.$options.name === 'DropdownItem'
    ) {
      parentItemInstance.isReference = true

      this.parentItemInstance = parentItemInstance
    }

    this.$on('on-select', (name, textContent) => {
      if (this.trigger !== 'custom') {
        this.currentVisible = false
      }

      this.items.forEach(item => {
        if (item.$options.name === 'Dropdown') {
          item.currentValue = ''
        }
      })

      if (this.parentInstance) {
        this.parentInstance.$emit(
          'on-select',
          `${this.label}-${name}`,
          `${this.$refs.reference.textContent.trim()}-${textContent}`
        )

        this.currentValue = `${this.label}-${name}`
      } else {
        this.currentValue = name
      }
    })

    this.$nextTick(() => {
      this.label =
        this.name === undefined || this.name == null
          ? this.$refs.reference.textContent.trim()
          : this.name
      this.currentVisible = this.visible

      if (this.parentInstance && this.parentInstance.currentValue) {
        const parentValue = this.parentInstance.currentValue
        const index = parentValue.indexOf(this.label)

        if (~index) {
          this.currentValue = parentValue.slice(index)
        }
      }
    })

    observe(this.$el, CLICK_OUTSIDE)
  },
  beforeDestroy() {
    disconnect(this.$el, CLICK_OUTSIDE)

    if (this.parentInstance) {
      const index = this.parentInstance.items.findIndex(item => item === this)

      if (~index) {
        this.parentInstance.items.splice(index, 1)
      }
    }

    if (this.parentItemInstance) {
      this.parentItemInstance.isReference = false
    }
  },
  methods: {
    toggleVisible(able = !this.currentVisible) {
      this.currentVisible = able

      if (!able) {
        this.hiddenChildDropdown()
      }
    },
    hiddenChildDropdown() {
      const items = this.items

      for (let i = 0, len = items.length; i < len; i++) {
        const item = items[i]

        if (item.$options.name === 'Dropdown') {
          item.toggleVisible(false)
        }
      }
    },
    handleClickOutside() {
      this.$emit('on-outside-click')

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
      if (this.trigger === 'click') {
        this.toggleVisible()
      }
    },
    handleTriggerEnter() {
      if (this.trigger === 'hover') {
        clearTimeout(this.hoverTimer)

        this.hoverTimer = setTimeout(() => {
          this.toggleVisible(true)
        }, 250)
      }
    },
    handleTriggerLeave() {
      if (this.trigger === 'hover') {
        clearTimeout(this.hoverTimer)

        this.hoverTimer = setTimeout(() => {
          this.toggleVisible(false)
        }, 250)
      }
    }
  }
}
</script>
