<template>
  <div :class="className">
    <ul :class="`${prefix}__list`">
      <slot></slot>
    </ul>
    <div
      v-if="!card"
      ref="mark"
      :class="`${prefix}__track`"
    >
      <slot name="marker">
        <div :class="`${prefix}__marker`"></div>
      </slot>
    </div>
  </div>
</template>

<script>
import { config, useConfigurableProps } from '@/config/properties'
import { isNull } from '@/utils/common'

const prefix = config.defaults.prefixCls

const props = useConfigurableProps({
  active: {
    type: [String, Number],
    default: null
  },
  card: {
    type: Boolean,
    default: false
  }
})

export default {
  name: 'TabNav',
  model: {
    prop: 'active',
    event: 'on-change'
  },
  props,
  emits: ['on-change', 'update:active'],
  data() {
    return {
      prefix: `${prefix}-tab-nav`,
      currentActive: this.active,
      items: []
    }
  },
  computed: {
    className() {
      const { card, prefix } = this

      return {
        [prefix]: true,
        [`${prefix}--card`]: card
      }
    }
  },
  watch: {
    active(value) {
      this.currentActive = value
    },
    currentActive() {
      this.computeMarkPosition()
    }
  },
  mounted() {
    this.computeMarkPosition()

    this.$nextTick(() => {
      const hiddenParentNode = this.queryOutsideHiddenElement()

      if (hiddenParentNode) {
        this.mutationObserver = new MutationObserver(() => {
          if (hiddenParentNode.style.display !== 'none') {
            this.computeMarkPosition()
            this.mutationObserver.disconnect()
          }
        })

        this.mutationObserver.observe(hiddenParentNode, {
          attributes: true,
          childList: true,
          characterData: true,
          attributeFilter: ['style']
        })
      }
    })

    this.$on('on-navbar-change', ({ label, left, width }) => {
      this.currentActive = label
      this.setMarkPosition(left, width)
      this.$emit('on-change', label)
    })
  },
  beforeDestroy() {
    if (this.mutationObserver) {
      this.mutationObserver.disconnect()
    }
  },
  methods: {
    setMarkPosition(left, width) {
      const mark = this.$refs.mark

      if (mark) {
        mark.style.width = `${width}px`
        mark.style.left = `${left}px`
      }
    },
    queryOutsideHiddenElement() {
      let parentNode = this.$el.parentNode

      while (parentNode && parentNode !== document.body) {
        if (getComputedStyle(parentNode).display === 'none') {
          return parentNode
        }

        parentNode = parentNode.parentNode
      }

      return null
    },
    computeMarkPosition() {
      const children = this.items

      let child

      if (isNull(this.currentActive)) {
        child = children.find(item => item.active)
      } else {
        child = children.find(item => item.currentLabel === this.currentActive)
      }

      if (!child) {
        child = children[0]
      }

      // 防止没有任何子元素的情况
      if (child) {
        this.$nextTick(() => {
          const element = child.$el
          const left = element.offsetLeft
          const width = element.offsetWidth

          this.setMarkPosition(left, width)

          this.currentActive = child.currentLabel
          this.updateActive()
        })
      }
    },
    updateActive() {
      this.items.forEach(item => {
        item.$emit('on-active-change', this.currentActive)
      })
    }
  }
}
</script>
