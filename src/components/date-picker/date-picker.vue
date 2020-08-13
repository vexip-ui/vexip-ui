<template>
  <!-- eslint-disable vue/space-infix-ops -->
  <div
    :class="className"
    @keydown="handleInput"
    @clickoutside="finishInput"
  >
    <InputGroup
      ref="control"
      readonly
      :separator="separator"
      :value="controlValue"
      :labels="labels"
      :item-class="`${prefix}__input`"
      :item-class-list="itemClassList"
      :item-width-list="[38]"
      :outside-blur="false"
      :default-focus="2"
      :disabled-item="disabledInputVaule"
      :disabled="disabled"
      :size="size"
      :state="state"
      @on-change="handleControlChange"
      @on-focus="handleFocus"
      @on-suffix-click="handleClear"
      @on-item-change="handleInputItemChange"
      @mouseenter.native="handleEnterControl"
      @mouseleave.native="handleLeaveControl"
    >
      <template slot="suffix">
        <div
          :class="[
            `${prefix}__clear`,
            clearable ? `${prefix}__clear--enable` : ''
          ]"
        >
          <Icon
            v-if="!disabled && clearable && inControl"
            name="times-circle"
          ></Icon>
          <Icon v-else name="calendar-alt"></Icon>
        </div>
      </template>
    </InputGroup>
    <transition :name="transitionName" @after-leave="togglePane('calendar')">
      <div
        v-show="focused"
        ref="popper"
        :class="`${prefix}__popper`"
      >
        <div :class="`${prefix}__pane`" @click="handleInputFocus()">
          <div
            v-if="shortcuts.length"
            :class="[`${prefix}__list`, `${prefix}__list--sub`]"
          >
            <div
              v-for="(item, index) in shortcuts"
              :key="index"
              :class="`${prefix}__shortcut`"
              :title="item.name"
              @click="handleShortcutClick(index)"
            >
              {{ item.name }}
            </div>
          </div>
          <div :class="`${prefix}__list`">
            <div :class="`${prefix}__header`">
              <template v-if="type === 'datetime' && currentPane === 'time'">
                <div
                  key="year"
                  :class="`${prefix}__year`"
                  @click.stop="togglePane('calendar')"
                >
                  选择日期
                </div>
              </template>
              <template v-else>
                <div
                  v-show="currentPane !== 'month'"
                  :class="[`${prefix}__arrow`, `${prefix}__prev-year`]"
                  @click="handleDoublePrevClick"
                >
                  <Icon name="angle-double-left"></Icon>
                </div>
                <div
                  v-show="currentPane === 'calendar'"
                  :class="[`${prefix}__arrow`, `${prefix}__prev-month`]"
                  @click="adjustCalendar('month', -1)"
                >
                  <Icon name="angle-left"></Icon>
                </div>
                <div
                  key="year"
                  :class="`${prefix}__year`"
                  @click.stop="togglePane('year')"
                >
                  <template v-if="currentPane === 'year'">
                    {{ `${yearRange[0]}年 - ${yearRange[9]}年` }}
                  </template>
                  <template v-else>
                    {{ `${calendarYear}年` }}
                  </template>
                </div>
                <div
                  v-show="currentPane === 'calendar'"
                  :class="`${prefix}__month`"
                  @click.stop="togglePane('month')"
                >
                  {{ `${formatDigit(calendarMonth + 1)}月` }}
                </div>
                <div
                  v-show="currentPane === 'calendar'"
                  :class="[`${prefix}__arrow`, `${prefix}__next-month`]"
                  @click="adjustCalendar('month', 1)"
                >
                  <Icon name="angle-right"></Icon>
                </div>
                <div
                  v-show="currentPane !== 'month'"
                  :class="[`${prefix}__arrow`, `${prefix}__next-year`]"
                  @click="handleDoubleNextClick"
                >
                  <Icon name="angle-double-right"></Icon>
                </div>
              </template>
            </div>
            <div :class="`${prefix}__calendar`">
              <div
                v-if="currentPane === 'year'"
                :class="`${prefix}__year-pane`"
              >
                <div
                  v-for="(item, index) in yearRange"
                  :key="index"
                  :class="{
                    [`${prefix}__year-item`]: true,
                    [`${prefix}__year-item--selected`]: item === year,
                    [`${prefix}__year-item--next`]: index > 9
                  }"
                  @click.stop="handleYearItemClick(item)"
                >
                  {{ item }}
                </div>
              </div>
              <div
                v-else-if="currentPane === 'month'"
                :class="`${prefix}__month-pane`"
              >
                <div
                  v-for="(item, index) in monthRange"
                  :key="index"
                  :class="{
                    [`${prefix}__month-item`]: true,
                    [`${prefix}__month-item--selected`]: item === month + 1
                  }"
                  @click.stop="handleMonthItemClick(item)"
                >
                  {{ `${item}月` }}
                </div>
              </div>
              <div
                v-else-if="type === 'datetime' && currentPane === 'time'"
                :class="`${prefix}__time-wheel`"
              >
                <TimeWheel
                  :candidate="2"
                  :steps="steps"
                  :values="[hour, minute, second]"
                  @on-mount="updatePopper"
                  @on-toggle-col="handleInputFocus($event + 3)"
                  @on-change="handleWheelChange"
                ></TimeWheel>
              </div>
              <CalendarBase
                v-else
                :value="`${year}-${month + 1}-${date}`"
                :year="calendarYear"
                :month="calendarMonth + 1"
                :disabled-date="disabledDate"
                @on-select="handleSelectDate"
              ></CalendarBase>
            </div>
            <div v-if="!noAction" :class="`${prefix}__action`">
              <Button
                v-if="type === 'datetime' && currentPane !== 'time'"
                type="text"
                size="small"
                style="margin-right: auto;"
                @click.native.stop="togglePane('time')"
              >
                选择时间
              </Button>
              <Button
                type="text"
                size="small"
                @on-click="handleCancel"
              >
                {{ cancelText }}
              </Button>
              <Button
                type="primary"
                size="small"
                @on-click="finishInput"
              >
                {{ okText }}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
