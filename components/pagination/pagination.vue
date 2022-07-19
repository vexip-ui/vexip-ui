<template>
  <ul :class="className">
    <li
      :class="[
        nh.be('item'),
        nh.bem('item', 'prev'),
        disabledPrev ? nh.bem('item', 'disabled') : ''
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
        [nh.be('item')]: true,
        [nh.bem('item', 'disabled')]: isFunction(disableItem) && disableItem(1),
        [nh.bem('item', 'active')]: currentActive === 1
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
        [nh.be('item')]: true,
        [nh.bem('item', 'more')]: true,
        [nh.bem('item', 'disabled')]: !prevEllipsisTarget
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
          [nh.be('item')]: true,
          [nh.bem('item', 'disabled')]: isFunction(disableItem) && disableItem(page),
          [nh.bem('item', 'active')]: currentActive === page
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
        [nh.be('item')]: true,
        [nh.bem('item', 'more')]: true,
        [nh.bem('item', 'disabled')]: !nextEllipsisTarget
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
        [nh.be('item')]: true,
        [nh.bem('item', 'disabled')]: isFunction(disableItem) && disableItem(pagerCount),
        [nh.bem('item', 'active')]: currentActive === pagerCount
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
        nh.be('item'),
        nh.bem('item', 'next'),
        disabledNext ? nh.bem('item', 'disabled') : ''
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
      <div v-if="props.pageTotal" :class="nh.be('total')">
        {{ `${locale.total} ${getCountWord(props.itemUnit ?? locale.itemUnit, props.total)}` }}
      </div>
      <div v-if="props.pageCount" :class="nh.be('size')">
        <Select v-model:value="currentPageSize" :options="sizeObjectOptions"></Select>
      </div>
      <div v-if="props.pageJump" :class="nh.be('jump')">
        {{ locale.jumpTo }}
        <NumberInput
          v-model:value="jumpValue"
          :class="nh.be('jump-input')"
          @change="handleJumpPage"
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
import { Select } from '@/components/select'
import {
  useNameHelper,
  useProps,
  useLocale,
  booleanProp,
  sizeProp,
  getCountWord,
  getCountWordOnly,
  createSizeProp,
  eventProp,
  emitEvent
} from '@vexip-ui/config'
import { isFunction, range } from '@vexip-ui/utils'
import { PaginationMode } from './symbol'
import { ChevronRight, ChevronLeft, AnglesRight, AnglesLeft, Ellipsis } from '@vexip-ui/icons'

import type { PropType } from 'vue'

export default defineComponent({
  name: 'Pagination',
  components: {
    Icon,
    NumberInput,
    Select,
    ChevronRight,
    ChevronLeft,
    AnglesRight,
    AnglesLeft,
    Ellipsis
  },
  props: {
    size: sizeProp,
    total: Number,
    noBorder: booleanProp,
    background: booleanProp,
    pageSize: Number,
    sizeOptions: Array as PropType<number[]>,
    maxCount: Number,
    active: Number,
    disabled: booleanProp,
    disableItem: Function as PropType<(page: number) => boolean>,
    turnPageCount: Number,
    pageJump: booleanProp,
    pageCount: booleanProp,
    pageTotal: booleanProp,
    itemUnit: String,
    onChange: eventProp<(page: number) => void>(),
    onPageSizeChange: eventProp<(size: number) => void>()
  },
  emits: ['update:active'],
  setup(_props, { emit }) {
    const props = useProps('pagination', _props, {
      size: createSizeProp(),
      total: {
        default: 0,
        validator: (value: number) => value >= 0,
        static: true
      },
      noBorder: false,
      background: false,
      pageSize: {
        default: 10,
        validator: (value: number) => value > 0
      },
      sizeOptions: () => [10, 20, 50, 100],
      maxCount: {
        default: 7,
        validator: (value: number) => value === parseInt(value.toString()) && value > 6
      },
      active: {
        default: 1,
        validator: (value: number) => value > 0,
        static: true
      },
      disabled: false,
      disableItem: {
        default: null,
        isFunc: false
      },
      turnPageCount: 5,
      pageJump: false,
      pageCount: false,
      pageTotal: false,
      itemUnit: null
    })

    const nh = useNameHelper('pagination')
    const currentPagers = ref<number[]>([])
    const currentActive = ref(props.active)
    const currentPageSize = ref(props.pageSize)
    const mode = ref(PaginationMode.LEFT)
    const inPrevEllipsis = ref(false)
    const inNextEllipsis = ref(false)
    const jumpValue = ref(props.active)

    const locale = useLocale('pagination')

    const className = computed(() => {
      return {
        [nh.b()]: true,
        [nh.bs('vars')]: true,
        [nh.bm(props.size)]: props.size !== 'default',
        [nh.bm('background')]: props.background,
        [nh.bm('no-border')]: props.noBorder,
        [nh.bm('disabled')]: props.disabled
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
      return `${locale.value.prev} ${getCountWord(locale.value.page, props.turnPageCount)}`
    })
    const nextTurnPageTitle = computed(() => {
      return `${locale.value.next} ${getCountWord(locale.value.page, props.turnPageCount)}`
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
    const sizeObjectOptions = computed(() => {
      return props.sizeOptions.map(size => {
        return {
          value: size,
          label: `${size} ${locale.value.prePage}`
        }
      })
    })

    watch(() => props.active, changeActive)
    watch(currentActive, value => {
      computePagers()
      jumpValue.value = value
      emitEvent(props.onChange, value)
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
      emitEvent(props.onPageSizeChange, value)

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
      props,
      nh,
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
      sizeObjectOptions,

      isFunction,
      getCountWord,
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
