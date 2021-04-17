<template>
  <div :class="`${prefix}__item`" :style="style">
    <slot></slot>
  </div>
</template>

<script>
import { findComponentUpward } from '@/utils/common'
import { config } from '@/config/properties'

const prefix = config.defaults.prefixCls

const parentName = 'Stack'

export default {
  name: 'StackItem',
  props: {},
  data() {
    return {
      prefix: `${prefix}-stack`,
      width: 300,
      height: 200,
      deltaX: 0,
      deltaY: 0,
      zIndex: 0,
      targetX: 'right',
      targetY: 'bottom'
    }
  },
  computed: {
    style() {
      const { width, height, deltaX, deltaY, zIndex, targetX, targetY } = this

      return {
        zIndex,
        [targetX]: 0,
        [targetY]: 0,
        width: `${width}px`,
        height: `${height}px`,
        transform: `translate(${deltaX}px, ${deltaY}px)`
      }
    }
  },
  mounted() {
    const parentInstance = findComponentUpward(this, parentName)

    if (parent) {
      this.parentInstance = parentInstance
      parentInstance.items.push(this)
    }
  },
  beforeDestroy() {
    if (this.parentInstance) {
      const index = this.parentInstance.items.findIndex(item => item === this)

      if (~index) {
        this.parentInstance.items.splice(index, 1)
      }
    }
  },
  methods: {}
}
</script>
