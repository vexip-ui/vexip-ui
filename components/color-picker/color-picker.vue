<template>
  <div :class="className" @clickoutside="handleClickOutside">
    <div
      ref="reference"
      :class="[
        `${prefix}__trigger`,
        currentVisible ? `${prefix}__trigger--visible` : ''
      ]"
      @click="handleTriggerClick"
    >
      <slot
        name="control"
        :color="rgb"
        :alpha="currentAlpha"
        :empty="isEmpty"
      >
        <div :class="`${prefix}__control`">
          <div :class="`${prefix}__marker`">
            <Icon v-if="!currentVisible && isEmpty" name="times"></Icon>
            <div
              v-else
              :style="{
                width: '100%',
                height: '100%',
                backgroundColor: `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, ${
                  currentVisible ? currentAlpha : lastValue.a
                })`
              }"
            ></div>
          </div>
          <div :class="`${prefix}__arrow`">
            <Icon name="chevron-down" :scale="0.8"></Icon>
          </div>
        </div>
      </slot>
    </div>
    <transition :name="transitionName">
      <div
        v-show="currentVisible"
        ref="popper"
        :class="`${prefix}__popper`"
      >
        <div :class="`${prefix}__pane`">
          <div :class="`${prefix}__section`">
            <ColorPalette
              :hue="currentValue.h"
              :saturation="currentValue.s"
              :value="currentValue.v"
              @on-edit-start="toggleEditing(true)"
              @on-edit-end="toggleEditing(false)"
              @on-change="handlePaletteChange"
            ></ColorPalette>
            <ColorHue
              :hue="currentValue.h"
              @on-edit-start="toggleEditing(true)"
              @on-edit-end="toggleEditing(false)"
              @on-change="handleHueChange"
            ></ColorHue>
            <ColorAlpha
              v-if="alpha"
              :rgb="rgb"
              :alpha="currentAlpha"
              @on-edit-start="toggleEditing(true)"
              @on-edit-end="toggleEditing(false)"
              @on-change="handleAlphaChange"
            ></ColorAlpha>
            <div v-if="shortcut" :class="`${prefix}__shortcuts`">
              <div
                v-for="(item, index) in shortcutList"
                :key="index"
                :class="`${prefix}__shortcut-item`"
                :style="{ backgroundColor: item }"
                @click="handleShortcutClick(item)"
              ></div>
            </div>
          </div>
          <div :class="`${prefix}__action`">
            <Input
              v-if="!noInput"
              size="small"
              :value="hex.toUpperCase()"
              :respond="false"
              @on-change="handleInputColor"
            ></Input>
            <Button
              type="text"
              size="small"
              @on-click="handleClear"
            >
              重置
            </Button>
            <Button
              type="primary"
              size="small"
              @on-click="handleOk"
            >
              确定
            </Button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import Button from '../button'
import ColorAlpha from './color-alpha'
import ColorHue from './color-hue'
import ColorPalette from './color-palette'
import Icon from '../icon'
import Input from '../input'

import { usePopper } from '../../src/mixins/popper'
import { useConfigurableProps } from '../../src/config/properties'
import { CLICK_OUTSIDE, observe, disconnect } from '../../src/utils/event'
import { noop, multipleFixed } from '../../src/utils/common'
import {
  parseColorToRgb,
  rgbToHsv,
  hsvToRgb,
  rgbToHex,
  hsvToHsl,
  rgbaToHex
} from '../../src/utils/color'

import '../../icons/chevron-down'

const { prefix } = require('../../src/style/basis/variable')

const getDefaultHsv = () => rgbToHsv(0, 0, 0)
const fixed = number => multipleFixed(number, 1, 2)

const defaultShotcuts = [
  '#2d8cf0',
  '#19be6b',
  '#ff9900',
  '#ed4014',
  '#00b5ff',
  '#19c919',
  '#f9e31c',
  '#ea1a1a',
  '#9b1dea',
  '#00c2b1',
  '#ac7a33',
  '#1d35ea',
  '#8bc34a',
  '#f16b62',
  '#ea4ca3',
  '#0d94aa',
  '#febd79',
  '#5d4037',
  '#00bcd4',
  '#f06292',
  '#cddc39',
  '#607d8b',
  '#000000',
  '#ffffff'
]

const props = useConfigurableProps({
  size: {
    default: 'default',
    validator(value) {
      return ['small', 'default', 'large'].includes(value)
    }
  },
  value: {
    type: [String, Object],
    default: '#339af0'
  },
  visible: {
    type: Boolean,
    default: false
  },
  format: {
    default: 'rgb',
    validator(value) {
      return ['rgb', 'hsl', 'hsv', 'hex'].includes(value)
    }
  },
  alpha: {
    type: Boolean,
    default: false
  },
  disabled: {
    type: Boolean,
    default: false
  },
  transitionName: {
    type: String,
    default: `${prefix}-drop`
  },
  noInput: {
    type: Boolean,
    default: false
  },
  shortcut: {
    type: Boolean,
    default: false
  },
  shortcutList: {
    type: Array,
    default() {
      return Array.from(defaultShotcuts)
    }
  },
  disableValidate: {
    type: Boolean,
    default: false
  }
})

