<template>
  <div
    ref="wrapper"
    :class="className"
    @click="handleTirggerClick"
    @clickoutside="finishInput"
  >
    <div ref="reference" :class="`${prefixCls}__control`">
      <div v-if="hasPrefix" :class="`${prefixCls}__icon--prefix`" :style="{ color: prefixColor }">
        <slot name="prefix">
          <Icon :icon="prefix"></Icon>
        </slot>
      </div>
      <DateControl
        ref="start"
        :unit-type="currentState === 'start' ? startState.column : ''"
        :enabled="startState.enabled"
        :activated="startState.activated"
        :date-value="startState.dateValue"
        :steps="steps"
        :ctrl-steps="ctrlSteps"
        :focused="focused"
        :visible="currentVisible"
        :date-separator="dateSeparator"
        :time-separator="timeSeparator"
        :filler="filler"
        :no-filler="noFiller"
        :labels="labels"
        @on-input="handleInput"
        @on-plus="handlePlus"
        @on-minus="handleMinus"
        @on-enter="handlePaneConfirm"
        @on-cancel="handleCancel"
        @on-unit-focus="handleStartInput"
        @on-prev-unit="enterColumn('prev')"
        @on-next-unit="enterColumn('next')"
      ></DateControl>
      <template v-if="isRange">
        <div :class="`${prefixCls}__exchange`">
          <Icon><ArrowRightArrowLeft></ArrowRightArrowLeft></Icon>
        </div>
        <DateControl
          ref="end"
          :unit-type="currentState === 'end' ? endState.column : ''"
          :enabled="endState.enabled"
          :activated="endState.activated"
          :date-value="endState.dateValue"
          :steps="steps"
          :ctrl-steps="ctrlSteps"
          :focused="focused"
          :visible="currentVisible"
          :date-separator="dateSeparator"
          :time-separator="timeSeparator"
          :filler="filler"
          :no-filler="noFiller"
          :labels="labels"
          @on-input="handleInput"
          @on-plus="handlePlus"
          @on-minus="handleMinus"
          @on-enter="handlePaneConfirm"
          @on-cancel="handleCancel"
          @on-unit-focus="handleEndInput"
          @on-prev-unit="enterColumn('prev')"
          @on-next-unit="enterColumn('next')"
        ></DateControl>
      </template>
      <transition name="vxp-fade">
        <div
          v-if="!disabled && clearable && isHover && lastValue"
          :class="`${prefixCls}__clear`"
          @click.stop="handleClear"
        >
          <Icon><CircleXmark></CircleXmark></Icon>
        </div>
        <div v-else :class="`${prefixCls}__icon--suffix`" :style="{ color: suffixColor }">
          <slot name="suffix">
            <Icon :icon="suffix || CalendarR"></Icon>
          </slot>
        </div>
      </transition>
      <Portal :to="transferTo">
        <transition :name="transitionName" @after-leave="handlePaneHide">
          <div
            v-show="currentVisible"
            ref="popper"
            :class="[`${prefixCls}__popper`, 'vxp-calendar-vars', `${prefixCls}-vars`]"
            @click.stop="handleFocused"
          >
            <DatePane
              ref="pane"
              :type="type"
              :column="(currentState === 'start' ? startState : endState).column"
              :start-value="startState.dateValue"
              :end-value="endState.dateValue"
              :start-activated="startState.activated"
              :end-activated="endState.activated"
              :value-type="currentState"
              :shortcuts="shortcuts"
              :confirm-text="confirmText"
              :cancel-text="cancelText"
              :today="today"
              :disabled-date="disabledDate"
              :no-action="noAction"
              :steps="steps"
              :is-range="isRange"
              @on-shortcut="handleShortcut"
              @on-change="handlePaneChange"
              @on-toggle-col="handleInputFocus"
              @on-cancel="handleCancel"
              @on-confirm="handlePaneConfirm"
            ></DatePane>
          </div>
        </transition>
      </Portal>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, watch, inject, toRef, nextTick } from 'vue'
import { Icon } from '@/components/icon'
import { Portal } from '@/components/portal'
import DateControl from './date-control.vue'
import DatePane from './date-pane.vue'
import { VALIDATE_FIELD, CLEAR_FIELD } from '@/components/form-item'
import { useHover, usePopper, placementWhileList, useClickOutside } from '@vexip-ui/mixins'
import { useConfiguredProps, createSizeProp, createStateProp } from '@vexip-ui/config'
import { noop, toDate, isLeepYear, doubleDigits, boundRange } from '@vexip-ui/utils'
import { CalendarR, CircleXmark, ArrowRightArrowLeft } from '@vexip-ui/icons'
import { useColumn } from './helper'

