<template>
  <div ref="wrapper" :class="className" @clickoutside="handleClickOutside">
    <div
      ref="reference"
      :class="[`${prefix}__trigger`, currentVisible ? `${prefix}__trigger--visible` : '']"
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
            <Icon name="chevron-down"></Icon>
          </div>
        </div>
      </slot>
    </div>
    <transition :name="transitionName">
      <div v-show="currentVisible" ref="popper" :class="`${prefix}__popper`">
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
              v-if="clearable"
              type="text"
              size="small"
              @on-click="handleClear"
            >
              重置
            </Button>
            <Button type="primary" size="small" @on-click="handleOk">
              确定
            </Button>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRef, computed, watch, inject, nextTick } from 'vue'
import { Button } from '@/components/button'
import { Icon } from '@/components/icon'
import { Input } from '@/components/input'
import ColorAlpha from './color-alpha.vue'
import ColorHue from './color-hue.vue'
import ColorPalette from './color-palette.vue'
import { VALIDATE_FIELD, CLEAR_FIELD } from '@/components/form-item'
import { usePopper, placementWhileList } from '@/common/mixins/popper'
import { useClickOutside } from '@/common/mixins/clickoutside'
import { useConfiguredProps } from '@/common/config/install'
import { noop } from '@/common/utils/common'
import { toFixed } from '@/common/utils/number'
import {
  parseColorToRgba,
  rgbToHsv,
  hsvToRgb,
  rgbToHex,
  hsvToHsl,
  rgbaToHex
} from '@/common/utils/color'
import { createSizeProp, createStateProp } from '@/common/config/props'

import '@/common/icons/times'
import '@/common/icons/chevron-down'

import type { PropType } from 'vue'
import type { Placement } from '@popperjs/core'
import type { Color, HSVColor, HSVAColor, RGBAColor, HSLAColor } from '@/common/utils/color'

export type ColorFormat = 'rgb' | 'hsl' | 'hsv' | 'hex'

const getDefaultHsv = () => rgbToHsv(0, 0, 0)

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

