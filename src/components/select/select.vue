<template>
  <div
    :class="className"
    @click="handleClick"
    @clickoutside="handleClickOutside"
  >
    <div
      ref="reference"
      :class="`${prefixCls}__trigger`"
      @mouseenter="toggleHoverState(true)"
      @mouseleave="toggleHoverState(false)"
    >
      <slot name="control">
        <VxpInput
          :readonly="true"
          :input-class="`${prefixCls}__input`"
          :value="currentLabel"
          :placeholder="placeholder"
          :size="size"
          :disabled="disabled"
          @on-focus="handleFocus"
          @on-blur="handleBlur"
        >
          <slot
            v-if="hasPrefix"
            slot="prefix"
            name="prefix"
          >
            <Icon :name="prefix"></Icon>
          </slot>
          <template slot="suffix">
            <Icon
              v-if="clearable && hasValue && isHover"
              name="times-circle"
              :class="`${prefixCls}__clear`"
              @click.native.stop="handleClear"
            ></Icon>
            <Icon
              v-else
              name="chevron-down"
              :class="`${prefixCls}__arrow`"
              :scale="0.8"
            ></Icon>
          </template>
        </VxpInput>
      </slot>
    </div>
    <transition :name="transitionName">
      <div
        v-show="currentVisible"
        ref="popper"
        :class="`${prefixCls}__popper`"
        @click.stop
      >
        <ul :class="`${prefixCls}__list`">
          <slot></slot>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import Icon from '../icon'
import Input from '../input'

import { SELECTOR } from '../option/option'
import { usePopper } from '../../mixins/popper'
import formControl from '../../mixins/form-control'
import { isNull } from '../../utils/common'
import { CLICK_OUTSIDE, observe, disconnect } from '../../utils/event'

import 'vue-awesome/icons/chevron-down'
import 'vue-awesome/icons/times-circle'

const { prefix } = require('../../style/basis/variable')

export default {
  name: 'Select',
  components: {
    Icon,
    VxpInput: Input
  },
  mixins: [usePopper({ isDrop: true }), formControl],
  model: {
    event: 'on-select'
  },
  provide() {
    return { [SELECTOR]: this }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    size: {
      default: 'default',
      validator(value) {
        return ['small', 'default', 'large'].includes(value)
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    transitionName: {
      type: String,
      default: `${prefix}-drop`
    },
    outsideClose: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: '请选择'
    },
    prefix: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      default: null
    },
    multiple: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefixCls: `${prefix}-select`,
      currentVisible: false,
      focused: false,
      currentLabel: null,
      currentValue: this.value,
      isHover: false
    }
  },
  computed: {
    className() {
      const { prefixCls, disabled, currentVisible, size } = this

      return {
        [prefixCls]: true,
        [`${prefixCls}--visible`]: !disabled && currentVisible,
        [`${prefixCls}--disabled`]: disabled,
        [`${prefixCls}--${size}`]: size !== 'default'
      }
    },
    hasPrefix() {
      return this.$slots.prefix || this.prefix
    },
    hasValue() {
      return !(isNull(this.currentValue) || this.currentValue === '')
    }
  },
  watch: {
    visible(value) {
      this.handleToggelVisible(value)
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
    observe(this.$el, CLICK_OUTSIDE)

    this.$nextTick(() => {
      this.createPopper()
    })
  },
  beforeDestroy() {
    disconnect(this.$el, CLICK_OUTSIDE)
  },
  methods: {
    handleToggelVisible(value = !this.currentVisible) {
      this.currentVisible = value

      if (this.currentVisible) {
        this.$refs.popper.style.minWidth = `${this.$el.offsetWidth}px`
      }
    },
    handleSelect(label, value) {
      if (isNull(value) || value === '') {
        this.currentLabel = ''
      } else {
        this.currentLabel = label
      }

      this.currentValue = value
      this.handleToggelVisible(false)
      this.$emit('on-select', value, label)
    },
    handleClick() {
      if (this.disabled) {
        return
      }

      this.handleToggelVisible()
    },
    handleFocus(event) {
      this.focused = true
      this.$emit('on-focus', event)
    },
    handleBlur(event) {
      this.focused = false
      this.$emit('on-blur', event)
    },
    handleClickOutside() {
      if (this.outsideClose && this.currentVisible) {
        this.handleToggelVisible(false)
        this.$emit('on-outside-close')
      }
    },
    updateSelected() {
      this.items.forEach(item => {
        // item.$emit('on-option-change', this.currentValue)
        item.selected = item.truthValue === this.currentValue

        if (item.selected) {
          this.currentLabel = item.truthLabel
        }
      })
    },
    toggleHoverState(hover = !this.isHover) {
      this.isHover = hover
    },
    handleClear() {
      if (this.clearable) {
        this.currentValue = ''
        this.currentLabel = ''
        this.$emit('on-clear')
      }
    }
  }
}
</script>
