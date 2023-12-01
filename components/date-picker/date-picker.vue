<script setup lang="ts">
import { Icon } from '@/components/icon'
import { Popper } from '@/components/popper'
import { useFieldStore } from '@/components/form'

import { computed, nextTick, reactive, ref, toRef, watch } from 'vue'

import DateControl from './date-control.vue'
import DatePanel from './date-panel.vue'
import {
  createSizeProp,
  createStateProp,
  emitEvent,
  makeSentence,
  useIcons,
  useLocale,
  useNameHelper,
  useProps,
  useWordSpace
} from '@vexip-ui/config'
import {
  placementWhileList,
  useClickOutside,
  useHover,
  usePopper,
  useSetTimeout
} from '@vexip-ui/hooks'
import {
  boundRange,
  differenceDays,
  doubleDigits,
  format,
  getTime,
  isLeapYear,
  startOfMonth,
  toDate,
  toFalse
} from '@vexip-ui/utils'
import { datePickerProps } from './props'
import { useColumn, useTimeBound } from './helper'
import { datePickerTypes, invalidDate } from './symbol'

import type { PopperExposed } from '@/components/popper'
import type { Dateable } from '@vexip-ui/utils'
import type { DatePickerChangeEvent, DatePickerFormatFn, DateTimeType, TimeType } from './symbol'

defineOptions({ name: 'DatePicker' })

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
} = useFieldStore<Dateable | Dateable[]>(() => reference.value?.focus())

const nh = useNameHelper('date-picker')

const _props = defineProps(datePickerProps)
const props = useProps('datePicker', _props, {
  size: createSizeProp(size),
  state: createStateProp(state),
  locale: null,
  type: {
    default: 'date',
    validator: value => datePickerTypes.includes(value)
  },
  visible: false,
  placement: {
    default: 'bottom-start',
    validator: value => placementWhileList.includes(value)
  },
  transfer: false,
  value: {
    default: () => getFieldValue(null!),
    static: true
  },
  format: 'yyyy-MM-dd HH:mm:ss',
  valueFormat: null,
  filler: {
    default: '-',
    validator: value => value.length === 1
  },
  clearable: false,
  noAction: false,
  labels: () => ({}),
  dateSeparator: '/',
  timeSeparator: ':',
  shortcuts: () => [],
  disabledDate: {
    default: toFalse,
    isFunc: true
  },
  steps: () => [1, 1, 1],
  ctrlSteps: () => [5, 5, 5],
  prefix: null,
  prefixColor: '',
  suffix: null,
  suffixColor: '',
  noSuffix: false,
  disabled: () => disabled.value,
  transitionName: () => nh.ns('drop'),
  confirmText: null,
  cancelText: null,
  today: {
    default: () => new Date(),
    validator: value => !Number.isNaN(new Date(value))
  },
  range: null,
  loading: () => loading.value,
  loadingIcon: null,
  loadingLock: false,
  loadingEffect: null,
  min: null,
  max: null,
  outsideClose: true,
  outsideCancel: false,
  placeholder: null,
  unitReadonly: false,
  weekStart: null,
  popperAlive: null
})

const emit = defineEmits(['update:value', 'update:formatted-value', 'update:visible'])

const slots = defineSlots<{
  prefix: () => any,
  exchange: () => any,
  suffix: () => any
}>()

const calendarLocale = useLocale('calendar')
const datePickerLocale = useLocale('datePicker')
const icons = useIcons()
const wordSpace = useWordSpace()

const placement = toRef(props, 'placement')
const transfer = toRef(props, 'transfer')
const currentVisible = ref(props.visible)
const focused = ref(false)
const startState = createDateState()
const endState = createDateState()
const currentState = ref<'start' | 'end'>('start')
const lastValue = ref('')
const firstSelected = ref<number[] | undefined>()
const hoveredDate = ref(new Date())

const { timer } = useSetTimeout()

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

const startInput = ref<InstanceType<typeof DateControl>>()
const endInput = ref<InstanceType<typeof DateControl>>()
const datePanel = ref<InstanceType<typeof DatePanel>>()

