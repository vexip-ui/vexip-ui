<template>
  <div :class="`${prefix}__pane`" @click="handleClick">
    <div v-if="shortcuts.length" :class="[`${prefix}__list`, `${prefix}__list--sub`]">
      <div
        v-for="(item, index) in shortcuts"
        :key="index"
        :class="`${prefix}__shortcut`"
        :title="item.name"
        @click="handleShortcut(index)"
      >
        {{ item.name }}
      </div>
    </div>
    <div :class="`${prefix}__list`">
      <div style="display: flex;">
        <div>
          <div :class="`${prefix}__header`">
            <div
              :class="[`${prefix}__arrow`, `${prefix}__prev-year`]"
              @click="handleDoublePrevClick"
            >
              <Icon name="angle-double-left"></Icon>
            </div>
            <div
              v-show="currentPane === 'date'"
              :class="[`${prefix}__arrow`, `${prefix}__prev-month`]"
              @click="adjustCalendar('month', -1)"
            >
              <Icon name="angle-left"></Icon>
            </div>
            <div key="year" :class="`${prefix}__year`" @click.stop="togglePane('year')">
              <template v-if="currentPane === 'year'">
                {{ `${yearRange[0]}年 - ${yearRange[9]}年` }}
              </template>
              <template v-else>
                {{ `${calendarYear}年` }}
              </template>
            </div>
            <div
              v-show="currentPane === 'date'"
              :class="`${prefix}__month`"
              @click.stop="togglePane('month')"
            >
              {{ `${doubleDigits(calendarMonth)}月` }}
            </div>
            <div
              v-show="currentPane === 'date'"
              :class="[`${prefix}__arrow`, `${prefix}__next-month`]"
              @click="adjustCalendar('month', 1)"
            >
              <Icon name="angle-right"></Icon>
            </div>
            <div
              :class="[`${prefix}__arrow`, `${prefix}__next-year`]"
              @click="handleDoubleNextClick"
            >
              <Icon name="angle-double-right"></Icon>
            </div>
          </div>
          <div ref="calendar" :class="`${prefix}__calendar`">
            <div
              v-if="currentPane === 'year'"
              :class="`${prefix}__year-pane`"
              @mouseleave="hoveredYear = 0"
            >
              <div
                v-for="(item, index) in yearRange"
                :key="index"
                :class="{
                  [`${prefix}__year-item`]: true,
                  [`${prefix}__year-item--selected`]: isSelectedYear(item),
                  [`${prefix}__year-item--next`]: index > 9,
                  [`${prefix}__year-item--disabled`]: isDisabledYear(item),
                  [`${prefix}__year-item--in-range`]: isYearInRange(item)
                }"
                @click.stop="handleSelectYear(item)"
                @mouseenter="handleYearHover(item)"
              >
                <div :class="`${prefix}__year-label`">
                  {{ item }}
                </div>
              </div>
            </div>
            <div
              v-else-if="currentPane === 'month'"
              :class="`${prefix}__month-pane`"
              @mouseleave="hoveredMonth = 0"
            >
              <div
                v-for="(item, index) in monthRange"
                :key="index"
                :class="{
                  [`${prefix}__month-item`]: true,
                  [`${prefix}__month-item--selected`]: isSelectedMonth(item),
                  [`${prefix}__month-item--disabled`]: isDisabledMonth(item),
                  [`${prefix}__month-item--in-range`]: isMonthInRange(item)
                }"
                @click.stop="handleSelectMonth(item)"
                @mouseenter="handleMonthHover(item)"
              >
                <div :class="`${prefix}__month-label`">
                  {{ `${item}月` }}
                </div>
              </div>
            </div>
            <CalendarPane
              v-else
              :value="calendarValue"
              :year="calendarYear"
              :month="calendarMonth"
              :disable-date="disableDate"
              :is-range="calendarRange"
              :value-type="valueType"
              @on-select="handleSelectDate"
              @on-hover="handleHoverDate"
            ></CalendarPane>
          </div>
        </div>
        <div v-if="isDatetime" :class="`${prefix}__time-wheel`">
          <div :class="`${prefix}__header`"></div>
          <TimeWheel
            :hour="dateValue.hour"
            :minute="dateValue.minute"
            :second="dateValue.second"
            :candidate="3"
            :steps="steps"
            @on-toggle-col="toggleColumn"
            @on-change="emitChange"
          ></TimeWheel>
        </div>
      </div>
      <div v-if="!noAction" :class="`${prefix}__action`">
        <Button type="text" size="small" @on-click="handleCancel">
          {{ cancelText }}
        </Button>
        <Button type="primary" size="small" @on-click="handleConfirm">
          {{ okText }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch } from 'vue'
