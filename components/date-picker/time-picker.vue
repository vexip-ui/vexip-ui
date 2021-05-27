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
          <Icon :name="prefix"></Icon>
        </slot>
      </div>
      <TimeControl
        ref="start"
        :unit-type="currentState === 'start' ? startState.column : null"
        :enabled="startState.enabled"
        :activated="startState.activated"
        :time-value="startState.timeValue"
        :steps="steps"
        :ctrl-steps="ctrlSteps"
        :focused="focused"
        :visible="currentVisible"
        :separator="separator"
        :filler="filler"
        :no-filler="noFiller"
        @on-input="handleInput"
        @on-plus="handlePlus"
        @on-minus="handleMinus"
        @on-enter="handleEnter"
        @on-cancel="handleCancel"
        @on-unit-focus="handleStartInput"
        @on-prev-unit="enterColumn('prev')"
        @on-next-unit="enterColumn('next')"
      ></TimeControl>
      <template v-if="isRange">
        <div
          :class="[`${prefixCls}__exchange`, exchange ? `${prefixCls}__exchange--enabled` : '']"
          @click="handleExchangeClick"
        >
          <Icon name="exchange-alt"></Icon>
        </div>
        <TimeControl
          ref="end"
          :unit-type="currentState === 'end' ? endState.column : null"
          :enabled="endState.enabled"
          :activated="endState.activated"
          :time-value="endState.timeValue"
          :steps="steps"
          :ctrl-steps="ctrlSteps"
          :focused="focused"
          :visible="currentVisible"
          :separator="separator"
          :filler="filler"
          :no-filler="noFiller"
          @on-input="handleInput"
          @on-plus="handlePlus"
          @on-minus="handleMinus"
          @on-enter="handleEnter"
          @on-cancel="handleCancel"
          @on-unit-focus="handleEndInput"
          @on-prev-unit="enterColumn('prev')"
          @on-next-unit="enterColumn('next')"
        ></TimeControl>
      </template>
      <transition name="vxp-fade">
        <div
          v-if="!disabled && clearable && isHover && lastValue"
          :class="`${prefixCls}__clear`"
          @click.stop="handleClear"
        >
          <Icon name="times-circle"></Icon>
        </div>
        <div v-else :class="`${prefixCls}__icon--suffix`" :style="{ color: suffixColor }">
          <slot name="suffix">
            <Icon :name="suffix || 'regular/clock'"></Icon>
          </slot>
        </div>
      </transition>
    </div>
    <Portal :to="transferTo">
      <transition :name="transitionName">
        <div
          v-show="currentVisible"
          ref="popper"
          :class="`${prefixCls}__popper`"
          @click.stop="handleFocused"
        >
          <div :class="`${prefixCls}__pane`" @click="handleInputFocus(currentColumn)">
            <div v-if="shortcuts.length" :class="[`${prefixCls}__list`, `${prefixCls}__list--sub`]">
              <div
                v-for="(item, index) in shortcuts"
                :key="index"
                :class="`${prefixCls}__shortcut`"
                :title="item.name"
                @click="handleShortcut(index)"
              >
                {{ item.name }}
              </div>
            </div>
            <div :class="`${prefixCls}__list`">
              <div style="display: flex;">
                <TimeWheel
                  v-model:hour="startState.timeValue.hour"
                  v-model:minute="startState.timeValue.minute"
                  v-model:second="startState.timeValue.second"
                  :no-arrow="noArrow"
                  :candidate="candidate"
                  :steps="steps"
                  :pointer="pointer"
                  @on-change="handleWheelChange"
                  @on-toggle-col="handleStartInput"
                ></TimeWheel>
                <TimeWheel
                  v-if="isRange"
                  v-model:hour="endState.timeValue.hour"
                  v-model:minute="endState.timeValue.minute"
                  v-model:second="endState.timeValue.second"
                  :no-arrow="noArrow"
                  :candidate="candidate"
                  :steps="steps"
                  :pointer="pointer"
                  @on-change="handleWheelChange"
                  @on-toggle-col="handleEndInput"
                ></TimeWheel>
              </div>
              <div v-if="!noAction" :class="`${prefixCls}__action`">
                <Button type="text" size="small" @on-click="handleCancel">
                  {{ cancelText }}
                </Button>
                <Button type="primary" size="small" @on-click="finishInput">
                  {{ okText }}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </Portal>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, computed, watch, inject, toRef, nextTick } from 'vue'