const mergedLocale = computed(() => {
  return {
    ...calendarLocale.value,
    ...datePickerLocale.value,
    ...(props.locale ?? {})
  }
})
const startPlaceholder = computed(() => {
  if (props.placeholder) {
    return Array.isArray(props.placeholder) ? props.placeholder[0] : props.placeholder
  }

  const { select, start, [props.type]: type } = mergedLocale.value.placeholder

  return makeSentence(props.range ? `${start} ${type}` : `${select} ${type}`, wordSpace.value)
})
const endPlaceholder = computed(() => {
  if (props.placeholder) {
    return Array.isArray(props.placeholder)
      ? props.placeholder[1] || props.placeholder[0]
      : props.placeholder
  }

  const { end, [props.type]: type } = mergedLocale.value.placeholder

  return makeSentence(`${end} ${type}`, wordSpace.value)
})
const className = computed(() => {
  return [
    nh.b(),
    nh.ns('input-vars'),
    nh.bs('vars'),
    nh.bm(props.type),
    {
      [nh.bm('inherit')]: props.inherit,
      [nh.bm('disabled')]: props.disabled,
      [nh.bm(props.size)]: props.size !== 'default',
      [nh.bm('no-hour')]: !startState.enabled.hour,
      [nh.bm('no-minute')]: !startState.enabled.minute,
      [nh.bm('no-second')]: !startState.enabled.second,
      [nh.bm('visible')]: currentVisible.value,
      [nh.bm(props.state)]: props.state !== 'default',
      [nh.bm('is-range')]: props.range
    }
  ]
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
    [`${baseCls}--focused`]: focused.value,
    [`${baseCls}--${props.state}`]: props.state !== 'default'
  }
})
const hasPrefix = computed(() => {
  return !!(slots.prefix || props.prefix)
})
const currentValue = computed(() => {
  const values = [startState, endState].map(state => {
    const values = Object.values(state.dateValue).map(doubleDigits)

    return `${values.slice(0, 3).join('-')} ${values.slice(3).join(':')}`
  })

  return props.range ? values : values[0]
})
const hoveredLarge = computed(() => {
  if (!firstSelected.value) return false

  const [year, month, date] = firstSelected.value
  const firstTime = new Date(`${year}-${month}-${date}`).getTime()
  const hoverTime = hoveredDate.value.getTime()

  return firstTime < hoverTime
})
const showClear = computed(() => {
  return !props.disabled && !readonly.value && props.clearable && isHover.value && !!lastValue.value
})
const min = computed(() => {
  if (props.min) {
    const date = rawValueToDate(props.min, invalidDate)

    if (Number.isNaN(+date)) return -Infinity

    date.setHours(0, 0, 0, 0)

    return date.getTime()
  }

  return -Infinity
})
const max = computed(() => {
  if (props.max) {
    let date = rawValueToDate(props.max, invalidDate)

    if (Number.isNaN(+date)) return Infinity

    if (props.type !== 'datetime') {
      date.setHours(23, 59, 59, 999)

      if (props.type === 'year') {
        date.setMonth(11)
        date.setDate(31)
      } else if (props.type === 'month') {
        date.setMonth(date.getMonth() + 1)
        date = startOfMonth(date)
        date.setDate(date.getDate() - 1)
      }
    }

    return date.getTime()
  }

  return Infinity
})
const reversed = computed(() => {
  if (Number.isNaN(min.value) || Number.isNaN(max.value)) {
    return false
  }

  return min.value > max.value
})
const startMinTime = computed(() => {
  if (props.type === 'datetime' && props.min && !differenceDays(props.min, startState.getDate())) {
    return getTime(props.min)
  }

  return ''
})
const startMaxTime = computed(() => {
  if (props.type === 'datetime' && props.max && !differenceDays(props.max, startState.getDate())) {
    return getTime(props.max)
  }

  return ''
})
const endMinTime = computed(() => {
  if (
    props.type === 'datetime' &&
    props.range &&
    props.min &&
    !differenceDays(props.min, startState.getDate())
  ) {
    return getTime(props.min)
  }

  return ''
})
const endMaxTime = computed(() => {
  if (
    props.type === 'datetime' &&
    props.range &&
    props.max &&
    !differenceDays(props.max, startState.getDate())
  ) {
    return getTime(props.max)
  }

  return ''
})
const startReversed = computed(() => {
  if (!props.range) return false

  const startValue = startState.dateValue
  const endValue = endState.dateValue

  let types: DateTimeType[]

  if (props.type === 'year') {
    types = ['year']
  } else if (props.type === 'month') {
    types = ['year', 'month']
  } else if (props.type === 'date') {
    types = ['year', 'month', 'date']
  } else {
    types = ['year', 'month', 'date', 'hour', 'minute', 'second']
  }

  for (const type of types) {
    if (startValue[type] < endValue[type]) return false
    if (startValue[type] > endValue[type]) return true
  }

  return false
})

