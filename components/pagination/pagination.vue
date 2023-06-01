<template>
  <div :class="className">
    <ul
      ref="wrapper"
      :class="nh.be('list')"
      role="menubar"
      aria-label="Pagination"
      :aria-disabled="props.disabled ? 'true' : undefined"
    >
      <li
        :ref="el => el && !disabledPrev && itemElList.push(el as any)"
        :class="[
          nh.be('item'),
          nh.bem('item', 'prev'),
          disabledPrev ? nh.bem('item', 'disabled') : ''
        ]"
        :title="props.noTitle ? undefined : locale.prevPage"
        role="menuitem"
        tabindex="-1"
        :aria-label="locale.prevPage"
        :aria-hidden="disabledPrev ? 'true' : undefined"
        @click="handlePrev"
        @keydown.enter="handlePrev"
        @keydown.space="handlePrev"
      >
        <slot name="prev">
          <Icon v-bind="isRtl ? icons.arrowRight : icons.arrowLeft" :scale="0.8"></Icon>
        </slot>
      </li>
      <li
        :ref="el => el && itemElList.push(el as any)"
        :class="{
          [nh.be('item')]: true,
          [nh.bem('item', 'disabled')]: props.disableItem(1),
          [nh.bem('item', 'active')]: currentActive === 1
        }"
        :title="props.noTitle ? undefined : '1'"
        role="menuitemradio"
        :tabindex="currentActive === 1 ? '0' : '-1'"
        aria-posinset="1"
        :aria-setsize="pagerCount"
        :aria-disabled="props.disableItem(1) ? 'true' : undefined"
        @click="changeActive(1)"
        @keydown.enter="changeActive(1)"
        @keydown.space="changeActive(1)"
      >
        <slot name="item" :page="1">
          {{ 1 }}
        </slot>
      </li>
      <li
        v-if="useEllipsis && mode !== 'left'"
        :ref="el => el && itemElList.push(el as any)"
        :class="{
          [nh.be('item')]: true,
          [nh.bem('item', 'more')]: true,
          [nh.bem('item', 'disabled')]: !prevEllipsisTarget
        }"
        :title="props.noTitle ? undefined : prevTurnPageTitle"
        role="menuitem"
        tabindex="-1"
        :aria-label="prevTurnPageTitle"
        @click="handleClickPrevEllipsis"
        @keydown.enter="handleClickPrevEllipsis"
        @keydown.space="handleClickPrevEllipsis"
        @mouseenter="handleEnterPrevEllipsis"
        @mouseleave="handleLeavePrevEllipsis"
      >
        <transition :name="nh.ns('fade')">
          <Icon
            v-if="inPrevEllipsis"
            v-bind="isRtl ? icons.anglesRight : icons.anglesLeft"
            :scale="0.8"
          ></Icon>
          <Icon
            v-else
            v-bind="icons.ellipsis"
            :scale="0.8"
            style="position: absolute"
          ></Icon>
        </transition>
      </li>
      <template v-if="currentPagers.length">
        <li
          v-for="(page, index) in currentPagers"
          :key="index"
          :ref="el => el && itemElList.push(el as any)"
          :class="{
            [nh.be('item')]: true,
            [nh.bem('item', 'disabled')]: props.disableItem(page),
            [nh.bem('item', 'active')]: currentActive === page
          }"
          role="menuitemradio"
          :tabindex="currentActive === page ? '0' : '-1'"
          :aria-posinset="page"
          :aria-setsize="pagerCount"
          :aria-disabled="props.disableItem(page) ? 'true' : undefined"
          @click="changeActive(page)"
          @keydown.enter="changeActive(page)"
          @keydown.space="changeActive(page)"
        >
          <slot name="item" :page="page">
            {{ page }}
          </slot>
        </li>
      </template>
      <li
        v-if="useEllipsis && mode !== 'right'"
        :ref="el => el && itemElList.push(el as any)"
        :class="{
          [nh.be('item')]: true,
          [nh.bem('item', 'more')]: true,
          [nh.bem('item', 'disabled')]: !nextEllipsisTarget
        }"
        :title="props.noTitle ? undefined : nextTurnPageTitle"
        role="menuitem"
        tabindex="-1"
        :aria-label="nextTurnPageTitle"
        @click="handleClickNextEllipsis"
        @keydown.enter="handleClickNextEllipsis"
        @keydown.space="handleClickNextEllipsis"
        @mouseenter="handleEnterNextEllipsis"
        @mouseleave="handleLeaveNextEllipsis"
      >
        <transition :name="nh.ns('fade')">
          <Icon
            v-if="inNextEllipsis"
            v-bind="isRtl ? icons.anglesLeft : icons.anglesRight"
            :scale="0.8"
          ></Icon>
          <Icon
            v-else
            v-bind="icons.ellipsis"
            :scale="0.8"
            style="position: absolute"
          ></Icon>
        </transition>
      </li>
      <li
        v-if="pagerCount > 1"
        :ref="el => el && itemElList.push(el as any)"
        :class="{
          [nh.be('item')]: true,
          [nh.bem('item', 'disabled')]: props.disableItem(pagerCount),
          [nh.bem('item', 'active')]: currentActive === pagerCount
        }"
        :title="props.noTitle ? undefined : `${pagerCount}`"
        role="menuitemradio"
        :tabindex="currentActive === pagerCount ? '0' : '-1'"
        :aria-posinset="pagerCount"
        :aria-setsize="pagerCount"
        :aria-disabled="props.disableItem(pagerCount) ? 'true' : undefined"
        @click="changeActive(pagerCount)"
        @keydown.enter="changeActive(pagerCount)"
        @keydown.space="changeActive(pagerCount)"
      >
        <slot name="item" :page="pagerCount">
          {{ pagerCount }}
        </slot>
      </li>
      <li
        :ref="el => el && !disabledNext && itemElList.push(el as any)"
        :class="[
          nh.be('item'),
          nh.bem('item', 'next'),
          disabledNext ? nh.bem('item', 'disabled') : ''
        ]"
        :title="props.noTitle ? undefined : locale.nextPage"
        role="menuitem"
        tabindex="-1"
        :aria-label="locale.nextPage"
        :aria-hidden="disabledNext ? 'true' : undefined"
        @click="handleNext"
        @keydown.enter="handleNext"
        @keydown.space="handleNext"
      >
        <slot name="next">
          <Icon v-bind="isRtl ? icons.arrowLeft : icons.arrowRight" :scale="0.8"></Icon>
        </slot>
      </li>
    </ul>
    <div
      v-if="usedPlugins.includes('total')"
      :class="[nh.be('total'), pluginOrders.total < 0 && nh.bem('total', 'prefix')]"
      :style="{ order: pluginOrders.total }"
    >
      {{ `${locale.total} ${getCountWord(props.itemUnit ?? locale.itemUnit, props.total)}` }}
    </div>
    <div
      v-if="usedPlugins.includes('size')"
      :class="[nh.be('size'), pluginOrders.size < 0 && nh.bem('size', 'prefix')]"
      :style="{ order: pluginOrders.size }"
    >
      <Select
        v-model:value="currentPageSize"
        inherit
        :class="nh.be('size-select')"
        :options="sizeObjectOptions"
        :filter="false"
        :multiple="false"
        :clearable="false"
      ></Select>
    </div>
    <div
      v-if="usedPlugins.includes('jump')"
      :class="[nh.be('jump'), pluginOrders.jump < 0 && nh.bem('jump', 'prefix')]"
      :style="{ order: pluginOrders.jump }"
    >
      {{ locale.jumpTo }}
      <NumberInput
        v-model:value="jumpValue"
        inherit
        :class="nh.be('jump-input')"
        :clearable="false"
        :sync="false"
        :style="{ width: `${jumpInputWidth}px` }"
        @change="handleJumpPage"
      ></NumberInput>
      {{ getCountWordOnly(locale.page, 1) }}
    </div>
  </div>
