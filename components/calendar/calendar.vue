<template>
  <CalendarPane
    v-model:value="calendarValue"
    :class="prefix"
    :year="calendarYear"
    :month="calendarMonth"
    :week-start="props.weekStart"
    :today="props.today"
    :disabled-date="props.disabledDate"
  >
    <template #header>
      <slot name="header">
        <Row :class="`${prefix}__header`" align="middle">
          <Column flex="auto">
            <slot name="title"></slot>
          </Column>
          <Column :class="`${prefix}__actions`" flex="0">
            <NumberInput
              v-model:value="calendarYear"
              :class="`${prefix}__year-input`"
              :range="[1970, 2300]"
              :formatter="formatYearInput"
            ></NumberInput>
            <NumberInput
              v-model:value="calendarMonth"
              :class="`${prefix}__month-input`"
              :range="[1, 12]"
              :formatter="formatMonthInput"
            ></NumberInput>
          </Column>
        </Row>
      </slot>
    </template>
    <template #week="{ label, index, week }">
      <div :class="`${prefix}__week`">
        <slot
          name="week"
          :label="label"
          :index="index"
          :week="week"
        >
          <div :class="`${prefix}__week-value`">
            {{ label }}
          </div>
        </slot>
      </div>
    </template>
    <template #item="{ selected, date, isPrev, isNext, isToday, disabled }">
      <div
        :class="{
          [`${prefix}__date`]: true,
          [`${prefix}__date--selected`]: selected,
          [`${prefix}__date--prev`]: isPrev,
          [`${prefix}__date--next`]: isNext,
          [`${prefix}__date--today`]: isToday,
          [`${prefix}__date--disabled`]: disabled
        }"
        @click="handleClick(date)"
      >
        <div :class="`${prefix}__date-header`">
          <div :class="`${prefix}__date-value`">
            {{ date.getDate() }}
          </div>
        </div>
        <div :class="`${prefix}__date-content`">
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
  </CalendarPane>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'
import { Column } from '@/components/column'
import { NumberInput } from '@/components/number-input'
import { Row } from '@/components/row'
import CalendarPane from './calendar-pane.vue'
import { useProps } from '@vexip-ui/config'

import type { PropType } from 'vue'
import type { Dateable } from '@vexip-ui/utils'

export default defineComponent({
  name: 'Calendar',
  components: {
    CalendarPane,
    Column,
    NumberInput,
    Row
  },
  props: {
    value: [Number, String, Date] as PropType<Dateable | Dateable[]>,
    year: Number,
    // 当前日历显示的月份 (1 ~ 12)
    month: Number,
    // 头部星期显示的内容，数量须为 7 个
    weekDays: Array as PropType<string[]>,
    weekStart: Number,
    today: [Number, String, Date] as PropType<Dateable>,
    disabledDate: Function as PropType<(data: Date) => boolean>
  },
  emits: ['select', 'update:value'],
  setup(_props, { emit }) {
    const props = useProps('calendar', _props, {
      value: {
        default: null,
        static: true
      },
      year: () => new Date().getFullYear(),
      month: {
        default: () => new Date().getMonth() + 1,
        validator: (value: number) => value > 0 && value <= 12
      },
      weekDays: {
        default: null,
        validator: (value: string[]) => !value || value.length === 0 || value.length === 7
      },
      weekStart: {
        default: 0,
        validator: (value: number) => value >= 0 && value < 7
      },
      today: {
        default: () => new Date(),
        validator: (value: Dateable) => !Number.isNaN(+new Date(value))
      },
      disabledDate: {
        default: () => false,
        isFunc: true
      }
    })

    const prefix = 'vxp-calendar'

    const calendarValue = ref(props.value)
    const calendarYear = ref(props.year)
    const calendarMonth = ref(props.month)

    function formatYearInput(value: number) {
      return `${value}年`
    }

    function formatMonthInput(value: number) {
      return `${value}月`
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

      emit('select', date)
      emit('update:value', date)
    }

    return {
      props,
      prefix,

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
