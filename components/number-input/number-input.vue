<script setup lang="ts">
import { Icon } from '@/components/icon'
import { Renderer } from '@/components/renderer'
import { useFieldStore } from '@/components/form'

import { computed, onMounted, ref, toRef, watch } from 'vue'

import { useHover, useModifier, useTimerRecord } from '@vexip-ui/hooks'
import {
  createIconProp,
  createSizeProp,
  createStateProp,
  emitEvent,
  useIcons,
  useLocale,
  useNameHelper,
  useProps,
} from '@vexip-ui/config'
import {
  boundRange,
  debounce,
  getGlobalCount,
  isNull,
  isValidNumber,
  minus,
  plus,
  throttle,
  toFixed,
  toNumber,
} from '@vexip-ui/utils'
import { numberInputProps } from './props'

import type { NumberInputSlots } from './symbol'

type InputEventType = 'input' | 'change'

const isEmpty = (value: unknown) => !value && value !== 0
const isNullOrNaN = (value: unknown) => isNull(value) || Number.isNaN(value)

defineOptions({ name: 'NumberInput' })

const {
  idFor,
  labelId,
  state,
  disabled,
  loading,
  size,
  validateField,
  clearField,
  getFieldValue,
  setFieldValue,
} = useFieldStore<number>(focus)

const _props = defineProps(numberInputProps)
const props = useProps('numberInput', _props, {
  size: createSizeProp(size),
  state: createStateProp(state),
  locale: null,
  prefix: createIconProp(),
  prefixColor: '',
  suffix: createIconProp(),
  suffixColor: '',
  // 格式化后显示
  formatter: {
    default: null,
    isFunc: true,
  },
  value: {
    default: () => getFieldValue(),
    static: true,
  },
  min: -Infinity,
  max: Infinity,
  placeholder: null,
  autofocus: false,
  spellcheck: false,
  autocomplete: false,
  precision: -1,
  readonly: false,
  step: 1,
  ctrlStep: 100,
  shiftStep: 10,
  altStep: 0.1,
  disabled: () => disabled.value,
  controlClass: null,
  debounce: false,
  delay: null,
  clearable: false,
  loading: () => loading.value,
  loadingIcon: createIconProp(),
  loadingLock: false,
  loadingEffect: null,
  sync: false,
  syncStep: false,
  controlType: 'right',
  emptyType: 'NaN',
  controlAttrs: null,
  name: {
    default: '',
    static: true,
  },
  slots: () => ({}),
})

const emit = defineEmits(['update:value'])

const slots = defineSlots<NumberInputSlots>()

const nh = useNameHelper('number-input')
const locale = useLocale('numberInput', toRef(props, 'locale'))
const icons = useIcons()

const { timeout, interval } = useTimerRecord()

const focused = ref(false)
const currentValue = ref<string | number>(isEmpty(props.value) ? getEmptyValue() : props.value)
const inputting = ref(false)
const plusHolding = ref(false)
const minusHolding = ref(false)

const control = ref<HTMLInputElement>()
const { wrapper, isHover } = useHover()

useModifier({
  target: control,
  passive: false,
  onKeyDown: (event, modifier) => {
    emitEvent(props.onKeyDown, event)

    if (modifier.up || modifier.down) {
      event.preventDefault()
      event.stopPropagation()

      if ((modifier.up && plusDisabled.value) || (modifier.down && minusDisabled.value)) {
        return
      }

      changeStep(
        modifier.up ? 'plus' : 'minus',
        event.ctrlKey ? 'ctrl' : event.shiftKey ? 'shift' : event.altKey ? 'alt' : undefined,
      )
      modifier.resetAll()
    } else if (modifier.enter) {
      event.preventDefault()
      event.stopPropagation()
      emitChangeEvent('change')
      modifier.resetAll()
    }
  },
  onKeyUp: event => {
    emitEvent(props.onKeyUp, event)

    if (event.key === 'Enter') {
      handleEnter()
    }
  },
})

const idIndex = `${getGlobalCount()}`

let lastValue: number

