<template>
  <ul :class="className">
    <li
      :class="[
        `${prefix}__item`,
        `${prefix}__item--prev`,
        disabledPrev ? `${prefix}__item--disabled` : ''
      ]"
      :title="locale.prevPage"
      @click="handlePrev"
    >
      <slot name="prev">
        <Icon :scale="0.8">
          <ChevronLeft></ChevronLeft>
        </Icon>
      </slot>
    </li>
    <li
      :class="{
        [`${prefix}__item`]: true,
        [`${prefix}__item--disabled`]: isFunction(disableItem) && disableItem(1),
        [`${prefix}__item--active`]: currentActive === 1
      }"
      @click="changeActive(1)"
    >
      <slot name="item" :page="1">
        {{ 1 }}
      </slot>
    </li>
    <li
      v-if="useEllipsis && mode !== PaginationMode.LEFT"
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
      <transition name="vxp-fade">
        <Icon v-if="inPrevEllipsis" :scale="0.8">
          <AnglesLeft></AnglesLeft>
        </Icon>
        <Icon v-else :scale="0.8" style="position: absolute;">
          <Ellipsis></Ellipsis>
        </Icon>
      </transition>
    </li>
    <template v-if="currentPagers.length">
      <li
        v-for="(page, index) in currentPagers"
        :key="index"
        :class="{
          [`${prefix}__item`]: true,
          [`${prefix}__item--disabled`]: isFunction(disableItem) && disableItem(page),
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
      v-if="useEllipsis && mode !== PaginationMode.RIGHT"
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
      <transition name="vxp-fade">
        <Icon v-if="inNextEllipsis" :scale="0.8">
          <AnglesRight></AnglesRight>
        </Icon>
        <Icon v-else :scale="0.8" style="position: absolute;">
          <Ellipsis></Ellipsis>
        </Icon>
      </transition>
    </li>
    <li
      v-if="pagerCount > 1"
      :class="{
        [`${prefix}__item`]: true,
        [`${prefix}__item--disabled`]: isFunction(disableItem) && disableItem(pagerCount),
        [`${prefix}__item--active`]: currentActive === pagerCount
      }"
      :title="locale.nextPage"
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
        <Icon :scale="0.8">
          <ChevronRight></ChevronRight>
        </Icon>
      </slot>
    </li>
    <slot>
      <div v-if="pageTotal" :class="`${prefix}__total`">
        {{ `${locale.total} ${total} ${itemUnit ?? locale.itemUnit}` }}
      </div>
      <div v-if="pageCount" :class="`${prefix}__size`">
        <Select v-model="currentPageSize" size="small">
          <Option
            v-for="(item, index) in sizeOptions"
            :key="index"
            :value="item"
            :label="`${item} ${itemUnit ?? locale.itemUnit}${locale.prePage}`"
          ></Option>
        </Select>
      </div>
      <div v-if="pageJump" :class="`${prefix}__jump`">
        {{ locale.jumpTo }}
        <NumberInput
          v-model:value="jumpValue"
          size="small"
          :class="`${prefix}__jump-input`"
          @on-change="handleJumpPage"
        ></NumberInput>
        {{ getCountWordOnly(locale.page, 1) }}
      </div>
    </slot>
  </ul>
</template>

<script lang="ts">
import { defineComponent, ref, computed, watch, onMounted, nextTick } from 'vue'
import { Icon } from '@/components/icon'
import { NumberInput } from '@/components/number-input'
import { Option } from '@/components/option'
import { Select } from '@/components/select'
import { useConfiguredProps, useLocaleConfig, getCountWord, getCountWordOnly, createSizeProp } from '@vexip-ui/config'
import { isFunction, range } from '@vexip-ui/utils'
import { PaginationMode } from './symbol'
import { ChevronRight, ChevronLeft, AnglesRight, AnglesLeft, Ellipsis } from '@vexip-ui/icons'

import type { PropType } from 'vue'