import type { PropType } from 'vue'
import type { Placement } from '@vexip-ui/mixins'
import type { Dateable } from '@vexip-ui/utils'
import type { TimeType, DateTimeType, DatePickerType, DateShortcut } from './symbol'

const props = useConfiguredProps('datePicker', {
  size: createSizeProp(),
  state: createStateProp(),
  type: {
    default: 'date' as DatePickerType,
    validator: (value: DatePickerType) => {
      return ['date', 'datetime', 'year', 'month'].includes(value)
    }
  },
  visible: {
    type: Boolean,
    default: false
  },
  placement: {
    type: String as PropType<Placement>,
    default: 'bottom-start',
    validator: (value: Placement) => {
      return placementWhileList.includes(value)
    }
  },
  transfer: {
    type: [Boolean, String],
    default: false
  },
  value: {
    type: [Number, String, Date, Array] as PropType<Dateable | Dateable[]>,
    default: () => new Date()
  },
  format: {
    type: String,
    default: 'yyyy-MM-dd HH:mm:ss'
  },
  filler: {
    type: String,
    default: '-',
    validator: (value: string) => value.length === 1
  },
  noFiller: {
    type: Boolean,
    default: false
  },
  clearable: {
    type: Boolean,
    default: false
  },
  noAction: {
    type: Boolean,
    default: false
  },
  labels: {
    type: Object as PropType<Partial<Record<DateTimeType, string>>>,
    default: () => ({})
  },
  dateSeparator: {
    type: String,
    default: '/'
  },
  timeSeparator: {
    type: String,
    default: ':'
  },
  shortcuts: {
    type: Array as PropType<DateShortcut[]>,
    default: () => []
  },
  disabledDate: {
    type: Function as PropType<(date: Date) => boolean>,
    default: () => false
  },
  steps: {
    type: Array as PropType<number[]>,
    default: () => [1, 1, 1]
  },
  ctrlSteps: {
    type: Array as PropType<number[]>,
    default: () => [5, 5, 5]
  },
  prefix: {
    type: Object,
    default: null
  },
  prefixColor: {
    type: String,
    default: ''
  },
  suffix: {
    type: Object,
    default: null
  },
  suffixColor: {
    type: String,
    default: ''
  },
  disabled: {
    type: Boolean,
    default: false
  },
  transitionName: {
    type: String,
    default: 'vxp-drop'
  },
  // okText: {
  //   type: String,
  //   default: '确认'
  // },
  confirmText: {
    type: String,
    default: null
  },
  cancelText: {
    type: String,
    default: null
  },
  today: {
    type: [Number, String, Date] as PropType<Dateable>,
    default: () => new Date(),
    validator: (value: Dateable) => !Number.isNaN(new Date(value))
  },
  isRange: {
    type: Boolean,
    default: false
  },
  disableValidate: {
    type: Boolean,
    default: false
  }
})