const controlId = computed(() => `${nh.bs(idIndex)}__control`)
const outOfRange = computed(() => {
  return (
    !isNullOrNaN(currentValue.value) &&
    (toNumber(currentValue.value) > props.max || toNumber(currentValue.value) < props.min)
  )
})
const isReadonly = computed(() => (props.loading && props.loadingLock) || props.readonly)
const plusDisabled = computed(() => {
  return (
    props.disabled ||
    isReadonly.value ||
    (!isNullOrNaN(currentValue.value) && toNumber(currentValue.value) >= props.max)
  )
})
const minusDisabled = computed(() => {
  return (
    props.disabled ||
    isReadonly.value ||
    (!isNullOrNaN(currentValue.value) && toNumber(currentValue.value) <= props.min)
  )
})
const className = computed(() => {
  const [display, fade] = (props.controlType || 'right').split('-')

  return [
    nh.b(),
    nh.bs('vars'),
    nh.ns('input-vars'),
    {
      [nh.bm('inherit')]: props.inherit,
      [nh.bm('focused')]: inputting.value,
      [nh.bm('disabled')]: props.disabled,
      [nh.bm('readonly')]: isReadonly.value,
      [nh.bm('loading')]: props.loading,
      [nh.bm(props.size)]: props.size !== 'default',
      [nh.bm(props.state)]: props.state !== 'default',
      [nh.bm(`control-${display}`)]: display !== 'right',
      [nh.bm('control-fade')]: fade,
      [nh.bm('out-of-range')]: outOfRange.value,
    },
  ]
})
const hasPrefix = computed(() => {
  return !!(slots.prefix || props.prefix || props.slots.prefix)
})
const hasSuffix = computed(() => {
  return !!(slots.suffix || props.suffix || props.slots.suffix)
})
const preciseNumber = computed(() => {
  return !inputting.value &&
    typeof currentValue.value === 'number' &&
    !Number.isNaN(currentValue.value) &&
    props.precision >= 0
    ? toFixed(currentValue.value, props.precision)
    : currentValue.value
})
const formattedValue = computed(() => {
  if (isNullOrNaN(preciseNumber.value) || typeof preciseNumber.value !== 'number')
    return preciseNumber.value ?? ''

  return !inputting.value && typeof props.formatter === 'function'
    ? props.formatter(preciseNumber.value as number)
    : preciseNumber.value.toString()
})
const hasValue = computed(() => !!(currentValue.value || currentValue.value === 0))
const showClear = computed(() => {
  return !props.disabled && !isReadonly.value && props.clearable && isHover.value && hasValue.value
})
const autoComplete = computed(() => {
  return typeof props.autocomplete === 'boolean'
    ? props.autocomplete
      ? 'on'
      : 'off'
    : props.autocomplete
})

const delay = toNumber(props.delay)
const handleInput = props.debounce
  ? debounce(handleChange, delay || 100)
  : throttle(handleChange, delay || 16)

watch(
  () => props.value,
  value => {
    if (value !== lastValue) {
      parseValue()
    }
  },
  { immediate: true },
)
watch(inputting, value => {
  if (!value) {
    setInputValue(inputting.value ? currentValue.value : formattedValue.value)
  }
})

onMounted(() => {
  setInputValue(inputting.value ? currentValue.value : formattedValue.value)
})

defineExpose({
  idFor,
  focused,
  isHover,
  outOfRange,
  preciseNumber,
  formattedValue,
  isReadonly,
  wrapper,
  input: control,
  focus,
  blur: () => control.value?.blur(),
})

function setInputValue(value?: number | string | null) {
  if (control.value) {
    control.value.value = isNullOrNaN(value) ? '' : value!.toString()
  }
}

function boundValueRange(value: number) {
  return boundRange(value, props.min, props.max)
}

function parseValue() {
  let value = props.value
  value = inputting.value ? value : isValidNumber(value, true) ? toNumber(value) : getEmptyValue()

  if (props.precision >= 0 && !isNullOrNaN(value)) {
    value = toFixed(boundValueRange(value), props.precision)
  }

  currentValue.value = value
  lastValue = value

  setInputValue(inputting.value ? value : formattedValue.value)
}

function focus(options?: FocusOptions) {
  control.value?.focus(options)
}

function handleFocus(event: FocusEvent) {
  focused.value = true
  inputting.value = true
  emitEvent(props.onFocus, event)
}

function handleBlur(event: FocusEvent) {
  focused.value = false

  setTimeout(() => {
    if (!focused.value) {
      inputting.value = false
      emitEvent(props.onBlur, event)
      emitChangeEvent('change')
    }
  }, 120)
}

function handleHold(type: 'plus' | 'minus', event: PointerEvent) {
  const disabled = type === 'plus' ? plusDisabled : minusDisabled
  const change = type === 'plus' ? plusNumber : minusNumber

  if (event.button !== 0 || disabled.value) return

  change(event)
  document.addEventListener('pointerup', cancelStep)
  document.addEventListener('touchend', cancelStep)
  clearTimeout(timeout.step)
  clearInterval(interval.step)
  ;(type === 'plus' ? plusHolding : minusHolding).value = true

  timeout.step = setTimeout(() => {
    interval.step = setInterval(() => {
      disabled.value ? cancelStep() : change(event)
    }, 32)
  }, 500)
}