/* eslint-disable vue/no-unused-components */
import Button from '../button'
import CalendarBase from '../calendar/calendar-base'
import Icon from '../icon'
import InputGroup from '../input/input-group'
import TimeWheel from './time-wheel'

import 'vue-awesome/icons/times-circle'
import 'vue-awesome/icons/calendar-alt'
import 'vue-awesome/icons/angle-right'
import 'vue-awesome/icons/angle-left'
import 'vue-awesome/icons/angle-double-right'
import 'vue-awesome/icons/angle-double-left'

import { placementWhileList, usePopper } from '../../mixins/popper'
import formControl from '../../mixins/form-control'
import { CLICK_OUTSIDE, observe, disconnect } from '../../utils/event'
import {
  format,
  toDate,
  addYears,
  addMonths,
  addDays,
  addHours,
  addMinutes,
  addSeconds,
  isLeepYear
} from '../../utils/date'
import { range } from '../../utils/common'

const { prefix } = require('../../style/basis/variable')

export default {
  name: 'DatePicker',
  components: {
    Button,
    CalendarBase,
    Icon,
    InputGroup,
    TimeWheel
  },
  mixins: [usePopper({ isDrop: true }), formControl],
  model: {
    event: 'on-change'
  },
  props: {
    type: {
      default: 'date',
      validator(value) {
        return ['date', 'datetime', 'year', 'month'].includes(value)
      }
    },
    placement: {
      default: 'bottom-start',
      validator(value) {
        return placementWhileList.includes(value)
      }
    },
    value: {
      type: [Number, String, Date],
      default() {
        return new Date()
      }
    },
    format: {
      type: String,
      default: 'yyyy-MM-dd HH:mm:ss'
    },
    filler: {
      type: String,
      default: '-',
      validator(value) {
        return value.length === 1
      }
    },
    noFiller: {
      type: Boolean,
      default: false
    },
    clearable: {
      type: Boolean,
      default: false
    },
    noAction: {
      type: Boolean,
      default: false
    },
    labels: {
      type: Array,
      default() {
        return []
      }
    },
    dateSeparator: {
      type: String,
      default: '/'
    },
    timeSeparator: {
      type: String,
      default: ':'
    },
    shortcuts: {
      type: Array,
      default() {
        return []
      }
    },
    disabledDate: {
      type: Function,
      default() {
        return false
      }
    },
    steps: {
      type: Array,
      default() {
        return [1, 1, 1]
      }
    },
    disabled: {
      type: Boolean,
      default: false
    },
    size: {
      default: 'default',
      validator(value) {
        return ['small', 'default', 'large'].includes(value)
      }
    },
    state: {
      default: 'default',
      validator(value) {
        return ['default', 'success', 'error', 'warning'].includes(value)
      }
    }
  },
  data() {
    const current = new Date()
    const currentYear = current.getFullYear()

    return {
      prefix: `${prefix}-date-picker`,
      currentPane: 'calendar',
      inControl: false,
      activated: {},
      year: null,
      month: null,
      date: null,
      hour: null,
      minute: null,
      second: null,
      focused: false,
      transitionName: `${prefix}-drop`,
      isMounted: false,
      calendarYear: currentYear,
      calendarMonth: current.getMonth(),
      okText: '确认',
      cancelText: '取消',
      yearRange: range(12, parseInt(currentYear / 10) * 10, 1),
      monthRange: range(12, 1, 1),
      changed: false,
      currentColumn: null,
      defaultValue: null,
      hasHour: true,
      hasMinute: true,
      hasSecond: true,
      inputChanged: false
    }
  },
  computed: {
    className() {
      const {
        prefix,
        type,
        focused,
        disabled,
        size,
        hasHour,
        hasMinute,
        hasSecond
      } = this

      return [
        prefix,
        `${prefix}--${type}`,
        {
          [`${prefix}--focus`]: focused,
          [`${prefix}--disabled`]: disabled,
          [`${prefix}--${size}`]: size !== 'default',
          [`${prefix}--no-hour`]: !hasHour,
          [`${prefix}--no-minute`]: !hasMinute,
          [`${prefix}--no-second`]: !hasSecond
        }
      ]
    },
    itemClassList() {
      const prefix = this.prefix

      return [
        `${prefix}__input--year`,
        `${prefix}__input--month`,
        `${prefix}__input--date`,
        `${prefix}__input--hour`,
        `${prefix}__input--minute`,
        `${prefix}__input--second`
      ]
    },
    referenceObject() {
      return this.$refs.control.$el
    },
    separator() {
      const {
        dateSeparator,
        timeSeparator,
        hasHour,
        hasMinute,
        hasSecond
      } = this
      const separator = [
        dateSeparator,
        dateSeparator,
        ' ',
        timeSeparator,
        timeSeparator
      ]

      if (hasHour && !hasMinute && !hasSecond) {
        separator[3] = ''
      }

      if (hasMinute && !hasSecond) {
        separator[4] = ''
      }

      return separator
    },
    formatedYear() {
      const { activated, noFiller, year, filler, formatYear } = this

      return noFiller || activated.year
        ? formatYear(year)
        : `${filler}${filler}${filler}${filler}`
    },
    formatedMonth() {
      const { activated, noFiller, month, filler, formatDigit } = this

      return noFiller || activated.month
        ? formatDigit(month + 1)
        : `${filler}${filler}`
    },
    formatedDate() {
      const { activated, noFiller, date, filler, formatDigit } = this

      return noFiller || activated.date
        ? formatDigit(date)
        : `${filler}${filler}`
    },
    formatedHour() {
      const { activated, noFiller, hour, filler, formatDigit } = this

      return noFiller || activated.hour
        ? formatDigit(hour)
        : `${filler}${filler}`
    },
    formatedMinute() {
      const { activated, noFiller, minute, filler, formatDigit } = this

      return noFiller || activated.minute
        ? formatDigit(minute)
        : `${filler}${filler}`
    },
    formatedSecond() {
      const { activated, noFiller, second, filler, formatDigit } = this

      return noFiller || activated.second
        ? formatDigit(second)
        : `${filler}${filler}`
    },
    controlValue() {
      const { formatedYear, formatedMonth, formatedDate, type } = this

      let value = [formatedYear, formatedMonth, formatedDate]

      if (type === 'datetime') {
        const { formatedHour, formatedMinute, formatedSecond } = this

        value = value.concat(formatedHour, formatedMinute, formatedSecond)
      }

      return value
    }
  },
  watch: {
    value(value) {
      if (!+new Date(value)) {
        this.changed = true

        this.$nextTick(() => {
          this.activated = {}
        })
      } else {
        this.activated = {
          year: true,
          month: true,
          date: true,
          hour: true,
          minute: true,
          second: true
        }
      }

      this.parseTime(value)
      this.verifyValue()
    },
    year() {
      this.handleDateChange()

      if (this.isMounted && !this.activated.year) {
        this.$set(this.activated, 'year', true)
      }
    },
    month() {
      this.handleDateChange()

      if (this.isMounted && !this.activated.month) {
        this.$set(this.activated, 'month', true)
      }
    },
    date() {
      this.handleDateChange()

      if (this.isMounted && !this.activated.date) {
        this.$set(this.activated, 'date', true)
      }
    },
    hour() {
      this.handleDateChange()

      if (this.isMounted && !this.activated.hour) {
        this.$set(this.activated, 'hour', true)
      }
    },
    minute() {
      this.handleDateChange()

      if (this.isMounted && !this.activated.minute) {
        this.$set(this.activated, 'minute', true)
      }
    },
    second() {
      this.handleDateChange()

      if (this.isMounted && !this.activated.second) {
        this.$set(this.activated, 'second', true)
      }
    },
    calendarYear(value) {
      this.yearRange = range(12, parseInt(value / 10) * 10, 1)
    },
    focused(value) {
      this.updatePopper()

      if (value) {
        this.$emit('on-foucs')
      } else {
        this.$emit('on-blur')
        this.activated = {
          year: true,
          month: true,
          date: true,
          hour: true,
          minute: true,
          second: true
        }

        if (this.changed) {
          this.changed = false
          this.$nextTick(() => {
            this.emitChangeEvent('change')
          })
        }
      }
    },
    currentPane(value) {
      if (this.focused) {
        const index = ['year', 'month', 'calendar', 'time'].findIndex(
          item => item === value
        )

        if (index === 3 && this.$refs.control.currentItem < 3) {
          this.$refs.control.currentItem = 3
        }

        if (index !== -1 && index !== 3) {
          this.$refs.control.currentItem = index
        }
      }
    },
    currentColumn(value) {
      if (value === null) {
        this.$refs.control.currentItem = value

        return
      }

      const columns = this.getColumnIndexList()

      while (columns[value] === null) {
        value = (value + 1) % columns.length
      }

      this.$refs.control.currentItem = value
      this.$emit(
        'on-change-col',
        this.getCurrentTimeType(),
        this.getTruthColumnIndex()
      )
    },
    format() {
      this.parseFormat()
    },
    inputChanged(value) {
      if (value) {
        this.$nextTick(() => {
          this.emitChangeEvent()
          this.inputChanged = false
        })
      }
    }
  },
  created() {
    this.parseFormat()
    this.parseTime(this.value)
    this.defaultValue = this.getDateValue()
  },
  mounted() {
    observe(this.$el, CLICK_OUTSIDE)

    this.$nextTick(() => {
      this.createPopper()
      this.isMounted = true
    })
  },
  beforeDestroy() {
    disconnect(this.$el, CLICK_OUTSIDE)
  },
  methods: {
    formatDigit(number) {
      return number < 10 ? `0${number}` : `${number}`
    },
    formatYear(year) {
      if (year < 10) {
        return `000${year}`
      } else if (year < 100) {
        return `00${year}`
      } else if (year < 1000) {
        return `0${year}`
      } else {
        return `${year}`
      }
    },
    handleFocus() {
      this.focused = true
    },
    handleClear(event) {
      if (this.clearable) {
        event.stopPropagation()

        this.parseTime(this.defaultValue)
        this.$nextTick(() => {
          // if (Object.keys(this.activated).length) {
          //   this.$emit('on-change', null, null, {})
          // }

          this.activated = {}
          this.$emit('on-clear')
        })
      }
    },
    parseTime(value) {
      if (!value) {
        value = this.defaultValue || Date.now()
      }

      const date = toDate(value)

      this.year = date.getFullYear()
      this.month = date.getMonth()
      this.date = date.getDate()
      this.hour = date.getHours()
      this.minute = date.getMinutes()
      this.second = date.getSeconds()
    },
    handleEnterControl() {
      this.inControl = true
    },
    handleLeaveControl() {
      this.inControl = false
    },
    handleControlChange(value) {
      const { noFiller, filler, type } = this
      const defaultValue = `${filler}${filler}`

      if (noFiller) {
        this.year = parseInt(value[0]) || 1900
        this.month = parseInt(value[1]) - 1 || 0
        this.date = parseInt(value[2]) || 1

        if (type === 'datetime') {
          this.hour = parseInt(value[3]) || 0
          this.minute = parseInt(value[4]) || 0
          this.second = parseInt(value[5]) || 0
        }
      } else {
        if (value[0] !== `${defaultValue}${defaultValue}`) {
          this.year = parseInt(value[0]) || 1900
        }

        if (value[1] !== defaultValue) {
          this.month = parseInt(value[1]) - 1 || 0
        }

        if (value[2] !== defaultValue) {
          this.date = parseInt(value[2]) || 1
        }

        if (type === 'datetime') {
          if (value[3] !== defaultValue) {
            this.hour = parseInt(value[3]) || 0
          }

          if (value[4] !== defaultValue) {
            this.minute = parseInt(value[4]) || 0
          }

          if (value[5] !== defaultValue) {
            this.second = parseInt(value[5]) || 0
          }
        }
      }
    },
    finishInput() {
      if (this.focused) {
        this.currentColumn = null
        this.focused = false
        this.$refs.control.handleBlur()

        if (this.disabledDate(this.getDateValue())) {
          this.parseTime(this.defaultValue)
          this.$nextTick(() => {
            this.activated = {}
          })
        }
      }
    },
    adjustTime(type, amount) {
      const { year, month, date: day, hour, minute, second } = this

      let date = new Date(year, month, day, hour, minute, second)

      switch (type) {
        case 'year': {
          date = addYears(date, amount)
          break
        }
        case 'month': {
          date = addMonths(date, amount)
          break
        }
        case 'date': {
          date = addDays(date, amount)
          break
        }
        case 'hour': {
          date = addHours(date, amount)
          break
        }
        case 'minute': {
          date = addMinutes(date, amount)
          break
        }
        case 'second': {
          date = addSeconds(date, amount)
          break
        }
      }

      this.parseTime(date)
    },
    adjustCalendar(type, amount) {
      let { calendarYear, calendarMonth } = this

      if (type === 'year') {
        calendarYear += ~~amount
      } else {
        calendarMonth += ~~amount
      }

      const date = new Date(calendarYear, calendarMonth, 1)

      this.calendarYear = date.getFullYear()
      this.calendarMonth = date.getMonth()
    },
    handleCancel() {
      this.parseTime(this.value)
      this.verifyValue()
      this.finishInput()
    },
    verifyValue() {
      const date = this.getDateValue()

      this.year = date.getFullYear()
      this.month = date.getMonth()
      this.date = date.getDate()
      this.hour = date.getHours()
      this.minute = date.getMinutes()
      this.second = date.getSeconds()

      if (this.year !== this.calendarYear) {
        this.adjustCalendar('year', this.year - this.calendarYear)
      }

      if (this.month !== this.calendarMonth) {
        this.adjustCalendar('month', this.month - this.calendarMonth)
      }
    },
    togglePane(type) {
      if (['calendar', 'month', 'year', 'time'].includes(type)) {
        this.currentPane = type
      }
    },
    handleYearItemClick(year) {
      this.year = year
      this.adjustCalendar('year', year - this.calendarYear)
      this.togglePane('month')
      this.$set(this.activated, 'year', true)
    },
    handleMonthItemClick(month) {
      this.year = this.calendarYear
      this.month = month - 1
      this.adjustCalendar('month', month - this.calendarMonth - 1)
      this.togglePane('calendar')
      this.$set(this.activated, 'year', true)
      this.$set(this.activated, 'month', true)
    },
    handleDoublePrevClick() {
      if (this.currentPane === 'year') {
        this.yearRange = range(12, this.yearRange[0] - 10, 1)
      } else {
        this.adjustCalendar('year', -1)
      }
    },
    handleDoubleNextClick() {
      if (this.currentPane === 'year') {
        this.yearRange = range(12, this.yearRange[10], 1)
      } else {
        this.adjustCalendar('year', -1)
      }
    },
    handleSelectDate(date) {
      this.parseTime(date)
      this.$nextTick(() => {
        this.activated = {
          ...this.activated,
          year: true,
          month: true,
          date: true
        }

        this.finishInput()
      })
    },
    handleDateChange() {
      this.changed = true
      this.inputChanged = true
    },
    emitChangeEvent(type = 'input') {
      const eventName = type === 'input' ? 'on-input' : 'on-change'
      const date = this.getDateValue()

      this.$emit(eventName, date, format(date, this.format), {
        year: this.year,
        month: this.month,
        date: this.date,
        hour: this.hour,
        minute: this.minute,
        second: this.second
      })
    },
    getDateValue() {
      return new Date(
        this.year,
        this.month,
        this.date,
        this.hour,
        this.minute,
        this.second,
        0
      )
    },
    handleInputFocus(index = this.$refs.control.currentItem) {
      this.$nextTick(() => {
        if (this.focused) {
          const columns = this.getColumnIndexList()

          this.currentColumn = columns[index]

          if (index !== null) {
            this.$nextTick(() => {
              this.$refs.control.handleItemFocus(index)
            })
          }
        }
      })
    },
    handleInput(event) {
      const keyCode = event.keyCode

      let isMatch = false

      switch (keyCode) {
        case 9:
        case 39: {
          // 下一列
          isMatch = true
          this.enterNext()
          break
        }
        case 37: {
          // 上一列
          isMatch = true
          this.enterPrev()
          break
        }
        case 38: {
          // 加一
          isMatch = true
          this.minusOne()
          break
        }
        case 40: {
          // 减一
          isMatch = true
          this.plusOne()
          break
        }
        case 13: {
          // 确认
          isMatch = true
          this.enterInput()
          break
        }
        case 27: {
          // 取消
          isMatch = true
          this.handleCancel()
          break
        }
      }

      if (isMatch) {
        event.preventDefault()

        return
      }

      // 键入数字
      let isInput = false
      let inputNumber

      if (keyCode >= 48 && keyCode <= 57) {
        isInput = true
        inputNumber = keyCode - 48
      } else if (keyCode >= 96 && keyCode <= 105) {
        isInput = true
        inputNumber = keyCode - 96
      }

      if (isInput) {
        switch (this.currentColumn) {
          case 0: {
            this.handleInputYear(inputNumber)
            break
          }
          case 1: {
            this.handleInputMonth(inputNumber)
            break
          }
          case 2: {
            this.handleInputDate(inputNumber)
            break
          }
          case 3: {
            this.handleInputHour(inputNumber)
            break
          }
          case 4: {
            this.handleInputMinute(inputNumber)
            break
          }
          case 5: {
            this.handleInputSecond(inputNumber)
            break
          }
        }

        event.preventDefault()
      }
    },
    handleInputYear(number) {
      this.handleInputNumber('year', number)

      this.$nextTick(() => {
        if (this.year >= 1000) {
          this.currentColumn = 1
        }
      })
    },
    handleInputMonth(number) {
      this.handleInputNumber('month', number)

      this.$nextTick(() => {
        if (this.month >= 10) {
          this.currentColumn = 2
        }
      })
    },
    handleInputDate(number) {
      this.handleInputNumber('date', number)

      if (this.type === 'datetime') {
        this.$nextTick(() => {
          if (this.date >= 10) {
            this.currentColumn = 3
          }
        })
      }
    },
    handleInputHour(number) {
      this.handleInputNumber('hour', number)

      this.$nextTick(() => {
        if (this.hour >= 10) {
          this.currentColumn = 4
        }
      })
    },
    handleInputMinute(number) {
      this.handleInputNumber('minute', number)

      this.$nextTick(() => {
        if (this.minute >= 10) {
          this.currentColumn = 5
        }
      })
    },
    handleInputSecond(number) {
      this.handleInputNumber('second', number)
    },
    enterInput() {
      this.finishInput()
      this.$emit('on-enter')
    },
    parseFormat() {
      this.hasHour = this.format.includes('H')
      this.hasMinute = this.format.includes('m')
      this.hasSecond = this.format.includes('s')
    },
    getColumnCount() {
      switch (this.type) {
        case 'year':
          return 1
        case 'month':
          return 2
        case 'date':
          return 3
        case 'datetime':
          return 3 + +this.hasHour + +this.hasMinute + +this.hasSecond
      }
    },
    enterNext() {
      this.currentColumn = (this.currentColumn + 1) % this.getColumnCount()
    },
    enterPrev() {
      this.currentColumn = this.currentColumn - 1

      if (this.currentColumn < 0) {
        this.currentColumn += this.getColumnCount()
      }
    },
    handleInputItemChange(index) {
      if (index < 3) {
        this.togglePane(['year', 'month', 'calendar'][index])
      } else {
        this.togglePane('time')
      }

      this.handleInputFocus(index)
    },
    handleInputNumber(type, number) {
      const oldDate = this.getDateValue()

      let old = this[type]

      if (this.activated.month) {
        old += +(type === 'month')
      }

      if (
        (this.noFiller || this.activated[type]) &&
        old > 0 &&
        old < (type === 'year' ? 1000 : 10)
      ) {
        this[type] = old * 10 + number
      } else {
        this[type] = number
      }

      this[type] -= +(type === 'month')

      this.verifyInputValue(type, oldDate)

      if (this.year >= 1000 && this.year !== this.calendarYear) {
        this.adjustCalendar('year', this.year - this.calendarYear)
      }

      if (this.month !== this.calendarMonth) {
        this.adjustCalendar('month', this.month - this.calendarMonth)
      }
    },
    verifyInputValue(type, oldDate) {
      const value = this[type]

      switch (type) {
        case 'month': {
          this.month = Math.max(Math.min(value, 11), 0)

          break
        }
        case 'date': {
          const month = oldDate.getMonth() + 1

          let lastDay

          if (month < 7) {
            if (month !== 2) {
              lastDay = 30 + (month % 2)
            } else {
              if (isLeepYear(oldDate)) {
                lastDay = 29
              } else {
                lastDay = 28
              }
            }
          } else {
            lastDay = 31 - (month % 2)
          }

          this.date = Math.max(Math.min(value, lastDay), 1)

          break
        }
        case 'hour': {
          this.hour = Math.max(Math.min(value, 23), 0)

          break
        }
        case 'minute': {
          this.minute = Math.max(Math.min(value, 59), 0)

          break
        }
        case 'second': {
          this.second = Math.max(Math.min(value, 59), 0)

          break
        }
      }
    },
    handleShortcutClick(index) {
      let { value, name } = this.shortcuts[index]

      if (typeof value === 'function') {
        value = value()
      }

      this.parseTime(value)
      this.$emit('on-shortcut', name, index)
      this.finishInput()
    },
    handleWheelChange({ type, value }) {
      this[type] = value
    },
    getCurrentTimeType() {
      if (this.currentColumn === null) {
        return null
      }

      const types = ['year', 'month', 'date', 'hour', 'minute', 'second']

      return types[this.currentColumn]
    },
    getTruthColumnIndex() {
      if (this.currentColumn === null) {
        return null
      }

      const columns = this.getColumnIndexList()

      return columns[this.currentColumn]
    },
    getColumnIndexList() {
      const columns = [0, 1, 2, null, null, null]

      if (this.type === 'datetime') {
        const { hasHour, hasMinute, hasSecond } = this

        let count = 3

        if (hasHour) {
          columns[3] = count++
        }

        if (hasMinute) {
          columns[4] = count++
        }

        if (hasSecond) {
          columns[5] = count++
        }
      }

      return columns
    },
    plusOne() {
      const type = this.getCurrentTimeType()

      if (type) {
        this[type]++

        this.verifyValue()
        this.$emit('on-plus', type, this[type])
      }
    },
    minusOne() {
      const type = this.getCurrentTimeType()

      if (type) {
        this[type]--

        this.verifyValue()
        this.$emit('on-minus', type, this[type])
      }
    },
    disabledInputVaule(index) {
      const { type, hasHour, hasMinute, hasSecond } = this

      switch (index) {
        case 1: {
          return type === 'year'
        }
        case 2: {
          return type === 'year' || type === 'month'
        }
        case 3: {
          return type !== 'datetime' || !hasHour
        }
        case 4: {
          return type !== 'datetime' || !hasMinute
        }
        case 5: {
          return type !== 'datetime' || !hasSecond
        }
      }

      return false
    }
  }
}
</script>
