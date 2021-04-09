<template>
  <div :class="prefix" :style="style">
    <slot></slot>
  </div>
</template>

<script>
import { useConfigurableProps } from '@/config/properties'

const { prefix } = require('@/style/basis/variable')

const props = useConfigurableProps({
  itemWidth: {
    type: [Number, String],
    default: 300
  },
  itemHeight: {
    type: [Number, String],
    default: 200
  },
  deltaX: {
    type: [Number, String],
    default: 50
  },
  deltaY: {
    type: [Number, String],
    default: 35
  },
  direction: {
    default: 'top-left',
    validator(value) {
      return [
        'top-left',
        'top-right',
        'bottom-left',
        'bottom-right'
      ].includes(value)
    }
  }
})

export default {
  name: 'Stack',
  props,
  data() {
    return {
      prefix: `${prefix}-stack`,
      items: [],
      mounted: false,
      count: 0
    }
  },
  computed: {
    dirX() {
      return this.direction.endsWith('left') ? -1 : 1
    },
    dirY() {
      return this.direction.startsWith('top') ? -1 : 1
    },
    style() {
      const { deltaX, deltaY, count, itemWidth, itemHeight } = this

      return {
        width: `${+itemWidth + (count - 1) * deltaX}px`,
        height: `${+itemHeight + (count - 1) * deltaY}px`
      }
    }
  },
  watch: {
    items(value) {
      this.count = value.length
      this.mounted && this.computeItemPosition()
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.mounted = true
      this.computeItemPosition()
    })
  },
  methods: {
    computeItemPosition() {
      const {
        deltaX,
        deltaY,
        dirX,
        dirY,
        count,
        items,
        itemWidth,
        itemHeight
      } = this

      const targetX = ~dirX ? 'left' : 'right'
      const targetY = ~dirY ? 'top' : 'bottom'

      for (let i = 0; i < count; i++) {
        const item = items[i]

        item.width = itemWidth
        item.height = itemHeight
        item.deltaX = i * dirX * deltaX
        item.deltaY = i * dirY * deltaY
        item.zIndex = count - i
        item.targetX = targetX
        item.targetY = targetY
      }
    }
  }
}
</script>
