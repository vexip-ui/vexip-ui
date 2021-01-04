<template>
  <ul :class="className">
    <li
      :class="[
        `${prefix}__item`,
        `${prefix}__item--prev`,
        disabledPrev ? `${prefix}__item--disabled` : ''
      ]"
      :title="prevTitle"
      @click="handlePrev"
    >
      <slot name="prev">
        <Icon name="chevron-left" :scale="0.8"></Icon>
      </slot>
    </li>
    <li
      :class="{
        [`${prefix}__item`]: true,
        [`${prefix}__item--disabled`]: disabledItems.includes(1),
        [`${prefix}__item--active`]: currentActive === 1
      }"
      @click="changeActive(1)"
    >
      <slot name="item" :page="1">
        {{ 1 }}
      </slot>
    </li>
    <li
      v-if="useEllipsis && mode !== 'left'"
      :class="{
        [`${prefix}__item`]: true,
        [`${prefix}__item--more`]: true,
        [`${prefix}__item--disabled`]: !prevEllipsisTarget
      }"
      :title="prevTurnPageTitle"
      @click="handleClickPrevEllipsis"
      @mouseenter="handleEnterPrevEllipsis"
      @mouseleave="handleLeavePrevEllipsis"
    >
      <Icon
        v-if="inPrevEllipsis"
        name="angle-double-left"
        :scale="0.8"
      ></Icon>
      <Icon
        v-else
        name="ellipsis-h"
        :scale="0.8"
      ></Icon>
    </li>
    <template v-if="pagers.length">
      <li
        v-for="(page, index) in pagers"
        :key="index"
        :class="{
          [`${prefix}__item`]: true,
          [`${prefix}__item--disabled`]: disabledItems.includes(page),
          [`${prefix}__item--active`]: currentActive === page
        }"
        @click="changeActive(page)"
      >
        <slot name="item" :page="page">
          {{ page }}
        </slot>
      </li>
    </template>
    <li
      v-if="useEllipsis && mode !== 'right'"
      :class="{
        [`${prefix}__item`]: true,
        [`${prefix}__item--more`]: true,
        [`${prefix}__item--disabled`]: !nextEllipsisTarget
      }"
      :title="nextTurnPageTitle"
      @click="handleClickNextEllipsis"
      @mouseenter="handleEnterNextEllipsis"
      @mouseleave="handleLeaveNextEllipsis"
    >
      <Icon
        v-if="inNextEllipsis"
        name="angle-double-right"
        :scale="0.8"
      ></Icon>
      <Icon
        v-else
        name="ellipsis-h"
        :scale="0.8"
      ></Icon>
    </li>
    <li
      v-if="pagerCount > 1"
      :class="{
        [`${prefix}__item`]: true,
        [`${prefix}__item--disabled`]: disabledItems.includes(pagerCount),
        [`${prefix}__item--active`]: currentActive === pagerCount
      }"
      :title="nextTitle"
      @click="changeActive(pagerCount)"
    >
      <slot name="item" :page="pagerCount">
        {{ pagerCount }}
      </slot>
    </li>
    <li
      :class="[
        `${prefix}__item`,
        `${prefix}__item--next`,
        disabledNext ? `${prefix}__item--disabled` : ''
      ]"
      @click="handleNext"
    >
      <slot name="next">
        <Icon name="chevron-right" :scale="0.8"></Icon>
      </slot>
    </li>
    <slot>
      <div v-if="pageTotal" :class="`${prefix}__total`">
        {{ `共 ${total} ${itemUnit}` }}
      </div>
      <div v-if="pageCount" :class="`${prefix}__size`">
        <Select v-model="currentPageSize" size="small">
          <Option
            v-for="(item, index) in sizeOptions"
            :key="index"
            :value="item"
            :label="`${item} ${itemUnit}/页`"
          ></Option>
        </Select>
      </div>
      <div v-if="pageJump" :class="`${prefix}__jump`">
        跳至
        <NumberInput
          ref="jumpInput"
          size="small"
          :value="currentActive"
          :class="`${prefix}__jump-input`"
          @on-change="handleJumpPage"
        ></NumberInput>
        页
      </div>
    </slot>
  </ul>
