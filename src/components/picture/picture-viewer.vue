<template>
  <Masker
    v-model="currentActive"
    :class="prefix"
    :transition-name="transitionName"
    :closable="false"
    @on-hidden="handleHidden"
  >
    <template #default="{show}">
      <div v-show="show" :class="wrapperClass">
        <Carousel
          v-if="list.length > 1"
          ref="carousel"
          v-model="currentItem"
          arrow="insert"
          pointer="none"
          arrow-show="always"
          :size="1"
          :loop="loop"
          :speed="800"
          @on-will-change="handleWillChange"
        >
          <CarouselItem
            v-for="(item, index) in list"
            :key="index"
            :style="{
              width: `${width}px`,
              height: `${height}px`
            }"
          >
            <Picture
              ref="picture"
              fit="none"
              :src="item"
              :style="pictureStyle"
              @mousedown.native="handleMouseDown"
            ></Picture>
          </CarouselItem>
        </Carousel>
        <div v-else :class="`${prefix}__single-wrapper`">
          <Picture
            v-if="list.length"
            ref="picture"
            fit="none"
            :src="list[0]"
            :style="pictureStyle"
            @mousedown.native="handleMouseDown"
          ></Picture>
        </div>
        <div :class="`${prefix}__close`" @click="handleClose">
          <Icon name="times-circle" :scale="1.3 * actionScale"></Icon>
        </div>
        <div :class="`${prefix}__actions`">
          <div
            :class="actionClass"
            :title="label.zoomIn"
            @click="zoomIn"
          >
            <Icon name="search-plus" :scale="actionScale"></Icon>
          </div>
          <div
            :class="actionClass"
            :title="label.zoomOut"
            @click="zoomOut"
          >
            <Icon name="search-minus" :scale="actionScale"></Icon>
          </div>
          <div
            :class="actionClass"
            :title="label.refresh"
            @click="resetTransform"
          >
            <div :class="`${prefix}__refresh`">
              1:1
            </div>
          </div>
          <div
            :class="actionClass"
            :title="label.rotateLeft"
            @click="rotateLeft"
          >
            <Icon name="undo" :scale="0.9 * actionScale"></Icon>
          </div>
          <div
            :class="actionClass"
            :title="label.rotateRight"
            @click="rotateRight"
          >
            <Icon name="redo" :scale="0.9 * actionScale"></Icon>
          </div>
        </div>
      </div>
    </template>
  </Masker>
</template>

<script>
import Carousel from '../carousel'
import CarouselItem from '../carousel/carousel-item'
import Icon from '../icon'
import Masker from '../masker'
import Picture from './picture'

import 'vue-awesome/icons/times-circle'
import 'vue-awesome/icons/search-plus'
import 'vue-awesome/icons/search-minus'
import 'vue-awesome/icons/undo'
import 'vue-awesome/icons/redo'

const { prefix } = require('../../style/basis/variable')

export default {
  name: 'PictureViewer',
  components: {
    Carousel,
    CarouselItem,
    Icon,
    Masker,
    Picture
  },
  model: {
    prop: 'active',
    event: 'on-toggle'
  },
  props: {
    active: {
      type: Boolean,
      default: false
    },
    viewerClass: {
      type: [String, Array, Object],
      default: null
    },
    list: {
      type: Array,
      default() {
        return []
      }
    },
    loop: {
      type: Boolean,
      default: true
    },
    actionSize: {
      default: 'default',
      validator(value) {
        return ['small', 'default', 'large'].includes(value)
      }
    },
    openReset: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefix: `${prefix}-picture-viewer`,
      transitionName: `${prefix}-ease`,
      currentActive: this.active,
      width: window.innerWidth,
      height: window.innerHeight,
      scale: 1,
      rotate: 0,
      transition: true,
      offsetX: 0,
      offsetY: 0,
      rotateTimer: null,
      currentItem: 0,
      changing: false,
      xStartAt: 0,
      yStartAt: 0,
      xCursorAt: 0,
      yCursorAt: 0,
      label: {
        zoomIn: '放大',
        zoomOut: '缩小',
        refresh: '还原',
        rotateLeft: '逆时针旋转',
        rotateRight: '顺时针旋转'
      }
    }
  },
  computed: {
    wrapperClass() {
      const { prefix, viewerClass } = this

      return [`${prefix}__wrapper`, viewerClass]
    },
    actionScale() {
      const size = this.actionSize

      return size === 'samll' ? 1.5 : size === 'large' ? 2.5 : 2
    },
    actionClass() {
      const { prefix, actionSize } = this

      return {
        [`${prefix}__action`]: true,
        [`${prefix}__action--${actionSize}`]: actionSize !== 'defalut'
      }
    },
    pictureStyle() {
      const { scale, rotate, offsetX, offsetY, transition } = this

      return {
        transform: `translate3d(${offsetX}px, ${offsetY}px, 0) scale(${scale}) rotate(${rotate}deg)`,
        transition: transition ? 'transform 300ms' : ''
      }
    }
  },
  watch: {
    active(value) {
      this.toggleActive(value)
    },
    currentActive(value) {
      this.$emit('on-toggle', value)

      if (value) {
        this.changing = false
        this.$nextTick(() => {
          this.$refs.carousel && this.$refs.carousel.refresh()
        })
      }
    },
    currentItem(value) {
      this.changing = false
      this.$emit('on-change', value)
    }
  },
  methods: {
    toggleActive(value) {
      this.currentActive = value
    },
    handleClose() {
      this.toggleActive(false)
      this.$emit('on-close')
    },
    handleHidden() {
      this.$nextTick(() => {
        if (this.openReset) {
          this.currentItem = 0
          this.resetTransform()
        }

        this.$emit('on-hidden')
      })
    },
    zoomIn() {
      if (!this.changing) {
        this.scale += 0.15
      }
    },
    zoomOut() {
      if (!this.changing) {
        this.scale -= 0.15
      }
    },
    rotateLeft() {
      if (!this.changing) {
        this.rotate -= 90
      }
    },
    rotateRight() {
      if (!this.changing) {
        this.rotate += 90
      }
    },
    handleWillChange() {
      this.changing = true
      this.resetTransform()
    },
    resetTransform() {
      this.transition = false
      this.rotate = this.rotate % 360

      setTimeout(() => {
        this.transition = true
        this.scale = 1
        this.rotate = 0
        this.offsetX = 0
        this.offsetY = 0
      }, 0)
    },
    handleMouseDown(event) {
      const currentPicture = this.$refs.picture[this.currentItem]

      if ((currentPicture && currentPicture.loading) || this.changing) {
        return false
      }

      this.transition = false
      this.xStartAt = this.offsetX
      this.yStartAt = this.offsetY
      this.xCursorAt = event.clientX
      this.yCursorAt = event.clientY

      document.addEventListener('mousemove', this.handleMouseMove)
      document.addEventListener('mouseup', this.handleMouseUp)
    },
    handleMouseMove({ clientX, clientY }) {
      this.offsetX = this.xStartAt + clientX - this.xCursorAt
      this.offsetY = this.yStartAt + clientY - this.yCursorAt
    },
    handleMouseUp() {
      document.removeEventListener('mousemove', this.handleMouseMove)
      document.removeEventListener('mouseup', this.handleMouseUp)

      this.transition = true
    }
  }
}
</script>
