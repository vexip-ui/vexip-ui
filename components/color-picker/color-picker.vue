<template>
  <div ref="wrapper" :class="className" @clickoutside="handleClickOutside">
    <div
      ref="reference"
      :class="[nh.be('trigger'), currentVisible ? nh.bem('trigger', 'visible') : '']"
      @click="handleTriggerClick"
    >
      <slot
        name="control"
        :color="rgb"
        :alpha="currentAlpha"
        :empty="isEmpty"
      >
        <div :class="nh.be('control')">
          <div :class="nh.be('marker')">
            <Icon v-if="!currentVisible && isEmpty">
              <Xmark></Xmark>
            </Icon>
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
          <div :class="nh.be('arrow')">
            <Icon><ChevronDown></ChevronDown></Icon>
          </div>
        </div>
      </slot>
    </div>
    <Portal :to="transferTo">
      <transition :name="props.transitionName">
        <div v-show="currentVisible" ref="popper" :class="[nh.be('popper'), nh.bs('vars')]">
          <div :class="nh.be('pane')">
            <div :class="nh.be('section')">
              <ColorPalette
                :hue="currentValue.h"
                :saturation="currentValue.s"
                :value="currentValue.v"
                @edit-start="toggleEditing(true)"
                @edit-end="toggleEditing(false)"
                @change="handlePaletteChange"
              ></ColorPalette>
              <ColorHue
                :hue="currentValue.h"
                @edit-start="toggleEditing(true)"
                @edit-end="toggleEditing(false)"
                @change="handleHueChange"
              ></ColorHue>
              <ColorAlpha
                v-if="props.alpha"
                :rgb="rgb"
                :alpha="currentAlpha"
                @edit-start="toggleEditing(true)"
                @edit-end="toggleEditing(false)"
                @change="handleAlphaChange"
              ></ColorAlpha>
              <div v-if="props.shortcut" :class="nh.be('shortcuts')">
                <div
                  v-for="(item, index) in props.shortcutList"
                  :key="index"
                  :class="nh.be('shortcut-item')"
                  :style="{ backgroundColor: item }"
                  @click="handleShortcutClick(item)"
                ></div>
              </div>
            </div>
            <div :class="nh.be('action')">
              <Input
                v-if="!props.noInput"
                size="small"
                :value="hex.toUpperCase()"
                :respond="false"
                @change="handleInputColor"
              ></Input>
              <Button
                v-if="props.clearable"
                text
                size="small"
                @click="handleClear"
              >
                {{ props.cancelText || locale.cancel }}
              </Button>
              <Button type="primary" size="small" @click="handleOk">
                {{ props.confirmText || locale.confirm }}
              </Button>
            </div>
          </div>
        </div>
      </transition>
    </Portal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRef, computed, watch, inject, nextTick } from 'vue'
import { Button } from '@/components/button'
import { Icon } from '@/components/icon'
import { Input } from '@/components/input'
import { Portal } from '@/components/portal'
import ColorAlpha from './color-alpha.vue'
import ColorHue from './color-hue.vue'
import ColorPalette from './color-palette.vue'
import { VALIDATE_FIELD, CLEAR_FIELD } from '@/components/form-item'
import { usePopper, placementWhileList, useClickOutside } from '@vexip-ui/mixins'
import {
  useNameHelper,
  useProps,
  useLocale,
  booleanProp,
  booleanStringProp,
  sizeProp,
  stateProp,
  createSizeProp,
  createStateProp
} from '@vexip-ui/config'
import {
  noop,
  toFixed,
  parseColorToRgba,
  rgbToHsv,
  hsvToRgb,
  rgbToHex,
  hsvToHsl,
  rgbaToHex
} from '@vexip-ui/utils'
import { Xmark, ChevronDown } from '@vexip-ui/icons'

import type { PropType } from 'vue'
import type { Placement } from '@vexip-ui/mixins'
import type { Color, HSVColor, HSVAColor, RGBAColor, HSLAColor } from '@vexip-ui/utils'

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

export default defineComponent({
  name: 'ColorPicker',
  components: {
    Button,
    ColorAlpha,
    ColorHue,
    ColorPalette,
    Icon,
    Input,
    Portal,
    Xmark,
    ChevronDown
  },
  props: {
    size: sizeProp,
    state: stateProp,
    value: [String, Object] as PropType<Color | null>,
    visible: booleanProp,
    format: String as PropType<ColorFormat>,
    alpha: booleanProp,
    disabled: booleanProp,
    transitionName: String,
    noInput: booleanProp,
    shortcut: booleanProp,
    shortcutList: Array as PropType<string[]>,
    placement: String as PropType<Placement>,
    transfer: booleanStringProp,
    outsideClose: booleanProp,
    clearable: booleanProp,
    disableValidate: booleanProp,
    cancelText: String,
    confirmText: String
  },
  emits: [
    'toggle',
    'click-outside',
    'outside-close',
    'clear',
    'change',
    'shortcut',
    'update:value',
    'update:visible'
  ],
  setup(_props, { emit }) {
    const props = useProps('colorPicker', _props, {
      size: createSizeProp(),
      state: createStateProp(),
      value: {
        default: '#339af0',
        static: true
      },
      visible: false,
      format: {
        default: 'rgb' as ColorFormat,
        validator: (value: ColorFormat) => {
          return ['rgb', 'hsl', 'hsv', 'hex'].includes(value)
        }
      },
      alpha: false,
      disabled: false,
      transitionName: 'vxp-drop',
      noInput: false,
      shortcut: false,
      shortcutList: () => Array.from(defaultShotcuts),
      placement: {
        default: 'bottom',
        validator: (value: Placement) => placementWhileList.includes(value)
      },
      transfer: false,
      outsideClose: true,
      clearable: false,
      disableValidate: false,
      cancelText: null,
      confirmText: null
    })

    const validateField = inject(VALIDATE_FIELD, noop)
    const clearField = inject(CLEAR_FIELD, noop)

    const nh = useNameHelper('color-picker')
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
        [nh.b()]: true,
        'vxp-input-vars': true,
        [nh.bs('vars')]: true,
        [nh.bm('empty')]: isEmpty.value && !currentVisible.value,
        [nh.bm('focused')]: currentVisible.value,
        [nh.bm('disabled')]: props.disabled,
        [nh.bm('alpha')]: props.alpha,
        [nh.bm(props.size)]: props.size !== 'default',
        [nh.bm(props.state)]: props.state !== 'default'
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
      emit('toggle', value)
      emit('update:visible', value)
    })
    watch(() => props.value, value => {
      parseValue(value)
      lastValue.value = { ...currentValue.value, a: currentAlpha.value, format: 'hsva' }
    })

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
        emit('click-outside')

        if (props.outsideClose && currentVisible.value) {
          currentVisible.value = false

          emit('outside-close')
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
          emit('clear')
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

      emit('change', formattedColor)
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

      emit('shortcut', getForamttedColor())
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
      props,
      nh,
      locale: useLocale('colorPicker'),
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
