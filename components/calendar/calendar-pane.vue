<template>
  <div :class="`${prefix}__pane`">
    <slot name="header"></slot>
    <div :class="[`${prefix}__row`, `${prefix}__row--week`]">
      <div v-for="week in 7" :key="week" :class="[`${prefix}__cell`, `${prefix}__cell-week`]">
        <slot
          name="week"
          :index="week - 1"
          :label="getWeekLabel((week - 1 + weekStart) % 7)"
          :week="(week - 1 + weekStart) % 7"
        >
          <div :class="`${prefix}__index`">
            {{ getWeekLabel((week - 1 + weekStart) % 7) }}
          </div>
        </slot>
      </div>
    </div>
    <div ref="body" :class="`${prefix}__body`">
      <div v-for="row in 6" :key="row" :class="`${prefix}__row`">
        <div
          v-for="cell in 7"
          :key="(row - 1) * 7 + cell"
          :class="`${prefix}__cell`"
          @mouseenter="handleHover(dateRange[(row - 1) * 7 + cell - 1])"
        >
          <slot
            name="item"
            :selected="isSelected(dateRange[(row - 1) * 7 + cell - 1])"
            :hovered="isHovered(dateRange[(row - 1) * 7 + cell - 1])"
            :date="dateRange[(row - 1) * 7 + cell - 1]"
            :isPrev="isPrevMonth(dateRange[(row - 1) * 7 + cell - 1])"
            :isNext="isNextMonth(dateRange[(row - 1) * 7 + cell - 1])"
            :isToday="isToday(dateRange[(row - 1) * 7 + cell - 1])"
            :disabled="isDisabled(dateRange[(row - 1) * 7 + cell - 1])"
            :inRange="isRange && isInRange(dateRange[(row - 1) * 7 + cell - 1])"
          >
            <div
              :class="{
                [`${prefix}__index`]: true,
                [`${prefix}__index--selected`]: isSelected(dateRange[(row - 1) * 7 + cell - 1]),
                [`${prefix}__index--prev`]: isPrevMonth(dateRange[(row - 1) * 7 + cell - 1]),
                [`${prefix}__index--next`]: isNextMonth(dateRange[(row - 1) * 7 + cell - 1]),
                [`${prefix}__index--today`]: isToday(dateRange[(row - 1) * 7 + cell - 1]),
                [`${prefix}__index--disabled`]: isDisabled(dateRange[(row - 1) * 7 + cell - 1]),
                [`${prefix}__index--in-range`]:
                  isRange && isInRange(dateRange[(row - 1) * 7 + cell - 1])
              }"
              @click="handleClick(dateRange[(row - 1) * 7 + cell - 1])"
            >
              {{ dateRange[(row - 1) * 7 + cell - 1].getDate() }}
            </div>
          </slot>
        </div>
      </div>
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch } from 'vue'
import { useHover } from '@/common/mixins/hover'
import { useConfiguredProps } from '@/common/config/install'
import { useLocaleConfig } from '@/common/config/locale'
import { startOfWeek, rangeDate, differenceDays } from '@/common/utils/date'
import { debounceMinor } from '@/common/utils/performance'

import type { PropType } from 'vue'
import type { Dateable } from '@/common/utils/date'
import type { WeekIndex } from './symbol'

const props = useConfiguredProps('calendarBase', {
  // 选中的日期
  value: {
    type: [Number, String, Date, Array] as PropType<Dateable | Dateable[]>,
    default: null
  },
  // 当前日历显示的年份
  year: {
    type: Number,
    default: new Date().getFullYear()
  },
  // 当前日历显示的月份 (1 ~ 12)
  month: {
    type: Number,
    default: new Date().getMonth() + 1,
    validator: (value: number) => {
      return value > 0 && value <= 12
    }
  },
  // 头部星期显示的内容，数量须为 7 个
  weekDays: {
    type: Array as PropType<string[]>,
    default: null,
    validator: (value: string[]) => {
      return !value || value.length === 0 || value.length === 7
    }
  },
  weekStart: {
    type: Number,
    default: 0,
    validator: (value: number) => {
      return value >= 0 && value < 7
    }
  },
  today: {
    type: [Number, String, Date] as PropType<Dateable>,
    default() {
      return new Date()
    },
    validator: (value: Dateable) => {
      return !Number.isNaN(+new Date(value))
    }
  },
  disabledDate: {
    type: Function as PropType<(data: Date) => boolean>,
    default() {
      return false
    }
  },
  isRange: {
    type: Boolean,
    default: false
  },
  valueType: {
    type: String as PropType<'start' | 'end'>,
    default: 'start',
    validator: (value: 'start' | 'end') => {
      return value === 'start' || value === 'end'
    }
  }
})

