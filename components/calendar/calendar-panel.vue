<script setup lang="ts">
import { computed, ref, toRef, watch } from 'vue'

import CalendarCell from './calendar-cell.vue'
import { emitEvent, useLocale, useNameHelper, useProps } from '@vexip-ui/config'
import { useHover } from '@vexip-ui/hooks'
import {
  debounceMinor,
  differenceDays,
  endOfDay,
  rangeDate,
  startOfDay,
  startOfWeek,
  toFalse
} from '@vexip-ui/utils'
import { calendarPanelProps } from './props'

import type { Dateable } from '@vexip-ui/utils'
import type { WeekIndex } from './symbol'

defineOptions({ name: 'CalendarPanel' })

const _props = defineProps(calendarPanelProps)
const props = useProps('calendarBase', _props, {
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
    default: toFalse,
    isFunc: true
  },
  valueType: {
    default: 'start',
    validator: value => value === 'start' || value === 'end'
  },
  min: null,
  max: null,
  range: null
})

const emit = defineEmits(['update:value'])

defineSlots<{
  header: () => any,
  week: (params: { label: string, index: number, week: number }) => any,
  item: (params: {
    date: Date,
    label: string,
    selected: boolean,
    hovered: boolean,
    isPrev: boolean,
    isNext: boolean,
    isToday: boolean,
    disabled: boolean,
    inRange: boolean
  }) => any,
  footer: () => any
}>()

const nh = useNameHelper('calendar')

const startValue = ref<Date | null>(null)
const endValue = ref<Date | null>(null)
const dateRange = ref<Date[]>([])
const hoveredDate = ref<Date | null>(null)

const { wrapper, isHover } = useHover()
const locale = useLocale('calendar', toRef(props, 'locale'))

const min = computed(() => (props.min ? +startOfDay(props.min) : -Infinity))
const max = computed(() => (props.max ? +endOfDay(props.max) : Infinity))
const reversed = computed(() => {
  if (Number.isNaN(min.value) || Number.isNaN(max.value)) {
    return false
  }

  return min.value > max.value
})

const updateDateRange = debounceMinor(setDateRange)

parseValue(props.value)
setDateRange()

watch(() => props.value, parseValue)
watch([() => props.year, () => props.month, () => props.weekStart], updateDateRange)
watch(isHover, value => {
  if (!value) {
    hoveredDate.value = null
  }
})
watch(hoveredDate, value => {
  emitEvent(props.onHover, value)
})

defineExpose({
  startValue,
  endValue,
  body: wrapper,
  isSelected,
  isHovered,
  isPrevMonth,
  isNextMonth,
  isDisabled,
  isToday,
  isInRange
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

    if (!props.range) break
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
  if (typeof props.disabledDate === 'function') {
    if (props.disabledDate(date)) {
      return true
    }
  }

  const time = date.getTime()

  if (reversed.value) {
    if (time > max.value && time < min.value) {
      return true
    }
  } else {
    if (time < min.value || time > max.value) {
      return true
    }
  }

  return false
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

function handleSelect(date: Date) {
  if (isDisabled(date)) {
    return
  }

  if (props.valueType === 'start') {
    startValue.value = date
  } else {
    endValue.value = date
  }

  emitEvent(props.onSelect, date)
  emit('update:value', date)
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

  if (startValue.value && endValue.value) {
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
</script>

<template>
  <div
    :class="[nh.be('panel'), nh.bs('vars'), props.inherit && nh.bem('panel', 'inherit')]"
    role="grid"
  >
    <slot name="header"></slot>
    <div :class="[nh.be('row'), nh.bem('row', 'week')]" aria-hidden>
      <div v-for="week in 7" :key="week" :class="[nh.be('cell'), nh.be('cell-week')]">
        <slot
          name="week"
          :label="getWeekLabel((week - 1 + props.weekStart) % 7)"
          :index="week - 1"
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
        <CalendarCell
          v-for="cell in 7"
          :key="(row - 1) * 7 + cell"
          :date="dateRange[(row - 1) * 7 + cell - 1]"
          :locale="locale"
          :selected="isSelected(dateRange[(row - 1) * 7 + cell - 1])"
          :hovered="isHovered(dateRange[(row - 1) * 7 + cell - 1])"
          :is-prev="isPrevMonth(dateRange[(row - 1) * 7 + cell - 1])"
          :is-next="isNextMonth(dateRange[(row - 1) * 7 + cell - 1])"
          :is-today="isToday(dateRange[(row - 1) * 7 + cell - 1])"
          :disabled="isDisabled(dateRange[(row - 1) * 7 + cell - 1])"
          :in-range="props.range && isInRange(dateRange[(row - 1) * 7 + cell - 1])"
          @hover="handleHover"
          @select="handleSelect"
        >
          <template
            v-if="$slots.item"
            #default="{
              date,
              label,
              selected,
              hovered,
              isPrev,
              isNext,
              isToday,
              disabled,
              inRange
            }"
          >
            <slot
              name="item"
              :date="date"
              :label="label"
              :selected="selected"
              :hovered="hovered"
              :is-prev="isPrev"
              :is-next="isNext"
              :is-today="isToday"
              :disabled="disabled"
              :in-range="inRange"
            ></slot>
          </template>
        </CalendarCell>
      </div>
    </div>
    <slot name="footer"></slot>
  </div>
</template>
