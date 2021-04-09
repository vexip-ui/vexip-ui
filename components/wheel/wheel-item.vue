<template>
  <li :class="`${prefix}__item`" :style="style">
    <slot></slot>
  </li>
</template>

<script>
import { findComponentUpward, removeArrayItem } from '@/utils/common'

const { prefix } = require('@/style/basis/variable')

const parentName = 'Wheel'

export default {
  name: 'WheelItem',
  props: {
    value: {
      type: [Number, String, Boolean],
      default: null
    }
  },
  data() {
    return {
      prefix: `${prefix}-wheel`,
      width: 'auto',
      height: 'auto'
    }
  },
  computed: {
    style() {
      const { width, height } = this

      return {
        width: `${width}px`,
        height: `${height}px`
      }
    }
  },
  mounted() {
    const parentInstance = findComponentUpward(this, parentName)

    if (parentInstance) {
      this.parentInstance = parentInstance
      parentInstance.items.push(this)
    }
  },
  beforeDestroy() {
    if (this.parentInstance) {
      removeArrayItem(this.parentInstance.items, this)
    }
  }
}
</script>
