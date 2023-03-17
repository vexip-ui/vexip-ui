<template>
  <div :class="nh.be('panel')" @click="handleClick">
    <div v-if="shortcuts.length" :class="[nh.be('list'), nh.bem('list', 'sub')]">
      <div
        v-for="(item, index) in shortcuts"
        :key="index"
        :class="nh.be('shortcut')"
        :title="item.name"
        @click="handleShortcut(index)"
      >
        {{ item.name }}
      </div>
    </div>
    <div :class="nh.be('list')">
      <div :class="nh.be('panel-body')">
        <div :class="nh.be('date-panel')">
          <div :class="nh.be('header')">
            <div :class="[nh.be('arrow'), nh.be('prev-year')]" @click="handleDoublePrevClick">
              <Icon v-bind="icons.anglesLeft"></Icon>
            </div>
            <div
              v-show="currentPane === 'date'"
              :class="[nh.be('arrow'), nh.be('prev-month')]"
              @click="adjustCalendar('month', -1)"
            >
              <Icon v-bind="icons.angleLeft"></Icon>
            </div>
            <div :class="nh.be('year-month')">
              <div key="year" :class="nh.be('year')" @click.stop="togglePane('year')">
                <template v-if="currentPane === 'year'">
                  {{ `${yearRange[0]}${locale.year} - ${yearRange[9]}${locale.year}` }}
                </template>
                <template v-else>
                  {{ `${calendarYear}${locale.year}` }}
                </template>
              </div>
              <div
                v-show="currentPane === 'date'"
                :class="nh.be('month')"
                @click.stop="togglePane('month')"
              >
                {{ getMonthLabel(calendarMonth) }}
              </div>
            </div>
            <div
              v-show="currentPane === 'date'"
              :class="[nh.be('arrow'), nh.be('next-month')]"
              @click="adjustCalendar('month', 1)"
            >
              <Icon v-bind="icons.angleRight"></Icon>
            </div>
            <div :class="[nh.be('arrow'), nh.be('next-year')]" @click="handleDoubleNextClick">
              <Icon v-bind="icons.anglesRight"></Icon>
            </div>
          </div>
          <div :class="nh.be('calendar')">
            <div
              v-if="currentPane === 'year'"
              :class="nh.be('year-panel')"
              @mouseleave="hoveredYear = 0"
            >
              <div
                v-for="(item, index) in yearRange"
                :key="index"
                :class="{
                  [nh.be('year-item')]: true,
                  [nh.bem('year-item', 'selected')]: isSelectedYear(item),
                  [nh.bem('year-item', 'next')]: index > 9,
                  [nh.bem('year-item', 'disabled')]: isDisabledYear(item),
                  [nh.bem('year-item', 'in-range')]: isYearInRange(item)
                }"
                @click.stop="handleSelectYear(item)"
                @mouseenter="handleYearHover(item)"
              >
                <div :class="nh.be('year-label')">
                  <div :class="nh.be('year-label-inner')">
                    {{ item }}
                  </div>
                </div>
              </div>
            </div>
            <div
              v-else-if="currentPane === 'month'"
              :class="nh.be('month-panel')"
              @mouseleave="hoveredMonth = 0"
            >
              <div
                v-for="index in monthRange"
                :key="index"
                :class="{
                  [nh.be('month-item')]: true,
                  [nh.bem('month-item', 'selected')]: isSelectedMonth(index),
                  [nh.bem('month-item', 'disabled')]: isDisabledMonth(index),
                  [nh.bem('month-item', 'in-range')]: isMonthInRange(index)
                }"
                @click.stop="handleSelectMonth(index)"
                @mouseenter="handleMonthHover(index)"
              >
                <div :class="nh.be('month-label')">
                  <div :class="nh.be('month-label-inner')">
                    {{ getMonthLabel(index) }}
                  </div>
                </div>
              </div>
            </div>
            <CalendarPanel
              v-else
              inherit
              :value="calendarValue"
              :year="calendarYear"
              :month="calendarMonth"
              :value-type="selectingType"
              :disabled-date="disabledDate"
              :range="range"
              :min="min"
              :max="max"
              @select="handleSelectDate"
              @hover="handleHoverDate"
            ></CalendarPanel>
          </div>
        </div>
        <div v-if="isDatetime" :class="nh.be('time-panel')">
          <div :class="nh.be('header')"></div>
          <div :class="nh.be('wheel')">
            <TimeWheel
              :hour="startValue.hour"
              :minute="startValue.minute"
              :second="startValue.second"
              :candidate="3"
              :steps="steps"
              :disabled-time="disabledTime"
              @change="handleStartTimeChange"
            ></TimeWheel>
            <TimeWheel
              v-if="range"
              :hour="endValue.hour"
              :minute="endValue.minute"
              :second="endValue.second"
              :candidate="3"
              :steps="steps"
              :disabled-time="disabledTime"
              @change="handleEndTimeChange"
            ></TimeWheel>
          </div>
        </div>
      </div>
      <div v-if="!noAction" :class="nh.be('action')">
        <Button
          inherit
          text
          size="small"
          @click="handleCancel"
        >
          {{ cancelText || locale.cancel }}
        </Button>
        <Button
          inherit
          type="primary"
          size="small"
          :disabled="hasError"
          @click="handleConfirm"
        >
          {{ confirmText || locale.confirm }}
        </Button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted } from 'vue'