</template>

<script>
import Icon from '../icon'
import NumberInput from '../number-input'
import Option from '../option'
import Select from '../select'

import { useConfigurableProps } from '../../src/config/properties'
import { range } from '../../src/utils/common'

import '../../icons/chevron-right'
import '../../icons/chevron-left'
import '../../icons/angle-double-right'
import '../../icons/angle-double-left'
import '../../icons/ellipsis-h'

const { prefix } = require('../../src/style/basis/variable')

const props = useConfigurableProps({
  size: {
    default: 'default',
    validator(value) {
      return ['small', 'default', 'large'].includes(value)
    }
  },
  total: {
    type: Number,
    default: 0,
    validator(value) {
      return value >= 0
    }
  },
  noBorder: {
    type: Boolean,
    default: false
  },
  background: {
    type: Boolean,
    default: false
  },
  pageSize: {
    type: Number,
    default: 10,
    validator(value) {
      return value > 0
    }
  },
  sizeOptions: {
    type: Array,
    default() {
      return [10, 20, 50, 100]
    }
  },
  maxCount: {
    type: Number,
    default: 7,
    validator(value) {
      // 大于6的整数
      return value === parseInt(value) && value > 6
    }
  },
  active: {
    type: [Number, String],
    default: 1,
    validator(value) {
      return value > 0
    }
  },
  disabled: {
    type: Boolean,
    default: false
  },
  disabledItems: {
    type: Array,
    default() {
      return []
    }
  },
  turnPageCount: {
    type: Number,
    default: 5
  },
  pageJump: {
    type: Boolean,
    default: false
  },
  pageCount: {
    type: Boolean,
    default: false
  },
  pageTotal: {
    type: Boolean,
    default: false
  },
  itemUnit: {
    type: String,
    default: '条'
  }
})

