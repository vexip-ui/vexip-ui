import { getNoopFieldStore, useFieldStore } from '@/components/form'

import { computed, onMounted, reactive, ref, toRef, watch } from 'vue'

import { useHover, useModifier, useTimerRecord } from '@vexip-ui/hooks'
import { emitEvent, useLocale } from '@vexip-ui/config'
import { pickToRefs, withDefaults } from '@vexip-ui/hooks'
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
  toNumber
} from '@vexip-ui/utils'

import type { PropsWithDefaults } from '@vexip-ui/config'
import type { ElementRef } from '@vexip-ui/hooks'
import type { NumberInputProps } from './props'
import type { InputEventType } from './symbol'

export interface HookNumberInputProps
  extends Omit<
    NumberInputProps,
    | 'inherit'
    | 'prefix'
    | 'prefixColor'
    | 'suffix'
    | 'suffixColor'
    | 'controlClass'
    | 'controlAttrs'
    | 'loadingIcon'
    | 'loadingEffect'
    | 'controlType'
    | 'onPrefixClick'
    | 'onSuffixClick'
  > {
  useField?: boolean,
  idPrefix?: string,
  onUpdateValue?: (value: number) => void
}

export interface HookNumberInputRefs {
  wrapper?: ElementRef,
  control?: ElementRef<HTMLInputElement>
}

const isEmpty = (value: unknown) => !value && value !== 0
const isNullOrNaN = (value: unknown) => isNull(value) || Number.isNaN(value)

export function useNumberInput(props: HookNumberInputProps, refs?: HookNumberInputRefs) {
  return useInternalNumberInput(
    withDefaults(props, {
      size: 'default',
      state: 'default',
      locale: null,
      formatter: null,
      value: NaN,
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
      disabled: false,
      debounce: false,
      delay: null,
      clearable: false,
      loading: false,
      loadingLock: false,
      sync: false,
      syncStep: false,
      emptyType: 'NaN',
      name: '',
      useField: true,
      idPrefix: ''
    }),
    refs
  )
}

export function useInternalNumberInput(
  originalProps: PropsWithDefaults<HookNumberInputProps>,
  { wrapper = ref(null), control = ref(null) }: HookNumberInputRefs = {}
) {
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
    setFieldValue
  } = originalProps.useField ? useFieldStore<number>(focus) : getNoopFieldStore<number>()

  const props = withDefaults(
    originalProps,
    reactive({ size, state, disabled, loading, value: computed(getFieldValue) })
  )

  const locale = useLocale('numberInput', toRef(props, 'locale'))

  const { timeout, interval } = useTimerRecord()

  const focused = ref(false)
  const currentValue = ref<string | number>(isEmpty(props.value) ? getEmptyValue() : props.value)
  const inputting = ref(false)
  const plusHolding = ref(false)
  const minusHolding = ref(false)

  const { isHover } = useHover(wrapper)

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
          event.ctrlKey ? 'ctrl' : event.shiftKey ? 'shift' : event.altKey ? 'alt' : undefined
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
    }
  })

  const idIndex = `${getGlobalCount()}`

  let lastValue: number

  const controlId = computed(() => `${props.idPrefix}-${idIndex}__control`)
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
      return preciseNumber.value ? preciseNumber.value.toString() : ''

    const value =
      !inputting.value && typeof props.formatter === 'function'
        ? props.formatter(preciseNumber.value as number)
        : preciseNumber.value.toString()

    return typeof value === 'number' && !Number.isNaN(value) ? value.toString() : (value as string)
  })
  const hasValue = computed(() => !!(currentValue.value || currentValue.value === 0))
  const showClear = computed(() => {
    return (
      !props.disabled && !isReadonly.value && props.clearable && isHover.value && hasValue.value
    )
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
    { immediate: true }
  )
  watch(inputting, value => {
    if (!value) {
      setInputValue(inputting.value ? currentValue.value : formattedValue.value)
    }
  })

  onMounted(() => {
    setInputValue(inputting.value ? currentValue.value : formattedValue.value)
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

  function blur() {
    control.value?.blur()
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
      event.ctrlKey ? 'ctrl' : event.shiftKey ? 'shift' : event.altKey ? 'alt' : undefined
    )
  }

  function minusNumber(event: PointerEvent) {
    !focused.value && focus()
    changeStep(
      'minus',
      event.ctrlKey ? 'ctrl' : event.shiftKey ? 'shift' : event.altKey ? 'alt' : undefined
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
        !Object.is(props.value, value) && props.onUpdateValue?.(boundValue)
        return
      }

      lastValue = boundValue

      if (!sync || changed) {
        props.onUpdateValue?.(boundValue)
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

        props.onUpdateValue?.(boundValue)
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

  function handleKeyPress(event: KeyboardEvent) {
    emitEvent(props.onKeyPress, event)
  }

  return {
    ...pickToRefs(props, ['size', 'state', 'disabled', 'loading']),

    idFor,
    locale,
    focused,
    currentValue,
    inputting,
    plusHolding,
    minusHolding,
    isHover,
    outOfRange,
    isReadonly,
    plusDisabled,
    minusDisabled,
    preciseNumber,
    formattedValue,
    hasValue,
    showClear,
    focus,
    blur,

    wrapper,
    control,

    wrapperProps: reactive({
      id: idFor,
      role: 'group',
      onClick: () => focus()
    }),
    controlProps: reactive({
      ...pickToRefs(props, ['autofocus', 'spellcheck', 'disabled', 'name']),
      id: controlId,
      type: 'text',
      autocomplete: computed(() => (props.autocomplete ? 'on' : 'off')),
      readonly: isReadonly,
      placeholder: computed(() => props.placeholder || locale.value.placeholder),
      role: 'spinbutton',
      title: computed(() => (outOfRange.value ? locale.value.outOfRange : '')),
      'aria-valuenow': preciseNumber,
      'aria-valuemin': computed(() => (props.min !== -Infinity ? props.min : undefined)),
      'aria-valuemax': computed(() => (props.max !== Infinity ? props.max : undefined)),
      'aria-valuetext': formattedValue,
      onSubmit: (e: Event) => e.preventDefault(),
      onFocus: handleFocus,
      onBlur: handleBlur,
      onKeypress: handleKeyPress,
      onInput: handleInput,
      onChange: handleChange
    }),
    clearButtonProps: reactive({
      type: 'button' as const,
      tabindex: -1,
      'aria-label': computed(() => locale.value.ariaLabel.clear),
      onClick: (e: MouseEvent) => {
        e.stopPropagation()
        handleClear()
      }
    }),
    plusButtonProps: reactive({
      type: 'button' as const,
      disabled: plusDisabled,
      tabindex: -1,
      'aria-label': computed(() => locale.value.ariaLabel.increase),
      'aria-labelledby': labelId,
      'aria-controls': controlId,
      onPointerdown: (e: PointerEvent) => {
        e.preventDefault()
        handleHold('plus', e)
      },
      onMousedown: (e: MouseEvent) => e.preventDefault(),
      onTouchstart: (e: TouchEvent) => e.preventDefault()
    }),
    minusButtonProps: reactive({
      type: 'button' as const,
      disabled: minusDisabled,
      tabindex: -1,
      'aria-label': computed(() => locale.value.ariaLabel.decrease),
      'aria-labelledby': labelId,
      'aria-controls': controlId,
      onPointerdown: (e: PointerEvent) => {
        e.preventDefault()
        handleHold('minus', e)
      },
      onMousedown: (e: MouseEvent) => e.preventDefault(),
      onTouchstart: (e: TouchEvent) => e.preventDefault()
    })
  }
}