const props = useConfiguredProps('pagination', {
  size: createSizeProp(),
  total: {
    type: Number,
    default: 0,
    validator: (value: number) => {
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
    validator: (value: number) => {
      return value > 0
    }
  },
  sizeOptions: {
    type: Array as PropType<number[]>,
    default() {
      return [10, 20, 50, 100]
    },
    validator: (values: number[]) => {
      return !values.find(value => typeof value !== 'number')
    }
  },
  maxCount: {
    type: Number,
    default: 7,
    validator: (value: number) => {
      // 大于6的整数
      return value === parseInt(value.toString()) && value > 6
    }
  },
  active: {
    type: Number,
    default: 1,
    validator: (value: number) => {
      return value > 0
    }
  },
  disabled: {
    type: Boolean,
    default: false
  },
  disableItem: {
    type: Function as PropType<(page: number) => boolean>,
    default: null
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
    default: null
  }
})

export default defineComponent({
  name: 'Pagination',
  components: {
    Icon,
    NumberInput,
    Option,
    Select,
    ChevronRight,
    ChevronLeft,
    AnglesRight,
    AnglesLeft,
    Ellipsis
  },
  props,
  emits: ['on-change', 'on-page-size-change', 'update:active'],
  setup(props, { emit }) {
    const prefix = 'vxp-pagination'
    const currentPagers = ref<number[]>([])
    const currentActive = ref(props.active)
    const currentPageSize = ref(props.pageSize)
    const mode = ref(PaginationMode.LEFT)
    const inPrevEllipsis = ref(false)
    const inNextEllipsis = ref(false)
    const jumpValue = ref(props.active)

    const locale = useLocaleConfig('pagination')

    const className = computed(() => {
      return {
        [prefix]: true,
        [`${prefix}-vars`]: true,
        [`${prefix}--${props.size}`]: props.size !== 'default',
        [`${prefix}--background`]: props.background,
        [`${prefix}--no-border`]: props.noBorder,
        [`${prefix}--disabled`]: props.disabled
      }
    })
    const pagerCount = computed(() => {
      return Math.ceil(props.total / (currentPageSize.value || 1)) || 1
    })
    const disabledPrev = computed(() => {
      const count = queryEnabledActive(1, 1)

      return count >= pagerCount.value || currentActive.value === count
    })
    const disabledNext = computed(() => {
      const count = queryEnabledActive(pagerCount.value, -1)

      return count <= 1 || currentActive.value === count
    })
    const prevTurnPageTitle = computed(() => {
      return `${locale.prev} ${getCountWord(locale.page, props.turnPageCount)}`
    })
    const nextTurnPageTitle = computed(() => {
      return `${locale.next} ${getCountWord(locale.page, props.turnPageCount)}`
    })
    const useEllipsis = computed(() => {
      return pagerCount.value > props.maxCount
    })
    const prevEllipsisTarget = computed(() => {
      if (!useEllipsis.value) return 0

      let active = queryEnabledActive(currentActive.value - props.turnPageCount, -1)

      if (active < 1) {
        active = queryEnabledActive(active + 1, 1)

        if (active >= currentActive.value) return 0
      }

      return active
    })
    const nextEllipsisTarget = computed(() => {
      if (!useEllipsis.value) return 0

      let active = queryEnabledActive(currentActive.value + props.turnPageCount, 1)

      if (active > pagerCount.value) {
        active = queryEnabledActive(active - 1, -1)

        if (active <= currentActive.value) return 0
      }

      return active
    })

    watch(() => props.active, changeActive)
    watch(currentActive, value => {
      computePagers()
      emit('on-change', value)
      emit('update:active', value)
    })
    watch(() => props.maxCount, computePagers)
    watch(pagerCount, computePagers)
    watch(
      () => props.pageSize,
      value => {
        currentPageSize.value = value
      }
    )
    watch(currentPageSize, (value, prevValue) => {
      emit('on-page-size-change', value)

      // 按当前页的第一条数据计算新的页码
      const anchor = Math.ceil((prevValue * (currentActive.value - 1) + 1) / value)

      let active = queryEnabledActive(anchor, 1)

      if (active > pagerCount.value) {
        active = queryEnabledActive(anchor - 1, -1)

        if (active < 1) active = 0
      }

      currentActive.value = active
    })

    onMounted(() => {
      nextTick(computePagers)
    })

    function queryEnabledActive(active: number, step: number) {
      step = step / Math.abs(step)

      if (isFunction(props.disableItem)) {
        while (props.disableItem(active)) {
          active += step

          if (active < 1 || active > pagerCount.value) break
        }
      }

      return active
    }

    function changeActive(active: number) {
      active = parseInt(active.toString())

      if (
        props.disabled ||
        active < 1 ||
        active > pagerCount.value ||
        (isFunction(props.disableItem) && props.disableItem(active))
      ) {
        return
      }

      currentActive.value = active
    }

    function handlePrev() {
      if (!disabledPrev.value && !props.disabled) {
        const active = queryEnabledActive(currentActive.value - 1, -1)

        if (active >= 1) changeActive(active)
      }
    }

    function handleNext() {
      if (!disabledNext.value && !props.disabled) {
        const active = queryEnabledActive(currentActive.value + 1, 1)

        if (active <= pagerCount.value) changeActive(active)
      }
    }

    function computePagers() {
      let pagers

      if (pagerCount.value <= props.maxCount) {
        // 未超过最大值，显示所有页号
        pagers = range(pagerCount.value)
      } else {
        const numberCount = props.maxCount - 2 // 显示为数字的页号
        const criticalCount = Math.ceil(props.maxCount / 2) // 切换模式的关键计数

        if (currentActive.value < criticalCount) {
          // 出现后侧一个省略号，前侧连续
          pagers = range(numberCount)
          pagers.push(pagerCount.value)

          mode.value = PaginationMode.LEFT
        } else if (currentActive.value <= pagerCount.value - criticalCount) {
          // 出现两个省略号，中间连续
          let count = numberCount - 2

          // 保持中间数字的页号数目为单数
          if (count % 2 === 0) {
            count -= 1
          }

          pagers = range(count, currentActive.value - (count - 1) / 2) // 同 Math.floor(count / 2)
          pagers.unshift(1)
          pagers.push(pagerCount.value)

          mode.value = PaginationMode.CENTER
        } else {
          // 出现前侧一个省略号，后侧连续
          pagers = range(numberCount, pagerCount.value - numberCount + 1)
          pagers.unshift(1)

          mode.value = PaginationMode.RIGHT
        }
      }

      if (pagers.length === 1) {
        currentPagers.value = []
      }

      currentPagers.value = pagers.slice(1, -1)
    }

    function handleEnterPrevEllipsis() {
      inPrevEllipsis.value = true
    }

    function handleLeavePrevEllipsis() {
      inPrevEllipsis.value = false
    }

    function handleClickPrevEllipsis() {
      if (!props.disabled && prevEllipsisTarget.value) {
        changeActive(prevEllipsisTarget.value)
      }
    }

    function handleEnterNextEllipsis() {
      inNextEllipsis.value = true
    }

    function handleLeaveNextEllipsis() {
      inNextEllipsis.value = false
    }

    function handleClickNextEllipsis() {
      if (!props.disabled && nextEllipsisTarget.value) {
        changeActive(nextEllipsisTarget.value)
      }
    }

    function handleJumpPage(active: number) {
      active = Math.max(Math.min(parseInt(active.toString()), pagerCount.value), 1)

      const originActive = active

      if (active !== currentActive.value) {
        const step = active > currentActive.value ? 1 : -1

        active = queryEnabledActive(originActive, step)

        if (step > 0 ? active > pagerCount.value : active < 1) {
          active = queryEnabledActive(originActive, -step)

          if (step > 0 ? active < 1 : active > pagerCount.value) {
            active = 0
          }
        }

        currentActive.value = active
      }

      nextTick(() => {
        jumpValue.value = currentActive.value
      })
    }

    return {
      prefix,
      locale,
      currentPagers,
      currentActive,
      currentPageSize,
      mode,
      inPrevEllipsis,
      inNextEllipsis,
      jumpValue,
      PaginationMode,

      className,
      pagerCount,
      disabledPrev,
      disabledNext,
      prevTurnPageTitle,
      nextTurnPageTitle,
      useEllipsis,
      prevEllipsisTarget,
      nextEllipsisTarget,

      isFunction,
      getCountWordOnly,
      changeActive,
      handlePrev,
      handleNext,
      handleEnterPrevEllipsis,
      handleLeavePrevEllipsis,
      handleClickPrevEllipsis,
      handleEnterNextEllipsis,
      handleLeaveNextEllipsis,
      handleClickNextEllipsis,
      handleJumpPage
    }
  }
})
</script>
