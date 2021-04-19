<template>
  <div
    :class="[`${prefix}__item`, active ? `${prefix}__item--active` : '']"
    :style="style"
  >
    <div
      :class="[`${prefix}__item-inner`, innerClass]"
      :style="{ cursor: bindSelectEvent ? 'pointer' : 'default' }"
      @click="handleClick"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
import { findComponentUpward, removeArrayItem } from '../../src/utils/common'
import { config } from '../../src/config/properties'

const prefix = config.defaults.prefixCls

const parentName = 'Carousel'

export default {
  name: 'CarouselItem',
  props: {
    innerClass: {
      type: [String, Array, Object],
      default: null
    }
  },
  emits: ['on-select'],
  data() {
    return {
      prefix: `${prefix}-carousel`,
      width: 'auto',
      height: 'auto',
      transition: true,
      active: false
    }
  },
  computed: {
    style() {
      const { width, height, transition } = this

      return {
        width: `${width}px`,
        height: `${height}px`,
        transition: transition ? '' : 'none'
      }
    },
    bindSelectEvent() {
      return (
        !!(this._events['on-select'] && this._events['on-select'].length) ||
        (this.parentInstance && this.parentInstance.bindSelectEvent)
      )
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
  },
  methods: {
    handleClick() {
      this.$emit('on-select')

      if (this.parentInstance) {
        const index = this.parentInstance.items.findIndex(item => item === this)

        this.parentInstance.$emit('on-select', index)
      }
    }
  }
}
</script>