export default {
  name: 'Pagination',
  components: {
    Icon,
    NumberInput,
    Option,
    Select
  },
  model: {
    prop: 'active',
    event: 'on-change'
  },
  props,
  emits: ['on-change', 'on-page-size-change'],
  data() {
    return {
      prefix: `${prefix}-pagination`,
      pagers: [],
      currentActive: this.queryEnableActive(this.active, 1),
      currentPageSize: this.pageSize,
      mode: 'left',
      inPrevEllipsis: false,
      inNextEllipsis: false
    }
  },
  computed: {
    className() {
      const { prefix, size, noBorder, background, disabled } = this

      return {
        [prefix]: true,
        [`${prefix}--${size}`]: size !== 'default',
        [`${prefix}--background`]: background,
        [`${prefix}--no-border`]: noBorder,
        [`${prefix}--disabled`]: disabled
      }
    },
    pagerCount() {
      return Math.ceil(this.total / (this.currentPageSize || 1)) || 1
    },
    disabledPrev() {
      const count = this.queryEnableActive(1, 1)

      if (count >= this.pagerCount) return true

      return this.currentActive === count
    },
    disabledNext() {
      const count = this.queryEnableActive(this.pagerCount, -1)

      if (count <= 1) return true

      return this.currentActive === count
    },
    prevTitle() {
      return '上一页'
    },
    nextTitle() {
      return '下一页'
    },
    prevTurnPageTitle() {
      return `向前${this.turnPageCount}页`
    },
    nextTurnPageTitle() {
      return `向后${this.turnPageCount}页`
    },
    useEllipsis() {
      return this.pagerCount > this.maxCount
    },
    prevEllipsisTarget() {
      if (!this.useEllipsis) return null

      let active = this.queryEnableActive(
        this.currentActive - this.turnPageCount,
        -1
      )

      if (active < 1) {
        active = this.queryEnableActive(active + 1, 1)

        if (active >= this.currentActive) return null
      }

      return active
    },
    nextEllipsisTarget() {
      if (!this.useEllipsis) return null

      let active = this.queryEnableActive(
        this.currentActive + this.turnPageCount,
        1
      )

      if (active > this.pagerCount) {
        active = this.queryEnableActive(active - 1, -1)

        if (active <= this.currentActive) return null
      }

      return active
    }
  },
  watch: {
    active(value) {
      this.changeActive(value)
    },
    currentActive(value) {
      this.computePagers()
      this.$emit('on-change', value)
    },
    maxCount() {
      this.computePagers()
    },
    pagerCount() {
      this.computePagers()
    },
    pageSize(value) {
      this.currentPageSize = value
    },
    currentPageSize(value, old) {
      this.$emit('on-page-size-change', value)

      // 按当前页的第一条数据计算新的页码
      let active = Math.ceil((old * (this.currentActive - 1) + 1) / value)

      active = this.queryEnableActive(this.currentActive, 1)

      if (active > this.pagerCount) {
        active = this.queryEnableActive(this.currentActive - 1, -1)

        if (active < 1) this.currentActive = null
      }

      this.currentActive = active
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.computePagers()
    })
  },
  methods: {
    changeActive(active) {
      active = parseInt(active)

      if (
        this.disabled ||
        this.disabledItems.includes(active) ||
        active < 1 ||
        active > this.pagerCount
      ) {
        return false
      }

      this.currentActive = Math.max(Math.min(active, this.pagerCount), 1)

      return true
    },
    handlePrev() {
      if (!this.disabledPrev && !this.disabled) {
        const active = this.queryEnableActive(this.currentActive - 1, -1)

        if (active < 1) return

        this.changeActive(active)
      }
    },
    handleNext() {
      if (!this.disabledNext && !this.disabled) {
        const active = this.queryEnableActive(this.currentActive + 1, 1)

        if (active > this.pagerCount) return

        this.changeActive(active)
      }
    },
    computePagers() {
      const { currentActive, pagerCount, maxCount } = this

      let pagers

      if (pagerCount <= maxCount) {
        pagers = range(pagerCount)
      } else {
        const moreSizeCount = maxCount - 2
        const criticalPoint = Math.ceil(maxCount / 2)

        if (currentActive < criticalPoint) {
          pagers = range(moreSizeCount, 1)
          pagers.push(pagerCount)

          this.mode = 'left'
        } else if (currentActive <= pagerCount - criticalPoint) {
          let count = moreSizeCount - 2

          if (count % 2 === 0) {
            count -= 1
          }

          pagers = range(count, currentActive - (count - 1) / 2)
          pagers.unshift(1)
          pagers.push(pagerCount)

          this.mode = 'center'
        } else {
          pagers = range(moreSizeCount, pagerCount - moreSizeCount + 1)
          pagers.unshift(1)

          this.mode = 'right'
        }
      }

      if (pagers.length === 1) {
        this.pagers = []
      }

      this.pagers = pagers.slice(1, pagers.length - 1)
    },
    handleEnterPrevEllipsis() {
      this.inPrevEllipsis = true
    },
    handleLeavePrevEllipsis() {
      this.inPrevEllipsis = false
    },
    handleClickPrevEllipsis() {
      if (!this.disabled && this.prevEllipsisTarget) {
        this.changeActive(this.prevEllipsisTarget)
      }
    },
    handleEnterNextEllipsis() {
      this.inNextEllipsis = true
    },
    handleLeaveNextEllipsis() {
      this.inNextEllipsis = false
    },
    handleClickNextEllipsis() {
      if (!this.disabled && this.nextEllipsisTarget) {
        this.changeActive(this.nextEllipsisTarget)
      }
    },
    queryEnableActive(active, step) {
      step = step / Math.abs(step)

      while (this.disabledItems.includes(active)) {
        active += step
      }

      return active
    },
    handleJumpPage(active) {
      active = parseInt(active)

      if (active < 1) active = 1
      if (active > this.pagerCount) active = this.pagerCount

      const originActive = active

      if (active !== this.currentActive) {
        const step = active > this.currentActive ? 1 : -1

        active = this.queryEnableActive(originActive, step)

        if (step > 0 ? active > this.pagerCount : active < 1) {
          active = this.queryEnableActive(originActive, -step)

          if (step > 0 ? active < 1 : active > this.pagerCount) {
            this.currentActive = null
          }
        }

        this.currentActive = active

        if (this.$refs.jumpInput) {
          this.$refs.jumpInput.currentValue = this.currentActive.toString()
        }
      }
    }
  }
}
</script>
