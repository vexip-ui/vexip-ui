<template>
  <li
    :class="{
      [prefix]: true,
      [`${prefix}--divided`]: divided
    }"
  >
    <div :class="`${prefix}__label`">
      <slot name="label">
        {{ label }}
      </slot>
    </div>
    <ul :class="`${prefix}__list`">
      <slot></slot>
    </ul>
  </li>
</template>

<script>
import { config } from '../../src/config/properties'

const prefix = config.defaults.prefixCls

export default {
  name: 'OptionGroup',
  props: {
    label: {
      type: String,
      default: ''
    },
    divided: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefix: `${prefix}-option-group`
    }
  }
}
</script>
