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
        <TimeControl
          ref="start"
          :unit-type="currentState === 'start' ? startState.column! : ''"
          :enabled="startState.enabled"
          :activated="startState.activated"
          :time-value="startState.timeValue"
          :steps="props.steps"
          :ctrl-steps="props.ctrlSteps"
          :focused="focused"
          :visible="currentVisible"
          :separator="props.separator"
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
        ></TimeControl>
        <template v-if="props.range">
          <div
            :class="[nh.be('exchange'), props.exchange ? nh.bem('exchange', 'enabled') : '']"
            @click="handleExchangeClick"
          >
            <slot name="exchange">
              <Icon v-bind="icons.exchange" style="padding-top: 1px"></Icon>
            </slot>
          </div>
          <TimeControl
            ref="end"
            :unit-type="currentState === 'end' ? endState.column! : ''"
            :enabled="endState.enabled"
            :activated="endState.activated"
            :time-value="endState.timeValue"
            :steps="props.steps"
            :ctrl-steps="props.ctrlSteps"
            :focused="focused"
            :visible="currentVisible"
            :separator="props.separator"
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
          ></TimeControl>
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
          <Icon v-bind="icons.clock" :icon="props.suffix || icons.clock.icon"></Icon>
        </slot>
      </div>
      <div
        v-else-if="props.clearable || props.loading"
        :class="[nh.be('icon'), nh.bem('icon', 'placeholder'), nh.be('suffix')]"
      ></div>
      <Transition :name="nh.ns('fade')" appear>
        <div v-if="showClear" :class="[nh.be('icon'), nh.be('clear')]" @click.stop="handleClear()">
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
    </div>
    <Popper
      ref="popper"
      :class="[nh.be('popper'), nh.bs('vars')]"
      :visible="currentVisible"
      :to="transferTo"
      :transition="props.transitionName"
      :alive="props.popperAlive ?? !transferTo"
      @click.stop="handleFocused"
    >
      <div :class="nh.be('panel')">
        <div v-if="props.shortcuts.length" :class="[nh.be('list'), nh.bem('list', 'sub')]">
          <div
            v-for="(item, index) in props.shortcuts"
            :key="index"
            :class="nh.be('shortcut')"
            :title="item.name"
            @click="handleShortcut(index)"
          >
            {{ item.name }}
          </div>
        </div>
        <div :class="nh.be('list')">
          <div :class="nh.be('wheels')">
            <TimeWheel
              v-model:hour="startState.timeValue.hour"
              v-model:minute="startState.timeValue.minute"
              v-model:second="startState.timeValue.second"
              :no-arrow="props.noArrow"
              :candidate="props.candidate"
              :steps="props.steps"
              :pointer="props.pointer"
              :disabled-time="isTimeDisabled"
              @change="handleWheelChange"
              @toggle-col="toggleCurrentState('start')"
            ></TimeWheel>
            <TimeWheel
              v-if="props.range"
              v-model:hour="endState.timeValue.hour"
              v-model:minute="endState.timeValue.minute"
              v-model:second="endState.timeValue.second"
              :no-arrow="props.noArrow"
              :candidate="props.candidate"
              :steps="props.steps"
              :pointer="props.pointer"
              :disabled-time="isTimeDisabled"
              @change="handleWheelChange"
              @toggle-col="toggleCurrentState('end')"
            ></TimeWheel>
          </div>
          <div v-if="!props.noAction" :class="nh.be('action')">
            <Button
              inherit
              text
              size="small"
              @click.stop="handleCancel"
            >
              {{ props.cancelText || locale.cancel }}
            </Button>
            <Button
              inherit
              type="primary"
              size="small"
              :disabled="startError || endError"
              @click.stop="handleEnter"
            >
              {{ props.confirmText || locale.confirm }}
            </Button>
          </div>
        </div>
      </div>
    </Popper>
  </div>
</template>

<script lang="ts">
import { Button } from '@/components/button'
import { Icon } from '@/components/icon'
import { Popper } from '@/components/popper'
import { useFieldStore } from '@/components/form'

import { computed, defineComponent, nextTick, reactive, ref, toRef, watch } from 'vue'

import TimeWheel from './time-wheel.vue'
import TimeControl from './time-control.vue'
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
import { USE_TOUCH, boundRange, doubleDigits } from '@vexip-ui/utils'
import { timePickerProps } from './props'
import { useColumn, useTimeBound } from './helper'

import type { PopperExposed } from '@/components/popper'
import type { TimePickerChangeEvent, TimeType } from './symbol'

// const TIME_REG = /^((?:[01]?[0-9])|(?:2[0-3]))((?::[0-5]?[0-9]))?((?::[0-5]?[0-9]))?$/
const TIME_REG = /^((?:\d{1,2}))((?::\d{1,2}))?((?::\d{1,2}))?$/

