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
          :unit-type="currentState === 'start' ? startState.column : ''"
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
          :no-filler="props.noFiller"
          :labels="props.labels"
          @input="handleInput"
          @plus="handlePlus"
          @minus="handleMinus"
          @enter="handlePaneConfirm"
          @cancel="handleCancel"
          @unit-focus="handleStartInput"
          @prev-unit="enterColumn('prev')"
          @next-unit="enterColumn('next')"
        ></DateControl>
        <template v-if="props.isRange">
          <div :class="nh.be('exchange')">
            <Icon><ArrowRightArrowLeft></ArrowRightArrowLeft></Icon>
          </div>
          <DateControl
            ref="end"
            :unit-type="currentState === 'end' ? endState.column : ''"
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
            :no-filler="props.noFiller"
            :labels="props.labels"
            @input="handleInput"
            @plus="handlePlus"
            @minus="handleMinus"
            @enter="handlePaneConfirm"
            @cancel="handleCancel"
            @unit-focus="handleEndInput"
            @prev-unit="enterColumn('prev')"
            @next-unit="enterColumn('next')"
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
          <Icon :icon="props.suffix || CalendarR"></Icon>
        </slot>
      </div>
      <div
        v-else-if="props.clearable || props.loading"
        :class="[nh.be('icon'), nh.bem('icon', 'placeholder'), nh.be('suffix')]"
      ></div>
      <transition :name="nh.ns('fade')" appear>
        <div v-if="showClear" :class="[nh.be('icon'), nh.be('clear')]" @click.stop="handleClear">
          <Icon><CircleXmark></CircleXmark></Icon>
        </div>
        <div v-else-if="props.loading" :class="[nh.be('icon'), nh.be('loading')]">
          <Icon
            :spin="props.loadingSpin"
            :pulse="!props.loadingSpin"
            :icon="props.loadingIcon"
          ></Icon>
        </div>
      </transition>
    </div>
    <Portal :to="transferTo">
      <transition :name="props.transitionName" @after-leave="handlePaneHide">
        <div
          v-show="currentVisible"
          ref="popper"
          :class="[nh.be('popper'), nh.ns('calendar-vars'), nh.bs('vars')]"
          @click.stop="handleFocused"
        >
          <DatePanel
            ref="panel"
            :type="props.type"
            :column="(currentState === 'start' ? startState : endState).column"
            :start-value="startState.dateValue"
            :end-value="endState.dateValue"
            :start-activated="startState.activated"
            :end-activated="endState.activated"
            :value-type="currentState"
            :shortcuts="props.shortcuts"
            :confirm-text="props.confirmText"
            :cancel-text="props.cancelText"
            :today="props.today"
            :disabled-date="props.disabledDate"
            :no-action="props.noAction"
            :steps="props.steps"
            :is-range="props.isRange"
            @shortcut="handleShortcut"
            @change="handlePanelChange"
            @toggle-col="handleInputFocus"
            @cancel="handleCancel"
            @confirm="handlePaneConfirm"
          ></DatePanel>
        </div>
      </transition>
    </Portal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, watch, toRef, nextTick } from 'vue'
import { Icon } from '@/components/icon'
import { Portal } from '@/components/portal'
import DateControl from './date-control.vue'
import DatePanel from './date-panel.vue'
import { useFieldStore } from '@/components/form'
import {
  useHover,
  usePopper,
  placementWhileList,
  useClickOutside,
  useSetTimeout
} from '@vexip-ui/mixins'
import {
  useNameHelper,
  useProps,
  booleanProp,
  booleanStringProp,
  sizeProp,
  stateProp,
  createSizeProp,
  createStateProp,
  eventProp,
  emitEvent
} from '@vexip-ui/config'
import { toDate, isLeepYear, doubleDigits, boundRange } from '@vexip-ui/utils'
import { CalendarR, CircleXmark, ArrowRightArrowLeft, Spinner } from '@vexip-ui/icons'
import { useColumn } from './helper'
import { datePickerTypes } from './symbol'

import type { PropType } from 'vue'
import type { Placement } from '@vexip-ui/mixins'
import type { Dateable } from '@vexip-ui/utils'
import type { TimeType, DateTimeType, DatePickerType, DateShortcut } from './symbol'

