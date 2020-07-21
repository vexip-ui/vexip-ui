<template>
  <div :class="`${prefix}__wheel`">
    <Wheel
      ref="wheels"
      :pointer="pointer"
      :active="hourIndex"
      :arrow="!noArrow"
      :candidate="candidate"
      @on-change="handleHourWheel($event, 0)"
      @mouseenter.native="handleToggleColumn(0)"
      @on-mount="handleMounted"
    >
      <WheelItem
        v-for="item in hourRange"
        :key="item"
        :value="item"
      >
        {{ formatDigit(item) }}
      </WheelItem>
    </Wheel>
    <Wheel
      ref="wheels"
      :active="minuteIndex"
      :arrow="!noArrow"
      :candidate="candidate"
      @on-change="handleMinuteWheel($event, 1)"
      @mouseenter.native="handleToggleColumn(1)"
      @on-mount="handleMounted"
    >
      <WheelItem
        v-for="item in minuteRange"
        :key="item"
        :value="item"
      >
        {{ formatDigit(item) }}
      </WheelItem>
    </Wheel>
    <Wheel
      ref="wheels"
      :active="secondIndex"
      :arrow="!noArrow"
      :candidate="candidate"
      @on-change="handleSecondWheel($event, 2)"
      @mouseenter.native="handleToggleColumn(2)"
      @on-mount="handleMounted"
    >
      <WheelItem
        v-for="item in secondRange"
        :key="item"
        :value="item"
      >
        {{ formatDigit(item) }}
      </WheelItem>
    </Wheel>
  </div>
</template>

<script>
import Wheel from '../wheel'
import WheelItem from '../wheel/wheel-item'
import { range } from '../../utils/common'

const { prefix } = require('../../style/basis/variable')

export default {
  name: 'TimeWheel',
  components: {
    Wheel,
    WheelItem
  },
  props: {
    noArrow: {
      type: Boolean,
      default: false
    },
    values: {
      type: Array,
      default() {
        return [0, 0, 0]
      }
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
      },
      validator(value) {
        if (value[0] && 24 % value[0] !== 0) {
          return false
        }

        for (let i = 1; i < 3; i++) {
          if (value[i] && 60 % value[i] !== 0) {
            return false
          }
        }

        return true
      }
    },
    pointer: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      prefix: `${prefix}-time-picker`,
      hourIndex: 0,
      minuteIndex: 0,
      secondIndex: 0,
      hourRange: [],
      minuteRange: [],
      secondRange: []
    }
  },
  watch: {
    steps() {
      this.updateTimeRange()
    },
    values(value) {
      this.parseValues(value)
    }
  },
  mounted() {
    this.updateTimeRange()
    this.parseValues(this.values)
  },
  methods: {
    formatDigit(number) {
      return number < 10 ? `0${number}` : `${number}`
    },
    handleToggleColumn(index) {
      this.$emit('on-toggle-col', index)
    },
    handleMounted() {
      this.$emit('on-mount')
    },
    handleHourWheel(index, column) {
      this.handleToggleColumn(column)
      this.handleChange('hour', index)
    },
    handleMinuteWheel(index, column) {
      this.handleToggleColumn(column)
      this.handleChange('minute', index)
    },
    handleSecondWheel(index, column) {
      this.handleToggleColumn(column)
      this.handleChange('second', index)
    },
    handleChange(type, index) {
      this.$emit('on-change', { type, value: this[`${type}Range`][index] })
    },
    parseValues([hour, minute, second]) {
      this.hourIndex = Math.max(
        this.hourRange.findIndex(item => item === hour),
        0
      )
      this.minuteIndex = Math.max(
        this.minuteRange.findIndex(item => item === minute),
        0
      )
      this.secondIndex = Math.max(
        this.secondRange.findIndex(item => item === second),
        0
      )
    },
    updateTimeRange() {
      const [hourStep = 1, minuteStep = 1, secondStep = 1] = this.steps

      this.hourRange = range(24 / hourStep, 0, hourStep)
      this.minuteRange = range(60 / minuteStep, 0, minuteStep)
      this.secondRange = range(60 / secondStep, 0, secondStep)
    },
    refreshWheel() {
      this.$refs.wheels.forEach(item => {
        item.refreshScroll()
      })
    }
  }
}
</script>
