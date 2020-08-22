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
          :state="state"
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
    <transition :name="transitionName" @after-enter="computeListHeight">
      <div
        v-show="currentVisible"
        ref="popper"
        :class="`${prefixCls}__popper`"
        @click.stop
      >
        <ul
          :class="`${prefixCls}__list`"
          :style="{
            height: listHeight,
            maxHeight: `${maxListHeight}px`
          }"
        >
          <Scroll
            ref="scroll"
            use-y-bar
            height="100%"
          >
            <slot>
              <template v-for="(item, index) in options">
                <Option
                  v-if="isObject(item)"
                  :key="index"
                  :label="item.label || item.value"
                  :value="item.value"
                ></Option>
                <Option
                  v-else
                  :key="index"
                  :label="item"
                  :value="item"
                ></Option>
              </template>
            </slot>
          </Scroll>
        </ul>
      </div>
    </transition>
  </div>
</template>

<script>
import Icon from '../icon'
import Input from '../input'
import Option from '../option'
import Scroll from '../scroll'

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
    VxpInput: Input,
    Option,
    Scroll
  },
  mixins: [usePopper({ isDrop: true }), formControl],
  model: {
    event: 'on-change'
  },
  provide() {
    return { [SELECTOR]: this }
  },
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    options: {
      type: Array,
      default() {
        return []
      }
    },
    size: {
      default: 'default',
      validator(value) {
        return ['small', 'default', 'large'].includes(value)
      }
    },
    state: {
      default: 'default',
      validator(value) {
        return ['default', 'success', 'error', 'warning'].includes(value)
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
    },
    maxListHeight: {
      type: Number,
      default: 300
    }
  },
  data() {
    return {
      prefixCls: `${prefix}-select`,
      items: [],
      currentVisible: false,
      focused: false,
      currentLabel: null,
      currentValue: this.value,
      isHover: false,
      listHeight: null
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

      this.updateSelected()
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
    isObject(value) {
      return typeof value === 'object'
    },
    computeListHeight() {
      this.$nextTick(() => {
        const scrollWrapper = this.$refs.scroll?.$refs.wrapper

        if (scrollWrapper) {
          const listHeight = scrollWrapper.getBoundingClientRect().height

          this.listHeight = listHeight < 300 ? null : `${listHeight}px`
          this.$refs.scroll.refresh()
        }
      })
    },
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

      const oldValue = this.currentValue

      this.currentValue = value
      this.handleToggelVisible(false)
      this.$emit('on-select', value, label)

      if (oldValue !== value) {
        this.$emit('on-change', value, label)
      }
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
      this.$emit('on-outside-click')

      if (this.outsideClose && this.currentVisible) {
        this.handleToggelVisible(false)
        this.$emit('on-outside-close')
      }
    },
    updateSelected() {
      const item = this.items.find(
        item => item.truthValue === this.currentValue
      )

      this.currentLabel = item?.truthLabel ?? ''
    },
    toggleHoverState(hover = !this.isHover) {
      this.isHover = hover
    },
    handleClear() {
      if (this.clearable) {
        const cleared = isNull(this.currentValue) || this.currentValue === ''

        this.currentValue = ''
        this.currentLabel = ''
        this.$emit('on-clear')

        if (!cleared) {
          this.$emit('on-change', '', '')
        }
      }
    }
  }
}
</script>