import { Button } from '@/components/button'
import { CalendarPane } from '@/components/calendar-pane'
import { Icon } from '@/components/icon'
import TimeWheel from './time-wheel.vue'
import { useHover } from '@/common/mixins/hover'
import { range } from '@/common/utils/common'
import { toDate } from '@/common/utils/date'
import { doubleDigits } from '@/common/utils/number'

import '@/common/icons/angle-right'
import '@/common/icons/angle-left'
import '@/common/icons/angle-double-right'
import '@/common/icons/angle-double-left'

import type { PropType } from 'vue'
import type { Dateable } from '@/common/utils/date'
import type { DateType, DateTimeType, DatePickerType, DateShortcut } from './symbol'

const props = {
  type: {
    default: 'date' as DatePickerType,
    validator: (value: DatePickerType) => {
      return ['date', 'datetime', 'year', 'month'].includes(value)
    }
  },
  enabled: {
    type: Object as PropType<Record<DateTimeType, boolean>>,
    default: () => ({})
  },
  startValue: {
    type: Object as PropType<Record<DateTimeType, number>>,
    default: () => ({})
  },
  endValue: {
    type: Object as PropType<Record<DateTimeType, number>>,
    default: () => ({})
  },
  valueType: {
    type: String as PropType<'start' | 'end'>,
    default: 'start'
  },
  shortcuts: {
    type: Array as PropType<DateShortcut[]>,
    default: () => []
  },
  column: {
    type: String as PropType<DateTimeType>,
    default: 'date'
  },
  okText: {
    type: String,
    default: '确认'
  },
  cancelText: {
    type: String,
    default: '取消'
  },
  today: {
    type: [Number, String, Date] as PropType<Dateable>,
    default: () => new Date()
  },
  disableDate: {
    type: Function as PropType<(date: Date) => boolean>,
    default: () => false
  },
  noAction: {
    type: Boolean,
    default: false
  },
  steps: {
    type: Array as PropType<number[]>,
    default: () => [1, 1, 1]
  },
  isRange: {
    type: Boolean,
    default: false
  },
  startActivated: {
    type: Object as PropType<Record<DateTimeType, boolean>>,
    default: () => ({})
  },
  endActivated: {
    type: Object as PropType<Record<DateTimeType, boolean>>,
    default: () => ({})
  }
}

