<template>
  <div :class="className" :style="style">
    <div
      v-if="arrow"
      ref="prevArrow"
      :class="[
        `${prefix}__arrow`,
        `${prefix}__arrow--prev`,
        prevDisabled ? `${prefix}__arrow--disabled` : ''
      ]"
      @click="handlePrev"
    >
      <Icon :name="`angle-${horizontal ? 'left' : 'up'}`"></Icon>
    </div>
    <div :class="`${prefix}__scroll`">
      <Scroll
        ref="scroll"
        :pointer="pointer"
        :width="horizontal ? wrapperWidth : '100%'"
        :height="horizontal ? '100%' : wrapperHeight"
        :mode="horizontal ? 'horizontal' : 'vertical'"
        :delta-x="targetWidth"
        :delta-y="targetHeight"
        @on-scroll="handleWheel"
      >
        <ul
          ref="list"
          :class="`${prefix}__list`"
          :style="listStyle"
        >
          <slot></slot>
        </ul>
      </Scroll>
      <template v-if="candidate">
        <div
          :class="[`${prefix}__mask`, `${prefix}__mask--top`]"
          :style="maskStyle"
        ></div>
        <div
          :class="[`${prefix}__mask`, `${prefix}__mask--bottom`]"
          :style="maskStyle"
        ></div>
      </template>
    </div>
    <div
      v-if="arrow"
      ref="nextArrow"
      :class="[
        `${prefix}__arrow`,
        `${prefix}__arrow--next`,
        nextDisabled ? `${prefix}__arrow--disabled` : ''
      ]"
      @click="handleNext"
    >
      <Icon :name="`angle-${horizontal ? 'right' : 'down'}`"></Icon>
    </div>
  </div>
</template>

<script>
import Icon from '../icon'
import Scroll from '../scroll'

import display from '@/mixins/display'
import { useConfigurableProps } from '@/config/properties'

import '../../icons/angle-up'
import '../../icons/angle-right'
import '../../icons/angle-down'
import '../../icons/angle-left'

const { prefix } = require('@/style/basis/variable')

const props = useConfigurableProps({
  horizontal: {
    type: Boolean,
    default: false
  },
  active: {
    type: Number,
    default: 0,
    validator(value) {
      return value >= 0
    }
  },
  candidate: {
    default: 2,
    validator(value) {
      return [0, 1, 2, 3].includes(value)
    }
  },
  arrow: {
    type: Boolean,
    default: false
  },
  pointer: {
    type: Boolean,
    default: true
  }
})

