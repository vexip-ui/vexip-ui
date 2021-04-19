<template>
  <div
    :class="[prefix, `${prefix}--${mode}`, enable ? '' : `${prefix}--disabled`]"
    :style="style"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
  >
    <div :class="`${prefix}__wrapper`">
      <div
        ref="prev"
        :class="[`${prefix}__arrow--${arrow}`, `${prefix}__arrow--prev`]"
      >
        <span
          :class="`${prefix}__handle${disabledPrev ? '--disabled' : ''}`"
          @click="handlePrev"
        >
          <slot name="prev-arrow" :disabled="disabledPrev">
            <span :class="handleInnerClass">
              <Icon :name="`arrow-${arrowIcons[0]}`" :scale="1.5"></Icon>
            </span>
          </slot>
        </span>
      </div>
      <div :class="`${prefix}__list`" :style="listStyle">
        <div
          :class="`${prefix}__track`"
          :style="trackStyle"
          @transitionend.self="afterTransition"
        >
          <slot></slot>
        </div>
        <div
          v-if="enable && loop"
          ref="subTrack"
          :class="`${prefix}__track--sub`"
          :style="subTrackStyle"
        >
          <slot></slot>
        </div>
      </div>
      <div
        ref="next"
        :class="[`${prefix}__arrow--${arrow}`, `${prefix}__arrow--next`]"
      >
        <span
          :class="`${prefix}__handle${disabledNext ? '--disabled' : ''}`"
          @click="handleNext"
        >
          <slot name="next-arrow" :disabled="disabledNext">
            <span :class="handleInnerClass">
              <Icon :name="`arrow-${arrowIcons[1]}`" :scale="1.5"></Icon>
            </span>
          </slot>
        </span>
      </div>
    </div>
    <div v-if="usePointer" :class="`${prefix}__pointers--${pointer}`">
      <div
        v-for="index in pointerCount"
        :key="index"
        :class="
          `${prefix}__pointer${index - 1 === activeItem ? '--active' : ''}`
        "
        @click="toggleActive(index)"
      >
        <slot name="pointer" :active="index - 1 === activeItem">
          <span :class="`${prefix}__pointer-inner`"></span>
        </slot>
      </div>
    </div>
  </div>
</template>

<script>
import Icon from '../icon'
import { config, useConfigurableProps } from '../../src/config/properties'

import '../../icons/arrow-up'
import '../../icons/arrow-right'
import '../../icons/arrow-down'
import '../../icons/arrow-left'

const prefix = config.defaults.prefixCls

const props = useConfigurableProps({
  viewSize: {
    type: Number,
    default: 3
  },
  mode: {
    default: 'horizontal',
    validator(value) {
      return value === 'horizontal' || value === 'vertical'
    }
  },
  disabled: {
    type: Boolean,
    default: false
  },
  loop: {
    type: Boolean,
    default: false
  },
  arrow: {
    default: 'outer',
    validator(value) {
      return ['outer', 'insert', 'none'].includes(value)
    }
  },
  arrowShow: {
    default: 'hover',
    validator(value) {
      return ['hover', 'always'].includes(value)
    }
  },
  autoplay: {
    type: [Boolean, Number],
    default: false,
    validator(value) {
      return typeof value === 'number' ? value > 500 : true
    }
  },
  pointer: {
    default: 'none',
    validator(value) {
      return ['outer', 'insert', 'none'].includes(value)
    }
  },
  speed: {
    type: Number,
    default: 300
  },
  active: {
    type: Number,
    default: 0
  },
  activeOffset: {
    type: Number,
    default: 0
  },
  height: {
    type: [Number, String],
    default: null
  }
})