export default defineComponent({
  name: 'DatePane',
  components: {
    Button,
    CalendarPane,
    Icon,
    TimeWheel
  },
  props,
  emits: [
    'on-click',
    'on-shortcut',
    'on-toggle-col',
    'on-change',
    'on-cancel',
    'on-confirm',
    'on-hover',
    'on-type-change'
  ],
  setup(props, { emit }) {
    const today = toDate(props.today)

    const currentPane = ref<DateType>('date')
    const calendarYear = ref(today.getFullYear())
    const calendarMonth = ref(today.getMonth() + 1) // 1 ~ 12
    const hoveredYear = ref(0) // 0 = false
    const hoveredMonth = ref(0) // 0 = false
    const yearRange = ref<number[]>([])

    const calendar = ref<HTMLElement | null>(null)

    const { isHover } = useHover(calendar)

    const startActivated = computed(() => {
      const activated = props.startActivated

      return activated.year && activated.month && activated.date
    })
    const endActivated = computed(() => {
      const activated = props.endActivated

      return activated.year && activated.month && activated.date
    })

    const isDatetime = computed(() => {
      return props.type === 'datetime'
    })
    const dateValue = computed(() => {
      return props.valueType === 'start' ? props.startValue : props.endValue
    })
    const activated = computed(() => {
      return props.valueType === 'start' ? props.startActivated : props.endActivated
    })
    const calendarRange = computed(() => {
      return (
        props.isRange &&
        ((props.valueType === 'start' && endActivated.value) ||
          (props.valueType === 'end' && startActivated.value))
      )
    })
    const calendarValue = computed(() => {
      return calendarRange.value
        ? [
            startActivated.value ? getStringValue('start') : null,
            endActivated.value ? getStringValue('end') : null
          ]
        : props.valueType === 'start'
          ? startActivated.value
            ? getStringValue(props.valueType)
            : null
          : endActivated.value
            ? getStringValue(props.valueType)
            : null
    })

    watch(
      () => props.column,
      value => {
        if (value === 'year' || value === 'month' || value === 'date') {
          currentPane.value = value
        }
      },
      { immediate: true }
    )
    watch(
      calendarYear,
      value => {
        yearRange.value = range(12, Math.floor(value / 10) * 10, 1)
      },
      { immediate: true }
    )
    watch(isHover, value => {
      if (value) {
        toggleColumn(currentPane.value)
      }
    })

    function getStringValue(type: 'start' | 'end') {
      const value = type === 'start' ? props.startValue : props.endValue

      return `${value.year}-${value.month}-${value.date}`
    }

    function togglePane(type: DateType) {
      currentPane.value = type

      toggleColumn(type)
    }

    function adjustCalendar(type: 'year' | 'month', amount: number) {
      if (type === 'year') {
        calendarYear.value += amount
      } else {
        // 月份存在进位
        calendarMonth.value += amount

        const date = new Date(calendarYear.value, calendarMonth.value - 1, 1)

        calendarYear.value = date.getFullYear()
        calendarMonth.value = date.getMonth() + 1
      }
    }

    function handleClick(event: MouseEvent) {
      emit('on-click', event)
    }

    function handleShortcut(index: number) {
      let { value, name } = props.shortcuts[index]

      if (typeof value === 'function') {
        value = value()
      }

      emit('on-shortcut', name, value)
    }

    function handleSelectDate(date: Date) {
      emitChange('year', date.getFullYear())
      emitChange('month', date.getMonth() + 1)
      emitChange('date', date.getDate())
    }

    function handleSelectYear(year: number) {
      if (isDisabledYear(year)) return

      calendarYear.value = year
      emitChange('year', year)

      if (props.type !== 'year') {
        togglePane('month')
      }
    }

    function handleSelectMonth(month: number) {
      if (isDisabledMonth(month)) return

      calendarMonth.value = month
      emitChange('month', month)

      if (props.type !== 'month') {
        togglePane('date')
      }
    }

    function toggleColumn(type: DateTimeType) {
      emit('on-toggle-col', type)
    }

    function emitChange(type: DateTimeType, value: number) {
      emit('on-change', type, value)
    }

    function handleDoublePrevClick() {
      if (currentPane.value === 'year') {
        yearRange.value = range(12, yearRange.value[0] - 10, 1)
      } else {
        adjustCalendar('year', -1)
      }
    }
    function handleDoubleNextClick() {
      if (currentPane.value === 'year') {
        yearRange.value = range(12, yearRange.value[10], 1)
      } else {
        adjustCalendar('year', 1)
      }
    }

    function handleCancel() {
      emit('on-cancel')
    }

    function handleConfirm() {
      emit('on-confirm')
    }

    function handleHoverDate(date: Date | null) {
      emit('on-hover', date)
    }

    function isSelectedYear(year: number) {
      if (!year) return false

      return (
        (props.startActivated.year && props.startValue.year === year) ||
        (props.endActivated.year && props.endValue.year === year)
      )
    }

    function isSelectedMonth(month: number) {
      if (!month) return false

      const monthYear = 100 * calendarYear.value + month

      return (
        (props.startActivated.month &&
          100 * props.startValue.year + props.startValue.month === monthYear) ||
        (props.endActivated.month && 100 * props.endValue.year + props.endValue.month === monthYear)
      )
    }

    function isDisabledYear(year: number) {
      if (!props.isRange) return false

      if (props.valueType === 'end' && props.startActivated.year && year < props.startValue.year) {
        return true
      }

      if (props.valueType === 'start' && props.endActivated.year && props.endValue.year < year) {
        return true
      }

      return false
    }

    function isDisabledMonth(month: number) {
      if (!props.isRange) return false

      const monthYear = calendarYear.value * 100 + month

      if (
        props.valueType === 'end' &&
        props.startActivated.month &&
        monthYear < 100 * props.startValue.year + props.startValue.month
      ) {
        return true
      }

      if (
        props.valueType === 'start' &&
        props.endActivated.month &&
        monthYear > 100 * props.endValue.year + props.endValue.month
      ) {
        return true
      }

      return false
    }

    function handleYearHover(year: number) {
      hoveredYear.value = isDisabledYear(year) ? 0 : year
    }

    function handleMonthHover(month: number) {
      hoveredMonth.value = isDisabledMonth(month) ? 0 : month
    }

    function isYearInRange(year: number) {
      if (!hoveredYear.value && !props.startActivated.year && !props.endActivated.year) {
        return false
      }

      if (
        (props.valueType === 'start' && !props.endActivated.year) ||
        (props.valueType === 'end' && !props.startActivated.year)
      ) {
        return false
      }

      const startYear = props.startValue.year
      const endYear = props.endValue.year

      let min: number
      let max: number

      if (!hoveredYear.value && props.startActivated.year && props.endActivated.year) {
        min = Math.min(startYear, endYear)
        max = Math.max(startYear, endYear)
      } else if (hoveredYear.value) {
        if (!props.startActivated.year && !props.endActivated.year) return false

        if (!props.startActivated.year || !props.endActivated.year) {
          const selectedYear = props.startActivated.year ? startYear : endYear

          min = Math.min(hoveredYear.value, selectedYear)
          max = Math.max(hoveredYear.value, selectedYear)
        } else {
          const minYear = Math.min(startYear, endYear)
          const maxYear = Math.max(startYear, endYear)

          min = Math.min(hoveredYear.value, minYear)
          max = Math.max(hoveredYear.value, maxYear)
        }
      } else {
        return false
      }

      return year >= min && year <= max
    }

    function isMonthInRange(month: number) {
      if (!hoveredMonth.value && !props.startActivated.month && !props.endActivated.month) {
        return false
      }

      if (
        (props.valueType === 'start' && !props.endActivated.month) ||
        (props.valueType === 'end' && !props.startActivated.month)
      ) {
        return false
      }

      const startMonthYear = 100 * props.startValue.year + props.startValue.month
      const endMonthYear = 100 * props.endValue.year + props.endValue.month

      let min: number
      let max: number

      if (!hoveredMonth.value && props.startActivated.month && props.endActivated.month) {
        min = Math.min(startMonthYear, endMonthYear)
        max = Math.max(startMonthYear, endMonthYear)
      } else if (hoveredMonth.value) {
        if (!props.startActivated.month && !props.endActivated.month) return false

        const hoveredMonthYear = 100 * calendarYear.value + hoveredMonth.value

        if (!props.startActivated.month || !props.endActivated.month) {
          const selectedMonthYear = props.startActivated.month ? startMonthYear : endMonthYear

          min = Math.min(hoveredMonthYear, selectedMonthYear)
          max = Math.max(hoveredMonthYear, selectedMonthYear)
        } else {
          const minMonthYear = Math.min(startMonthYear, endMonthYear)
          const maxMonthYear = Math.max(startMonthYear, endMonthYear)

          min = Math.min(hoveredMonthYear, minMonthYear)
          max = Math.max(hoveredMonthYear, maxMonthYear)
        }
      } else {
        return false
      }

      const monthYear = 100 * calendarYear.value + month

      return monthYear >= min && monthYear <= max
    }

    // 重新计算日历页面
    function refreshCalendar() {
      const today = toDate(props.today)

      if (props.valueType === 'start') {
        calendarYear.value = props.startActivated.year ? props.startValue.year : today.getFullYear()
        calendarMonth.value = props.startActivated.month
          ? props.startValue.month
          : today.getMonth() + 1
      } else {
        calendarYear.value = props.endActivated.year ? props.endValue.year : today.getFullYear()
        calendarMonth.value = props.endActivated.month ? props.endValue.month : today.getMonth() + 1
      }
    }

    return {
      prefix: 'vxp-date-picker',
      currentPane,
      calendarYear,
      calendarMonth,
      yearRange,
      monthRange: range(12, 1, 1),
      hoveredYear,
      hoveredMonth,

      isDatetime,
      dateValue,
      activated,
      calendarValue,
      calendarRange,

      calendar,

      doubleDigits,
      togglePane,
      adjustCalendar,
      handleClick,
      handleShortcut,
      handleSelectDate,
      handleSelectYear,
      handleSelectMonth,
      toggleColumn,
      emitChange,
      handleDoublePrevClick,
      handleDoubleNextClick,
      handleCancel,
      handleConfirm,
      handleHoverDate,
      isSelectedYear,
      isSelectedMonth,
      isDisabledYear,
      isDisabledMonth,
      handleYearHover,
      handleMonthHover,
      isYearInRange,
      isMonthInRange,

      refreshCalendar
    }
  }
})
</script>
