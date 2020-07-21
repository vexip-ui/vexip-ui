<template>
  <div :class="prefix">
    <PopupItem
      v-for="item in items"
      :key="item.key"
      ref="instances"
      :item="item"
      :transition-name="transitionName"
      :inner-class="innerClass"
      :style="getItemStyle(item)"
    >
      <template #item="{item: itemData}">
        <slot name="item" :item="itemData"></slot>
      </template>
    </PopupItem>
  </div>
</template>

<script>
import PopupItem from './popup-item'

const { prefix } = require('../../style/basis/variable')

let zIndex = 2000

export default {
  name: 'Popup',
  components: {
    PopupItem
  },
  props: {
    transitionName: {
      type: String,
      default: `${prefix}-popup-top`
    },
    innerClass: {
      type: [String, Array, Object],
      default: null
    },
    startOffset: {
      type: Number,
      default: 30
    },
    placement: {
      default: 'top-right',
      validator(value) {
        return [
          'top-right',
          'top-center',
          'top-left',
          'bottom-right',
          'bottom-center',
          'bottom-left'
        ].includes(value)
      }
    }
  },
  data() {
    return {
      prefix: `${prefix}-popup`,
      items: [],
      stack: [],
      pendding: false
    }
  },
  computed: {
    placementArray() {
      return this.placement.split('-')
    },
    verticalStyle() {
      return this.placementArray[0]
    },
    horizontalStyle() {
      return this.placementArray[1]
    }
  },
  watch: {
    startOffset(value, old) {
      const items = this.items

      for (let i = 0, len = items.length; i < len; i++) {
        items[i].verticalStyle += value - old
      }
    }
  },
  beforeDestroy() {
    try {
      this.$el.parentNode.removeChild(this.$el)
    } catch (e) {}
  },
  methods: {
    add(options) {
      this.stack.push({
        type: 'add',
        param: options
      })

      if (!this.pendding) {
        this.stackOut()
        this.pendding = true
      }
    },
    clear(key) {
      this.stack.push({
        type: 'clear',
        param: key
      })

      if (!this.pendding) {
        this.stackOut()
        this.pendding = true
      }
    },
    stackOut() {
      if (this.stack.length) {
        const { type, param } = this.stack.shift()

        if (type === 'add') {
          this.renderItem(param)
        } else {
          this.removeItem(param)
        }

        // this.$nextTick(() => {
        //   this.stackOut()
        // })
        requestAnimationFrame(() => {
          this.stackOut()
        })
      } else {
        this.pendding = false
      }
    },
    renderItem(options) {
      const index = this.getIndex()
      const key = options.key || `${this.prefix}-${index}`

      let item = this.find(key)

      if (item) {
        item = Object.assign(item, options)
        item.zIndex = index
      } else {
        item = Object.assign(
          {
            content: '',
            closable: false,
            key,
            zIndex: index
          },
          options
        )

        let currentVertical = this.startOffset

        const instances = this.$refs.instances

        if (instances) {
          this.$refs.instances.forEach(instance => {
            currentVertical += instance.$el.offsetHeight + 16
          })
        }

        item.verticalStyle = currentVertical

        this.items.push(item)
      }

      return item.key
    },
    removeItem(key) {
      const items = this.items
      const index = items.findIndex(item => item.key === key)

      if (~index) {
        const instance = this.$refs.instances[index]
        const removeHeight = instance.$el.offsetHeight
        const [item] = items.splice(index, 1)

        // 关闭回调
        if (typeof item.onClose === 'function') {
          item.onClose()
        }

        for (let i = index, len = items.length; i < len; i++) {
          items[i].verticalStyle -= removeHeight + 16
        }

        return true
      }

      return false
    },
    clearAll() {
      this.items = []
    },
    getIndex() {
      return zIndex++
    },
    has(key) {
      return !~this.items.findIndex(item => item.key === key)
    },
    find(key) {
      return this.items.find(item => item.key === key)
    },
    getItemStyle(item) {
      const [verticalStyle, horizontalStyle] = this.placementArray
      const style = { [verticalStyle]: `${item.verticalStyle}px` }

      if (horizontalStyle === 'center') {
        style.left = '50%'
        style.transform = 'translateX(-50%)'
      } else {
        style[horizontalStyle] = '24px'
      }

      return style
    }
  }
}
</script>
