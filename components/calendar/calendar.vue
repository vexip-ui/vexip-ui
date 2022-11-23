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
        <Row :class="nh.be('header')" align="middle">
          <Column flex="auto">
            <slot name="title"></slot>
          </Column>
          <Column :class="nh.be('actions')" flex="0">
            <NumberInput
              v-model:value="calendarYear"
              :class="nh.be('year-input')"
              :range="[1970, 2300]"
              :formatter="formatYearInput"
            ></NumberInput>
            <NumberInput
              v-model:value="calendarMonth"
              :class="nh.be('month-input')"
              :range="[1, 12]"
              :formatter="formatMonthInput"
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
    <template #item="{ selected, date, isPrev, isNext, isToday, disabled }">
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

<script lang="ts">
import { defineComponent, ref } from 'vue'
import CalendarPanel from './calendar-panel.vue'
import { Column } from '@/components/column'
import { NumberInput } from '@/components/number-input'
import { Row } from '@/components/row'
import { useNameHelper, useProps, useLocale, emitEvent } from '@vexip-ui/config'
import { calendarProps } from './props'

export default defineComponent({
  name: 'Calendar',
  components: {
    CalendarPanel,
    Column,
    NumberInput,
    Row
  },
  props: calendarProps,
  emits: ['update:value'],
  setup(_props, { emit }) {
    const props = useProps('calendar', _props, {
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

    const nh = useNameHelper('calendar')
    const locale = useLocale('calendar')

    const calendarValue = ref(props.value)
    const calendarYear = ref(props.year)
    const calendarMonth = ref(props.month)

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

    return {
      props,
      nh,

      calendarValue,
      calendarYear,
      calendarMonth,

      formatYearInput,
      formatMonthInput,
      handleClick
    }
  }
})
</script>