export default defineComponent({
  name: 'DatePicker',
  components: {
    DateControl,
    DatePane,
    Icon,
    Portal,
    CircleXmark,
    ArrowRightArrowLeft
  },
  props,
  emits: [
    'on-input',
    'on-plus',
    'on-minus',
    'on-enter',
    'on-cancel',
    'on-change',
    'on-clear',
    'on-shortcut',
    'on-toggle',
    'on-focus',
    'on-blur',
    'on-change-col',
    'update:value',
    'update:visible'
  ],
  setup(props, { slots, emit }) {
    const validateField = inject(VALIDATE_FIELD, noop)
    const clearField = inject(CLEAR_FIELD, noop)

    const prefix = 'vxp-date-picker'
    const placement = toRef(props, 'placement')
    const transfer = toRef(props, 'transfer')
    const currentVisible = ref(props.visible)
    const focused = ref(false)
    const startState = createDateState()
    const endState = createDateState()
    const currentState = ref<'start' | 'end'>('start')
    const lastValue = ref('')

    const wrapper = useClickOutside()

    const { reference, popper, transferTo, updatePopper } = usePopper({
      placement,
      transfer,
      wrapper,
      isDrop: true
    })
    const { isHover } = useHover(reference)

    const startInput = ref<InstanceType<typeof DateControl> | null>(null)
    const endInput = ref<InstanceType<typeof DateControl> | null>(null)
    const datePane = ref<InstanceType<typeof DatePane> | null>(null)

    const className = computed(() => {
      return [
        prefix,
        'vxp-input-vars',
        `${prefix}-vars`,
        `${prefix}--${props.type}`,
        {
          [`${prefix}--disabled`]: props.disabled,
          [`${prefix}--${props.size}`]: props.size !== 'default',
          [`${prefix}--no-hour`]: !startState.enabled.hour,
          [`${prefix}--no-minute`]: !startState.enabled.minute,
          [`${prefix}--no-second`]: !startState.enabled.second,
          [`${prefix}--focused`]: focused.value,
          [`${prefix}--${props.state}`]: props.state !== 'default',
          [`${prefix}--is-range`]: props.isRange
        }
      ]
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

      emit('on-toggle', value)
      emit('update:visible', value)
    })
    watch(focused, value => {
      if (value) {
        emit('on-focus')
      } else {
        emit('on-blur')
      }
    })
    watch(
      () => startState.column,
      value => {
        if (currentVisible.value) {
          emit('on-change-col', value)
        }
      }
    )
    watch(
      () => endState.column,
      value => {
        if (currentVisible.value) {
          emit('on-change-col', value)
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

      for (let i = 0; i < 2; i++) {
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

        for (let i = 0; i < 2; i++) {
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
        emit('on-change', emitValue)
        emit('update:value', emitValue)

        if (!props.disableValidate) {
          validateField()
        }
      }
    }

    function finishInput() {
      currentVisible.value = false
      focused.value = false

      startState.resetColumn('date')
      endState.resetColumn('date')
    }

    function verifyValue(type: DateTimeType) {
      const dateValue = getCurrentState().dateValue

      switch (type) {
        case 'year': {
          dateValue.year = boundRange(dateValue.year, 1970, 2300)
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

      window.setTimeout(() => {
        if (focused.value) {
          if (currentState.value === 'start') {
            startInput.value?.focus()
          } else {
            endInput.value?.focus()
          }
        }
      }, 120)
    }

    function handleTirggerClick() {
      if (props.disabled) return

      currentVisible.value = true

      handleFocused()
    }

    function handleInput(value: number) {
      const state = getCurrentState()

      handleInputNumber(state.column, value)

      if (
        (state.column === 'year' && state.dateValue.year >= 1000) ||
        (state.column !== 'second' && state.dateValue[state.column] >= 10)
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

      verifyValue(type)
      emit('on-input', type, state.dateValue[type])
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
        emit(isPlus ? 'on-plus' : 'on-minus', type, state.dateValue[type])
        datePane.value?.refreshCalendar()
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
      emit('on-enter')
    }

    function handleCancel() {
      parseValue(props.value)
      finishInput()
      emit('on-cancel')
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
          emit('on-clear')
          emit('on-change', emitValue)
          emit('update:value', emitValue)
          clearField()

          nextTick(() => {
            toggleActivated(false)
          })
        })
      }
    }

    function handleShortcut(name: string, value: Dateable) {
      parseValue(value)
      emit('on-shortcut', name, value)
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

    function handlePaneChange(type: DateTimeType, value: number) {
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
        datePane.value?.refreshCalendar()
      })
    }

    function handleEndInput(type: TimeType) {
      toggleCurrentState('end')
      handleInputFocus(type)

      nextTick(() => {
        datePane.value?.refreshCalendar()
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
      datePane.value?.refreshCalendar()
    }

    return {
      CalendarR,

      prefixCls: prefix,
      currentVisible,
      focused,
      transferTo,
      isHover,
      startState,
      endState,
      lastValue,
      currentState,

      className,
      hasPrefix,
      startActivated,
      endActivated,

      wrapper,
      reference,
      popper,
      start: startInput,
      end: endInput,
      pane: datePane,

      handleFocused,
      handleTirggerClick,
      handleInput,
      handleInputFocus,
      handlePlus,
      handleMinus,
      handleEnter,
      handleCancel,
      handleClear,
      handleShortcut,
      handlePaneChange,
      finishInput,
      toggleCurrentState,
      enterColumn,
      handleStartInput,
      handleEndInput,
      handlePaneConfirm,
      handlePaneHide,

      updatePopper
    }
  }
})
</script>
