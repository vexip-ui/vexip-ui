<template>
  <div
    :class="className"
    @keydown="handleInput"
    @clickoutside="finishInput"
  >
    <MultipleInput
      ref="control"
      readonly
      :separator="separator"
      :value="controlValue"
      :labels="labels"
      :item-class="`${prefix}__input`"
      :item-class-list="itemClassList"
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
    </MultipleInput>
    <transition :name="transitionName" @after-leave="togglePane(type === 'month' ? 'month' : type === 'year' ? 'year' : 'calendar')">
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
            <div style="display: flex;">
              <div>
                <div :class="`${prefix}__header`">
                  <template
                    v-if="type.startsWith('datetime') && currentPane === 'time'"
                  >
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
                <div
                  :class="`${prefix}__calendar`"
                  @mouseenter="handleEnterCalendar"
                >
                  <div
                    v-if="currentPane === 'year'"
                    :class="`${prefix}__year-pane`"
                  >
                    <div
                      v-for="(item, index) in yearRange"
                      :key="index"
                      :class="{
                        [`${prefix}__year-item`]: true,
                        [`${prefix}__year-item--selected`]: item === start.year,
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
                        [`${prefix}__month-item--selected`]:
                          start.month && item === start.month + 1
                      }"
                      @click.stop="handleMonthItemClick(item)"
                    >
                      {{ `${item}月` }}
                    </div>
                  </div>
                  <CalendarBase
                    v-else
                    :value="`${start.year}-${start.month + 1}-${start.date}`"
                    :year="calendarYear"
                    :month="calendarMonth + 1"
                    :disabled-date="disabledDate"
                    @on-select="handleSelectDate"
                  ></CalendarBase>
                </div>
              </div>
              <div
                v-if="type.startsWith('datetime') && currentPane === 'calendar'"
                :class="`${prefix}__time-wheel`"
              >
                <div :class="`${prefix}__header`"></div>
                <TimeWheel
                  :candidate="3"
                  :steps="steps"
                  :values="[start.hour, start.minute, start.second]"
                  @on-mount="updatePopper"
                  @on-toggle-col="handleInputFocus($event + 3)"
                  @on-change="start[$event.type] = $event.value"
                ></TimeWheel>
              </div>
            </div>
            <div v-if="!noAction" :class="`${prefix}__action`">
              <!-- <Button
                v-if="type.startsWith('datetime') && currentPane !== 'time'"
                type="text"
                size="small"
                style="margin-right: auto;"
                @click.native.stop="togglePane('time')"
              >
                选择时间
              </Button> -->
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
import Button from '../button'
import CalendarBase from '../calendar/calendar-base'
import Icon from '../icon'
import MultipleInput from '../multiple-input'
import TimeWheel from './time-wheel'

import { placementWhileList, usePopper } from '@/mixins/popper'
import { useConfigurableProps } from '@/config/properties'
import { CLICK_OUTSIDE, observe, disconnect } from '@/utils/event'
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
} from '@/utils/date'
import { isNull, noop, range } from '@/utils/common'

import '../../icons/times-circle'
import '../../icons/calendar-alt'
import '../../icons/angle-right'
import '../../icons/angle-left'
import '../../icons/angle-double-right'
import '../../icons/angle-double-left'

const { prefix } = require('@/style/basis/variable')

const props = useConfigurableProps({
  size: {
    default: 'default',
    validator(value) {
      return ['small', 'default', 'large'].includes(value)
    }
  },
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
  state: {
    default: 'default',
    validator(value) {
      return ['default', 'success', 'error', 'warning'].includes(value)
    }
  },
  exactlySelect: {
    type: Boolean,
    default: false
  },
  disableValidate: {
    type: Boolean,
    default: false
  }
})

function getNullValueObject() {
  return {
    year: null,
    month: null,
    date: null,
    hour: null,
    minute: null,
    second: null
  }
}

function getAllActivated() {
  return {
    year: true,
    month: true,
    date: true,
    hour: true,
    minute: true,
    second: true
  }
}