export default defineComponent({
  name: 'TimePicker',
  components: {
    Button,
    Icon,
    Popper,
    TimeControl,
    TimeWheel
  },
  props: timePickerProps,
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
    } = useFieldStore<string | string[]>(() => reference.value?.focus())

    const nh = useNameHelper('time-picker')
    const props = useProps('timePicker', _props, {
      size: createSizeProp(size),
      state: createStateProp(state),
      locale: null,
      visible: false,
      placement: {
        default: 'bottom-start',
        validator: value => placementWhileList.includes(value)
      },
      transfer: false,
      format: 'HH:mm:ss',
      separator: ':',
      value: {
        default: () => getFieldValue(''),
        static: true
      },
      filler: {
        default: '-',
        validator: value => value.length === 1
      },
      clearable: false,
      noAction: false,
      noArrow: false,
      pointer: USE_TOUCH,
      candidate: {
        default: 3,
        validator: value => [0, 1, 2, 3].includes(value)
      },
      steps: () => [1, 1, 1],
      labels: () => ({}),
      shortcuts: () => [],
      range: null,
      disabled: () => disabled.value,
      transitionName: () => nh.ns('drop'),
      confirmText: null,
      cancelText: null,
      ctrlSteps: () => [5, 5, 5],
      prefix: null,
      prefixColor: '',
      suffix: null,
      suffixColor: '',
      noSuffix: false,
      exchange: false,
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
      popperAlive: null
    })

    const locale = useLocale('timePicker', toRef(props, 'locale'))
    const wordSpace = useWordSpace()

    const placement = toRef(props, 'placement')
    const transfer = toRef(props, 'transfer')
    const currentVisible = ref(props.visible)
    const focused = ref(false)
    const lastValue = ref('')
    const startState = createTimeState()
    const endState = createTimeState()
    const currentState = ref<'start' | 'end'>('start')

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
    const { isTimeDisabled } = useTimeBound(toRef(props, 'min'), toRef(props, 'max'))

    const startInput = ref<InstanceType<typeof TimeControl>>()
    const endInput = ref<InstanceType<typeof TimeControl>>()

    const startPlaceholder = computed(() => {
      if (props.placeholder) {
        return Array.isArray(props.placeholder) ? props.placeholder[0] : props.placeholder
      }

      const { select, start, time } = locale.value.placeholder

      return makeSentence(props.range ? `${start} ${time}` : `${select} ${time}`, wordSpace.value)
    })
    const endPlaceholder = computed(() => {
      if (props.placeholder) {
        return Array.isArray(props.placeholder)
          ? props.placeholder[1] || props.placeholder[0]
          : props.placeholder
      }

      const { end, time } = locale.value.placeholder

      return makeSentence(`${end} ${time}`, wordSpace.value)
    })
    const className = computed(() => {
      return [
        nh.b(),
        nh.ns('input-vars'),
        nh.bs('vars'),
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
        return Object.values(state.timeValue).map(doubleDigits).join(':')
      })

      return props.range ? values : values[0]
    })
    const showClear = computed(() => {
      return (
        !props.disabled && !readonly.value && props.clearable && isHover.value && !!lastValue.value
      )
    })
    const startError = computed(() => {
      const { hour, minute, second } = startState.timeValue

      return (
        isTimeDisabled.hour(hour) ||
        isTimeDisabled.minute(hour, minute) ||
        isTimeDisabled.second(hour, minute, second)
      )
    })
    const endError = computed(() => {
      if (!props.range) return false

      const { hour, minute, second } = endState.timeValue

      return (
        isTimeDisabled.hour(hour) ||
        isTimeDisabled.minute(hour, minute) ||
        isTimeDisabled.second(hour, minute, second)
      )
    })

    watch(
      () => props.value,
      value => {
        parseValue(value)
        lastValue.value = (Array.isArray(value) ? value[0] || value[1] : value)
          ? getStringValue()
          : ''
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

    function createTimeState() {
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

    function parseValue<T extends string | null>(value: T | T[]) {
      if (!Array.isArray(value)) {
        value = [value, value]
      }

      const defaultDate = new Date()

      for (let i = 0; i < 2; ++i) {
        const match = TIME_REG.exec(value[i] || '')
        const state = i === 0 ? startState : endState
        const { timeValue } = state

        if (match) {
          toggleActivated(true, i === 0 ? 'start' : 'end')

          const hour = parseInt(match[1])
          const minute = match[2] ? parseInt(match[2].slice(1)) : 0
          const second = match[3] ? parseInt(match[3].slice(1)) : 0

          const date = new Date(2000, 1, 1, hour, minute, second)

          timeValue.hour = date.getHours()
          timeValue.minute = date.getMinutes()
          timeValue.second = date.getSeconds()
        } else {
          timeValue.hour = defaultDate.getHours()
          timeValue.minute = defaultDate.getMinutes()
          timeValue.second = defaultDate.getSeconds()

          toggleActivated(false, i === 0 ? 'start' : 'end')
        }

        if (!props.range) break
      }
    }

    function parseFormat() {
      [startState, endState].forEach(state => {
        state.enabled.hour = props.format.includes('H')
        state.enabled.minute = props.format.includes('m')
        state.enabled.second = props.format.includes('s')
      })
    }

    function toggleActivated(value: boolean, valueType?: 'start' | 'end') {
      const states = valueType
        ? valueType === 'start'
          ? [startState]
          : [endState]
        : [startState, endState]

      states.forEach(state => {
        (Object.keys(state.activated) as TimeType[]).forEach(type => {
          state.activated[type] = value
        })
      })
    }

    function getStringValue() {
      return Array.isArray(currentValue.value) ? currentValue.value.join('|') : currentValue.value
    }

    function verifyTime() {
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
      verifyTime()

      if (lastValue.value !== getStringValue()) {
        lastValue.value = getStringValue()

        toggleActivated(true)
        emit('update:value', currentValue.value)
        setFieldValue(currentValue.value)
        emitEvent(props.onChange as TimePickerChangeEvent, currentValue.value)
        validateField()
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
      handleFocused()

      if (wrapper.value && target) {
        const units = Array.from(wrapper.value.querySelectorAll(`.${nh.be('unit')}`))

        if (!units.some(unit => unit === target || unit.contains(target))) {
          startState.column = null
          endState.column = null
        }
      }
    }

    function finishInput(shouldChange = true) {
      setVisible(false)

      shouldChange && emitChange()
      startState.resetColumn()
      endState.resetColumn()
    }

    function handleClear(finish = true) {
      if (props.disabled || readonly.value) return

      if (props.clearable) {
        nextTick(() => {
          const emitValue = props.range ? ([] as string[]) : ''

          parseValue(null)
          finish && finishInput(false)
          emit('update:value', emitValue)
          emitEvent(props.onChange as TimePickerChangeEvent, emitValue)
          emitEvent(props.onClear)
          clearField(emitValue)
          finish && handleBlur()

          lastValue.value = ''

          nextTick(() => {
            toggleActivated(false)
          })
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
      const type = state.column

      if (!type) return

      handleInputNumber(type, value)

      if (state.column !== 'second' && state.timeValue[type] >= 10) {
        state.enterColumn('next', false)
      }
    }

    function handleInputNumber(type: TimeType, number: number) {
      const state = getCurrentState()
      const prev = state.timeValue[type]

      if (state.activated[type] && prev > 0 && prev < 10) {
        state.timeValue[type] = prev * 10 + number
      } else {
        state.timeValue[type] = number
      }

      verifyValue(type)

      state.activated[type] = true
      emitEvent(props.onInput, type, state.timeValue[type])
    }

    function verifyValue(type: TimeType) {
      const timeValue = getCurrentState().timeValue

      timeValue[type] = boundRange(timeValue[type], 0, type === 'hour' ? 23 : 59)
      timeValue[type] = Math.round(timeValue[type] / getStep(type)) * getStep(type)
    }

    function handlePlus(ctrlKey: boolean) {
      const state = getCurrentState()
      const type = state.column

      if (!type) return

      if (state.enabled[type]) {
        state.timeValue[type] += ctrlKey ? getCtrlStep(type) : getStep(type)

        verifyValue(type)
        emitEvent(props.onPlus, type, state.timeValue[type])
      }
    }

    function handleMinus(ctrlKey: boolean) {
      const state = getCurrentState()
      const type = state.column

      if (!type) return

      if (state.enabled[type]) {
        state.timeValue[type] -= ctrlKey ? getCtrlStep(type) : getStep(type)

        verifyValue(type)
        emitEvent(props.onMinus, type, state.timeValue[type])
      }
    }

    function getStep(type: TimeType) {
      return props.steps[type === 'hour' ? 0 : type === 'minute' ? 1 : 2] || 1
    }

    function getCtrlStep(type: TimeType) {
      return props.ctrlSteps[type === 'hour' ? 0 : type === 'minute' ? 1 : 2] || 1
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
      parseValue(props.value)
      finishInput(false)
      emitEvent(props.onCancel)
    }

    function handleShortcut(index: number) {
      let { value, name } = props.shortcuts[index]

      if (typeof value === 'function') {
        value = value()
      }

      fallbackFocus()
      parseValue(value)
      emitEvent(props.onShortcut as (name: string, value: string | string[]) => void, name, value)
      finishInput()
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

    function handleClickOutside() {
      emitEvent(props.onClickOutside)

      if (props.outsideClose && currentVisible.value) {
        finishInput(!props.outsideCancel)
        handleBlur()
        emitEvent(props.onOutsideClose)
      }
    }

    return {
      props,
      nh,
      icons: useIcons(),
      locale,
      idFor,
      isHover,
      currentVisible,
      focused,
      transferTo,
      lastValue,
      startState,
      endState,
      currentState,
      currentValue,

      startPlaceholder,
      endPlaceholder,
      className,
      selectorClass,
      hasPrefix,
      showClear,
      isTimeDisabled,
      startError,
      endError,

      wrapper,
      reference,
      popper,
      start: startInput,
      end: endInput,

      handleFocused,
      showPanel,
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
      // handlePanelClosed,

      updatePopper,
      focus: (options?: FocusOptions) => reference.value?.focus(options),
      blur: () => reference.value?.blur()
    }
  }
})
</script>
