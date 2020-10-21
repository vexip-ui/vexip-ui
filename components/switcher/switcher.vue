<template>
  <label :class="className" :style="style">
    <span :class="`${prefix}__signal`" :style="signalStyle">
      <slot v-if="loading" name="loading">
        <Icon name="spinner" pulse></Icon>
      </slot>
    </span>
    <span v-if="currentValue" :class="`${prefix}__label`">
      <slot name="open">{{ openText }}</slot>
    </span>
    <span v-else :class="`${prefix}__label`">
      <slot name="close">{{ closeText }}</slot>
    </span>
    <input
      type="checkbox"
      :class="`${prefix}__input`"
      :checked="currentValue"
      :disabled="isDisabled"
      @change="handleChange()"
    />
  </label>
</template>

<script>
import Icon from '../icon'
import '../../icons/spinner'

const { prefix } = require('../../src/style/basis/variable')

export default {
  name: 'Switcher',
  components: {
    Icon
  },
  model: {
    event: 'on-change'
  },
  props: {
    value: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      default: 'default',
      validator(value) {
        return ['small', 'default', 'large'].includes(value)
      }
    },
    openColor: {
      type: String,
      default: ''
    },
    closeColor: {
      type: String,
      default: ''
    },
    loading: {
      type: Boolean,
      default: false
    },
    openText: {
      type: String,
      default: ''
    },
    closeText: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      prefix: `${prefix}-switcher`,
      currentValue: this.value
    }
  },
  computed: {
    className() {
      const { prefix, currentValue, disabled, size, loading } = this

      return [
        prefix,
        {
          [`${prefix}--open`]: currentValue,
          [`${prefix}--${size}`]: size !== 'default',
          [`${prefix}--disabled`]: disabled,
          [`${prefix}--loading`]: loading
        }
      ]
    },
    style() {
      const { openColor, closeColor, currentValue } = this

      return {
        backgroundColor: currentValue ? openColor : closeColor
      }
    },
    signalStyle() {
      const { openColor, closeColor, currentValue } = this

      return {
        color: currentValue ? openColor : closeColor
      }
    },
    isDisabled() {
      return this.disabled || this.loading
    },
    bindBeforeClose() {
      return !!(
        this._events['before-close'] && this._events['before-close'].length
      )
    }
  },
  watch: {
    value(value) {
      this.handleChange(value)
    },
    currentValue(value) {
      this.$emit('on-change', value)
    }
  },
  methods: {
    handleChange(checked = !this.currentValue) {
      if (!checked && this.bindBeforeClose) {
        this.$emit('before-close', () => {
          this.currentValue = checked
        })
      } else {
        this.currentValue = checked
      }
    }
  }
}
</script>
