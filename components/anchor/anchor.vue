<template>
  <div
    :class="{
      [prefix]: true,
      [`${prefix}--no-marker`]: !marker
    }"
  >
    <ul :class="`${prefix}__list`">
      <slot></slot>
    </ul>
    <transition :name="transitionName">
      <div
        v-if="marker && currentActive"
        :class="`${prefix}__marker`"
        :style="{ top: `${markerTop}px` }"
      >
        <slot name="marker">
          <div :class="`${prefix}__pointer`"></div>
        </slot>
      </div>
    </transition>
  </div>
</template>

<script>
import { config, useConfigurableProps } from '@/config/properties'
import { findComponentsDownward, animateScrollTo } from '@/utils/common'

const prefix = config.defaults.prefixCls

const props = useConfigurableProps({
  active: {
    type: String,
    default: ''
  },
  viewer: {
    type: [String, Object, Function],
    default: null
  },
  offset: {
    type: Number,
    default: 8
  },
  marker: {
    type: Boolean,
    default: false
  },
  scrollDuration: {
    type: Number,
    default: 500
  }
})

export const baseIndentWidth = 14 // px

export default {
  name: 'Anchor',
  model: {
    prop: 'active',
    event: 'on-change'
  },
  provide() {
    return { anchor: this }
  },
  props,
  emits: ['on-change'],
  data() {
    return {
      prefix: `${prefix}-anchor`,
      items: [],
      container: null,
      animating: false,
      currentActive: this.active,
      markerTop: 0,
      transitionName: `${prefix}-fade`,
      isRaw: true
    }
  },
  watch: {
    active(value) {
      this.currentActive = value
    },
    currentActive(value) {
      this.handleChangeLink(value)
    },
    viewer() {
      this.updateContainer()
    }
  },
  mounted() {
    this.updateContainer()
    this.$nextTick(() => {
      if (!this.currentActive) {
        this.computeCurrentLink()
      }

      this.handleChangeLink(this.currentActive)
      this.computeMarkerPoisiton()
    })
  },
  beforeDestroy() {
    this.removeListener()
  },
  methods: {
    updateContainer() {
      this.removeListener()
      this.$nextTick(() => {
        const viewer = this.viewer

        let container

        if (typeof viewer === 'string') {
          if (['window', 'document', 'body'].includes(viewer)) {
            container = document
          } else if (viewer === 'root') {
            container = this.$root
          } else {
            container = document.querySelector(viewer)
          }
        } else if (typeof viewer === 'function') {
          container = viewer()
        } else if (viewer instanceof Element) {
          container = viewer
        }

        if (container instanceof Element) {
          this.isRaw = true
        } else {
          this.isRaw = false
          // container = this.$parent
        }

        if (!this.isRaw) {
          container = this.$parent

          if (typeof viewer !== 'function' || !container) {
            container = this.$parent
          }

          while (container) {
            if (container.$options.name === 'Scroll') {
              this.scroller = container
              break
            }

            if (container.$refs?.scroll) {
              this.scroller = container.$refs.scroll
              break
            }

            container = container.$parent
          }

          if (this.scroller) {
            this.container = this.scroller.$el

            this.scroller.$on('on-scroll', this.handleContainerScroll)
          } else {
            this.isRaw = true
            this.container = container.$el

            this.container.addEventListener(
              'scroll',
              this.handleContainerScroll
            )
          }
        } else {
          // container.addEventListener('scroll', this.handleContainerScroll)

          this.container = container
        }
      })
    },
    computeCurrentLink(scrollTop) {
      const items = findComponentsDownward(this, 'AnchorLink')

      if (!items.length) return

      const containerTop = this.container.offsetTop
      const offsetList = []

      let offset = scrollTop + this.offset

      if (this.isRaw) {
        offset += containerTop
      }

      items.forEach(item => {
        const id = item.to

        if (!id.startsWith('#')) return

        const element = document.querySelector(id)

        if (element) {
          offsetList.push({
            link: id,
            offset: element.offsetTop
          })
        }
      })

      offsetList.push({
        link: '',
        offset: Infinity
      })

      offsetList.reverse()

      let i = offsetList.length
      let currentLink = ''

      while (--i) {
        const current = offsetList[i]
        const next = offsetList[i - 1]

        if (current.offset <= offset && next.offset > offset) {
          currentLink = current.link

          break
        }
      }

      if (this.currentActive !== currentLink) {
        this.$nextTick(() => {
          this.$emit('on-change', this.currentActive)
        })
      }

      this.currentActive = currentLink
    },
    handleContainerScroll(event) {
      if (this.animating) return

      const scrollTop = this.isRaw ? event.target.scrollTop : event.clientY

      this.computeCurrentLink(scrollTop)
      this.computeMarkerPoisiton()
    },
    removeListener() {
      if (this.scroller) {
        this.scroller?.$off('on-scroll', this.handleContainerScroll)
      }

      if (this.container) {
        this.container.removeEventListener('scroll', this.handleContainerScroll)
      }
    },
    handleChangeLink(link) {
      if (
        link === this.currentActive ||
        !link.startsWith('#') ||
        link.length < 2
      ) {
        return
      }

      const element = document.querySelector(link)

      if (!element) return

      const elementTop = element.offsetTop
      const duration = Math.max(this.scrollDuration, 160)

      if (this.isRaw) {
        const containerTop = this.container.offsetTop
        const from = this.container.scrollTop
        const to = elementTop - containerTop - this.offset

        animateScrollTo(this.container, from, to, duration, () => {
          this.animating = false
        })
      } else {
        const [min, max] = this.scroller.getYScrollLimit()
        const clientY = Math.max(Math.min(elementTop - this.offset, max), min)

        this.scroller.scrollTo(0, clientY, duration)

        setTimeout(() => {
          this.animating = false
        }, duration + 10)

        this.computeCurrentLink(clientY)
        this.computeMarkerPoisiton()
      }
    },
    computeMarkerPoisiton() {
      const currentItem = this.items.find(
        item => item.to && item.to === this.currentActive
      )

      if (currentItem && currentItem.$refs.link) {
        const linkRect = currentItem.$refs.link.getBoundingClientRect()
        const wrapperTop = this.$el.getBoundingClientRect().top

        this.markerTop = linkRect.top - wrapperTop + linkRect.height / 2
      }
    }
  }
}
</script>