function cancelStep() {
  document.removeEventListener('pointerup', cancelStep)
  document.removeEventListener('touchend', cancelStep)
  clearTimeout(timeout.step)
  clearInterval(interval.step)

  plusHolding.value = false
  minusHolding.value = false
}

function plusNumber(event: PointerEvent) {
  !focused.value && focus()
  changeStep(
    'plus',
    event.ctrlKey ? 'ctrl' : event.shiftKey ? 'shift' : event.altKey ? 'alt' : undefined,
  )
}

function minusNumber(event: PointerEvent) {
  !focused.value && focus()
  changeStep(
    'minus',
    event.ctrlKey ? 'ctrl' : event.shiftKey ? 'shift' : event.altKey ? 'alt' : undefined,
  )
}

function changeStep(type: 'plus' | 'minus', modifier?: 'ctrl' | 'shift' | 'alt') {
  if (props.disabled || isReadonly.value) return

  let value = currentValue.value || 0
  let step!: number

  switch (modifier) {
    case 'ctrl':
      step = props.ctrlStep
      break
    case 'shift':
      step = props.shiftStep
      break
    case 'alt':
      step = props.altStep
      break
    default:
      step = props.step
  }

  const stringValue = value.toString().trim()

  if (stringValue.endsWith('.')) {
    value = toNumber(stringValue.slice(0, -1))
  }

  if (type === 'plus') {
    value = plus(value, step)
  } else {
    value = minus(value, step)
  }

  setValue(value, props.syncStep && !props.sync ? 'change' : 'input')
}

function handleChange(event: Event) {
  const type = event.type as InputEventType
  const stringValue = (event.target as HTMLInputElement).value

  let value = stringValue.trim()

  // to rollback invalid value to empty in `<input>` when change
  if (type === 'change' && stringValue && !isValidNumber(stringValue, true)) {
    const floatValue = parseFloat(stringValue)

    if (Number.isNaN(floatValue)) {
      value = ''
    } else {
      value = floatValue.toString()
    }
  }

  inputting.value = type === 'input'

  setValue(value, type)
}

function setValue(value: string | number, type: InputEventType, sync = props.sync) {
  if (type !== 'input') {
    currentValue.value = isEmpty(value) ? getEmptyValue() : toNumber(value)
  } else {
    currentValue.value = value
  }

  setInputValue(currentValue.value)
  emitChangeEvent(type, sync)
}

function getEmptyValue() {
  switch (props.emptyType) {
    case 'undefined':
      return undefined! as number
    case 'null':
      return null! as number
    default:
      return NaN
  }
}

function emitChangeEvent(type: InputEventType, sync = props.sync) {
  type = type === 'input' ? 'input' : 'change'

  if (type === 'change') {
    const empty = isEmpty(currentValue.value)
    const value = empty ? getEmptyValue() : toNumber(currentValue.value)

    let boundValue = empty ? value : boundValueRange(toNumber(value))

    if (!empty && props.precision >= 0) {
      boundValue = toFixed(boundValue, props.precision)
    }

    const changed = !Object.is(boundValue, value)

    if (!empty) {
      currentValue.value = boundValue
    }

    if (!sync && Object.is(lastValue, boundValue)) {
      !Object.is(props.value, value) && emit('update:value', boundValue)
      return
    }

    lastValue = boundValue

    if (!sync || changed) {
      emit('update:value', boundValue)
      setFieldValue(boundValue)
    }

    emitEvent(props.onChange, boundValue)

    if (!sync || changed) {
      validateField()
    }
  } else {
    const value = parseFloat(currentValue.value as string)
    const empty = Number.isNaN(value)

    let boundValue = empty ? getEmptyValue() : boundValueRange(toNumber(value))

    if (!empty && props.precision >= 0) {
      boundValue = toFixed(boundValue, props.precision)
    }

    const emitUpdate = sync && !Object.is(lastValue, boundValue)

    if (emitUpdate) {
      lastValue = boundValue

      emit('update:value', boundValue)
      setFieldValue(boundValue)
    }

    emitEvent(props.onInput, value)

    if (emitUpdate) {
      validateField()
    }
  }
}

function handleClear() {
  if (props.disabled || isReadonly.value) return

  setValue(NaN, 'change', false)
  emitEvent(props.onClear)
  clearField()
  focus()
}

