<template>
  <div
    :id="idFor"
    ref="wrapper"
    :class="className"
    @keydown.tab.stop="handleTabDown"
    @keydown.space="handleSpaceDown"
    @keydown.escape="handleEscDown"
  >
    <div
      ref="reference"
      :class="selectorClass"
      tabindex="0"
      @click="toggleVisible"
    >
      <slot
        name="control"
        :color="rgb"
        :alpha="currentAlpha"
        :empty="isEmpty"
      >
        <div
          v-if="hasPrefix"
          :class="[nh.be('icon'), nh.be('prefix')]"
          :style="{ color: props.prefixColor }"
        >
          <slot name="prefix">
            <Icon :icon="props.prefix"></Icon>
          </slot>
        </div>
        <div :class="nh.be('control')">
          <div :class="nh.be('marker')">
            <Icon v-if="!currentVisible && isEmpty" v-bind="icons.cross"></Icon>
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
        </div>
        <div
          v-if="!props.noSuffix"
          :class="[nh.be('icon'), nh.be('suffix')]"
          :style="{
            color: props.suffixColor,
            opacity: showClear || props.loading ? '0%' : ''
          }"
        >
          <slot name="suffix">
            <Icon
              v-if="props.suffix"
              :icon="props.suffix"
              :class="{
                [nh.be('arrow')]: !props.staticSuffix
              }"
            ></Icon>
            <Icon v-else v-bind="icons.arrowDown" :class="nh.be('arrow')"></Icon>
          </slot>
        </div>
        <div
          v-else-if="props.clearable || props.loading"
          :class="[nh.be('icon'), nh.bem('icon', 'placeholder'), nh.be('suffix')]"
        ></div>
        <transition :name="nh.ns('fade')" appear>
          <div v-if="showClear" :class="[nh.be('icon'), nh.be('clear')]" @click.stop="handleClear">
            <Icon v-bind="icons.clear"></Icon>
          </div>
          <div v-else-if="props.loading" :class="[nh.be('icon'), nh.be('loading')]">
            <Icon
              v-bind="icons.loading"
              :effect="props.loadingEffect || icons.loading.effect"
              :icon="props.loadingIcon || icons.loading.icon"
            ></Icon>
          </div>
        </transition>
      </slot>
    </div>
    <Popper
      ref="popper"
      :class="[nh.be('popper'), nh.bs('vars')]"
      :visible="currentVisible"
      :to="transferTo"
      :transition="props.transitionName"
      @click.stop
      @keydown.tab.stop="handleTabDown"
      @keydown.space="handleSpaceDown"
      @keydown.escape="handleEscDown"
    >
      <div :class="nh.be('panel')">
        <div :class="nh.be('section')">
          <ColorPalette
            ref="palette"
            :hue="currentValue.h"
            :saturation="currentValue.s"
            :value="currentValue.v"
            @edit-start="toggleEditing(true)"
            @edit-end="toggleEditing(false)"
            @change="handlePaletteChange"
          ></ColorPalette>
          <ColorHue
            ref="hue"
            :hue="currentValue.h"
            @edit-start="toggleEditing(true)"
            @edit-end="toggleEditing(false)"
            @change="handleHueChange"
          ></ColorHue>
          <ColorAlpha
            v-if="props.alpha"
            ref="alphaUnit"
            :rgb="rgb"
            :alpha="currentAlpha"
            @edit-start="toggleEditing(true)"
            @edit-end="toggleEditing(false)"
            @change="handleAlphaChange"
          ></ColorAlpha>
          <div
            v-if="props.shortcut"
            ref="shortcutUnit"
            :class="nh.be('shortcuts')"
            tabindex="-1"
            @focus="handleShrtcutsFocus"
            @blur="shortcutsFocused = false"
            @keydown="handleShortcutsKeydown"
          >
            <div
              v-for="(item, index) in shortcutList"
              :key="index"
              :class="{
                [nh.be('shortcut-item')]: true,
                [nh.bem('shortcut-item', 'hitting')]: shortcutsFocused && shortcutHitting === index
              }"
              :style="{ backgroundColor: item }"
              @click="handleShortcutClick(item)"
            ></div>
          </div>
        </div>
        <div :class="nh.be('action')">
          <Input
            v-if="!props.noInput"
            ref="input"
            inherit
            :class="nh.be('input')"
            size="small"
            :value="hex.toUpperCase()"
            :respond="false"
            @change="handleInputColor"
          ></Input>
          <Button
            v-if="props.clearable"
            ref="cancel"
            inherit
            text
            size="small"
            @click="handleClear"
          >
            {{ props.cancelText || locale.cancel }}
          </Button>
          <Button
            ref="confirm"
            inherit
            type="primary"
            size="small"
            @click="handleOk"
          >
            {{ props.confirmText || locale.confirm }}
          </Button>
        </div>
      </div>
    </Popper>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, toRef, computed, watch, nextTick } from 'vue'