const startTimeBound = useTimeBound(startMinTime, startMaxTime)
const endTimeBound = useTimeBound(endMinTime, endMaxTime)

const isTimeDisabled = computed(() => {
  return currentState.value === 'start'
    ? startTimeBound.isTimeDisabled
    : endTimeBound.isTimeDisabled
})
const startError = computed(() => {
  const { hour, minute, second } = startState.dateValue
  const { isTimeDisabled } = startTimeBound

  return (
    startReversed.value ||
    isDateDisabled(startState.getDate()) ||
    isTimeDisabled.hour(hour) ||
    isTimeDisabled.minute(hour, minute) ||
    isTimeDisabled.second(hour, minute, second)
  )
})
const endError = computed(() => {
  if (!props.range) return false

  const { hour, minute, second } = endState.dateValue
  const { isTimeDisabled } = endTimeBound

  return (
    startReversed.value ||
    isDateDisabled(endState.getDate()) ||
    isTimeDisabled.hour(hour) ||
    isTimeDisabled.minute(hour, minute) ||
    isTimeDisabled.second(hour, minute, second)
  )
})
const noActionMode = computed(() => props.type !== 'datetime' && props.noAction)

watch(() => props.type, parseFormat)
watch(
  () => props.value,
  value => {
    parseValue(value)

    lastValue.value = (Array.isArray(value) ? value[0] || value[1] : value) ? getStringValue() : ''
  },
  { immediate: true }
)
watch(
  () => props.type,
  value => {
    const hasMonth = value !== 'year'
    const hasDate = hasMonth && value !== 'month'

    startState.enabled.year = true
    endState.enabled.year = true
    startState.enabled.month = hasMonth
    endState.enabled.month = hasMonth
    startState.enabled.date = hasDate
    endState.enabled.date = hasDate
  },
  { immediate: true }
)
watch(() => props.format, parseFormat, { immediate: true })
watch(
  () => props.visible,
  value => {
    currentVisible.value = value
  }
)
watch(currentVisible, value => {
  if (value) {
    updatePopper()
  }
})
watch(focused, value => {
  if (value) {
    emitEvent(props.onFocus)
  } else {
    emitEvent(props.onBlur)
  }
})
watch(currentState, value => {
  if (!props.unitReadonly && currentVisible.value) {
    emitEvent(props.onChangeCol, getCurrentState().column, value)
  }
})
watch(
  () => startState.column,
  value => {
    if (!props.unitReadonly && currentVisible.value && currentState.value === 'start') {
      emitEvent(props.onChangeCol, value, 'start')
    }
  }
)
watch(
  () => endState.column,
  value => {
    if (!props.unitReadonly && currentVisible.value && currentState.value === 'end') {
      emitEvent(props.onChangeCol, value, 'end')
    }
  }
)
watch(
  () => props.disabled,
  value => {
    if (value) {
      setVisible(false)
      handleBlur()
    }
  }
)
watch(readonly, value => {
  if (value) {
    setVisible(false)
  }
})

defineExpose({
  idFor,
  currentVisible,
  focused,
  isHover,
  startState,
  endState,
  currentState,
  startError,
  endError,
  wrapper,
  reference,
  popper,
  start: startInput,
  end: endInput,
  panel: datePanel,
  updatePopper,
  focus: (options?: FocusOptions) => reference.value?.focus(options),
  blur: () => reference.value?.blur()
})

