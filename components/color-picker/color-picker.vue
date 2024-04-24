<script setup lang="ts">
import { Button } from '@/components/button'
import { Icon } from '@/components/icon'
import { Input } from '@/components/input'
import { Popper } from '@/components/popper'
import { useFieldStore } from '@/components/form'

import { computed, nextTick, ref, toRef, watch } from 'vue'

import ColorPalette from './color-palette.vue'
import ColorHue from './color-hue.vue'
import ColorAlpha from './color-alpha.vue'
import { placementWhileList, useClickOutside, useHover, usePopper } from '@vexip-ui/hooks'
import {
  createIconProp,
  createSizeProp,
  createStateProp,
  emitEvent,
  useIcons,
  useLocale,
  useNameHelper,
  useProps
} from '@vexip-ui/config'
import {
  getLast,
  hsvToHsl,
  hsvToRgb,
  isClient,
  isElement,
  parseColorToRgba,
  rgbToHex,
  rgbToHsv,
  rgbaToHex,
  toFixed
} from '@vexip-ui/utils'
import { colorPickerProps } from './props'
import { defaultShortcuts, getDefaultHsv } from './symbol'

import type { PopperExposed } from '@/components/popper'
import type { Color, HSLAColor, HSVAColor, HSVColor, RGBAColor, RGBColor } from '@vexip-ui/utils'
import type { ColorFormat } from './symbol'

defineOptions({ name: 'ColorPicker' })

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