export default {
  name: 'Wheel',
  components: {
    Icon,
    Scroll
  },
  mixins: [display],
  model: {
    prop: 'active',
    event: 'on-change'
  },
  props,
  emits: ['on-change', 'on-prev', 'on-next'],
  data() {
    return {
      prefix: `${prefix}-wheel`,
      items: [],
      isInit: false,
      wrapperWidth: null,
      wrapperHeight: null,
      targetWidth: null,
      targetHeight: null,
      horizontalPadding: null,
      verticalPadding: null,
      currentActive: this.active,
      prevArrowWidth: 0,
      prevArrowHeight: 0,
      nextArrowWidth: 0,
      nextArrowHeight: 0
    }
  },
  computed: {
    className() {
      const { horizontal, prefix } = this

      return [prefix, `${prefix}--${horizontal ? 'horizontal' : 'vertical'}`]
    },
    style() {
      const {
        horizontal,
        wrapperWidth,
        wrapperHeight,
        prevArrowWidth,
        prevArrowHeight,
        nextArrowWidth,
        nextArrowHeight
      } = this

      if (horizontal) {
        return {
          width: `${wrapperWidth + prevArrowWidth + nextArrowWidth}px`
        }
      }

      return {
        height: `${wrapperHeight + prevArrowHeight + nextArrowHeight}px`
      }
    },
    listStyle() {
      const { horizontal, horizontalPadding, verticalPadding } = this

      if (horizontal) {
        return {
          paddingRight: `${horizontalPadding}px`,
          paddingLeft: `${horizontalPadding}px`
        }
      }

      return {
        paddingTop: `${verticalPadding}px`,
        paddingBottom: `${verticalPadding}px`
      }
    },
    maskStyle() {
      const { horizontal, horizontalPadding, verticalPadding } = this

      if (horizontal) {
        return {
          width: `${horizontalPadding}px`
        }
      }

      return {
        height: `${verticalPadding}px`
      }
    },
    prevDisabled() {
      return this.currentActive === 0
    },
    nextDisabled() {
      return this.currentActive >= this.items.length - 1
    }
  },
  watch: {
    items() {
      if (this.isInit) {
        this.computeSize()
      }
    },
    active(value) {
      this.currentActive = value

      this.verifyActive()
      this.refreshScroll()
    },
    horizontal() {
      this.computeSize()
    }
  },
  // mounted () {
  //   this.computeSize()

  //   this.$nextTick(() => {
  //     this.changeActive(this.active)
  //   })
  // },
  methods: {
    displayInit() {
      this.computeSize()
      this.$refs.scroll.refresh()

      this.$nextTick(() => {
        this.isInit = true
        this.currentActive = this.active

        this.verifyActive()
        this.refreshScroll()
      })
    },
    computeSize() {
      this.$nextTick(() => {
        const horizontal = this.horizontal
        const item = this.items[0]

        if (item && item.$el) {
          const { width, height } = getComputedStyle(item.$el)

          this.targetWidth = parseInt(width) || item.$el.offsetWidth
          this.targetHeight = parseInt(height) || item.$el.offsetHeight
        }

        const candidate = this.candidate
        const showCount = 2 * candidate + 1

        this.wrapperWidth = showCount * this.targetWidth
        this.wrapperHeight = showCount * this.targetHeight

        if (this.arrow) {
          const prev = this.$refs.prevArrow
          const next = this.$refs.nextArrow

          this.prevArrowWidth = prev.offsetWidth
          this.nextArrowWidth = next.offsetWidth
          this.prevArrowHeight = prev.offsetHeight
          this.nextArrowHeight = next.offsetHeight
        }

        this.horizontalPadding = candidate * this.targetWidth
        this.verticalPadding = candidate * this.targetHeight

        this.items.forEach(item => {
          if (horizontal) {
            item.width = this.targetWidth
          } else {
            item.height = this.targetHeight
          }
        })

        setTimeout(() => {
          this.$refs.scroll.refresh()
        }, 0)
      })
    },
    handleWheel({ clientX, clientY }) {
      let active

      if (this.horizontal) {
        active = parseInt(clientX / this.targetWidth)
      } else {
        active = parseInt(clientY / this.targetHeight)
      }

      this.changeActive(active)
    },
    changeActive(value) {
      this.currentActive = value

      this.verifyActive()
      this.refreshScroll()

      this.$emit(
        'on-change',
        this.currentActive,
        this.items[this.currentActive].value
      )
    },
    verifyActive() {
      this.currentActive = Math.max(
        0,
        Math.min(this.currentActive, this.items.length - 1)
      )
    },
    refreshScroll() {
      if (this.$refs.scroll) {
        const currentActive = this.currentActive

        let targetXScroll = 0
        let targetYScroll = 0

        if (this.horizontal) {
          targetXScroll = currentActive * this.targetWidth
        } else {
          targetYScroll = currentActive * this.targetHeight
        }

        this.$nextTick(() => {
          this.$refs.scroll.scrollTo(targetXScroll, targetYScroll)
        })
      }
    },
    handlePrev() {
      if (!this.prevDisabled) {
        this.changeActive(this.currentActive - 1)
        this.$emit('on-prev', this.currentActive)
      }
    },
    handleNext() {
      if (!this.nextDisabled) {
        this.changeActive(this.currentActive + 1)
        this.$emit('on-next', this.currentActive)
      }
    }
  }
}
</script>