function createDateState() {
  // const noFiller = props.noFiller
  const { currentColumn, enabled, resetColumn, enterColumn } = useColumn([
    'year',
    'month',
    'date',
    'hour',
    'minute',
    'second'
  ] as DateTimeType[])

  const dateValue = reactive({
    year: 1970,
    month: 1, // 1 ~ 12
    date: 1,
    hour: 0,
    minute: 0,
    second: 0
  })
  const activated = reactive({
    year: false,
    month: false,
    date: false,
    hour: false,
    minute: false,
    second: false
  })

  let valueRecord = { ...dateValue }
  let activatedRecord = { ...activated }

  return reactive({
    column: currentColumn,
    enabled,
    activated,
    dateValue,
    resetColumn,
    enterColumn,
    setDate: (date: Date, withTime = true) => {
      dateValue.year = date.getFullYear()
      dateValue.month = date.getMonth() + 1
      dateValue.date = date.getDate()

      if (withTime) {
        dateValue.hour = date.getHours()
        dateValue.minute = date.getMinutes()
        dateValue.second = date.getSeconds()
      }
    },
    getDate: () => {
      return new Date(
        dateValue.year,
        dateValue.month - 1,
        dateValue.date,
        dateValue.hour,
        dateValue.minute,
        dateValue.second
      )
    },
    record() {
      valueRecord = { ...dateValue }
      activatedRecord = { ...activated }
    },
    restore() {
      Object.assign(dateValue, valueRecord)
      Object.assign(activated, activatedRecord)
    }
  })
}

function getCurrentState() {
  return currentState.value === 'start' ? startState : endState
}

function rawValueToDate(value: Dateable, defaultValue = new Date(props.today)) {
  let date!: Date

  if (typeof value === 'number') {
    if (props.type === 'year') {
      if (value < 3000) {
        date = new Date(value, 1)
      } else {
        date = toDate(value)
      }
    } else if (props.type === 'month') {
      if (value < 300000) {
        const year = Math.floor(value / 100)
        const month = value - year * 100

        date = new Date(year, month - 1)
      } else {
        date = toDate(value)
      }
    } else {
      date = toDate(value)
    }
  } else {
    date = toDate(value)
  }

  if (Number.isNaN(date.getTime())) {
    date = defaultValue
  }

  return date
}

function parseValue<T extends Dateable | null>(value: T | T[]) {
  if (!Array.isArray(value)) {
    value = [value, value]
  }

  for (let i = 0; i < 2; ++i) {
    const date = rawValueToDate(value[i] ?? '')
    const state = i === 0 ? startState : endState

    state.setDate(date)
    toggleActivated(!!value[i], i === 0 ? 'start' : 'end')

    if (!props.range) break
  }
}

function parseFormat() {
  const isDatetime = props.type === 'datetime'

  ;[startState, endState].forEach(state => {
    state.enabled.hour = false
    state.enabled.minute = false
    state.enabled.second = false

    if (isDatetime && props.format.length) {
      const length = props.format.length
      let inQuotation = false

      for (let i = 0; i < length; ++i) {
        const char = props.format.charAt(i)

        if (char === "'") {
          inQuotation = !inQuotation
        } else if (!inQuotation) {
          switch (char) {
            case 'H':
              state.enabled.hour = true
              break
            case 'm':
              state.enabled.minute = true
              break
            case 's':
              state.enabled.second = true
              break
          }
        }
      }
    }
  })
}

function toggleActivated(value: boolean, valueType?: 'start' | 'end') {
  const states = valueType
    ? valueType === 'start'
      ? [startState]
      : [endState]
    : [startState, endState]

  states.forEach(state => {
    (Object.keys(state.activated) as DateTimeType[]).forEach(type => {
      state.activated[type] = value
    })
  })
}

function getStringValue() {
  return Array.isArray(currentValue.value) ? currentValue.value.join('|') : currentValue.value
}

function isDateDisabled(date: Date) {
  if (typeof props.disabledDate === 'function') {
    if (props.disabledDate(date)) {
      return true
    }
  }

  const time = date.getTime()

  if (reversed.value) {
    if (time > max.value && time < min.value) {
      return true
    }
  } else {
    if (time < min.value || time > max.value) {
      return true
    }
  }

  return false
}

function verifyDate() {
  if (startError.value || (props.range && endError.value)) {
    parseValue(props.value)
  }
}

function setVisible(visible: boolean) {
  if (currentVisible.value === visible) return

  currentVisible.value = visible

  emit('update:visible', visible)
  emitEvent(props.onToggle, visible)
}