function handleEnter() {
  emitEvent(props.onEnter)
}

function handlePrefixClick(event: MouseEvent) {
  emitEvent(props.onPrefixClick, event)
}

function handleSuffixClick(event: MouseEvent) {
  emitEvent(props.onSuffixClick, event)
}

function handleKeyPress(event: KeyboardEvent) {
  emitEvent(props.onKeyPress, event)
}
</script>

<template>
  <div
    :id="idFor"
    ref="wrapper"
    :class="className"
    role="group"
    @click="control?.focus()"
  >
    <div
      v-if="hasPrefix"
      :class="[nh.be('icon'), nh.be('prefix')]"
      :style="{ color: props.prefixColor }"
      @click="handlePrefixClick"
    >
      <slot name="prefix">
        <Renderer :renderer="props.slots.prefix">
          <Icon :icon="props.prefix"></Icon>
        </Renderer>
      </slot>
    </div>
    <input
      v-bind="props.controlAttrs"
      :id="controlId"
      ref="control"
      :class="[nh.be('control'), props.controlAttrs?.class, props.controlClass]"
      type="text"
      :autofocus="props.autofocus"
      :autocomplete="autoComplete"
      :spellcheck="props.spellcheck"
      :disabled="props.disabled"
      :readonly="isReadonly"
      :placeholder="props.placeholder ?? locale.placeholder"
      :name="props.name || props.controlAttrs?.name"
      role="spinbutton"
      :title="outOfRange ? locale.outOfRange : undefined"
      :aria-valuenow="preciseNumber"
      :aria-valuemin="props.min !== -Infinity ? props.min : undefined"
      :aria-valuemax="props.max !== Infinity ? props.max : undefined"
      :aria-labelledby="labelId"
      @submit.prevent
      @blur="handleBlur"
      @focus="handleFocus"
      @keypress="handleKeyPress"
      @input="handleInput"
      @change="handleChange"
    />
    <div
      v-if="hasSuffix"
      :class="[nh.be('icon'), nh.be('suffix')]"
      :style="{
        color: props.suffixColor,
        opacity: showClear || props.loading ? '0%' : ''
      }"
      @click="handleSuffixClick"
    >
      <slot name="suffix">
        <Renderer :renderer="props.slots.suffix">
          <Icon :icon="props.suffix"></Icon>
        </Renderer>
      </slot>
    </div>
    <div
      v-else-if="props.clearable || props.loading"
      :class="[nh.be('icon'), nh.bem('icon', 'placeholder'), nh.be('suffix')]"
    ></div>
    <Transition :name="nh.ns('fade')" appear>
      <button
        v-if="showClear"
        :class="[nh.be('icon'), nh.be('clear')]"
        type="button"
        tabindex="-1"
        :aria-label="locale.ariaLabel.clear"
        @click.stop="handleClear"
      >
        <Icon v-bind="icons.clear" label="clear"></Icon>
      </button>
      <div v-else-if="props.loading" :class="[nh.be('icon'), nh.be('loading')]">
        <Icon
          v-bind="icons.loading"
          :effect="props.loadingEffect || icons.loading.effect"
          :icon="props.loadingIcon || icons.loading.icon"
          label="loading"
        ></Icon>
      </div>
    </Transition>
    <template v-if="props.controlType !== 'none'">
      <div
        :class="{
          [nh.be('plus')]: true,
          [nh.bem('plus', 'disabled')]: plusDisabled,
          [nh.bem('plus', 'holding')]: plusHolding
        }"
        role="button"
        :aria-label="locale.ariaLabel.increase"
        :aria-labelledby="labelId"
        :aria-controls="controlId"
        @pointerdown.prevent="handleHold('plus', $event)"
        @mousedown.prevent
        @touchstart.prevent
      >
        <Icon v-bind="icons.angleUp" :scale="+(icons.angleUp.scale || 1) * 0.8"></Icon>
      </div>
      <div
        :class="{
          [nh.be('minus')]: true,
          [nh.bem('minus', 'disabled')]: minusDisabled,
          [nh.bem('minus', 'holding')]: minusHolding
        }"
        :aria-label="locale.ariaLabel.decrease"
        :aria-labelledby="labelId"
        :aria-controls="controlId"
        @pointerdown.prevent="handleHold('minus', $event)"
        @mousedown.prevent
        @touchstart.prevent
      >
        <Icon v-bind="icons.angleDown" :scale="+(icons.angleDown.scale || 1) * 0.8"></Icon>
      </div>
    </template>
  </div>
</template>
