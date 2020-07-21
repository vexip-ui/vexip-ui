<template>
  <ul :class="className">
    <slot></slot>
  </ul>
</template>

<script>
import { removeArrayItem } from '../../utils/common'

const { prefix } = require('../../style/basis/variable')
export const baseIndentWidth = 20 // px

export default {
  name: 'Menu',
  provide() {
    return {
      menu: this
    }
  },
  props: {
    active: {
      type: String,
      default: null
    },
    accordion: {
      type: Boolean,
      default: false
    },
    markerType: {
      default: 'right',
      validator(value) {
        return ['right', 'left', 'none'].includes(value)
      }
    },
    reduced: {
      type: Boolean,
      default: false
    },
    groupType: {
      default: 'collapse',
      validator(value) {
        return ['collapse', 'dropdown'].includes(value)
      }
    },
    theme: {
      default: 'light',
      validator(value) {
        return ['light', 'dark'].includes(value)
      }
    },
    tooltipTheme: {
      default: 'dark',
      validator(value) {
        return ['light', 'dark'].includes(value)
      }
    }
  },
  data() {
    return {
      prefix: `${prefix}-menu`,
      items: [],
      currentActive: this.active,
      currentExpanded: [],
      isReduced: false
    }
  },
  computed: {
    className() {
      const { prefix, markerType, isReduced, groupType, theme } = this

      return [
        prefix,
        `${prefix}--${theme}`,
        `${prefix}--marker-${markerType}`,
        {
          [`${prefix}--reduced`]: isReduced,
          [`${prefix}--dropdown`]: groupType === 'dropdown'
        }
      ]
    }
  },
  watch: {
    active(value) {
      if (this.currentActive !== value) {
        this.handleSelect(value)
      }
    },
    reduced: {
      handler(value) {
        if (value) {
          this.handleReduce()
        } else {
          this.handleExpand()
        }
      }
    }
  },
  mounted() {
    this.$nextTick(() => {
      if (this.reduced) {
        this.handleReduce()
      }
    })
  },
  methods: {
    handleSelect(label) {
      if (this.currentActive === label) return

      this.currentActive = label
      this.items.forEach(item => {
        item.selected = item.label === label
      })

      this.$emit('on-select', label)
    },
    handleToggleExpand(label) {
      const expanded = !this.currentExpanded.includes(label)

      if (this.accordion) {
        this.items.forEach(item => {
          item.groupExpanded = item.label === label && expanded
        })

        this.currentExpanded = []
      } else {
        const item = this.items.find(item => item.label === label)

        if (item) {
          item.groupExpanded = expanded
        }
      }

      if (expanded) {
        this.currentExpanded.push(label)
        this.$emit('on-expand', label)
      } else {
        removeArrayItem(this.currentExpanded, label)
        this.$emit('on-reduce', label)
      }
    },
    handleReduce() {
      this.currentExpanded = []

      let firstExpandedItem = null

      for (const item of this.items) {
        if (!firstExpandedItem && item.groupExpanded) {
          firstExpandedItem = item
        }

        item.currentExpanded = []
        item.groupExpanded = false
      }

      const handler = () => {
        this.isReduced = true
      }

      if (firstExpandedItem) {
        const callback = () => {
          this.$nextTick(handler)
          firstExpandedItem.$el.removeEventListener('transitionend', callback)
        }

        firstExpandedItem.$el.addEventListener('transitionend', callback)
      } else {
        handler()
      }
    },
    handleExpand() {
      this.isReduced = false

      const callback = () => {
        const selectedItem = this.items.find(
          item => item.label === this.currentActive
        )

        if (selectedItem) {
          let parent = selectedItem.parentInstance

          while (parent && parent.$options.name === 'MenuItem') {
            parent.groupExpanded = true
            parent = parent.parentInstance
          }
        }

        this.$el.removeEventListener('transitionend', callback)
      }

      this.$el.addEventListener('transitionend', callback)
    }
  }
}
</script>
