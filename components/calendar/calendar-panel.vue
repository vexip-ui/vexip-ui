<template>
  <div :class="[nh.be('panel'), nh.bs('vars')]">
    <slot name="header"></slot>
    <div :class="[nh.be('row'), nh.bem('row', 'week')]">
      <div v-for="week in 7" :key="week" :class="[nh.be('cell'), nh.be('cell-week')]">
        <slot
          name="week"
          :index="week - 1"
          :label="getWeekLabel((week - 1 + props.weekStart) % 7)"
          :week="(week - 1 + props.weekStart) % 7"
        >
          <div :class="nh.be('index')">
            {{ getWeekLabel((week - 1 + props.weekStart) % 7) }}
          </div>
        </slot>
      </div>
    </div>
    <div ref="body" :class="nh.be('body')">
      <div v-for="row in 6" :key="row" :class="nh.be('row')">
        <div
          v-for="cell in 7"
          :key="(row - 1) * 7 + cell"
          :class="nh.be('cell')"
          @mouseenter="handleHover(dateRange[(row - 1) * 7 + cell - 1])"
        >
          <slot
            name="item"
            :selected="isSelected(dateRange[(row - 1) * 7 + cell - 1])"
            :hovered="isHovered(dateRange[(row - 1) * 7 + cell - 1])"
            :date="dateRange[(row - 1) * 7 + cell - 1]"
            :is-prev="isPrevMonth(dateRange[(row - 1) * 7 + cell - 1])"
            :is-next="isNextMonth(dateRange[(row - 1) * 7 + cell - 1])"
            :is-today="isToday(dateRange[(row - 1) * 7 + cell - 1])"
            :disabled="isDisabled(dateRange[(row - 1) * 7 + cell - 1])"
            :in-range="props.isRange && isInRange(dateRange[(row - 1) * 7 + cell - 1])"
          >
            <div
              :class="{
                [nh.be('index')]: true,
                [nh.bem('index', 'selected')]: isSelected(dateRange[(row - 1) * 7 + cell - 1]),
                [nh.bem('index', 'prev')]: isPrevMonth(dateRange[(row - 1) * 7 + cell - 1]),
                [nh.bem('index', 'next')]: isNextMonth(dateRange[(row - 1) * 7 + cell - 1]),
                [nh.bem('index', 'today')]: isToday(dateRange[(row - 1) * 7 + cell - 1]),
                [nh.bem('index', 'disabled')]: isDisabled(dateRange[(row - 1) * 7 + cell - 1]),
                [nh.bem('index', 'in-range')]:
                  props.isRange && isInRange(dateRange[(row - 1) * 7 + cell - 1])
              }"
              tabindex="0"
              @click="handleClick(dateRange[(row - 1) * 7 + cell - 1])"
              @keydown.enter.prevent="handleClick(dateRange[(row - 1) * 7 + cell - 1])"
              @keydown.space.prevent="handleClick(dateRange[(row - 1) * 7 + cell - 1])"
            >
              <div :class="nh.be('index-inner')">
                {{ dateRange[(row - 1) * 7 + cell - 1].getDate() }}
              </div>
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
import { useHover } from '@vexip-ui/mixins'
import {
  useNameHelper,
  useProps,
  useLocale,
  booleanProp,
  eventProp,
  emitEvent
} from '@vexip-ui/config'
import { startOfWeek, rangeDate, differenceDays, debounceMinor } from '@vexip-ui/utils'

import type { PropType } from 'vue'
import type { Dateable } from '@vexip-ui/utils'
import type { WeekIndex } from './symbol'

export default defineComponent({
  name: 'CalendarPanel',
  props: {
    // 选中的日期
    value: [Number, String, Date, Array] as PropType<Dateable | Dateable[]>,
    // 当前日历显示的年份
    year: Number,
    // 当前日历显示的月份 (1 ~ 12)
    month: Number,
    // 头部星期显示的内容，数量须为 7 个
    weekDays: Array as PropType<string[]>,
    weekStart: Number,
    today: [Number, String, Date] as PropType<Dateable>,
    disabledDate: Function as PropType<(data: Date) => boolean>,
    isRange: booleanProp,
    valueType: String as PropType<'start' | 'end'>,
    onSelect: eventProp<(date: Date) => void>(),
    onHover: eventProp<(date: Date | null) => void>()
  },
  emits: ['update:value'],
  setup(_props, { emit }) {
    const props = useProps('calendarBase', _props, {
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
      },
      isRange: false,
      valueType: {
        default: 'start',
        validator: (value: 'start' | 'end') => value === 'start' || value === 'end'
      }
    })

    const startValue = ref<Date | null>(null)
    const endValue = ref<Date | null>(null)
    const dateRange = ref<Date[]>([])
    const hoveredDate = ref<Date | null>(null)

    const { wrapper, isHover } = useHover()
    const locale = useLocale('calendar')

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
      emitEvent(props.onHover, value)
    })

    function getWeekLabel(index: number) {
      return props.weekDays?.[index] || locale.value[`week${(index || 7) as WeekIndex}`]
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

        emitEvent(props.onSelect, date)
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
      props,
      nh: useNameHelper('calendar'),
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