import TimeWheel from './time-wheel.vue'
import { Button } from '@/components/button'
import { CalendarPanel } from '@/components/calendar-panel'
import { Icon } from '@/components/icon'
import { useNameHelper, useIcons } from '@vexip-ui/config'
import { range, toDate } from '@vexip-ui/utils'
import { datePickerTypes } from './symbol'

import type { PropType } from 'vue'
import type { MonthIndex } from '@/components/calendar'
import type { Dateable } from '@vexip-ui/utils'
import type {
  DateType,
  TimeType,
  DateTimeType,
  DatePickerType,
  DateShortcut,
  DisabledTime
} from './symbol'

export default defineComponent({
  name: 'DatePanel',
  components: {
    Button,
    CalendarPanel,
    Icon,
    TimeWheel
  },
  props: {
    type: {
      default: 'date' as DatePickerType,
      validator: (value: DatePickerType) => datePickerTypes.includes(value)
    },
    enabled: {
      type: Object as PropType<Record<DateTimeType, boolean>>,
      default: () => ({})
    },
    startValue: {
      type: Object as PropType<Record<DateTimeType, number>>,
      default: null
    },
    endValue: {
      type: Object as PropType<Record<DateTimeType, number>>,
      default: null
    },
    shortcuts: {
      type: Array as PropType<DateShortcut[]>,
      default: () => []
    },
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
      default: () => new Date()
    },
    disabledDate: {
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
    range: {
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
    },
    min: {
      type: [Number, String, Date] as PropType<Dateable>,
      default: null
    },
    max: {
      type: [Number, String, Date] as PropType<Dateable>,
      default: null
    },
    disabledTime: {
      type: Object as PropType<DisabledTime>,
      default: () => ({})
    },
    hasError: {
      type: Boolean,
      default: false
    },
    locale: {
      type: Object,
      default: null
    },
    selectingType: {
      type: String as PropType<'start' | 'end'>,
      default: 'start'
    }
  },
  emits: [
    'click',
    'shortcut',
    'toggle-col',
    'change',
    'cancel',
    'confirm',
    'hover',
    'type-change',
    'time-change'
  ],
  setup(props, { emit }) {
    const today = toDate(props.today)

    const currentPane = ref<DateType>(
      props.type === 'year' ? 'year' : props.type === 'month' ? 'month' : 'date'
    )
    const calendarYear = ref(today.getFullYear())
    const calendarMonth = ref(today.getMonth() + 1) // 1 ~ 12
    const hoveredYear = ref(0) // 0 is no hover (falsy)
    const hoveredMonth = ref(0) // 0 is no hover (falsy)
    const yearRange = ref<number[]>([])

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
    const calendarValue = computed(() => {
      return props.range
        ? startActivated.value || endActivated.value
          ? [getStringValue('start'), getStringValue('end')]
          : ['', '']
        : startActivated.value
          ? getStringValue('start')
          : ''
    })

    watch(
      calendarYear,
      value => {
        yearRange.value = range(12, Math.floor(value / 10) * 10, 1)
      },
      { immediate: true }
    )

    onMounted(() => {
      refreshCalendar('start')
    })

    function getStringValue(type: 'start' | 'end') {
      const value = type === 'start' ? props.startValue : props.endValue

      return value ? `${value.year}-${value.month}-${value.date}` : ''
    }

    function getMonthLabel(index: number) {
      return props.locale[`month${index as MonthIndex}`]
    }

    function togglePane(type: DateType) {
      currentPane.value = type
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
      emit('click', event)
    }

    function handleShortcut(index: number) {
      let { value, name } = props.shortcuts[index]

      if (typeof value === 'function') {
        value = value()
      }

      emit('shortcut', name, value)
    }

    function handleSelectDate(date: Date) {
      emitChange([date.getFullYear(), date.getMonth() + 1, date.getDate()])
    }

    function handleSelectYear(year: number) {
      if (isDisabledYear(year)) return

      calendarYear.value = year

      if (props.type !== 'year') {
        togglePane('month')
      } else {
        emitChange([year, 1, 1])
      }
    }

    function handleSelectMonth(month: number) {
      if (isDisabledMonth(month)) return

      calendarMonth.value = month

      if (props.type !== 'month') {
        togglePane('date')
      } else {
        emitChange([calendarYear.value, month, 1])
      }
    }

    function emitChange(values: number[]) {
      emit('change', values)
    }

    function handleStartTimeChange(type: TimeType, time: number) {
      emit('time-change', 'start', type, time)
    }

    function handleEndTimeChange(type: TimeType, time: number) {
      emit('time-change', 'end', type, time)
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
      emit('cancel')
    }

    function handleConfirm() {
      emit('confirm')
    }

    function handleHoverDate(date: Date | null) {
      emit('hover', date)
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
      if (props.type === 'year') {
        return props.disabledDate(new Date(year, 0))
      }

      for (let i = 1; i <= 12; ++i) {
        if (!isDisabledMonth(i, year)) {
          return false
        }
      }

      return true
    }

    function isDisabledMonth(month: number, year = calendarYear.value) {
      if (props.type === 'year') return false

      if (props.type === 'month') {
        return props.disabledDate(new Date(year, month - 1))
      }

      const current = new Date(year, month - 1)
      const end = new Date(year, month, 0)
      const dayCount = end.getDate()

      for (let i = 1; i <= dayCount; ++i) {
        current.setDate(i)

        if (!props.disabledDate(current)) {
          return false
        }
      }

      return true
    }

    function handleYearHover(year: number) {
      hoveredYear.value = isDisabledYear(year) ? 0 : year
    }

    function handleMonthHover(month: number) {
      hoveredMonth.value = isDisabledMonth(month) ? 0 : month
    }

    function isYearInRange(year: number) {
      if (
        !props.range ||
        (!hoveredYear.value && !props.startActivated.year && !props.endActivated.year)
      ) {
        return false
      }

      // if (
      //   (props.valueType === 'start' && !props.endActivated.year) ||
      //   (props.valueType === 'end' && !props.startActivated.year)
      // ) {
      //   return false
      // }

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
      if (
        !props.range ||
        (!hoveredMonth.value && !props.startActivated.month && !props.endActivated.month)
      ) {
        return false
      }

      // if (
      //   (props.valueType === 'start' && !props.endActivated.month) ||
      //   (props.valueType === 'end' && !props.startActivated.month)
      // ) {
      //   return false
      // }

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
    function refreshCalendar(valueType: 'start' | 'end') {
      const today = toDate(props.today)

      if (valueType === 'start') {
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
      nh: useNameHelper('date-picker'),
      icons: useIcons(),
      currentPane,
      calendarYear,
      calendarMonth,
      yearRange,
      monthRange: range(12, 1, 1),
      hoveredYear,
      hoveredMonth,

      isDatetime,
      calendarValue,

      getMonthLabel,
      togglePane,
      adjustCalendar,
      handleClick,
      handleShortcut,
      handleSelectDate,
      handleSelectYear,
      handleSelectMonth,
      emitChange,
      handleStartTimeChange,
      handleEndTimeChange,
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
