<template>
  <li :class="prefix">
    <CollapseTransition>
      <div
        v-show="!isHideLabel"
        :class="`${prefix}__label`"
        :style="labelStyle"
      >
        <slot name="label">
          {{ label }}
        </slot>
      </div>
    </CollapseTransition>
    <ul :class="`${prefix}__list`">
      <slot></slot>
    </ul>
  </li>
</template>

<script>
import CollapseTransition from '../collapse/collapse-transition'

import { baseIndentWidth } from './menu'
import { findComponentUpward } from '@/utils/common'

const { prefix } = require('@/style/basis/variable')

export default {
  name: 'MenuGroup',
  components: {
    CollapseTransition
  },
  inject: {
    menu: { default: null }
  },
  props: {
    label: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      prefix: `${prefix}-menu-group`,
      indent: 1,
      parentInstance: null
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
    },
    isReduced() {
      return !!this.menu?.isReduced
    },
    isHideLabel() {
      return this.isReduced && !this.parentInstance?.usePopper
    }
  },
  created() {
    const parentInstance = findComponentUpward(this, [
      'Menu',
      'MenuItem',
      'MenuGroup'
    ])

    if (parentInstance?.$options.name === 'MenuGroup') {
      this.parentInstance = findComponentUpward(this, ['Menu', 'MenuItem'])

      this.indent = parentInstance.indent + 1
    } else {
      if (parentInstance) {
        this.parentInstance = parentInstance

        if (parentInstance.$options.name === 'MenuItem') {
          this.indent = parentInstance.indent + 1
        }
      }
    }
  }
}
</script>