const _props = defineProps(colorPickerProps)
const props = useProps('colorPicker', _props, {
  size: createSizeProp(size),
  state: createStateProp(state),
  locale: null,
  value: {
    default: () => getFieldValue()!,
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
  prefix: createIconProp(),
  prefixColor: '',
  suffix: createIconProp(),
  suffixColor: '',
  noSuffix: false,
  staticSuffix: false,
  loading: () => loading.value,
  loadingIcon: createIconProp(),
  loadingLock: false,
  loadingEffect: null,
  popperAlive: null,
  showLabel: false,
  labelFormat: null
})

const emit = defineEmits(['update:value', 'update:visible'])

const slots = defineSlots<{
  control: (params: { color: RGBColor, alpha: number, empty: boolean }) => any,
  prefix: () => any,
  suffix: () => any,
  label: (params: { color: RGBColor, alpha: number, empty: boolean, label: string }) => any
}>()

const icons = useIcons()
const locale = useLocale('colorPicker', toRef(props, 'locale'))

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
const alphaEl = ref(null)
const shortcutEl = ref(null)
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
    alphaEl.value,
    shortcutEl.value,
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
const readonly = computed(() => props.loading && props.loadingLock)
const selectorClass = computed(() => {
  const baseCls = nh.be('selector')

  return {
    [baseCls]: true,
    [`${baseCls}--disabled`]: props.disabled,
    [`${baseCls}--readonly`]: readonly.value,
    [`${baseCls}--loading`]: props.loading,
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

  return defaultShortcuts
})
const hasPrefix = computed(() => !!(slots.prefix || props.prefix))
const showClear = computed(() => {
  return !props.disabled && !readonly.value && props.clearable && isHover.value && !isEmpty.value
})
const formattedColor = computed(() => getFormattedColor(props.format))
const labelColor = computed(() => {
  return (
    props.labelFormat ? getFormattedColor(props.labelFormat) : formattedColor.value
  )?.toString()
})

watch(
  () => props.visible,
  value => {
    currentVisible.value = value
  }
)
watch(currentVisible, value => {
  value && updatePopper()
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
      setVisible(false)
    }
  }
)

defineExpose({
  idFor,
  isEmpty,
  currentVisible,
  currentValue,
  currentAlpha,
  rgb,
  hex,
  labelColor,
  wrapper,
  reference,
  popper,
  toggleVisible,
  focus,
  blur
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

function setVisible(visible: boolean) {
  if (currentVisible.value === visible) return

  currentVisible.value = visible

  emit('update:visible', visible)
  emitEvent(props.onToggle, visible)
}

function getFormattedColor(format: ColorFormat) {
  let color: Color

  if (format === 'hex') {
    const { r, g, b } = rgb.value

    if (props.alpha) {
      color = rgbaToHex(r, g, b, currentAlpha.value)
    } else {
      color = rgbToHex(r, g, b)
    }
  } else {
    switch (format) {
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

function handleClickOutside() {
  if (!editing.value) {
    emitEvent(props.onClickOutside)

    if (props.outsideClose && currentVisible.value) {
      setVisible(false)
      emitEvent(props.onOutsideClose)
    }
  }
}

function toggleVisible() {
  if (props.disabled || readonly.value) return

  setVisible(!currentVisible.value)
}

function handleClear() {
  if (props.disabled || readonly.value) return

  if (props.clearable) {
    setVisible(false)
    emit('update:value', '')
    emitEvent(props.onChange, '')

    nextTick(() => {
      parseValue(null)
      clearField()
      emitEvent(props.onClear)
    })
  }
}

function handleConfirm() {
  if (props.disabled || readonly.value) return

  lastValue.value = { ...currentValue.value, a: currentAlpha.value, format: 'hsva' }
  isEmpty.value = false
  setVisible(false)
  handleChange()
}

function handleChange() {
  const color = formattedColor.value

  emit('update:value', color)
  setFieldValue(color)
  emitEvent(props.onChange, color)
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

  emitEvent(props.onShortcut, formattedColor.value)
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
      maybeEl = shift ? getLast(elList) : elList[0]
    } else if (shift ? !index : index === elList.length - 1) {
      maybeEl = reference.value
    } else {
      maybeEl = elList[index + (shift ? -1 : 1)]
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

function handleShortcutsFocus() {
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
      const color = shortcutList.value[shortcutHitting.value]

      color && handleShortcutClick(color)
      break
    }
  }

  shortcutHitting.value = (shortcutHitting.value + shortcutCount) % shortcutCount
}

function handleSpaceDown(event: KeyboardEvent) {
  if (props.disabled) {
    setVisible(false)
  } else {
    event.preventDefault()

    if (currentVisible.value) {
      handleConfirm()
      reference.value?.focus()
    } else {
      setVisible(true)
    }
  }
}

function handleEscDown() {
  setVisible(false)
  reference.value?.focus()
}

function focus(options?: FocusOptions) {
  reference.value?.focus(options)
}

function blur() {
  reference.value?.blur()
}
</script>

<template>
  <div
    :id="idFor"
    ref="wrapper"
    :class="className"
    @click="toggleVisible"
    @keydown.tab.stop="handleTabDown"
    @keydown.space="handleSpaceDown"
    @keydown.escape="handleEscDown"
  >
    <div ref="reference" :class="selectorClass" tabindex="0">
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
          <div :class="[nh.be('marker'), showLabel && nh.bem('marker', 'with-label')]">
            <Icon v-if="!currentVisible && isEmpty" v-bind="icons.close"></Icon>
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
          <div v-if="showLabel" :class="nh.be('label')">
            <slot
              name="label"
              :color="rgb"
              :alpha="currentAlpha"
              :empty="isEmpty"
              :label="labelColor"
            >
              {{ labelColor }}
            </slot>
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
            <Icon v-else v-bind="icons.angleDown" :class="nh.be('arrow')"></Icon>
          </slot>
        </div>
        <div
          v-else-if="props.clearable || props.loading"
          :class="[nh.be('icon'), nh.bem('icon', 'placeholder'), nh.be('suffix')]"
        ></div>
        <Transition :name="nh.ns('fade')" appear>
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
        </Transition>
      </slot>
    </div>
    <Popper
      ref="popper"
      :class="[nh.be('popper'), nh.bs('vars')]"
      :visible="currentVisible"
      :to="transferTo"
      :transition="props.transitionName"
      :alive="props.popperAlive ?? !transferTo"
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
            ref="alphaEl"
            :rgb="rgb"
            :alpha="currentAlpha"
            @edit-start="toggleEditing(true)"
            @edit-end="toggleEditing(false)"
            @change="handleAlphaChange"
          ></ColorAlpha>
          <div
            v-if="props.shortcut"
            ref="shortcutEl"
            :class="nh.be('shortcuts')"
            tabindex="-1"
            @focus="handleShortcutsFocus"
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
            @click="handleConfirm"
          >
            {{ props.confirmText || locale.confirm }}
          </Button>
        </div>
      </div>
    </Popper>
  </div>
</template>