function emitChange() {
  verifyDate()

  if (lastValue.value !== getStringValue()) {
    lastValue.value = getStringValue()

    const values = Array.isArray(currentValue.value) ? currentValue.value : [currentValue.value]
    const emitValues: number[] = []
    const formattedValues: Dateable[] = []

    const valueFormat = props.valueFormat
    const formatValue: DatePickerFormatFn =
      typeof valueFormat === 'function'
        ? valueFormat
        : valueFormat
          ? timestamp => format(timestamp, valueFormat)
          : timestamp => timestamp

    for (let i = 0; i < 2; ++i) {
      if (props.type === 'year') {
        emitValues[i] = new Date(
          i === 0 ? startState.dateValue.year : endState.dateValue.year,
          0
        ).getTime()
      } else if (props.type !== 'datetime') {
        emitValues[i] = new Date(values[i].split(' ')[0] + ' 00:00:00').getTime()
      } else {
        emitValues[i] = new Date(values[i]).getTime()
      }

      formattedValues[i] = formatValue(emitValues[i])

      if (!props.range) break
    }

    const emitValue = props.range ? emitValues : emitValues[0]
    const formattedValue = props.range ? formattedValues : formattedValues[0]

    toggleActivated(true)
    emit('update:value', emitValue)
    emit('update:formatted-value', formattedValue)
    setFieldValue(emitValue)
    emitEvent(props.onChange as DatePickerChangeEvent, emitValue)
    validateField()
  }
}

function finishInput(shouldChange = true) {
  setVisible(false)

  shouldChange && emitChange()
  startState.resetColumn()
  endState.resetColumn()
}

function verifyValue(type: DateTimeType) {
  const dateValue = getCurrentState().dateValue

  switch (type) {
    case 'year': {
      dateValue.year = boundRange(dateValue.year, 1970, 9999)
      break
    }
    case 'month': {
      dateValue.month = boundRange(dateValue.month, 1, 12)
      break
    }
    case 'date': {
      const month = dateValue.month

      let lastDay

      if (month < 7) {
        if (month !== 2) {
          lastDay = 30 + (month % 2)
        } else {
          if (isLeapYear(dateValue.year)) {
            lastDay = 29
          } else {
            lastDay = 28
          }
        }
      } else {
        lastDay = 31 - (month % 2)
      }

      dateValue.date = boundRange(dateValue.date, 1, lastDay)
      break
    }
    case 'hour':
    case 'minute':
    case 'second': {
      dateValue[type] = boundRange(dateValue[type], 0, type === 'hour' ? 23 : 59)
      dateValue[type] = Math.round(dateValue[type] / getStep(type)) * getStep(type)
    }
  }
}

function handleFocused() {
  if (props.disabled) return

  focused.value = true

  timer.focus = setTimeout(() => {
    if (focused.value) {
      if (currentState.value === 'start') {
        startInput.value?.focus()
      } else {
        endInput.value?.focus()
      }
    }
  }, 120)
}

function handleBlur() {
  clearTimeout(timer.focus)

  focused.value = false
  startInput.value?.blur()
  endInput.value?.blur()
}

function showPanel(event: Event) {
  if (props.disabled || readonly.value) return

  const target = event.target as Node

  setVisible(true)

  if (wrapper.value && target) {
    const units = Array.from(wrapper.value.querySelectorAll(`.${nh.be('unit')}`))
    const index = units.findIndex(unit => unit === target || unit.contains(target))

    if (!~index) {
      startState.column = null
      endState.column = null
    }

    if (props.range && index >= units.length / 2) {
      toggleCurrentState('end')
    } else {
      toggleCurrentState('start')
    }
  }

  handleFocused()
}

function handleInput(value: number) {
  const state = getCurrentState()
  const type = state.column

  if (!type) return

  handleInputNumber(type, value)

  if (type === 'year' ? state.dateValue.year >= 1000 : state.dateValue[type] >= 10) {
    state.enterColumn('next', false)
  }
}

function handleInputNumber(type: DateTimeType, number: number) {
  const state = getCurrentState()
  const prev = state.dateValue[type]

  if (state.activated[type] && prev > 0 && prev < (type === 'year' ? 1000 : 10)) {
    state.dateValue[type] = prev * 10 + number
  } else {
    state.dateValue[type] = number
    setActivatedTrue(type)
  }

  type !== 'year' && verifyValue(type)
  emitEvent(props.onInput, type, state.dateValue[type])
}

