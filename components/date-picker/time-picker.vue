<template>
  <div
    :class="className"
    @keydown="handleInput"
    @clickoutside="finishInput"
  >
    <MultipleInput
      ref="control"
      readonly
      :separator="computedSeparator"
      :value="controlValue"
      :labels="labels"
      :item-class="`${prefix}__input`"
      :item-class-list="itemClassList"
      :outside-blur="false"
      :disabled-item="disabledInputVaule"
      :disabled="disabled"
      :size="size"
      :state="state"
      @on-change="handleControlChange"
      @on-focus="handleFocus"
      @on-suffix-click="handleClear"
      @on-item-change="handleInputFocus"
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
          <Icon v-else name="regular/clock"></Icon>
        </div>
      </template>
    </MultipleInput>
    <transition :name="transitionName">
      <div
        v-show="focused"
        ref="popper"
        :class="`${prefix}__popper`"
      >
        <div
          :class="`${prefix}__pane`"
          @click="handleInputFocus(currentColumn)"
        >
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
            <TimeWheel
              :no-arrow="noArrow"
              :candidate="candidate"
              :steps="steps"
              :values="[hour, minute, second]"
              @on-mount="updatePopper"
              @on-toggle-col="handleInputFocus"
              @on-change="handleWheelChange"
            ></TimeWheel>
            <div v-if="!noAction" :class="`${prefix}__action`">
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
import Icon from '../icon'
import MultipleInput from '../multiple-input'
import TimeWheel from './time-wheel.vue'

import { CLICK_OUTSIDE, observe, disconnect } from '@/utils/event'
import { placementWhileList, usePopper } from '@/mixins/popper'
// import formControl from '@/mixins/form-control'
import { config, useConfigurableProps } from '@/config/properties'
import { format, toDate } from '@/utils/date'
import { noop } from '@/utils/common'

import '../../icons/times-circle'
import '../../icons/regular/clock'

const prefix = config.defaults.prefixCls