import { Button } from '@/components/button'
import { Icon } from '@/components/icon'
import { Portal } from '@/components/portal'
import TimeControl from './time-control.vue'
import TimeWheel from './time-wheel.vue'
import { VALIDATE_FIELD, CLEAR_FIELD } from '@/components/form-item'
import { useHover } from '@/common/mixins/hover'
import { usePopper, placementWhileList } from '@/common/mixins/popper'
import { useClickOutside } from '@/common/mixins/clickoutside'
import { useConfiguredProps } from '@/common/config/install'
import { noop } from '@/common/utils/common'
import { doubleDigits, boundRange } from '@/common/utils/number'
import { createSizeProp, createStateProp } from '@/common/config/props'
import { useColumn } from './helper'

import '@/common/icons/times-circle'
import '@/common/icons/regular/clock'
import '@/common/icons/exchange-alt'

import type { PropType } from 'vue'
import type { Placement } from '@popperjs/core'
import type { TimeType, TimeShortcut } from './symbol'

// const TIME_REG = /^((?:[01]?[0-9])|(?:2[0-3]))((?::[0-5]?[0-9]))?((?::[0-5]?[0-9]))?$/
const TIME_REG = /^((?:\d{1,2}))((?::\d{1,2}))?((?::\d{1,2}))?$/