import ColorAlpha from './color-alpha.vue'
import ColorHue from './color-hue.vue'
import ColorPalette from './color-palette.vue'
import { Button } from '@/components/button'
import { Icon } from '@/components/icon'
import { Input } from '@/components/input'
import { Popper } from '@/components/popper'
import { useFieldStore } from '@/components/form'
import { usePopper, placementWhileList, useClickOutside, useHover } from '@vexip-ui/hooks'
import {
  useNameHelper,
  useProps,
  useLocale,
  useIcons,
  createSizeProp,
  createStateProp,
  emitEvent
} from '@vexip-ui/config'
import {
  isClient,
  isElement,
  toFixed,
  parseColorToRgba,
  rgbToHsv,
  hsvToRgb,
  rgbToHex,
  hsvToHsl,
  rgbaToHex
} from '@vexip-ui/utils'
import { colorPickerProps } from './props'

import type { PopperExposed } from '@/components/popper'
import type { Color, HSVColor, HSVAColor, RGBAColor, HSLAColor } from '@vexip-ui/utils'

const getDefaultHsv = () => rgbToHsv(0, 0, 0)

const defaultShotcuts = Object.freeze([
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
])

export default defineComponent({
  name: 'ColorPicker',
  components: {
    Button,
    ColorAlpha,
    ColorHue,
    ColorPalette,
    Icon,
    Input,
    Popper
  },
  props: colorPickerProps,
  emits: ['update:value', 'update:visible'],
  setup(_props, { slots, emit }) {
    const {
      idFor,
      state,
      disabled,
      loading,
      size,
      validateField,
      clearField,
      getFieldValue,
      setFieldValue
    } = useFieldStore<Color | null>(() => reference.value?.focus())

    const nh = useNameHelper('color-picker')
    const icons = useIcons()
    const props = useProps('colorPicker', _props, {
      size: createSizeProp(size),
      state: createStateProp(state),
      locale: null,
      value: {
        default: () => getFieldValue('')!,
        static: true
      },
      visible: false,
      format: {
        default: 'rgb',
        validator: value => ['rgb', 'hsl', 'hsv', 'hex'].includes(value)
      },
      alpha: false,
      disabled: () => disabled.value,
      transitionName: () => nh.ns('drop'),
      noInput: false,
      shortcut: false,
      placement: {
        default: 'bottom',
        validator: value => placementWhileList.includes(value)
      },
      transfer: false,
      outsideClose: true,
      clearable: false,
      cancelText: null,
      confirmText: null,
      prefix: null,
      prefixColor: '',
      suffix: null,
      suffixColor: '',
      noSuffix: false,
      staticSuffix: false,
      loading: () => loading.value,
      loadingIcon: null,
      loadingLock: false,
      loadingEffect: null
    })

    const isEmpty = ref(true)
    const currentVisible = ref(props.visible)
    const currentValue = ref<HSVColor>(null!)
    const currentAlpha = ref(1)
    const editing = ref(false)
    const placement = toRef(props, 'placement')
    const transfer = toRef(props, 'transfer')
    const shortcutHitting = ref(0)
    const shortcutsFocused = ref(false)

    parseValue(props.value)

    const palette = ref(null)
    const hue = ref(null)
    const alpha = ref(null)
    const shortcut = ref(null)
    const input = ref(null)
    const cancel = ref(null)
    const confirm = ref(null)

    const wrapper = useClickOutside(handleClickOutside)
    const popper = ref<PopperExposed>()
    const { reference, transferTo, updatePopper } = usePopper({
      placement,
      transfer,
      wrapper,
      popper: computed(() => popper.value?.wrapper),
      isDrop: true
    })
    const { isHover } = useHover(reference)

    const unitList = computed(() => {
      return [
        palette.value,
        hue.value,
        alpha.value,
        shortcut.value,
        input.value,
        cancel.value,
        confirm.value
      ].filter(Boolean) as any[]
    })

    const lastValue = ref<HSVAColor>({
      ...currentValue.value,
      a: currentAlpha.value,
      format: 'hsva'
    })

    const className = computed(() => {
      return {
        [nh.b()]: true,
        [nh.ns('input-vars')]: true,
        [nh.bs('vars')]: true,
        [nh.bm('inherit')]: props.inherit,
        [nh.bm('empty')]: isEmpty.value && !currentVisible.value,
        [nh.bm('focused')]: currentVisible.value,
        [nh.bm('disabled')]: props.disabled,
        [nh.bm('alpha')]: props.alpha,
        [nh.bm(props.size)]: props.size !== 'default',
        [nh.bm(props.state)]: props.state !== 'default'
      }
    })
    const selectorClass = computed(() => {
      const baseCls = nh.be('selector')

      return {
        [baseCls]: true,
        [`${baseCls}--disabled`]: props.disabled,
        [`${baseCls}--loading`]: props.loading && props.loadingLock,
        [`${baseCls}--${props.size}`]: props.size !== 'default',
        [`${baseCls}--focused`]: currentVisible.value,
        [`${baseCls}--${props.state}`]: props.state !== 'default'
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
    const shortcutList = computed(() => {
      if (!props.shortcut) return []

      if (Array.isArray(props.shortcut)) {
        return props.shortcut
      }

      return defaultShotcuts
    })
    const hasPrefix = computed(() => {
      return !!(slots.prefix || props.prefix)
    })
    const showClear = computed(() => {
      return !props.disabled && props.clearable && isHover.value && !isEmpty.value
    })

    watch(
      () => props.visible,
      value => {
        currentVisible.value = value
      }
    )
    watch(currentVisible, value => {
      value && updatePopper()
      emitEvent(props.onToggle, value)
      emit('update:visible', value)
    })
    watch(
      () => props.value,
      value => {
        parseValue(value)
        lastValue.value = { ...currentValue.value, a: currentAlpha.value, format: 'hsva' }
      }
    )
    watch(
      () => props.disabled,
      value => {
        if (value) {
          currentVisible.value = false
        }
      }
    )

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
        emitEvent(props.onClickOutside)

        if (props.outsideClose && currentVisible.value) {
          currentVisible.value = false
          emitEvent(props.onOutsideClose)
        }
      }
    }

    function toggleVisible() {
      if (props.disabled || (props.loading && props.loadingLock)) return

      currentVisible.value = !currentVisible.value
    }

    function handleClear() {
      if (props.clearable) {
        currentVisible.value = false

        nextTick(() => {
          parseValue(null)
          clearField()
          emitEvent(props.onClear)
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

      setFieldValue(formattedColor)
      emitEvent(props.onChange, formattedColor)
      emit('update:value', formattedColor)
      validateField()
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

      emitEvent(props.onShortcut, getForamttedColor())
    }

    function toggleEditing(able: boolean) {
      if (!able) {
        setTimeout(() => {
          editing.value = false
        }, 0)
      } else {
        editing.value = true
      }
    }
    function handleTabDown(event: KeyboardEvent) {
      if (isClient && currentVisible.value) {
        const activeEl = document && document.activeElement

        if (!activeEl) return

        event.preventDefault()

        const shift = event.shiftKey
        const elList = Array.from(unitList.value)
        const index = elList.findIndex(unit => {
          const el = isElement(unit) ? unit : unit.$el

          return el === activeEl || el.contains(activeEl)
        })

        let maybeEl: any

        if (!~index) {
          maybeEl = elList.at(shift ? -1 : 0)
        } else if (shift ? !index : index === elList.length - 1) {
          maybeEl = reference.value
        } else {
          maybeEl = elList.at(index + (shift ? -1 : 1))
        }

        if (maybeEl) {
          if (typeof maybeEl.focus === 'function') {
            maybeEl.focus()
          } else {
            maybeEl.$el?.focus()
          }
        }
      }
    }

    function handleShrtcutsFocus() {
      shortcutHitting.value = 0
      shortcutsFocused.value = true
    }

    function handleShortcutsKeydown(event: KeyboardEvent) {
      const key = event.code || event.key
      const shortcutCount = shortcutList.value.length

      switch (key) {
        case 'ArrowUp':
        case 'ArrowLeft': {
          shortcutHitting.value--
          break
        }
        case 'ArrowDown':
        case 'ArrowRight': {
          shortcutHitting.value++
          break
        }
        case 'Enter':
        case 'Space':
        case ' ': {
          const color = shortcutList.value.at(shortcutHitting.value)

          color && handleShortcutClick(color)
          break
        }
      }

      shortcutHitting.value = (shortcutHitting.value + shortcutCount) % shortcutCount
    }

    function handleSpaceDown(event: KeyboardEvent) {
      if (props.disabled) {
        currentVisible.value = false
      } else {
        event.preventDefault()

        if (currentVisible.value) {
          handleOk()
          reference.value?.focus()
        } else {
          currentVisible.value = true
        }
      }
    }

    function handleEscDown() {
      currentVisible.value = false
      reference.value?.focus()
    }

    return {
      props,
      nh,
      icons,
      locale: useLocale('colorPicker', toRef(props, 'locale')),
      idFor,
      isEmpty,
      currentVisible,
      currentValue,
      currentAlpha,
      transferTo,
      lastValue,
      shortcutHitting,
      shortcutsFocused,

      className,
      selectorClass,
      rgb,
      hex,
      shortcutList,
      hasPrefix,
      showClear,

      wrapper,
      reference,
      popper,
      palette,
      hue,
      alphaUnit: alpha,
      shortcutUnit: shortcut,
      input,
      cancel,
      confirm,

      toggleVisible,
      handleClear,
      handleOk,
      handlePaletteChange,
      handleHueChange,
      handleAlphaChange,
      handleInputColor,
      handleShortcutClick,
      toggleEditing,
      handleTabDown,
      handleShrtcutsFocus,
      handleShortcutsKeydown,
      handleSpaceDown,
      handleEscDown
    }
  }
})
</script>