const props = useConfigurableProps({
  size: {
    default: 'default',
    validator(value) {
      return ['small', 'default', 'large'].includes(value)
    }
  },
  placement: {
    default: 'bottom-start',
    validator(value) {
      return placementWhileList.includes(value)
    }
  },
  format: {
    type: String,
    default: 'HH:mm:ss'
  },
  separator: {
    type: String,
    default: ':'
  },
  value: {
    type: [Number, String, Date],
    default() {
      return new Date()
    }
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
  noArrow: {
    type: Boolean,
    default: false
  },
  candidate: {
    default: 2,
    validator(value) {
      return [0, 1, 2, 3].includes(value)
    }
  },
  steps: {
    type: Array,
    default() {
      return [1, 1, 1]
    }
  },
  labels: {
    type: Array,
    default() {
      return []
    }
  },
  shortcuts: {
    type: Array,
    default() {
      return []
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
  disableValidate: {
    type: Boolean,
    default: false
  }
})

export default {
  name: 'TimePicker',
  components: {
    Button,
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
    'on-change-col',
    'on-change',
    'on-foucs',
    'on-blur',
    'on-plus',
    'on-minus',
    'on-enter',
    'on-input',
    'on-clear',
    'on-shortcut',
    'update:value'
  ],
  data() {
    return {
      prefix: `${prefix}-time-picker`,
      hour: null,
      minute: null,
      second: null,
      hasHour: true,
      hasMinute: true,
      hasSecond: true,
      focused: false,
      currentColumn: null,
      isMounted: false,
      changed: false,
      hourActivated: false,
      minuteActivated: false,
      secondActivated: false,
      transitionName: `${prefix}-drop`,
      okText: '确认',
      cancelText: '取消',
      inControl: false
    }
  },
  computed: {
    className() {
      const {
        prefix,
        focused,
        disabled,
        size,
        hasHour,
        hasMinute,
        hasSecond
      } = this

      return [
        prefix,
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
        `${prefix}__input--hour`,
        `${prefix}__input--minute`,
        `${prefix}__input--second`
      ]
    },
    formatedHour() {
      const { hourActivated, noFiller, hour, filler, formatDigit } = this

      return noFiller || hourActivated
        ? formatDigit(hour)
        : `${filler}${filler}`
    },
    formatedMinute() {
      const { minuteActivated, noFiller, minute, filler, formatDigit } = this

      return noFiller || minuteActivated
        ? formatDigit(minute)
        : `${filler}${filler}`
    },
    formatedSecond() {
      const { secondActivated, noFiller, second, filler, formatDigit } = this

      return noFiller || secondActivated
        ? formatDigit(second)
        : `${filler}${filler}`
    },
    referenceObject() {
      return this.$refs.control.$el
    },
    computedSeparator() {
      const { separator, hasHour, hasMinute, hasSecond } = this

      let computedSeparator

      if (typeof separator === 'string') {
        computedSeparator = [separator, separator]
      } else {
        computedSeparator = Array.form(separator)
      }

      if (hasHour && !hasMinute && !hasSecond) {
        computedSeparator[0] = ''
      }

      if (hasMinute && !hasSecond) {
        computedSeparator[1] = ''
      }

      return computedSeparator
    },
    controlValue() {
      return [this.formatedHour, this.formatedMinute, this.formatedSecond]
    }
  },
  watch: {
    hour() {
      this.handleTimeChange()

      if (this.isMounted && !this.hourActivated) {
        this.hourActivated = true
      }
    },
    minute() {
      this.handleTimeChange()

      if (this.isMounted && !this.minuteActivated) {
        this.minuteActivated = true
      }
    },
    second() {
      this.handleTimeChange()

      if (this.isMounted && !this.secondActivated) {
        this.secondActivated = true
      }
    },
    currentColumn(value) {
      this.$refs.control.currentItem = value

      if (value !== null) {
        this.$emit('on-change-col', value)
      }
    },
    focused(value) {
      this.updatePopper()

      if (value) {
        this.$emit('on-foucs')
      } else {
        this.$emit('on-blur')

        if (this.changed) {
          this.changed = false
          this.$nextTick(() => {
            this.$emit(
              'on-change',
              this.getOriginDate(),
              this.getFormatDate(),
              {
                hour: this.hour,
                minute: this.minute,
                second: this.second
              }
            )

            if (!this.disableValidate) {
              this.validateField()
            }
          })
        }

        if (!this.hourActivated) {
          this.hourActivated = true
        }

        if (!this.minuteActivated) {
          this.minuteActivated = true
        }

        if (!this.secondActivated) {
          this.secondActivated = true
        }
      }
    },
    value(value) {
      const isLegal = this.isLegalTime(value)

      if (!isLegal) {
        this.changed = true
      }

      this.hourActivated = isLegal
      this.minuteActivated = isLegal
      this.secondActivated = isLegal

      this.parseTime(this.value)
      this.verifyValue()
    },
    format() {
      this.parseFormat()
    }
  },
  created() {
    this.parseFormat()
    this.parseTime(this.value)
    this.defaultValue = this.getDateValue()
  },
  mounted() {
    observe(this.$el, CLICK_OUTSIDE)

    this.verifyValue()
    this.$nextTick(() => {
      this.createPopper()
      this.isMounted = true
    })
  },
  beforeDestroy() {
    disconnect(this.$el, CLICK_OUTSIDE)
  },
  methods: {
    isLegalTime(value) {
      return (
        !!+new Date(value) ||
        (typeof value === 'string' && /^\d{1,2}:\d{1,2}:\d{1,2}$/.test(value))
      )
    },
    formatDigit(number) {
      return number < 10 ? `0${number}` : `${number}`
    },
    handleWheelChange({ type, value }) {
      this[type] = value
    },
    handleControlChange(value) {
      const { noFiller, filler } = this
      const defaultValue = `${filler}${filler}`

      if (noFiller) {
        this.hour = parseInt(value[0]) || 0
        this.minute = parseInt(value[1]) || 0
        this.second = parseInt(value[2]) || 0
      } else {
        if (value[0] !== defaultValue) {
          this.hour = parseInt(value[0]) || 0
        }

        if (value[1] !== defaultValue) {
          this.minute = parseInt(value[1]) || 0
        }

        if (value[2] !== defaultValue) {
          this.second = parseInt(value[2]) || 0
        }
      }
    },
    handleFocus() {
      this.focused = true
    },
    handleInputFocus(index) {
      this.$nextTick(() => {
        if (this.focused) {
          this.currentColumn = index

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
      }

      if (keyCode >= 96 && keyCode <= 105) {
        isInput = true
        inputNumber = keyCode - 96
      }

      if (isInput) {
        switch (this.currentColumn) {
          case 0: {
            this.handleInputHour(inputNumber)
            break
          }
          case 1: {
            this.handleInputMinute(inputNumber)
            break
          }
          case 2: {
            this.handleInputSecond(inputNumber)
            break
          }
        }

        event.preventDefault()
      }
    },
    handleInputHour(number) {
      this.handleInputNumber('hour', number)

      this.$nextTick(() => {
        if (this.hour >= 10) {
          this.currentColumn = 1
        }
      })
    },
    handleInputMinute(number) {
      this.handleInputNumber('minute', number)

      this.$nextTick(() => {
        if (this.minute >= 10) {
          this.currentColumn = 2
        }
      })
    },
    handleInputSecond(number) {
      this.handleInputNumber('second', number)
    },
    handleInputNumber(type, number) {
      const old = this[type]

      if ((this.noFiller || this[`${type}Activated`]) && old > 0 && old < 10) {
        this[type] = old * 10 + number
      } else {
        this[type] = number
      }

      this.verifyValue()
    },
    verifyValue() {
      this.hour = Math.max(Math.min(this.hour, 23), 0)
      this.minute = Math.max(Math.min(this.minute, 59), 0)
      this.second = Math.max(Math.min(this.second, 59), 0)
    },
    getColumnCount() {
      return +this.hasHour + +this.hasMinute + +this.hasSecond
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
    getCurrentType() {
      let type = ''

      if (this.currentColumn === 0) {
        type = 'hour'
      } else if (this.currentColumn === 1) {
        type = 'minute'
      } else if (this.currentColumn === 2) {
        type = 'second'
      }

      return type
    },
    plusOne() {
      const type = this.getCurrentType()

      if (type) {
        this[type]++

        this.verifyValue()
        this.$emit('on-plus', type, this[type])
      }
    },
    minusOne() {
      const type = this.getCurrentType()

      if (type) {
        this[type]--

        this.verifyValue()
        this.$emit('on-minus', type, this[type])
      }
    },
    enterInput() {
      this.finishInput()
      this.$emit('on-enter')
    },
    finishInput() {
      if (this.focused) {
        this.currentColumn = null
        this.focused = false
        this.$refs.control.handleBlur()
      }
    },
    handleTimeChange() {
      this.changed = true

      this.$emit('on-input', this.getOriginDate(), this.getFormatDate(), {
        hour: this.hour,
        minute: this.minute,
        second: this.second
      })
    },
    getOriginDate() {
      const { formatedHour, formatedMinute, formatedSecond } = this

      return `${formatedHour}:${formatedMinute}:${formatedSecond}`
    },
    getDateValue() {
      const date = new Date()

      date.setHours(this.hour)
      date.setMinutes(this.minute)
      date.setSeconds(this.second)

      return date
    },
    getFormatDate() {
      return format(this.getDateValue(), this.format)
    },
    parseTime(value) {
      if (!value) {
        value = this.defaultValue || Date.now()
      }

      let hour
      let minute
      let second

      try {
        value = toDate(value)
      } catch (e) {}

      if (typeof value === 'string') {
        [hour, minute, second] = value
          .split(' ')
          .pop()
          .split(':')
      } else {
        hour = value.getHours()
        minute = value.getMinutes()
        second = value.getSeconds()
      }

      hour = parseInt(hour) || 0
      minute = parseInt(minute) || 0
      second = parseInt(second) || 0

      this.hour = hour
      this.minute = minute
      this.second = second
    },
    parseFormat() {
      this.hasHour = this.format.includes('H')
      this.hasMinute = this.format.includes('m')
      this.hasSecond = this.format.includes('s')
    },
    handleEnterControl() {
      this.inControl = true
    },
    handleLeaveControl() {
      this.inControl = false
    },
    handleClear(event) {
      if (this.clearable) {
        event.stopPropagation()

        this.parseTime(this.defaultValue)
        this.$nextTick(() => {
          // if (this.hourActivated || this.minuteActivated || this.secondActivated) {
          //   this.$emit('on-change', null, null, {})
          // }

          this.hourActivated = false
          this.minuteActivated = false
          this.secondActivated = false

          this.$emit('on-clear')
        })
      }
    },
    handleCancel() {
      this.parseTime(this.value)
      this.verifyValue()
      this.finishInput()
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
    disabledInputVaule(index) {
      const { hasHour, hasMinute, hasSecond } = this

      switch (index) {
        case 0: {
          return !hasHour
        }
        case 1: {
          return !hasMinute
        }
        case 2: {
          return !hasSecond
        }
      }

      return false
    }
  }
}
</script>