</template>

<script lang="ts">
import { Icon } from '@/components/icon'
import { NumberInput } from '@/components/number-input'
import { Select } from '@/components/select'

import {
  computed,
  defineComponent,
  nextTick,
  onBeforeUpdate,
  onMounted,
  ref,
  toRef,
  watch
} from 'vue'

import {
  createSizeProp,
  emitEvent,
  getCountWord,
  getCountWordOnly,
  useIcons,
  useLocale,
  useNameHelper,
  useProps
} from '@vexip-ui/config'
import { useModifier, useRtl } from '@vexip-ui/hooks'
import { boundRange, isClient, isFunction, isNull, range, warnOnce } from '@vexip-ui/utils'
import { paginationProps } from './props'

import type { PaginationPlugin } from './symbol'

const enum PaginationMode {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right'
}

export default defineComponent({
  name: 'Pagination',
  components: {
    Icon,
    NumberInput,
    Select
  },
  props: paginationProps,
  emits: ['update:active', 'update:page-size'],
  setup(_props, { emit }) {
    const props = useProps('pagination', _props, {
      size: createSizeProp(),
      locale: null,
      total: {
        default: 0,
        validator: value => value >= 0,
        static: true
      },
      noBorder: false,
      background: false,
      pageSize: {
        default: 10,
        validator: value => value > 0
      },
      sizeOptions: () => [10, 20, 50, 100],
      maxCount: {
        default: 7,
        validator: value => value === parseInt(value.toString()) && value > 6
      },
      active: {
        default: 1,
        validator: value => value > 0,
        static: true
      },
      disabled: false,
      disableItem: {
        default: () => false,
        isFunc: true
      },
      turnPageCount: 5,
      pageJump: false,
      pageCount: false,
      pageTotal: false,
      itemUnit: null,
      plugins: null,
      noTitle: false
    })

    const { isRtl } = useRtl()
    const nh = useNameHelper('pagination')
    const currentPagers = ref<number[]>([])
    const currentActive = ref(props.active)
    const currentPageSize = ref(props.pageSize)
    const mode = ref(PaginationMode.LEFT)
    const inPrevEllipsis = ref(false)
    const inNextEllipsis = ref(false)
    const jumpValue = ref(props.active)
    const itemElList = ref<unknown[]>([])

    const locale = useLocale('pagination', toRef(props, 'locale'))

    const { target: wrapper } = useModifier({
      passive: false,
      onKeyDown: (event, modifier) => {
        if (modifier.up || modifier.down || modifier.left || modifier.right) {
          event.preventDefault()

          const sign = modifier.up || modifier.left ? -1 : 1

          if (isClient && document.activeElement) {
            const index = itemElList.value.findIndex(el => el === document.activeElement)

            if (!~index) return

            const target = itemElList.value[
              boundRange(index + sign, 0, itemElList.value.length - 1)
            ] as HTMLElement

            target.focus()
          }
        } else if (modifier.enter || modifier.space) {
          event.preventDefault()

          if (document && document.activeElement) {
            const index = itemElList.value.findIndex(el => el === document.activeElement)

            if (!~index) {
              const activeClass = nh.bem('item', 'active')
              const activeEl = (itemElList.value as HTMLElement[]).find(el =>
                el.classList.contains(activeClass)
              )

              activeEl?.focus()
            }
          }
        }
      }
    })

    const className = computed(() => {
      return {
        [nh.b()]: true,
        [nh.bs('vars')]: true,
        [nh.bm('inherit')]: props.inherit,
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
          label: `${size} ${locale.value.perPage}`
        }
      })
    })
    const usedPlugins = computed(() => {
      if (props.plugins) {
        return props.plugins
      }

      const plugins: (PaginationPlugin | undefined | null)[] = [undefined]

      props.pageTotal && plugins.push('total')
      props.pageCount && plugins.push('size')
      props.pageJump && plugins.push('jump')

      if (plugins.length) {
        warnOnce(
          "[vexip-ui:Pagination] 'page-jump', 'page-count' and 'page-total' props" +
            " have been deprecated, please use 'plugins' prop to replace them"
        )
      }

      return plugins
    })
    const pluginOrders = computed(() => {
      const plugins = usedPlugins.value
      const pagerPosition = plugins.findIndex(isNull)

      return {
        total: plugins.findIndex(p => p === 'total') - pagerPosition,
        size: plugins.findIndex(p => p === 'size') - pagerPosition,
        jump: plugins.findIndex(p => p === 'jump') - pagerPosition
      }
    })
    const jumpInputWidth = computed(() => {
      if (!usedPlugins.value.includes('jump')) return 0

      let pageCount = 0

      if (usedPlugins.value.includes('size')) {
        pageCount = Math.ceil(props.total / (Math.min(...props.sizeOptions) || 10))
      } else {
        pageCount = Math.ceil(props.total / (props.pageSize || 10))
      }

      return pageCount.toString().length * 10 + 30
    })

    watch(
      () => props.active,
      value => {
        changeActive(value, false)
      }
    )
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
      emit('update:page-size', value)

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
    onBeforeUpdate(() => {
      itemElList.value.length = 0
    })

    function queryEnabledActive(active: number, step: number) {
      step = step / Math.abs(step)

      while (props.disableItem(active)) {
        active += step

        if (active < 1 || active > pagerCount.value) break
      }

      return active
    }

    function changeActive(active: number, focus = true) {
      active = parseInt(active.toString())

      if (props.disabled || active < 1 || active > pagerCount.value || props.disableItem(active)) {
        return
      }

      currentActive.value = active

      if (isClient && focus) {
        const activeEl = itemElList.value.find(el => el === document.activeElement) as HTMLElement

        activeEl?.blur()

        nextTick(() => {
          const el = (itemElList.value as HTMLElement[]).find(el => el.tabIndex >= 0)
          el?.focus()
        })
      }
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
      let pagers: number[]

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
      icons: useIcons(),

      currentPagers,
      currentActive,
      currentPageSize,
      mode,
      inPrevEllipsis,
      inNextEllipsis,
      jumpValue,
      itemElList,

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
      usedPlugins,
      pluginOrders,
      jumpInputWidth,

      wrapper,
      isRtl,

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
