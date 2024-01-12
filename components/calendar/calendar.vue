<script setup lang="ts">
import { Column } from '@/components/column'
import { NumberInput } from '@/components/number-input'
import { Row } from '@/components/row'

import { ref, toRef, watch } from 'vue'

import CalendarPanel from './calendar-panel.vue'
import { emitEvent, useLocale, useNameHelper, useProps } from '@vexip-ui/config'
import { calendarProps } from './props'

defineOptions({ name: 'Calendar' })

const _props = defineProps(calendarProps)
const props = useProps('calendar', _props, {
  locale: null,
  value: {
    default: null,
    static: true
  },
  year: () => new Date().getFullYear(),
  month: {
    default: () => new Date().getMonth() + 1,
    validator: value => value > 0 && value <= 12
  },
  weekDays: {
    default: null,
    validator: value => !value || value.length === 0 || value.length === 7
  },
  weekStart: {
    default: 0,
    validator: value => value >= 0 && value < 7
  },
  today: {
    default: () => new Date(),
    validator: value => !Number.isNaN(+new Date(value))
  },
  disabledDate: {
    default: () => false,
    isFunc: true
  }
})

const emit = defineEmits(['update:value', 'update:year', 'update:month'])

defineSlots<{
  header: () => any,
  title: () => any,
  week: (params: { label: string, index: number, week: number }) => any,
  content: (params: {
    selected: boolean,
    hovered: boolean,
    date: Date,
    isPrev: boolean,
    isNext: boolean,
    isToday: boolean,
    disabled: boolean
  }) => any
}>()

const nh = useNameHelper('calendar')
const locale = useLocale('calendar', toRef(props, 'locale'))

const calendarValue = ref(props.value)
const calendarYear = ref(props.year)
const calendarMonth = ref(props.month)

watch(
  () => props.value,
  value => {
    calendarValue.value = value
  }
)
watch(
  () => props.year,
  value => {
    calendarYear.value = value
  }
)
watch(
  () => props.month,
  value => {
    calendarMonth.value = value
  }
)

defineExpose({ calendarValue, calendarYear, calendarMonth })

function formatYearInput(value: number) {
  return `${value}${locale.value.year}`
}

function formatMonthInput(value: number) {
  return `${value}${locale.value.month}`
}

function isDisabled(date: Date) {
  if (typeof props.disabledDate !== 'function') {
    return true
  }

  return props.disabledDate(date)
}

function handleClick(date: Date) {
  if (!isDisabled(date)) {
    calendarValue.value = date
  }

  emitEvent(props.onSelect, date)
  emit('update:value', date)
}

function handleYearChange(value: number) {
  calendarYear.value = value

  emitEvent(props.onYearChange, value, calendarMonth.value)
  emit('update:year', value)
}

function handleMonthChange(value: number) {
  calendarMonth.value = value

  emitEvent(props.onMonthChange, calendarYear.value, value)
  emit('update:month', value)
}
</script>

<template>
  <CalendarPanel
    v-model:value="calendarValue"
    :inherit="props.inherit"
    :class="[nh.b()]"
    :year="calendarYear"
    :month="calendarMonth"
    :week-start="props.weekStart"
    :today="props.today"
    :disabled-date="props.disabledDate"
  >
    <template #header>
      <slot name="header">
        <Row inherit :class="nh.be('header')" align="middle">
          <Column flex="auto">
            <slot name="title"></slot>
          </Column>
          <Column :class="nh.be('actions')" flex="0">
            <NumberInput
              :value="calendarYear"
              inherit
              :class="nh.be('year-input')"
              :min="1970"
              :max="2300"
              :formatter="formatYearInput"
              @change="handleYearChange"
            ></NumberInput>
            <NumberInput
              :value="calendarMonth"
              inherit
              :class="nh.be('month-input')"
              :min="1"
              :max="12"
              :formatter="formatMonthInput"
              @change="handleMonthChange"
            ></NumberInput>
          </Column>
        </Row>
      </slot>
    </template>
    <template #week="{ label, index, week }">
      <div :class="nh.be('week')">
        <slot
          name="week"
          :label="label"
          :index="index"
          :week="week"
        >
          <div :class="nh.be('week-value')">
            {{ label }}
          </div>
        </slot>
      </div>
    </template>
    <template #item="{ selected, hovered, date, isPrev, isNext, isToday, disabled }">
      <div
        :class="{
          [nh.be('date')]: true,
          [nh.bem('date', 'selected')]: selected,
          [nh.bem('date', 'prev')]: isPrev,
          [nh.bem('date', 'next')]: isNext,
          [nh.bem('date', 'today')]: isToday,
          [nh.bem('date', 'disabled')]: disabled
        }"
        tabindex="0"
        @click="handleClick(date)"
        @keydown.enter.prevent="handleClick(date)"
        @keydown.space.prevent="handleClick(date)"
      >
        <div :class="nh.be('date-header')">
          <div :class="nh.be('date-value')">
            {{ date.getDate() }}
          </div>
        </div>
        <div :class="nh.be('date-content')">
          <slot
            name="content"
            :selected="selected"
            :hovered="hovered"
            :date="date"
            :is-prev="isPrev"
            :is-next="isNext"
            :is-today="isToday"
            :disabled="disabled"
          ></slot>
        </div>
      </div>
    </template>
  </CalendarPanel>
</template>