export default defineComponent({
  name: 'DatePicker',
  components: {
    DateControl,
    DatePanel,
    Icon,
    Portal,
    CircleXmark,
    ArrowRightArrowLeft
  },
  props: {
    size: sizeProp,
    state: stateProp,
    type: String as PropType<DatePickerType>,
    visible: booleanProp,
    placement: String as PropType<Placement>,
    transfer: booleanStringProp,
    value: [Number, String, Date, Array] as PropType<Dateable | Dateable[]>,
    format: String,
    filler: String,
    noFiller: booleanProp,
    clearable: booleanProp,
    noAction: booleanProp,
    labels: Object as PropType<Partial<Record<DateTimeType, string>>>,
    dateSeparator: String,
    timeSeparator: String,
    shortcuts: Array as PropType<DateShortcut[]>,
    disabledDate: Function as PropType<(date: Date) => boolean>,
    steps: Array as PropType<number[]>,
    ctrlSteps: Array as PropType<number[]>,
    prefix: Object,
    prefixColor: String,
    suffix: Object,
    suffixColor: String,
    noSuffix: booleanProp,
    disabled: booleanProp,
    transitionName: String,
    confirmText: String,
    cancelText: String,
    today: [Number, String, Date] as PropType<Dateable>,
    isRange: booleanProp,
    loading: booleanProp,
    loadingIcon: Object,
    loadingLock: booleanProp,
    loadingSpin: booleanProp,
    onInput: eventProp<(type: DateTimeType, value: number) => void>(),
    onPlus: eventProp<(type: DateTimeType, value: number) => void>(),
    onMinus: eventProp<(type: DateTimeType, value: number) => void>(),
    onEnter: eventProp(),
    onCancel: eventProp(),
    onChange: eventProp<(value: string | number | string[] | number[] | null) => void>(),
    onClear: eventProp(),
    onShortcut: eventProp<(name: string, value: Dateable | Dateable[]) => void>(),
    onToggle: eventProp<(visible: boolean) => void>(),
    onFocus: eventProp(),
    onBlur: eventProp(),
    onChangeCol: eventProp<(type: DateTimeType, inputType: 'start' | 'end') => void>(),
    onClickOutside: eventProp()
  },
  emits: ['update:value', 'update:visible'],
  setup(_props, { slots, emit }) {
    const {
      idFor,
      state,
      disabled,
      loading,
      validateField,
      clearField,
      getFieldValue,
      setFieldValue
    } = useFieldStore<Dateable | Dateable[]>(() => reference.value?.focus())

    const nh = useNameHelper('date-picker')
    const props = useProps('datePicker', _props, {
      size: createSizeProp(),
      state: createStateProp(state),
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
        default: () => getFieldValue(new Date()),
        static: true
      },
      format: 'yyyy-MM-dd HH:mm:ss',
      filler: {
        default: '-',
        validator: value => value.length === 1
      },
      noFiller: false,
      clearable: false,
      noAction: false,
      labels: () => ({}),
      dateSeparator: '/',
      timeSeparator: ':',
      shortcuts: () => [],
      disabledDate: {
        default: () => false,
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
      isRange: false,
      loading: () => loading.value,
      loadingIcon: Spinner,
      loadingLock: false,
      loadingSpin: false
    })

    const placement = toRef(props, 'placement')
    const transfer = toRef(props, 'transfer')
    const currentVisible = ref(props.visible)
    const focused = ref(false)
    const startState = createDateState()
    const endState = createDateState()
    const currentState = ref<'start' | 'end'>('start')
    const lastValue = ref('')

    const { timer } = useSetTimeout()

    const wrapper = useClickOutside(handleClickOutside)
    const { reference, popper, transferTo, updatePopper } = usePopper({
      placement,
      transfer,
      wrapper,
      isDrop: true
    })
    const { isHover } = useHover(reference)

    const startInput = ref<InstanceType<typeof DateControl> | null>(null)
    const endInput = ref<InstanceType<typeof DateControl> | null>(null)
    const datePanel = ref<InstanceType<typeof DatePanel> | null>(null)

    const className = computed(() => {
      return [
        nh.b(),
        nh.ns('input-vars'),
        nh.bs('vars'),
        nh.bm(props.type),
        {
          [nh.bm('disabled')]: props.disabled,
          [nh.bm(props.size)]: props.size !== 'default',
          [nh.bm('no-hour')]: !startState.enabled.hour,
          [nh.bm('no-minute')]: !startState.enabled.minute,
          [nh.bm('no-second')]: !startState.enabled.second,
          [nh.bm('visible')]: currentVisible.value,
          [nh.bm(props.state)]: props.state !== 'default',
          [nh.bm('is-range')]: props.isRange
        }
      ]
    })
    const selectorClass = computed(() => {
      const baseCls = nh.be('selector')

      return {
        [baseCls]: true,
        [`${baseCls}--disabled`]: props.disabled,
        [`${baseCls}--loading`]: props.loading && props.loadingLock,
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

      return props.isRange ? values : values[0]
    })
    const startActivated = computed(() => {
      const activated = startState.activated

      return activated.year && activated.month && activated.date
    })
    const endActivated = computed(() => {
      const activated = endState.activated

      return activated.year && activated.month && activated.date
    })
    const showClear = computed(() => {
      return !props.disabled && props.clearable && isHover.value && !!lastValue.value
    })

    startState.enabled.year = true
    endState.enabled.year = true

    nextTick(() => {
      startState.resetColumn('date')
      endState.resetColumn('date')
    })

    watch(() => props.type, parseFormat)
    watch(
      () => props.value,
      value => {
        parseValue(value)
      },
      { immediate: true }
    )
    watch(
      () => props.type,
      value => {
        const hasMonth = value !== 'year'
        const hasDate = hasMonth && value !== 'month'

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
      } else {
        emitChange()
      }

      emitEvent(props.onToggle, value)
      emit('update:visible', value)
    })
    watch(focused, value => {
      if (value) {
        emitEvent(props.onFocus)
      } else {
        emitEvent(props.onBlur)
      }
    })
    watch(currentState, value => {
      if (currentVisible.value) {
        emitEvent(props.onChangeCol, getCurrentState().column, value)
      }
    })
    watch(
      () => startState.column,
      value => {
        if (currentVisible.value && currentState.value === 'start') {
          emitEvent(props.onChangeCol, value, 'start')
        }
      }
    )
    watch(
      () => endState.column,
      value => {
        if (currentVisible.value && currentState.value === 'end') {
          emitEvent(props.onChangeCol, value, 'end')
        }
      }
    )
    watch(
      () => props.disabled,
      value => {
        if (value) {
          currentVisible.value = false
          handleBlur()
        }
      }
    )
    watch(
      () => props.loading,
      value => {
        if (value && props.loadingLock) {
          currentVisible.value = false
        }
      }
    )
    watch(
      () => props.loadingLock,
      value => {
        if (props.loading && value) {
          currentVisible.value = false
        }
      }
    )

    function createDateState() {
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

      return reactive({
        column: currentColumn,
        enabled,
        activated,
        dateValue,
        resetColumn,
        enterColumn,
        setDate: (date: Date) => {
          dateValue.year = date.getFullYear()
          dateValue.month = date.getMonth() + 1
          dateValue.date = date.getDate()
          dateValue.hour = date.getHours()
          dateValue.minute = date.getMinutes()
          dateValue.second = date.getSeconds()
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
        }
      })
    }

    function getCurrentState() {
      return currentState.value === 'start' ? startState : endState
    }

    function rawValueToDate(value: Dateable) {
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
        date = new Date(props.today)
      }

      return date
    }

    function parseValue(value: Dateable | Dateable[]) {
      if (!Array.isArray(value)) {
        value = [value, value]
      }

      for (let i = 0; i < 2; ++i) {
        const date = rawValueToDate(value[i] ?? '')
        const state = i === 0 ? startState : endState

        state.setDate(date)

        if (!props.isRange) break
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

    function toggleActivated(value: boolean, type?: string) {
      const states = type ? (type === 'start' ? [startState] : [endState]) : [startState, endState]

      states.forEach(state => {
        (Object.keys(state.activated) as DateTimeType[]).forEach(type => {
          state.activated[type] = value
        })
      })
    }

    function getStringValue() {
      return Array.isArray(currentValue.value) ? currentValue.value.join('|') : currentValue.value
    }

    function emitChange() {
      if (lastValue.value !== getStringValue()) {
        lastValue.value = getStringValue()

        const values = Array.isArray(currentValue.value) ? currentValue.value : [currentValue.value]
        const emitValues: string[] | number[] = []

        for (let i = 0; i < 2; ++i) {
          if (props.type === 'year') {
            emitValues[i] = i === 0 ? startState.dateValue.year : endState.dateValue.year
          } else if (props.type !== 'datetime') {
            emitValues[i] = values[i].split(' ')[0]
          } else {
            emitValues[i] = values[i]
          }

          if (!props.isRange) break
        }

        const emitValue = props.isRange ? emitValues : emitValues[0]

        toggleActivated(true)
        setFieldValue(emitValue)
        emitEvent(props.onChange, emitValue)
        emit('update:value', emitValue)
        validateField()
      }
    }

    function finishInput() {
      currentVisible.value = false

      startState.resetColumn('date')
      endState.resetColumn('date')
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
              if (isLeepYear(dateValue.year)) {
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
      if (props.disabled || (props.loading && props.loadingLock)) return

      const target = event.target as Node
      const lastVisible = currentVisible.value
      currentVisible.value = true

      handleFocused()

      if (!lastVisible && wrapper.value && target) {
        const units = Array.from(wrapper.value.querySelectorAll(`.${nh.be('unit')}`))

        if (!units.some(unit => unit === target || unit.contains(target))) {
          emitEvent(props.onChangeCol, getCurrentState().column, currentState.value)
        }
      }
    }

    function handleInput(value: number) {
      const state = getCurrentState()

      handleInputNumber(state.column, value)

      if (
        state.column === 'year' ? state.dateValue.year >= 1000 : state.dateValue[state.column] >= 10
      ) {
        state.enterColumn('next', false)
      }
    }

    function handleInputNumber(type: DateTimeType, number: number) {
      const state = getCurrentState()
      const prev = state.dateValue[type]

      if (
        (props.noFiller || state.activated[type]) &&
        prev > 0 &&
        prev < (type === 'year' ? 1000 : 10)
      ) {
        state.dateValue[type] = prev * 10 + number
      } else {
        state.dateValue[type] = number
        setActivated(type)
      }

      type !== 'year' && verifyValue(type)
      emitEvent(props.onInput, type, state.dateValue[type])
    }

    function setActivated(type: DateTimeType) {
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

    function handleInputFocus(type: TimeType) {
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
        datePanel.value?.refreshCalendar()
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

    function handleEnter() {
      finishInput()
      emitEvent(props.onEnter)
    }

    function handleCancel() {
      parseValue(props.value)
      finishInput()
      emitEvent(props.onCancel)
    }

    function resetValue() {
      [startState, endState].forEach(state => {
        state.dateValue.year = 1970
        state.dateValue.month = 1
        state.dateValue.date = 1
        state.dateValue.hour = 0
        state.dateValue.minute = 0
        state.dateValue.second = 0
      })

      lastValue.value = ''
    }

    function handleClear() {
      if (props.clearable) {
        finishInput()
        nextTick(() => {
          const emitValue = props.isRange ? ([] as string[] | number[]) : null

          resetValue()
          emitEvent(props.onChange, emitValue)
          emit('update:value', emitValue)
          emitEvent(props.onClear)
          clearField(emitValue!)

          nextTick(() => {
            toggleActivated(false)
          })
        })
      }
    }

    function handleShortcut(name: string, value: Dateable | Dateable[]) {
      parseValue(value)
      emitEvent(props.onShortcut, name, value)
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

    function handlePanelChange(type: DateTimeType, value: number) {
      getCurrentState().dateValue[type] = value
      updateDateActivated(type)
      verifyRangeValue()
    }

    function updateDateActivated(type: DateTimeType) {
      const state = getCurrentState()

      if (type === 'month') {
        state.activated.year = true
      } else if (type === 'date') {
        state.activated.year = true
        state.activated.month = true
      }

      state.activated[type] = true
    }

    function verifyRangeValue() {
      if (!props.isRange) return

      const startDate = startState.getDate()
      const endDate = endState.getDate()

      if (startDate.getTime() > endDate.getTime()) {
        if (currentState.value === 'start') {
          startState.setDate(endDate)
        } else {
          endState.setDate(startDate)
        }
      }
    }

    function toggleCurrentState(type: 'start' | 'end') {
      currentState.value = type
    }

    function enterColumn(type: 'prev' | 'next') {
      if (props.isRange) {
        const state = getCurrentState()
        const currentColumn = state.column

        state.enterColumn(type, false)

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

    function handleStartInput(type: TimeType) {
      toggleCurrentState('start')
      handleInputFocus(type)

      nextTick(() => {
        datePanel.value?.refreshCalendar()
      })
    }

    function handleEndInput(type: TimeType) {
      toggleCurrentState('end')
      handleInputFocus(type)

      nextTick(() => {
        datePanel.value?.refreshCalendar()
      })
    }

    function handlePaneConfirm() {
      if (!props.isRange) {
        handleEnter()
      } else {
        if (currentState.value === 'start' && !endActivated.value) {
          toggleActivated(true, 'start')
          currentState.value = 'end'
        } else if (currentState.value === 'end' && !startActivated.value) {
          toggleActivated(true, 'end')
          currentState.value = 'start'
        } else {
          handleEnter()
        }
      }
    }

    function handlePaneHide() {
      datePanel.value?.refreshCalendar()
    }

    function handleClickOutside() {
      emitEvent(props.onClickOutside)
      finishInput()
      handleBlur()
    }

    return {
      CalendarR,

      props,
      nh,
      idFor,
      currentVisible,
      focused,
      transferTo,
      isHover,
      startState,
      endState,
      lastValue,
      currentState,

      className,
      selectorClass,
      hasPrefix,
      startActivated,
      endActivated,
      showClear,

      wrapper,
      reference,
      popper,
      start: startInput,
      end: endInput,
      panel: datePanel,

      handleFocused,
      showPanel,
      handleInput,
      handleInputFocus,
      handlePlus,
      handleMinus,
      handleEnter,
      handleCancel,
      handleClear,
      handleShortcut,
      handlePanelChange,
      finishInput,
      toggleCurrentState,
      enterColumn,
      handleStartInput,
      handleEndInput,
      handlePaneConfirm,
      handlePaneHide,

      focus: handleFocused,
      blur: handleBlur,
      updatePopper
    }
  }
})
</script>