export default {
  name: 'ColorPicker',
  components: {
    Button,
    ColorAlpha,
    ColorHue,
    ColorPalette,
    Icon,
    Input
  },
  mixins: [usePopper({ isDrop: true })],
  model: {
    event: 'on-change'
  },
  inject: {
    validateField: { default: () => noop }
  },
  props,
  emits: [
    'on-toggle',
    'on-outside-close',
    'on-clear',
    'on-change',
    'on-shortcut',
    'update:value'
  ],
  data() {
    let isEmpty = true
    let currentValue = getDefaultHsv()
    let currentAlpha = 1

    if (this.value) {
      const { r, g, b, a } = parseColorToRgb(this.value)

      isEmpty = false
      currentValue = rgbToHsv(r, g, b)
      currentAlpha = a || 1
    }

    return {
      prefix: `${prefix}-color-picker`,
      currentVisible: this.visible,
      lastValue: { ...currentValue, a: currentAlpha },
      isEmpty,
      currentValue,
      currentAlpha,
      editing: false
    }
  },
  computed: {
    className() {
      const { prefix, currentVisible, disabled, alpha, isEmpty, size } = this

      return {
        [prefix]: true,
        [`${prefix}--empty`]: isEmpty,
        [`${prefix}--visible`]: currentVisible,
        [`${prefix}--disabled`]: disabled,
        [`${prefix}--alpha`]: alpha,
        [`${prefix}--${size}`]: size !== 'default'
      }
    },
    rgb() {
      const { currentVisible, currentValue, lastValue } = this
      const { h, s, v } = currentVisible ? currentValue : lastValue

      return hsvToRgb(h, s, v)
    },
    hex() {
      const { r, g, b } = this.rgb

      if (this.alpha) {
        return rgbaToHex(r, g, b, this.currentAlpha)
      }

      return rgbToHex(r, g, b)
    }
  },
  watch: {
    visible(value) {
      this.currentVisible = value
    },
    currentVisible(value) {
      this.updatePopper()
      this.$emit('on-toggle', value)

      if (value && !this.isEmpty) {
        const { a, ...hsv } = this.lastValue

        this.currentValue = hsv
        this.currentAlpha = a || 1
      }
    },
    value(value) {
      if (!value) {
        this.$nextTick(() => {
          this.isEmpty = true
        })
      }

      const { r, g, b, a } = parseColorToRgb(value)

      this.currentValue = rgbToHsv(r, g, b)
      this.currentAlpha = a || 1
    }
  },
  mounted() {
    observe(this.$el, CLICK_OUTSIDE)
    this.$nextTick(() => {
      this.createPopper()
    })
  },
  beforeDestroy() {
    disconnect(this.$el, CLICK_OUTSIDE)
  },
  methods: {
    toggleVisible(able = !this.currentVisible) {
      this.currentVisible = able
    },
    handleClickOutside() {
      if (!this.editing) {
        this.toggleVisible(false)
        this.$emit('on-outside-close')
      }
    },
    handleTriggerClick() {
      if (this.disabled) return

      this.toggleVisible()
    },
    handleClear() {
      this.currentVisible = false

      this.$nextTick(() => {
        this.isEmpty = true
        this.$emit('on-clear')
      })
    },
    handleOk() {
      this.lastValue = {
        ...this.currentValue,
        a: this.currentAlpha
      }

      this.isEmpty = false
      this.currentVisible = false
      this.handleChange()
    },
    getForamttedColor() {
      const { format, currentValue, currentAlpha, rgb, alpha } = this

      let color

      if (format === 'hex') {
        const { r, g, b } = rgb

        if (alpha) {
          color = rgbaToHex(r, g, b, currentAlpha)
        } else {
          color = rgbToHex(r, g, b)
        }
      } else {
        switch (format) {
          case 'rgb': {
            color = { ...rgb }
            break
          }
          case 'hsl': {
            const { h, s, v } = currentValue

            color = hsvToHsl(h, s, v)

            break
          }
          default: {
            color = { ...currentValue }
          }
        }

        for (const unit in color) {
          color[unit] = fixed(color[unit])
        }

        if (alpha) {
          color.a = fixed(currentAlpha)
        }
      }

      return color
    },
    handleChange() {
      this.$emit('on-change', this.getForamttedColor())

      if (!this.disableValidate) {
        this.validateField()
      }
    },
    handlePaletteChange({ s, v }) {
      this.currentValue.s = s
      this.currentValue.v = v
    },
    handleHueChange(hue) {
      this.currentValue.h = hue
    },
    handleAlphaChange(alpha) {
      this.currentAlpha = alpha
    },
    handleInputColor(value) {
      const { r, g, b, a } = parseColorToRgb(value)

      this.currentValue = rgbToHsv(r, g, b)
      this.currentAlpha = a || 1
    },
    handleShortcutClick(color) {
      const { r, g, b, a } = parseColorToRgb(color)

      this.currentValue = rgbToHsv(r, g, b)
      this.currentAlpha = a || 1

      this.$emit('on-shortcut', { r, g, b, a })
    },
    toggleEditing(able) {
      if (!able) {
        setTimeout(() => {
          this.editing = false
        }, 0)
      } else {
        this.editing = true
      }
    }
  }
}
</script>
