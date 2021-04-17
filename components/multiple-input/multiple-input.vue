<template>
  <div
    :class="className"
    @click="handleFocus"
    @clickoutside="handleClickOutside"
  >
    <div :class="`${prefixCls}__control`" :style="controlStyle">
      <template v-for="(item, index) in currentValue">
        <span
          v-show="!disabledItem(index)"
          :key="index"
          :class="[`${prefixCls}__item`, itemClass, itemClassList[index]]"
        >
          <input
            ref="inputs"
            :class="[
              `${prefixCls}__input`,
              currentItem === index ? `${prefixCls}__input--focus` : ''
            ]"
            :style="{
              width: `${
                typeof itemWidthList[index] === 'number'
                  ? itemWidthList[index]
                  : itemWidth
              }px`
            }"
            :value="item"
            :readonly="readonly"
            @focus="handleCurrentItemChange(index)"
            @change="handleItemChange(index)"
          />
          <span
            v-if="labels[index]"
            :key="`l-${index}`"
            :class="`${prefixCls}__label`"
          >
            {{ labels[index] }}
          </span>
          <span
            v-if="separator && index !== currentValue.length - 1"
            :key="`s-${index}`"
            :class="`${prefixCls}__separator`"
          >
            {{ typeof separator === 'string' ? separator : separator[index] }}
          </span>
        </span>
      </template>
    </div>
    <div
      v-if="hasPrefix"
      :class="`${prefixCls}__icon--prefix`"
      :style="{ color: prefixColor }"
      @click="handlePrefixClick"
    >
      <slot name="prefix">
        <Icon :name="prefix"></Icon>
      </slot>
    </div>
    <div
      v-if="hasSuffix"
      :class="`${prefixCls}__icon--suffix`"
      :style="{ color: suffixColor }"
      @click="handleSuffixClick"
    >
      <slot name="suffix">
        <Icon :name="suffix"></Icon>
      </slot>
    </div>
  </div>
</template>

<script>
import Icon from '../icon'
import { config, useConfigurableProps } from '@/config/properties'
import { CLICK_OUTSIDE, observe, disconnect } from '@/utils/event'
import { noop } from '@/utils/common'

const prefix = config.defaults.prefixCls

const props = useConfigurableProps({
  size: {
    default: 'default',
    validator(value) {
      return ['small', 'default', 'large'].includes(value)
    }
  },
  value: {
    type: Array,
    default() {
      return []
    }
  },
  separator: {
    type: [String, Array],
    default: ''
  },
  labels: {
    type: Array,
    default() {
      return []
    }
  },
  readonly: {
    type: Boolean,
    default: false
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
  itemClass: {
    type: [String, Array, Object],
    default: null
  },
  itemClassList: {
    type: Array,
    default() {
      return []
    }
  },
  itemWidth: {
    type: Number,
    default: null,
    validator(value) {
      return value >= 20
    }
  },
  itemWidthList: {
    type: Array,
    default() {
      return []
    },
    validator(value) {
      for (let i = 0, len = value.length; i < len; i++) {
        if (value[i] < 20) return false
      }

      return true
    }
  },
  prefix: {
    type: String,
    default: ''
  },
  prefixColor: {
    type: String,
    default: ''
  },
  suffix: {
    type: String,
    default: ''
  },
  suffixColor: {
    type: String,
    default: ''
  },
  outsideBlur: {
    type: Boolean,
    default: true
  },
  autoFocus: {
    type: Boolean,
    default: true
  },
  defaultFocus: {
    type: Number,
    default: 0
  },
  disabledItem: {
    type: Function,
    default() {
      return false
    }
  },
  disableValidate: {
    type: Boolean,
    default: false
  }
})

export default {
  name: 'MultipleInput',
  components: {
    Icon
  },
  model: {
    event: 'on-change'
  },
  inject: {
    validateField: { default: () => noop }
  },
  props,
  emits: [
    'on-change',
    'on-focus',
    'on-blur',
    'on-item-change',
    'on-prefix-click',
    'on-suffix-click'
  ],
  data() {
    return {
      prefixCls: `${prefix}-multiple-input`,
      currentValue: Array.from(this.value),
      focusStates: [],
      focused: false,
      currentItem: null
    }
  },
  computed: {
    className() {
      const { prefixCls, focused, disabled, size, state } = this

      return [
        prefixCls,
        {
          [`${prefixCls}--focused`]: focused,
          [`${prefixCls}--disabled`]: disabled,
          [`${prefixCls}--${size}`]: size !== 'default',
          [`${prefixCls}--${state}`]: state !== 'default'
        }
      ]
    },
    hasPrefix() {
      return !!this.$slots.prefix || !!this.prefix
    },
    hasSuffix() {
      return !!this.$slots.suffix || !!this.suffix
    },
    controlStyle() {
      return {
        paddingLeft: this.hasPrefix ? '2em' : '',
        paddingRight: this.hasSuffix ? '2em' : ''
      }
    }
  },
  watch: {
    value(value) {
      this.currentValue = Array.from(value)
    },
    currentValue(value) {
      this.$emit('on-change', Array.from(value))

      if (!this.disableValidate) {
        this.validateField()
      }
    },
    focused(value) {
      if (value) {
        this.$emit('on-focus')
      } else {
        this.$emit('on-blur')
      }
    },
    currentItem(value) {
      this.handleItemFocus(value)
      if (this.focused) {
        this.$emit('on-item-change', value, this.value[value])
      }
    }
  },
  mounted() {
    observe(this.$el, CLICK_OUTSIDE)
    this.$on('hook:beforeDestroy', () => disconnect(this.$el, CLICK_OUTSIDE))
  },
  methods: {
    handleFocus() {
      if (this.disabled) return

      this.focused = true

      if (this.currentItem === null) {
        if (this.autoFocus) {
          if (this.$refs.inputs[this.defaultFocus]) {
            this.$refs.inputs[this.defaultFocus].focus()
          } else {
            this.$refs.inputs[0].focus()
          }
        }
      } else {
        this.$emit('on-item-change', this.currentItem)
      }
    },
    handleClickOutside() {
      if (this.outsideBlur) {
        this.handleBlur()
      }
    },
    handleBlur() {
      if (this.currentItem !== null) {
        this.handleItemBlur(this.currentItem)
      }

      this.currentItem = null
      this.focused = false
    },
    handleItemChange(index) {
      this.currentValue[index] = this.$refs.inputs[index].value
    },
    handleCurrentItemChange(index) {
      this.currentItem = index
    },
    handlePrefixClick(event) {
      if (this.disabled) return

      this.$emit('on-prefix-click', event)
    },
    handleSuffixClick(event) {
      if (this.disabled) return

      this.$emit('on-suffix-click', event)
    },
    handleItemFocus(index) {
      if (this.$refs.inputs[index]) {
        this.$refs.inputs[index].focus()
      }
    },
    handleItemBlur(index) {
      if (this.$refs.inputs[index]) {
        this.$refs.inputs[index].blur()
      }
    }
  }
}
</script>
