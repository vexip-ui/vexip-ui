<template>
  <!-- eslint-disable vue/space-infix-ops -->
  <div :class="`${prefix}__wrapper`">
    <slot name="header"></slot>
    <div :class="[`${prefix}__row`, `${prefix}__row--week`]">
      <div
        v-for="week in 7"
        :key="week"
        :class="`${prefix}__cell`"
      >
        <slot
          name="week"
          :index="week - 1"
          :label="weekDays[(week - 1 + weekStart) % 7]"
          :week="(week - 1 + weekStart) % 7"
        >
          <div :class="`${prefix}__index`">
            {{ weekDays[(week - 1 + weekStart) % 7] }}
          </div>
        </slot>
      </div>
    </div>
    <div
      v-for="row in 6"
      :key="row"
      :class="`${prefix}__row`"
    >
      <div
        v-for="cell in 7"
        :key="(row - 1) * 7 + cell"
        :class="`${prefix}__cell`"
      >
        <slot
          name="item"
          :selected="isSelected(dateRange[(row - 1) * 7 + cell - 1])"
          :date="dateRange[(row - 1) * 7 + cell - 1]"
          :isPrev="isPrevMonth(dateRange[(row - 1) * 7 + cell - 1])"
          :isNext="isNextMonth(dateRange[(row - 1) * 7 + cell - 1])"
          :disabled="disabledDate(dateRange[(row - 1) * 7 + cell - 1])"
        >
          <div
            :class="{
              [`${prefix}__index`]: true,
              [`${prefix}__index--selected`]: isSelected(
                dateRange[(row - 1) * 7 + cell - 1]
              ),
              [`${prefix}__index--prev`]: isPrevMonth(
                dateRange[(row - 1) * 7 + cell - 1]
              ),
              [`${prefix}__index--next`]: isNextMonth(
                dateRange[(row - 1) * 7 + cell - 1]
              ),
              [`${prefix}__index--today`]: isToday(
                dateRange[(row - 1) * 7 + cell - 1]
              ),
              [`${prefix}__index--disabled`]: disabledDate(
                dateRange[(row - 1) * 7 + cell - 1]
              )
            }"
            @click="handleClick(dateRange[(row - 1) * 7 + cell - 1])"
          >
            {{ dateRange[(row - 1) * 7 + cell - 1].getDate() }}
          </div>
        </slot>
      </div>
    </div>
    <slot name="footer"></slot>
  </div>
</template>

<script>
import {
  startOfWeek,
  startOfMonth,
  rangeDate,
  differenceDays
} from '../../utils/date'

const { prefix } = require('../../style/basis/variable')

export default {
  name: 'CalendarBase',
  props: {
    value: {
      type: [Number, String, Date],
      default: null
    },
    year: {
      type: Number,
      default: new Date().getFullYear()
    },
    month: {
      type: Number,
      default: new Date().getMonth() + 1,
      validator(value) {
        return value > 0 && value <= 12
      }
    },
    weekDays: {
      type: Array,
      default() {
        return ['日', '一', '二', '三', '四', '五', '六']
      },
      validator(value) {
        return value.length === 7
      }
    },
    weekStart: {
      type: Number,
      default: 0,
      validator(value) {
        return value >= 0 && value < 7
      }
    },
    disabledDate: {
      type: Function,
      default() {
        return false
      }
    }
  },
  data() {
    const value = new Date(this.value)
    const active = new Date(this.year, this.month - 1, 1)

    return {
      prefix: `${prefix}-calendar`,
      currentValue: Number.isNaN(value.getTime()) ? null : value,
      dateRange: rangeDate(startOfWeek(active), 42),
      today: new Date()
    }
  },
  watch: {
    value(value) {
      this.currentValue = new Date(value)
    },
    year() {
      this.dateRange = rangeDate(
        startOfWeek(new Date(this.year, this.month - 1, 1)),
        42
      )
    },
    month() {
      this.dateRange = rangeDate(
        startOfWeek(new Date(this.year, this.month - 1, 1)),
        42
      )
    }
  },
  methods: {
    getCalendatStart(date) {
      return startOfWeek(startOfMonth(date), this.weekStart)
    },
    isSelected(date) {
      if (!date || !this.currentValue) {
        return false
      }

      return !differenceDays(date, this.currentValue)
    },
    isPrevMonth(date) {
      const { year, month } = this
      const dateYear = date.getFullYear()
      const dateMonth = date.getMonth()

      return dateYear < year || (dateYear === year && dateMonth < month - 1)
    },
    isNextMonth(date) {
      const { year, month } = this
      const dateYear = date.getFullYear()
      const dateMonth = date.getMonth()

      return dateYear > year || (dateYear === year && dateMonth > month - 1)
    },
    isToday(date) {
      return differenceDays(date, this.today) === 0
    },
    handleClick(date) {
      if (!this.disabledDate(date)) {
        this.currentValue = date
        this.$emit('on-select', date)
      }
    }
  }
}
</script>