const props = useConfiguredProps('timePicker', {
  size: createSizeProp(),
  state: createStateProp(),
  visible: {
    type: Boolean,
    default: false
  },
  placement: {
    type: String as PropType<Placement>,
    default: 'bottom-start',
    validator(value: Placement) {
      return placementWhileList.includes(value)
    }
  },
  transfer: {
    type: [Boolean, String],
    default: false
  },
  format: {
    type: String,
    default: 'HH:mm:ss'
  },
  separator: {
    type: String,
    default: ':'
  },
  value: {
    type: [String, Array] as PropType<string | string[]>,
    default: '00:00:00'
  },
  filler: {
    type: String,
    default: '-',
    validator(value: string) {
      return value.length === 1
    }
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
  noArrow: {
    type: Boolean,
    default: false
  },
  pointer: {
    type: Boolean,
    default: false
  },
  candidate: {
    default: 3,
    validator(value: number) {
      return [0, 1, 2, 3].includes(value)
    }
  },
  steps: {
    type: Array as PropType<number[]>,
    default() {
      return [1, 1, 1]
    }
  },
  labels: {
    type: Array as PropType<string[]>,
    default() {
      return []
    }
  },
  shortcuts: {
    type: Array as PropType<TimeShortcut[]>,
    default() {
      return []
    }
  },
  isRange: {
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
  okText: {
    type: String,
    default: '确认'
  },
  cancelText: {
    type: String,
    default: '取消'
  },
  ctrlSteps: {
    type: Array as PropType<number[]>,
    default() {
      return [5, 5, 5]
    }
  },
  prefix: {
    type: String,
    default: ''
  },
  prefixColor: {
    type: String,
    default: ''
  },
  suffix: {
    type: String,
    default: ''
  },
  suffixColor: {
    type: String,
    default: ''
  },
  exchange: {
    type: Boolean,
    default: false
  },
  disableValidate: {
    type: Boolean,
    default: false
  }
})

export default defineComponent({
  name: 'TimePicker',
  components: {
    Button,
    Icon,
    Portal,
    TimeControl,
    TimeWheel
  },
  props,
  emits: [
    'on-change-col',
    'on-change',
    'on-focus',
    'on-blur',
    'on-plus',
    'on-minus',
    'on-enter',
    'on-cancel',
    'on-input',
    'on-clear',
    'on-shortcut',
    'on-toggle',
    'update:value',
    'update:visible'
  ],
  setup(props, { slots, emit }) {
    const validateField = inject(VALIDATE_FIELD, noop)
    const clearField = inject(CLEAR_FIELD, noop)

    const prefix = 'vxp-time-picker'
    const placement = toRef(props, 'placement')
    const transfer = toRef(props, 'transfer')
    const currentVisible = ref(props.visible)
    const focused = ref(false)
    const lastValue = ref('')
    const startState = createDateState()
    const endState = createDateState()
    const currentState = ref<'start' | 'end'>('start')

    const wrapper = useClickOutside()
    const { reference, popper, transferTo, updatePopper } = usePopper({
      placement,
      transfer,
      wrapper,
      isDrop: true
    })
    const { isHover } = useHover(reference)

    const startInput = ref<InstanceType<typeof TimeControl> | null>(null)
    const endInput = ref<InstanceType<typeof TimeControl> | null>(null)

    const className = computed(() => {
      return [
        prefix,
        {
          [`${prefix}--disabled`]: props.disabled,
          [`${prefix}--${props.size}`]: props.size !== 'default',
          [`${prefix}--no-hour`]: !startState.enabled.hour,
          [`${prefix}--no-minute`]: !startState.enabled.minute,
          [`${prefix}--no-second`]: !startState.enabled.second,
          [`${prefix}--focused`]: focused.value,
          [`${prefix}--${props.state}`]: props.state !== 'default'
        }
      ]
    })
    const hasPrefix = computed(() => {
      return !!(slots.prefix || props.prefix)
    })
    const currentValue = computed(() => {
      const values = [startState, endState].map(state => {
        return Object.values(state.timeValue).map(doubleDigits).join(':')
      })

      return props.isRange ? values : values[0]
    })

    parseValue(props.value, false)

    watch(
      () => props.value,
      value => {
        parseValue(value)
      }
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
        'hour',
        'minute',
        'second'
      ] as TimeType[])

      const timeValue = reactive({
        hour: 0,
        minute: 0,
        second: 0
      })
      const activated = reactive({
        hour: false,
        minute: false,
        second: false
      })

      return reactive({
        column: currentColumn,
        enabled,
        activated,
        timeValue,
        resetColumn,
        enterColumn
      })
    }

    function getCurrentState() {
      return currentState.value === 'start' ? startState : endState
    }

    function parseValue(value: string | string[], updateActivated = true) {
      if (!Array.isArray(value)) {
        value = [value, value]
      }

      for (let i = 0; i < 2; i++) {
        const match = TIME_REG.exec(value[i])
        const state = i === 0 ? startState : endState
        const { activated, timeValue } = state

        if (match) {
          if (updateActivated) {
            activated.hour = !!match[1]
            activated.minute = !!match[2]
            activated.second = !!match[3]
          }

          const hour = parseInt(match[1])
          const minute = match[2] ? parseInt(match[2].slice(1)) : 0
          const second = match[3] ? parseInt(match[3].slice(1)) : 0

          const date = new Date(2000, 1, 1, hour, minute, second)

          timeValue.hour = date.getHours()
          timeValue.minute = date.getMinutes()
          timeValue.second = date.getSeconds()
        } else {
          timeValue.hour = 0
          timeValue.minute = 0
          timeValue.second = 0

          if (updateActivated) {
            activated.hour = false
            activated.minute = false
            activated.second = false
          }
        }

        if (!props.isRange) break
      }
    }

    function parseFormat() {
      [startState, endState].forEach(state => {
        state.enabled.hour = props.format.includes('H')
        state.enabled.minute = props.format.includes('m')
        state.enabled.second = props.format.includes('s')
      })
    }

    function toggleActivated(value: boolean) {
      [startState, endState].forEach(state => {
        (Object.keys(state.activated) as TimeType[]).forEach(type => {
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

        toggleActivated(true)

        emit('on-change', currentValue.value)
        emit('update:value', currentValue.value)

        if (!props.disableValidate) {
          validateField()
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

    function finishInput() {
      currentVisible.value = false
      focused.value = false

      startState.resetColumn()
      endState.resetColumn()
    }

    function handleClear() {
      if (props.clearable) {
        lastValue.value = ''
        finishInput()
        nextTick(() => {
          parseValue('')
          emit('on-clear')
          clearField()
        })
      }
    }

    function handleWheelChange(type: TimeType) {
      if (currentVisible.value) {
        getCurrentState().activated[type] = true
      }
    }

    function handleInputFocus(type: TimeType) {
      getCurrentState().column = type
    }

    function handleInput(value: number) {
      const state = getCurrentState()

      handleInputNumber(state.column, value)

      if (state.column !== 'second' && state.timeValue[state.column] >= 10) {
        state.enterColumn('next', false)
      }
    }

    function handleInputNumber(type: TimeType, number: number) {
      const state = getCurrentState()
      const prev = state.timeValue[type]

      if ((props.noFiller || state.activated[type]) && prev > 0 && prev < 10) {
        state.timeValue[type] = prev * 10 + number
      } else {
        state.timeValue[type] = number
      }

      verifyValue(type)
      emit('on-input', type, state.timeValue[type])
    }

    function verifyValue(type: TimeType) {
      const timeValue = getCurrentState().timeValue

      timeValue[type] = boundRange(timeValue[type], 0, type === 'hour' ? 23 : 59)
      timeValue[type] = Math.round(timeValue[type] / getStep(type)) * getStep(type)
    }

    function handlePlus(ctrlKey: boolean) {
      const state = getCurrentState()
      const type = state.column

      if (state.enabled[type]) {
        state.timeValue[type] += ctrlKey ? getCtrlStep(type) : getStep(type)

        verifyValue(type)
        emit('on-plus', type, state.timeValue[type])
      }
    }

    function handleMinus(ctrlKey: boolean) {
      const state = getCurrentState()
      const type = state.column

      if (state.enabled[type]) {
        state.timeValue[type] -= ctrlKey ? getCtrlStep(type) : getStep(type)

        verifyValue(type)
        emit('on-minus', type, state.timeValue[type])
      }
    }

    function getStep(type: TimeType) {
      return props.steps[type === 'hour' ? 0 : type === 'minute' ? 1 : 2] || 1
    }

    function getCtrlStep(type: TimeType) {
      return props.ctrlSteps[type === 'hour' ? 0 : type === 'minute' ? 1 : 2] || 1
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

    function handleShortcut(index: number) {
      let { value, name } = props.shortcuts[index]

      if (typeof value === 'function') {
        value = value()
      }

      parseValue(value)
      emit('on-shortcut', name, value)
      finishInput()
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

          otherState.resetColumn(type === 'prev' ? 'second' : 'hour', type === 'prev')
          toggleCurrentState(isStart ? 'end' : 'start')
        }
      } else {
        startState.enterColumn(type)
      }
    }

    function handleStartInput(type: TimeType) {
      toggleCurrentState('start')
      handleInputFocus(type)
    }

    function handleEndInput(type: TimeType) {
      toggleCurrentState('end')
      handleInputFocus(type)
    }

    function exchangeValue() {
      (Object.keys(startState.timeValue) as TimeType[]).forEach(type => {
        const temp = endState.timeValue[type]
        endState.timeValue[type] = startState.timeValue[type]
        startState.timeValue[type] = temp
      })
    }

    function handleExchangeClick(event: MouseEvent) {
      if (props.exchange) {
        !currentVisible.value && event.stopPropagation()
        exchangeValue()
      }
    }

    return {
      prefixCls: prefix,
      isHover,
      currentVisible,
      focused,
      transferTo,
      lastValue,
      startState,
      endState,
      currentState,

      className,
      hasPrefix,

      wrapper,
      reference,
      popper,
      start: startInput,
      end: endInput,

      handleFocused,
      handleTirggerClick,
      handleClear,
      handleShortcut,
      handleWheelChange,
      handleInputFocus,
      handleInput,
      handlePlus,
      handleMinus,
      handleEnter,
      finishInput,
      handleCancel,
      toggleCurrentState,
      enterColumn,
      handleStartInput,
      handleEndInput,
      handleExchangeClick,

      updatePopper
    }
  }
})
</script>