export default defineComponent({
  name: 'CalendarPane',
  props,
  emits: ['on-select', 'on-hover', 'update:value'],
  setup(props, { emit }) {
    const startValue = ref<Date | null>(null)
    const endValue = ref<Date | null>(null)
    const dateRange = ref<Date[]>([])
    const hoveredDate = ref<Date | null>(null)

    const { wrapper, isHover } = useHover()
    const locale = useLocaleConfig('calendar')

    const updateDateRange = debounceMinor(setDateRange)

    parseValue(props.value)
    setDateRange()

    watch(() => props.value, parseValue)
    watch(() => props.year, updateDateRange)
    watch(() => props.month, updateDateRange)
    watch(isHover, value => {
      if (!value) {
        hoveredDate.value = null
      }
    })
    watch(hoveredDate, value => {
      emit('on-hover', value)
    })

    function getWeekLabel(index: number) {
      return props.weekDays?.[index] || locale[`week${(index || 7) as WeekIndex}`]
    }

    function setDateRange() {
      dateRange.value = rangeDate(
        startOfWeek(new Date(props.year, props.month - 1, 1), props.weekStart),
        42
      )
    }

    function parseValue(value: Dateable | Dateable[]) {
      if (!Array.isArray(value)) {
        value = [value, value]
      }

      for (let i = 0; i < 2; ++i) {
        const date = new Date(value[i] ?? '')

        if (i === 0) {
          startValue.value = Number.isNaN(+date) ? null : date
        } else {
          endValue.value = Number.isNaN(+date) ? null : date
        }

        if (!props.isRange) break
      }
    }

    function isSelected(date: Date) {
      if (!date || (!startValue.value && !endValue.value)) {
        return false
      }

      return !!(
        (startValue.value && !differenceDays(date, startValue.value)) ||
        (endValue.value && !differenceDays(date, endValue.value))
      )
    }

    function isDisabled(date: Date) {
      if (typeof props.disabledDate !== 'function') {
        return true
      }

      if (!props.isRange) {
        return props.disabledDate(date)
      }

      if (
        props.valueType === 'end' &&
        startValue.value &&
        differenceDays(startValue.value, date) < 0
      ) {
        return true
      }

      if (
        props.valueType === 'start' &&
        endValue.value &&
        differenceDays(date, endValue.value) < 0
      ) {
        return true
      }

      return props.disabledDate(date)
    }

    function isHovered(date: Date) {
      if (!date || !hoveredDate.value) {
        return false
      }

      return !differenceDays(date, hoveredDate.value)
    }

    function isPrevMonth(date: Date) {
      const { year, month } = props
      const dateYear = date.getFullYear()
      const dateMonth = date.getMonth()

      return dateYear < year || (dateYear === year && dateMonth < month - 1)
    }

    function isNextMonth(date: Date) {
      const { year, month } = props
      const dateYear = date.getFullYear()
      const dateMonth = date.getMonth()

      return dateYear > year || (dateYear === year && dateMonth > month - 1)
    }

    function isToday(date: Date) {
      return differenceDays(date, props.today) === 0
    }

    function handleClick(date: Date) {
      if (!isDisabled(date)) {
        if (props.valueType) {
          startValue.value = date
        } else {
          endValue.value = date
        }

        emit('on-select', date)
        emit('update:value', date)
      }
    }

    function handleHover(date: Date) {
      hoveredDate.value = isDisabled(date) ? null : date
    }

    function isInRange(date: Date) {
      if (!hoveredDate.value && !startValue.value && !endValue.value) {
        return false
      }

      let min: number
      let max: number

      if (!hoveredDate.value && startValue.value && endValue.value) {
        const startTime = startValue.value.getTime()
        const endTime = endValue.value.getTime()

        min = Math.min(startTime, endTime)
        max = Math.max(startTime, endTime)
      } else if (hoveredDate.value) {
        if (!startValue.value && !endValue.value) return false

        const hoveredTime = hoveredDate.value.getTime()

        if (!startValue.value || !endValue.value) {
          const selectedTime = (startValue.value ?? endValue.value)!.getTime()

          min = Math.min(hoveredTime, selectedTime)
          max = Math.max(hoveredTime, selectedTime)
        } else {
          const startTime = startValue.value.getTime()
          const endTime = endValue.value.getTime()
          const minTime = Math.min(startTime, endTime)
          const maxTime = Math.max(startTime, endTime)

          min = Math.min(hoveredTime, minTime)
          max = Math.max(hoveredTime, maxTime)
        }
      } else {
        return false
      }

      return date.getTime() >= min && date.getTime() <= max
    }

    return {
      prefix: 'vxp-calendar',
      locale,
      startValue,
      endValue,
      dateRange,
      hoveredDate,

      body: wrapper,

      getWeekLabel,
      isSelected,
      isHovered,
      isPrevMonth,
      isNextMonth,
      isDisabled,
      isToday,
      handleClick,
      handleHover,
      isInRange
    }
  }
})
</script>