export default {
  name: 'DatePicker',
  components: {
    Button,
    CalendarBase,
    Icon,
    MultipleInput,
    TimeWheel
  },
  mixins: [usePopper({ isDrop: true })],
  model: {
    event: 'on-change'
  },
  inject: {
    validateField: { default: () => noop }
  },
  props,
  emits: [
    'on-foucs',
    'on-blur',
    'on-change-col',
    'on-clear',
    'on-enter',
    'on-shortcut',
    'on-plus',
    'on-minus',
    'on-input',
    'on-change',
    'update:value'
  ],
  data() {
    const current = new Date()
    const currentYear = current.getFullYear()
    const currentPane = this.type === 'year' ? 'year' : this.type === 'month' ? 'month' : 'calendar'

    return {
      currentPane,
      prefix: `${prefix}-date-picker`,
      inControl: false,
      activated: {
        start: {},
        end: {}
      },
      start: getNullValueObject(),
      end: getNullValueObject(),
      valueType: 'start',
      focused: false,
      transitionName: `${prefix}-drop`,
      isMounted: false,
      calendarYear: currentYear,
      calendarMonth: current.getMonth(),
      okText: '确认',
      cancelText: '取消',
      yearRange: range(12, parseInt(currentYear / 10) * 10, 1),
      monthRange: range(12, 1, 1),
      startChanged: false,
      endChanged: false,
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
      const baseList = [
        `${prefix}__input--year`,
        `${prefix}__input--month`,
        `${prefix}__input--date`,
        `${prefix}__input--hour`,
        `${prefix}__input--minute`,
        `${prefix}__input--second`
      ]

      return baseList.concat(baseList)
    },
    isRange() {
      // return this.type.endsWith('range')
      return false
    },
    referenceObject() {
      return this.$refs.control.$el
    },
    separator() {
      const separator = this.getSeparator()

      if (this.isRange) {
        separator.push('~')

        return separator.concat(this.getSeparator())
      }

      return separator
    },
    controlValue() {
      const value = this.getValueList('start')

      if (this.isRange) {
        return value.concat(this.getValueList('end'))
      }

      return value
    }
  },
  watch: {
    value(value) {
      if (this.isRange) {
        if (!Array.isArray(value)) return

        this.computeValueActivated('start', value[0])
        this.parseTime(value[0], 'start')
        this.verifyValue('start')

        this.computeValueActivated('end', value[1])
        this.parseTime(value[1], 'end')
        this.verifyValue('end')
      } else {
        this.computeValueActivated('start', value)
        this.parseTime(value)
        this.verifyValue()
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

        if (this.isRange) {
          if (this.startChanged) {
            this.activated.start = getAllActivated()
          }

          if (this.endChanged) {
            this.activated.end = getAllActivated()
          }

          if (this.startChanged && this.endChanged) {
            this.startChanged = false
            this.endChanged = false

            this.$nextTick(() => {
              this.emitChangeEvent('change')
            })
          }
        } else {
          if (this.startChanged) {
            this.activated.start = getAllActivated()
            this.startChanged = false

            this.$nextTick(() => {
              this.emitChangeEvent('change')
            })
          }
        }
      }
    },
    currentPane(value) {
      if (this.focused) {
        const index = ['year', 'month', 'calendar', 'time'].findIndex(
          item => item === value
        )

        // if (index === 3 && this.$refs.control.currentItem < 3) {
        //   this.$refs.control.currentItem = 3
        // }

        if (index !== -1) {
          this.$refs.control.currentItem =
            index + (this.valueType === 'start' ? 0 : 4)
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
    // this.parseTime(this.value)
    // this.defaultValue = this.getDateValue()

    if (isNull(this.defaultValue) || Number.isNaN(this.defaultValue.getTime())) {
      this.defaultValue = new Date()
    }

    // if (this.isRange) {
    //   this.parseTime(this.value, 'end')
    // }

    if (!this.exactlySelect && !this.isRange) {
      this.parseTime(this.value)

      this.startChanged = true
    }

    const types = ['year', 'month', 'date', 'hour', 'minute', 'second']

    types.forEach(type => {
      this.$watch(
        () => this.start[type],
        () => {
          this.handleDateChange()

          if (this.isMounted && !this.activated.start[type]) {
            this.$set(this.activated.start, type, true)
          }
        }
      )

      this.$watch(
        () => this.end[type],
        () => {
          this.handleDateChange()

          if (this.isMounted && !this.activated.end[type]) {
            this.$set(this.activated.end, type, true)
          }
        }
      )
    })
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
    computeValueActivated(type, value) {
      if (!+new Date(value)) {
        this[`${type}Changed`] = true

        this.$nextTick(() => {
          this.activated[type] = {}
        })
      } else {
        this.activated[type] = getAllActivated()
      }
    },
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
    getFormatValue(valueType, type, value) {
      const { activated, noFiller, filler } = this

      return noFiller || activated[valueType][type]
        ? (type === 'yaer' ? this.formatYear : this.formatDigit)(
          type === 'month' ? value + 1 : value
        )
        : type === 'year'
          ? `${filler}${filler}${filler}${filler}`
          : `${filler}${filler}`
    },
    getValueList(type) {
      const { year, month, date } = this[type]
      const value = [
        this.getFormatValue(type, 'year', year),
        this.getFormatValue(type, 'month', month),
        this.getFormatValue(type, 'date', date)
      ]

      if (this.type.startsWith('datetime')) {
        const { hour, minute, second } = this[type]

        value.push(
          this.getFormatValue(type, 'hour', hour),
          this.getFormatValue(type, 'minute', minute),
          this.getFormatValue(type, 'second', second)
        )
      }

      return value
    },
    getSeparator() {
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
    handleFocus() {
      this.focused = true
    },
    handleClear(event) {
      if (this.clearable) {
        event.stopPropagation()

        this.start = getNullValueObject()

        if (this.isRange) {
          this.end = getNullValueObject()
        } else {
          if (!this.exactlySelect) {
            this.parseTime(this.defaultValue)
          }
        }

        this.$nextTick(() => {
          if (this.isRange || this.exactlySelect) {
            this.startChanged = false
            this.endChanged = false
          }

          this.activated = { start: {}, end: {} }
          this.$emit('on-clear')
        })
      }
    },
    parseTime(value, type = 'start') {
      if (!value) {
        value = this.defaultValue || Date.now()
      }

      const date = toDate(value)

      this[type] = {
        year: date.getFullYear(),
        month: date.getMonth(),
        date: date.getDate(),
        hour: date.getHours(),
        minute: date.getMinutes(),
        second: date.getSeconds()
      }
    },
    handleEnterControl() {
      this.inControl = true
    },
    handleLeaveControl() {
      this.inControl = false
    },
    handleControlChange(value) {
      this.parseControlValue('start', value.slice(0, 6))

      if (this.isRange) {
        this.parseControlValue('end', value.slice(6))
      }
    },
    parseControlValue(valueType, value) {
      const { noFiller, filler, type } = this
      const defaultValue = `${filler}${filler}`
      const valueObject = this[valueType]

      if (noFiller) {
        valueObject.year = parseInt(value[0]) || 1900
        valueObject.month = parseInt(value[1]) - 1 || 0
        valueObject.date = parseInt(value[2]) || 1

        if (type.startsWith('datetime')) {
          valueObject.hour = parseInt(value[3]) || 0
          valueObject.minute = parseInt(value[4]) || 0
          valueObject.second = parseInt(value[5]) || 0
        }
      } else {
        if (value[0] !== `${defaultValue}${defaultValue}`) {
          valueObject.year = parseInt(value[0]) || 1900
        }

        if (value[1] !== defaultValue) {
          valueObject.month = parseInt(value[1]) - 1 || 0
        }

        if (value[2] !== defaultValue) {
          valueObject.date = parseInt(value[2]) || 1
        }

        if (type === 'datetime') {
          if (value[3] !== defaultValue) {
            valueObject.hour = parseInt(value[3]) || 0
          }

          if (value[4] !== defaultValue) {
            valueObject.minute = parseInt(value[4]) || 0
          }

          if (value[5] !== defaultValue) {
            valueObject.second = parseInt(value[5]) || 0
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

          if (this.isRange) {
            this.parseTime(this.defaultValue, 'end')
          }

          this.$nextTick(() => {
            this.activated = { start: {}, end: {} }
          })
        }
      }
    },
    adjustTime(type, amount) {
      const { year, month, date: day, hour, minute, second } = this.start

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
    verifyValue(type = 'start') {
      const date = this.getDateValue()

      this[type].year = date.getFullYear()
      this[type].month = date.getMonth()
      this[type].date = date.getDate()
      this[type].hour = date.getHours()
      this[type].minute = date.getMinutes()
      this[type].second = date.getSeconds()

      if (this[type].year !== this.calendarYear) {
        this.adjustCalendar('year', this[type].year - this.calendarYear)
      }

      if (this[type].month !== this.calendarMonth) {
        this.adjustCalendar('month', this[type].month - this.calendarMonth)
      }
    },
    togglePane(type) {
      if (['calendar', 'month', 'year', 'time'].includes(type)) {
        this.currentPane = type
      }
    },
    handleYearItemClick(year) {
      const type = this.valueType

      this[type].year = year
      this.adjustCalendar('year', year - this.calendarYear)
      this.$set(this.activated, 'year', true)

      if (this.type !== 'year') {
        this.togglePane('month')
      } else {
        this.handleSelectDate()
      }
    },
    handleMonthItemClick(month) {
      const type = this.valueType

      this[type].year = this.calendarYear
      this[type].month = month - 1
      this.adjustCalendar('month', month - this.calendarMonth - 1)
      this.$set(this.activated, 'year', true)
      this.$set(this.activated, 'month', true)

      if (this.type !== 'month') {
        this.togglePane('calendar')
      } else {
        this.handleSelectDate()
      }
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
    handleSelectDate(date = this.getDateValue()) {
      const type = this.valueType

      if (this.isRange) {
        this.parseTime(date, type)
      } else {
        this.parseTime(date)
      }

      this.$nextTick(() => {
        if (this.isRange) {
          this.activated[type] = {
            ...this.activated[type],
            year: true,
            month: true,
            date: true
          }

          if (this.startChanged && this.endChanged) {
            this.finishInput()
          }
        } else {
          this.activated.start = {
            ...this.activated.start,
            year: true,
            month: true,
            date: true
          }

          this.finishInput()
        }
      })
    },
    handleDateChange() {
      this.startChanged = true
      this.inputChanged = true
    },
    emitChangeEvent(type = 'input') {
      const eventName = type === 'input' ? 'on-input' : 'on-change'
      const date = this.getDateValue()

      this.$emit(eventName, date, format(date, this.format))

      if (eventName === 'on-change' && !this.disableValidate) {
        this.validateField()
      }
    },
    getDateValue(type = 'start') {
      return new Date(
        this[type].year,
        this[type].month,
        this[type].date,
        this[type].hour,
        this[type].minute,
        this[type].second,
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
    handleEnterCalendar() {
      if (this.currentPane === 'calendar') {
        this.currentColumn = this.getColumnIndexList()[
          this.valueType === 'start' ? 2 : 8
        ]
      }
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
        if (this[this.valueType].year >= 1000) {
          this.currentColumn = 1
        }
      })
    },
    handleInputMonth(number) {
      this.handleInputNumber('month', number)

      this.$nextTick(() => {
        if (this[this.valueType].month >= 10) {
          this.currentColumn = 2
        }
      })
    },
    handleInputDate(number) {
      this.handleInputNumber('date', number)

      if (this.type === 'datetime') {
        this.$nextTick(() => {
          if (this[this.valueType].date >= 10) {
            this.currentColumn = 3
          }
        })
      }
    },
    handleInputHour(number) {
      this.handleInputNumber('hour', number)

      this.$nextTick(() => {
        if (this[this.valueType].hour >= 10) {
          this.currentColumn = 4
        }
      })
    },
    handleInputMinute(number) {
      this.handleInputNumber('minute', number)

      this.$nextTick(() => {
        if (this[this.valueType].minute >= 10) {
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
      this.valueType = index < 6 ? 'start' : 'end'

      const paneIndex = index % 6

      if (paneIndex < 3) {
        this.togglePane(['year', 'month', 'calendar'][paneIndex])
      } else {
        this.togglePane('calendar')
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

      const valueType = this.valueType

      this.verifyInputValue(type, valueType, oldDate)

      if (this[valueType].year >= 1000 && this.year !== this.calendarYear) {
        this.adjustCalendar('year', this[valueType].year - this.calendarYear)
      }

      if (this[valueType].month !== this.calendarMonth) {
        this.adjustCalendar('month', this[valueType].month - this.calendarMonth)
      }
    },
    verifyInputValue(type, valueType, oldDate) {
      const valueObject = this[valueType]
      const value = valueObject[type]

      switch (type) {
        case 'month': {
          valueObject.month = Math.max(Math.min(value, 11), 0)

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

          valueObject.date = Math.max(Math.min(value, lastDay), 1)

          break
        }
        case 'hour': {
          valueObject.hour = Math.max(Math.min(value, 23), 0)

          break
        }
        case 'minute': {
          valueObject.minute = Math.max(Math.min(value, 59), 0)

          break
        }
        case 'second': {
          valueObject.second = Math.max(Math.min(value, 59), 0)

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
      const { hasHour, hasMinute, hasSecond } = this
      const isDatetime = this.type.startsWith('datetime')

      let count = 3

      if (isDatetime) {
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

      if (this.isRange) {
        for (let i = 0; i < 3; i++) {
          columns[i + 6] = count++
        }

        if (isDatetime) {
          if (hasHour) {
            columns[9] = count++
          }

          if (hasMinute) {
            columns[10] = count++
          }

          if (hasSecond) {
            columns[11] = count++
          }
        }
      }

      return columns
    },
    plusOne() {
      const type = this.getCurrentTimeType()

      if (type) {
        this[this.valueType][type]++

        this.verifyValue()
        this.$emit('on-plus', type, this[this.valueType][type])
      }
    },
    minusOne() {
      const type = this.getCurrentTimeType()

      if (type) {
        this[this.valueType][type]--

        this.verifyValue()
        this.$emit('on-minus', type, this[this.valueType][type])
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
          return !type.startsWith('datetime') || !hasHour
        }
        case 4: {
          return !type.startsWith('datetime') || !hasMinute
        }
        case 5: {
          return !type.startsWith('datetime') || !hasSecond
        }
      }

      return false
    }
  }
}
</script>