function setActivatedTrue(type: DateTimeType) {
  const activated = getCurrentState().activated

  if (type === 'date') {
    activated.year = true
    activated.month = true
  } else if (type === 'month') {
    activated.year = true
  } else if (type === 'minute') {
    activated.hour = true
  } else if (type === 'second') {
    activated.hour = true
    activated.minute = true
  }

  activated[type] = true
}

function handleInputFocus(type: DateTimeType) {
  getCurrentState().column = type
}

function isTimeType(type: DateTimeType): type is TimeType {
  return ['hour', 'minute', 'second'].includes(type)
}

function handleAdjust(adjustType: 'plus' | 'minus', ctrlKey: boolean) {
  const isPlus = adjustType === 'plus'
  const sign = isPlus ? 1 : -1
  const state = getCurrentState()
  const type = state.column

  if (!type) return

  if (state.enabled[type]) {
    if (isTimeType(type)) {
      state.dateValue[type] += sign * (ctrlKey ? getCtrlStep(type) : getStep(type))
    } else {
      if (ctrlKey) {
        if (type === 'year') {
          state.dateValue.year += sign * 10
        } else {
          state.dateValue[type === 'date' ? 'month' : 'year'] += sign
        }
      } else {
        state.dateValue[type] += sign
      }

      computeDate()
      updateDateActivated(type)
    }

    verifyValue(type)
    emitEvent(props[isPlus ? 'onPlus' : 'onMinus'], type, state.dateValue[type])
    datePanel.value?.refreshCalendar(currentState.value)
  }
}

function handlePlus(ctrlKey: boolean) {
  handleAdjust('plus', ctrlKey)
}

function handleMinus(ctrlKey: boolean) {
  handleAdjust('minus', ctrlKey)
}

function computeDate() {
  const dateValue = getCurrentState().dateValue
  const date = new Date(dateValue.year, dateValue.month - 1, dateValue.date)

  dateValue.year = date.getFullYear()
  dateValue.month = date.getMonth() + 1
  dateValue.date = date.getDate()
}

function fallbackFocus() {
  requestAnimationFrame(() => {
    handleBlur()
    reference.value?.focus()
  })
}

function handleEnter() {
  fallbackFocus()
  finishInput()
  emitEvent(props.onEnter)
}

function handleCancel() {
  fallbackFocus()
  parseValue(lastValue.value.split('|'))
  finishInput(false)
  emitEvent(props.onCancel)
}

function handleClear(finish = true) {
  if (props.disabled || readonly.value) return

  if (props.clearable) {
    nextTick(() => {
      const emitValue = props.range ? ([] as number[]) : null

      parseValue(null)
      finish && finishInput(false)
      emit('update:value', emitValue)
      emit('update:formatted-value', props.range ? [] : null)
      emitEvent(props.onChange as DatePickerChangeEvent, emitValue)
      emitEvent(props.onClear)
      clearField(emitValue!)
      finish && handleBlur()

      lastValue.value = ''

      nextTick(() => {
        toggleActivated(false)
      })
    })
  }
}

function handleShortcut(name: string, value: Dateable | Dateable[]) {
  fallbackFocus()
  parseValue(value)
  emitEvent(props.onShortcut as (name: string, value: Dateable | Dateable[]) => void, name, value)
  finishInput()
}

// 只有时分秒
function getStep(type: TimeType) {
  return props.steps[type === 'hour' ? 0 : type === 'minute' ? 1 : 2] || 1
}

// 只有时分秒
function getCtrlStep(type: TimeType) {
  return props.ctrlSteps[type === 'hour' ? 0 : type === 'minute' ? 1 : 2] || 1
}

function handleDateHover(hoverDate: Date | null) {
  if (props.range && hoverDate) {
    hoveredDate.value = hoverDate

    if (firstSelected.value) {
      const hoverValues = [hoverDate.getFullYear(), hoverDate.getMonth() + 1, hoverDate.getDate()]
      const start = hoveredLarge.value ? firstSelected.value : hoverValues
      const end = hoveredLarge.value ? hoverValues : firstSelected.value

      let types: DateTimeType[]

      if (props.type === 'year') {
        types = ['year']
      } else if (props.type === 'month') {
        types = ['year', 'month']
      } else {
        types = ['year', 'month', 'date']
      }

      for (let i = 0, len = types.length; i < len; ++i) {
        startState.dateValue[types[i]] = start[i]
        endState.dateValue[types[i]] = end[i]
      }
    }
  }
}

