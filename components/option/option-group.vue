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
const { prefix } = require('../../src/style/basis/variable')

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
