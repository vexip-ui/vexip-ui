<template>
  <li :class="prefix">
    <div :class="`${prefix}__label`" :style="labelStyle">
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
import { baseIndentWidth } from './menu'
import { findComponentUpward } from '../../utils/common'

const { prefix } = require('../../style/basis/variable')

export default {
  name: 'MenuGroup',
  props: {
    label: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      prefix: `${prefix}-menu-group`,
      indent: 1
    }
  },
  computed: {
    labelStyle() {
      const { indent, parentInstance } = this

      return {
        paddingLeft:
          parentInstance && parentInstance.usePopper
            ? null
            : `${indent * baseIndentWidth}px`
      }
    }
  },
  created() {
    const parentInstance = findComponentUpward(this, ['Menu', 'MenuItem'])

    if (parentInstance) {
      this.parentInstance = parentInstance

      if (parentInstance.$options.name === 'MenuItem') {
        this.indent = parentInstance.indent + 1
      }
    }
  }
}
</script>