function handlePanelChange(values: number[]) {
  let types: DateTimeType[]

  if (props.type === 'year') {
    types = ['year']
  } else if (props.type === 'month') {
    types = ['year', 'month']
  } else {
    types = ['year', 'month', 'date']
  }

  if (!props.range) {
    for (let i = 0, len = types.length; i < len; ++i) {
      startState.dateValue[types[i]] = values[i]
      updateDateActivated(types[i], 'start')
    }

    if (noActionMode.value) handleEnter()

    return
  }

  if (!firstSelected.value) {
    firstSelected.value = values

    for (let i = 0, len = types.length; i < len; ++i) {
      startState.dateValue[types[i]] = values[i]
      endState.dateValue[types[i]] = values[i]
      updateDateActivated(types[i], 'start')
      updateDateActivated(types[i], 'end')
    }
  } else {
    const [year, month, date] = firstSelected.value
    const firstTime = new Date(`${year}-${month}-${date}`).getTime()
    const secondTime = new Date(`${values[0]}-${values[1]}-${values[2]}`).getTime()
    const start = firstTime < secondTime ? firstSelected.value : values
    const end = firstTime < secondTime ? values : firstSelected.value

    for (let i = 0, len = types.length; i < len; ++i) {
      startState.dateValue[types[i]] = start[i]
      endState.dateValue[types[i]] = end[i]
      updateDateActivated(types[i], 'start')
      updateDateActivated(types[i], 'end')
    }

    verifyRangeValue()
    firstSelected.value = undefined

    if (noActionMode.value) handleEnter()
  }
}

function handleTimeChange(valueType: 'start' | 'end', type: TimeType, time: number) {
  const state = valueType === 'start' ? startState : endState

  state.dateValue[type] = time
  updateDateActivated('hour', valueType)
  updateDateActivated('minute', valueType)
  updateDateActivated('second', valueType)
}

function updateDateActivated(type: DateTimeType, valueType?: 'start' | 'end') {
  const state = valueType ? (valueType === 'start' ? startState : endState) : getCurrentState()

  if (type === 'month') {
    state.activated.year = true
  } else if (type === 'date') {
    state.activated.year = true
    state.activated.month = true
  }

  state.activated[type] = true
}

function verifyRangeValue() {
  if (!props.range) return

  const startDate = startState.getDate()
  const endDate = endState.getDate()

  if (startDate.getTime() > endDate.getTime()) {
    startState.setDate(endDate)
    endState.setDate(startDate)
  }
}

function toggleCurrentState(type: 'start' | 'end') {
  currentState.value = type
}

function enterColumn(type: 'prev' | 'next') {
  if (props.range) {
    if (type === 'prev' && currentState.value === 'start' && !startState.column) {
      toggleCurrentState('end')
    }

    const state = getCurrentState()
    const currentColumn = state.column

    state.enterColumn(type, !currentColumn)

    if (currentColumn === state.column) {
      const isStart = currentState.value === 'start'
      const otherState = isStart ? endState : startState

      otherState.resetColumn(type === 'prev' ? 'second' : 'year', type === 'prev')
      toggleCurrentState(isStart ? 'end' : 'start')
    }
  } else {
    startState.enterColumn(type)
  }
}

function handleStartInput(type: DateTimeType) {
  toggleCurrentState('start')
  handleInputFocus(type)

  nextTick(() => {
    datePanel.value?.refreshCalendar('start')
  })
}

function handleEndInput(type: DateTimeType) {
  toggleCurrentState('end')
  handleInputFocus(type)

  nextTick(() => {
    datePanel.value?.refreshCalendar('end')
  })
}

function handleClickOutside() {
  emitEvent(props.onClickOutside)

  if (props.outsideClose && currentVisible.value) {
    finishInput(!noActionMode.value && !props.outsideCancel)
    handleBlur()
    emitEvent(props.onOutsideClose)
  }
}
</script>