const props = useConfiguredProps('colorPicker', {
  size: createSizeProp(),
  state: createStateProp(),
  value: {
    type: [String, Object] as PropType<Color | null>,
    default: '#339af0'
  },
  visible: {
    type: Boolean,
    default: false
  },
  format: {
    default: 'rgb' as ColorFormat,
    validator(value: ColorFormat) {
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
    default: 'vxp-drop'
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
    type: Array as PropType<string[]>,
    default() {
      return Array.from(defaultShotcuts)
    }
  },
  placement: {
    type: String as PropType<Placement>,
    default: 'bottom',
    validator(value: Placement) {
      return placementWhileList.includes(value)
    }
  },
  transfer: {
    type: [Boolean, String],
    default: false
  },
  outsideClose: {
    type: Boolean,
    default: true
  },
  clearable: {
    type: Boolean,
    default: false
  },
  disableValidate: {
    type: Boolean,
    default: false
  }
})

export default defineComponent({
  name: 'ColorPicker',
  components: {
    Button,
    ColorAlpha,
    ColorHue,
    ColorPalette,
    Icon,
    Input
  },
  props,
  emits: [
    'on-toggle',
    'on-click-outside',
    'on-outside-close',
    'on-clear',
    'on-change',
    'on-shortcut',
    'update:value',
    'update:visible'
  ],
  setup(props, { emit }) {
    const validateField = inject(VALIDATE_FIELD, noop)
    const clearField = inject(CLEAR_FIELD, noop)

    const prefix = 'vxp-color-picker'
    const isEmpty = ref(true)
    const currentVisible = ref(props.visible)
    const currentValue = ref<HSVColor>(null!)
    const currentAlpha = ref(1)
    const editing = ref(false)
    const placement = toRef(props, 'placement')
    const transfer = toRef(props, 'transfer')

    parseValue(props.value)

    const wrapper = useClickOutside()

    const { reference, popper, transferTo, updatePopper } = usePopper({
      placement,
      transfer,
      wrapper,
      isDrop: true
    })

    const lastValue = ref<HSVAColor>({
      ...currentValue.value,
      a: currentAlpha.value,
      format: 'hsva'
    })

    const className = computed(() => {
      return {
        [prefix]: true,
        [`${prefix}--empty`]: isEmpty.value && !currentVisible.value,
        [`${prefix}--visible`]: currentVisible.value,
        [`${prefix}--disabled`]: props.disabled,
        [`${prefix}--alpha`]: props.alpha,
        [`${prefix}--${props.size}`]: props.size !== 'default',
        [`${prefix}--${props.state}`]: props.state !== 'default'
      }
    })
    const rgb = computed(() => {
      const { h, s, v } =
        currentValue.value && currentVisible.value
          ? currentValue.value
          : lastValue.value ?? { h: 0, s: 0, v: 0 }

      return hsvToRgb(h, s, v)
    })
    const hex = computed(() => {
      const { r, g, b } = rgb.value

      if (props.alpha) {
        return rgbaToHex(r, g, b, currentAlpha.value)
      }

      return rgbToHex(r, g, b)
    })

    watch(
      () => props.visible,
      value => {
        currentVisible.value = value
      }
    )
    watch(currentVisible, value => {
      value && updatePopper()
      emit('on-toggle', value)
      emit('update:visible', value)
    })
    watch(() => props.value, parseValue)

    function parseValue(value: Color | null) {
      if (value) {
        const { r, g, b, a } = parseColorToRgba(value)

        isEmpty.value = false
        currentValue.value = rgbToHsv(r, g, b)
        currentAlpha.value = a
      } else {
        isEmpty.value = true
        currentValue.value = getDefaultHsv()
        currentAlpha.value = 1
      }
    }

    function handleClickOutside() {
      if (!editing.value) {
        emit('on-click-outside')

        if (props.outsideClose && currentVisible.value) {
          currentVisible.value = false

          emit('on-outside-close')
        }
      }
    }

    function handleTriggerClick() {
      if (props.disabled) return

      currentVisible.value = !currentVisible.value
    }

    function handleClear() {
      if (props.clearable) {
        currentVisible.value = false

        nextTick(() => {
          parseValue(null)
          clearField()
          emit('on-clear')
        })
      }
    }

    function handleOk() {
      lastValue.value = { ...currentValue.value, a: currentAlpha.value, format: 'hsva' }
      isEmpty.value = false
      currentVisible.value = false
      handleChange()
    }

    function getForamttedColor() {
      let color: Color

      if (props.format === 'hex') {
        const { r, g, b } = rgb.value

        if (props.alpha) {
          color = rgbaToHex(r, g, b, currentAlpha.value)
        } else {
          color = rgbToHex(r, g, b)
        }
      } else {
        switch (props.format) {
          case 'rgb': {
            color = { ...rgb.value } as RGBAColor
            color.r = Math.round(color.r)
            color.g = Math.round(color.g)
            color.b = Math.round(color.b)

            break
          }
          case 'hsl': {
            const { h, s, v } = currentValue.value

            color = hsvToHsl(h, s, v) as HSLAColor
            color.h = Math.round(color.h)
            color.s = toFixed(color.s, 3)
            color.l = toFixed(color.l, 3)

            break
          }
          default: {
            color = { ...currentValue.value } as HSVAColor
            color.h = Math.round(color.h)
            color.s = toFixed(color.s, 3)
            color.v = toFixed(color.v, 3)
          }
        }

        color.a = toFixed(currentAlpha.value, 3)
      }

      return color
    }

    function handleChange() {
      const formattedColor = getForamttedColor()

      emit('on-change', formattedColor)
      emit('update:value', formattedColor)

      if (!props.disableValidate) {
        validateField()
      }
    }

    function handlePaletteChange({ s, v }: HSVColor) {
      currentValue.value.s = s
      currentValue.value.v = v
    }

    function handleHueChange(hue: number) {
      currentValue.value.h = hue
    }

    function handleAlphaChange(alpha: number) {
      currentAlpha.value = alpha
    }

    function handleInputColor(value: string) {
      const { r, g, b, a } = parseColorToRgba(value)

      currentValue.value = rgbToHsv(r, g, b)
      currentAlpha.value = a
    }

    function handleShortcutClick(color: string) {
      const { r, g, b, a } = parseColorToRgba(color)

      currentValue.value = rgbToHsv(r, g, b)
      currentAlpha.value = a

      emit('on-shortcut', getForamttedColor())
    }

    function toggleEditing(able: boolean) {
      if (!able) {
        window.setTimeout(() => {
          editing.value = false
        }, 0)
      } else {
        editing.value = true
      }
    }

    return {
      prefix,
      isEmpty,
      currentVisible,
      currentValue,
      currentAlpha,
      transferTo,
      lastValue,

      className,
      rgb,
      hex,

      wrapper,
      reference,
      popper,

      handleClickOutside,
      handleTriggerClick,
      handleClear,
      handleOk,
      handlePaletteChange,
      handleHueChange,
      handleAlphaChange,
      handleInputColor,
      handleShortcutClick,
      toggleEditing
    }
  }
})
</script>