export default {
  name: 'Carousel',
  components: {
    Icon
  },
  model: {
    prop: 'active',
    event: 'on-change'
  },
  props,
  emits: [
    'on-will-change',
    'on-change',
    'on-prev',
    'on-next'
  ],
  data() {
    return {
      prefix: `${prefix}-carousel`,
      items: [],
      currentItem: 0,
      listWidth: 'auto',
      listHeight: 'auto',
      itemWidth: 'auto',
      itemHeight: 'auto',
      trackWidth: 'auto',
      trackHeight: 'auto',
      lock: false, // 用于控制阻断快速连点
      trackOffset: 0,
      subTrackOffset: 0,
      transition: false, // 用于控制阻断快速连点
      timer: null, // 自动播放定时器 (Interval)
      hoverTimer: null, // 鼠标移入移出定时器 (Timeout)
      sensitivity: 300, // 鼠标移入移出灵敏度 (定时器延迟)
      transitionItem: null, // 用于解决切换轨道时Item自身基于active变动的过渡效果无效的问题
      arrowActive: this.arrowShow === 'always'
    }
  },
  computed: {
    enable() {
      return this.items.length >= this.viewSize && !this.disabled
    },
    style() {
      const { mode, height } = this

      return {
        height:
          mode === 'vertical' && height
            ? `${height}${typeof height === 'number' ? 'px' : ''}`
            : ''
      }
    },
    itemCount() {
      return this.enable && this.loop
        ? this.items.length / 2
        : this.items.length
    },
    usePointer() {
      return this.viewSize === 1 && this.pointer !== 'none'
    },
    bindSelectEvent() {
      return !!(this._events['on-select'] && this._events['on-select'].length)
    },
    activeItem() {
      return this.currentItem % this.itemCount
    },
    pointerCount() {
      return Math.round(
        this.loop
          ? this.itemCount
          : Math.max(this.itemCount - this.viewSize + 1, 0)
      )
    },
    sizeProp() {
      return this.mode === 'horizontal' ? 'Width' : 'Height'
    },
    direction() {
      return this.mode === 'horizontal' ? 'X' : 'Y'
    },
    listStyle() {
      return {
        width: `${this.listWidth}px`,
        height: `${this.listHeight}px`
      }
    },
    trackStyle() {
      const {
        sizeProp,
        direction,
        trackWidth,
        trackHeight,
        currentItem,
        transition,
        speed
      } = this

      return {
        width: `${trackWidth}px`,
        height: `${trackHeight}px`,
        transform: `translate${direction}(${-currentItem *
          this['item' + sizeProp]}px) translateZ(0)`,
        transition: transition ? `transform ${speed}ms` : 'none'
      }
    },
    subTrackStyle() {
      const {
        viewSize,
        sizeProp,
        direction,
        trackWidth,
        trackHeight,
        currentItem,
        transition,
        speed,
        itemCount
      } = this

      return {
        zIndex: currentItem + viewSize - 1 > itemCount ? 2 : 0,
        width: `${trackWidth}px`,
        height: `${trackHeight}px`,
        transform: `translate${direction}(${this['track' + sizeProp] -
          currentItem * this['item' + sizeProp]}px) translateZ(0)`,
        transition: transition ? `transform ${speed}ms` : 'none'
      }
    },
    disabledPrev() {
      return !this.enable || (!this.loop && this.currentItem <= 0)
    },
    disabledNext() {
      return (
        !this.enable ||
        (!this.loop && this.currentItem >= this.itemCount - this.viewSize)
      )
    },
    arrowIcons() {
      return this.mode === 'horizontal' ? ['left', 'right'] : ['up', 'down']
    },
    handleInnerClass() {
      const { prefix, arrowActive } = this

      return [
        `${prefix}__handle-inner`,
        {
          [`${prefix}__handle-inner--show`]: arrowActive
        }
      ]
    }
  },
  watch: {
    items() {
      this.$nextTick(() => {
        this.updateItemSize()
        this.updateTrackSize()
      })
    },
    active(value) {
      this.currentItem = value
    },
    activeItem(value) {
      const active = value + this.activeOffset

      this.items.forEach((item, index) => {
        if (index !== this.transitionItem) {
          item.active = index === active
        }
      })

      this.$emit('on-will-change', value)
    },
    autoplay() {
      this.setAutoplay()
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.refresh()

      setTimeout(() => {
        this.transition = true
        this.setAutoplay()
      }, 0)
    })

    window.addEventListener('resize', () => {
      this.refresh()
    })
  },
  methods: {
    queryListSize() {
      const { prev, next } = this.$refs

      let fixWidth = 0
      let fixHeight = 0

      if (this.arrow === 'outer') {
        fixWidth = prev.offsetWidth + next.offsetWidth
        fixHeight = prev.offsetHeight + next.offsetHeight
      }

      if (this.mode === 'horizontal') {
        this.listWidth = this.$el.offsetWidth - fixWidth
        // this.listHeight = this.$el.offsetHeight
        this.listHeight = 'auto'
      } else {
        // this.listWidth = this.$el.offsetWidth
        this.listWidth = 'auto'

        if (this.height === null && this.items[0]) {
          this.listHeight = this.items[0].$el.offsetHeight * this.viewSize
        } else {
          this.listHeight = this.$el.offsetHeight - fixHeight
        }
      }
    },
    updateItemSize() {
      let width
      let height

      if (this.mode === 'horizontal') {
        width = this.listWidth / this.viewSize
        height = this.listHeight
      } else {
        width = this.listWidth
        height = this.listHeight / this.viewSize
      }

      this.itemWidth = width
      this.itemHeight = height

      this.updateItemProps({ width, height })
    },
    updateTrackSize() {
      if (this.mode === 'horizontal') {
        this.trackWidth = this.itemWidth * this.itemCount
        this.trackHeight = this.itemHeight
      } else {
        this.trackWidth = this.itemWidth
        this.trackHeight = this.itemHeight * this.itemCount
      }
    },
    updateItemProps(options) {
      const keys = Object.keys(options)

      this.items.forEach(item => {
        for (let i = 0, len = keys.length; i < len; i++) {
          const key = keys[i]

          item[key] = options[key]
        }
      })
    },
    refresh() {
      this.queryListSize()
      this.updateItemSize()
      this.updateTrackSize()
    },
    handleWheel(count) {
      if (!count) {
        return
      }

      const targetItem = this.currentItem + count

      if (!this.loop) {
        this.currentItem = Math.min(
          Math.max(0, targetItem),
          this.itemCount - this.viewSize
        )
      } else {
        this.currentItem = targetItem
      }

      const sizeProp = this.viewSizeProp

      this.trackOffset = this['item' + sizeProp] * this.currentItem
      this.subTrackOffset = this['item' + sizeProp] * this.currentItem

      if (this.currentItem >= this.itemCount) {
        this.transitionItem = this.currentItem + this.activeOffset
        this.items[this.transitionItem].active = true
      }
    },
    beforeTransition() {
      this.transition = false

      if (this.currentItem === 0) {
        this.currentItem = this.itemCount
        this.transitionItem = this.currentItem + this.activeOffset
        this.items[this.transitionItem].transition = false
        this.items[this.transitionItem].active = true
      }

      setTimeout(() => {
        this.transition = true

        if (this.transitionItem) {
          this.items[this.transitionItem].transition = true
          this.items[this.transitionItem].active =
            this.transitionItem === this.activeItem
          this.transitionItem = null
        }
      }, 16)
    },
    afterTransition() {
      this.transition = false

      clearTimeout(this.lockTimer)

      if (this.currentItem >= this.itemCount) {
        this.currentItem = this.currentItem % this.itemCount
      }

      setTimeout(() => {
        this.transition = true
        this.lock = false
        this.$emit('on-change', this.activeItem)

        if (this.transitionItem !== null) {
          this.items[this.transitionItem].active =
            this.transitionItem === this.activeItem
          this.transitionItem = null
        }
      }, 0)
    },
    handlePrev() {
      if (this.lock || this.disabledPrev) {
        return
      }

      this.lock = true

      this.beforeTransition()

      setTimeout(() => {
        this.handleWheel(-1)
        this.$emit('on-prev', this.activeItem)
      }, 16)
    },
    handleNext() {
      if (this.lock || this.disabledNext) {
        return
      }

      this.lock = true

      this.$nextTick(() => {
        this.handleWheel(1)
        this.$emit('on-next', this.activeItem)
      })
    },
    toggleActive(index) {
      this.currentItem = index - 1
    },
    setAutoplay() {
      clearInterval(this.timer)

      if (!this.autoplay) return

      let waiting = 4000

      if (typeof this.autoplay === 'number') {
        waiting = this.autoplay
      }

      this.timer = setInterval(() => {
        if (!this.loop && this.disabledNext) {
          this.handleWheel(-this.currentItem)
        } else {
          this.handleNext()
        }
      }, waiting)
    },
    handleMouseEnter() {
      if (this.autoplay) {
        clearTimeout(this.hoverTimer)

        this.hoverTimer = window.setTimeout(() => {
          clearInterval(this.timer)
        }, this.sensitivity)
      }

      if (this.arrowShow === 'hover' && this.arrow === 'insert') {
        this.arrowActive = true
      }
    },
    handleMouseLeave() {
      if (this.autoplay) {
        clearTimeout(this.hoverTimer)

        this.hoverTimer = window.setTimeout(() => {
          this.setAutoplay()
        }, this.sensitivity)
      }

      if (this.arrowShow === 'hover') {
        this.arrowActive = false
      }
    }
  }
}
</script>