<template>
  <div
    :id="idFor"
    ref="wrapper"
    :class="className"
    @click="showPanel"
  >
    <div
      ref="reference"
      :class="selectorClass"
      tabindex="0"
      @keydown.space.prevent="showPanel"
      @keydown.backspace.prevent="handleClear(false)"
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
        <DateControl
          ref="start"
          :unit-type="currentState === 'start' ? startState.column! : ''"
          :enabled="startState.enabled"
          :activated="startState.activated"
          :date-value="startState.dateValue"
          :steps="props.steps"
          :ctrl-steps="props.ctrlSteps"
          :focused="focused"
          :visible="currentVisible"
          :date-separator="props.dateSeparator"
          :time-separator="props.timeSeparator"
          :filler="props.filler"
          :labels="props.labels"
          :has-error="startError"
          :placeholder="startPlaceholder"
          :readonly="props.unitReadonly"
          @input="handleInput"
          @plus="handlePlus"
          @minus="handleMinus"
          @enter="handleEnter"
          @cancel="handleCancel"
          @unit-focus="handleStartInput"
          @prev-unit="enterColumn('prev')"
          @next-unit="enterColumn('next')"
          @blur="startState.column = null"
        ></DateControl>
        <template v-if="props.range">
          <div :class="nh.be('exchange')">
            <slot name="exchange">
              <Icon v-bind="icons.exchange" style="padding-top: 1px"></Icon>
            </slot>
          </div>
          <DateControl
            ref="end"
            :unit-type="currentState === 'end' ? endState.column! : ''"
            :enabled="endState.enabled"
            :activated="endState.activated"
            :date-value="endState.dateValue"
            :steps="props.steps"
            :ctrl-steps="props.ctrlSteps"
            :focused="focused"
            :visible="currentVisible"
            :date-separator="props.dateSeparator"
            :time-separator="props.timeSeparator"
            :filler="props.filler"
            :labels="props.labels"
            :has-error="endError"
            :placeholder="endPlaceholder"
            :readonly="props.unitReadonly"
            @input="handleInput"
            @plus="handlePlus"
            @minus="handleMinus"
            @enter="handleEnter"
            @cancel="handleCancel"
            @unit-focus="handleEndInput"
            @prev-unit="enterColumn('prev')"
            @next-unit="enterColumn('next')"
            @blur="endState.column = null"
          ></DateControl>
        </template>
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
          <Icon v-bind="icons.calendar" :icon="props.suffix || icons.calendar.icon"></Icon>
        </slot>
      </div>
      <div
        v-else-if="props.clearable || props.loading"
        :class="[nh.be('icon'), nh.bem('icon', 'placeholder'), nh.be('suffix')]"
      ></div>
      <Transition :name="nh.ns('fade')" appear>
        <div v-if="showClear" :class="[nh.be('icon'), nh.be('clear')]" @click.stop="handleClear()">
          <Icon v-bind="icons.clear" label="clear"></Icon>
        </div>
        <div v-else-if="props.loading" :class="[nh.be('icon'), nh.be('loading')]">
          <Icon
            v-bind="icons.loading"
            :effect="props.loadingEffect || icons.loading.effect"
            :icon="props.loadingIcon || icons.loading.icon"
            label="loading"
          ></Icon>
        </div>
      </Transition>
    </div>
    <Popper
      ref="popper"
      :class="[nh.be('popper'), nh.ns('calendar-vars'), nh.ns('time-picker-vars'), nh.bs('vars')]"
      :visible="currentVisible"
      :to="transferTo"
      :transition="props.transitionName"
      :alive="props.popperAlive ?? !transferTo"
      @click.stop="handleFocused"
    >
      <DatePanel
        ref="panel"
        :type="props.type"
        :start-value="startState.dateValue"
        :end-value="endState.dateValue"
        :start-activated="startState.activated"
        :end-activated="endState.activated"
        :value-type="currentState"
        :shortcuts="props.shortcuts"
        :confirm-text="props.confirmText"
        :cancel-text="props.cancelText"
        :today="props.today"
        :no-action="props.noAction"
        :steps="props.steps"
        :range="props.range"
        :min="props.min"
        :max="props.max"
        :disabled-date="isDateDisabled"
        :disabled-time="isTimeDisabled"
        :has-error="startError || endError"
        :selecting-type="hoveredLarge ? 'end' : 'start'"
        :locale="mergedLocale"
        :week-start="props.weekStart"
        @shortcut="handleShortcut"
        @change="handlePanelChange"
        @confirm="handleEnter"
        @cancel="handleCancel"
        @hover="handleDateHover"
        @time-change="handleTimeChange"
      ></DatePanel>
    </Popper>
  </div>
</template>
