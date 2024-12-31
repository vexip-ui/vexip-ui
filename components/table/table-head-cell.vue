<script setup lang="ts">
import { Button } from '@/components/button'
import { Checkbox } from '@/components/checkbox'
import { Ellipsis } from '@/components/ellipsis'
import { Renderer } from '@/components/renderer'
import { ResizeObserver } from '@/components/resize-observer'
import { Tooltip } from '@/components/tooltip'

import { computed, inject, ref, toRef } from 'vue'

import { useIcons, useNameHelper } from '@vexip-ui/config'
import TableIcon from './table-icon.vue'
import { useMoving, useRtl } from '@vexip-ui/hooks'
import { getLast, isFunction, nextFrameOnce } from '@vexip-ui/utils'
import { TABLE_ACTIONS, TABLE_HEAD_PREFIX, TABLE_STORE, columnTypes } from './symbol'

import type { PropType, StyleValue } from 'vue'
import type { MovingState } from '@vexip-ui/hooks'
import type {
  ColumnWithKey,
  ParsedFilterOptions,
  ParsedTableSorterOptions,
  TableRowState,
  TableSelectionColumn,
  TableTypeColumn
} from './symbol'

defineOptions({ name: 'TableHeadCell' })

const props = defineProps({
  column: {
    type: Object as PropType<ColumnWithKey>,
    default: () => ({})
  },
  index: {
    type: Number,
    default: -1
  },
  row: {
    type: Object as PropType<TableRowState>,
    default: () => ({})
  },
  rowIndex: {
    type: Number,
    default: 0
  },
  fixed: {
    type: String as PropType<'left' | 'right' | undefined>,
    default: null
  }
})

const { state, getters, mutations } = inject(TABLE_STORE)!
const tableActions = inject(TABLE_ACTIONS)!

const nh = useNameHelper('table')
const locale = toRef(state, 'locale')
const icons = useIcons()
const { isRtl } = useRtl()

const filterVisible = ref(false)
const resizable = toRef(state, 'colResizable')
const resizing = computed(() => state.colResizing)

const wrapper = ref<HTMLElement>()

const isGroup = computed(() => mutations.isGroupColumn(props.column))
const columns = computed(() => {
  return props.fixed === 'left'
    ? state.leftFixedColumns
    : props.fixed === 'right'
      ? state.rightFixedColumns
      : state.normalColumns
})
const cellSpan = computed(() => {
  return (
    state.cellSpanMap.get(props.fixed || 'default')!.get(`h${props.rowIndex},${props.index}`) || {
      colSpan: 1,
      rowSpan: 1
    }
  )
})
const inLast = computed(() => {
  return isGroup.value
    ? props.column.last
    : props.column.index + cellSpan.value.colSpan >= state.columns.length
})

const minWidth = 10

let currentWidth = 0

function processColResize(payload: MovingState, lazy = false) {
  const width = Math.max(currentWidth + (payload.isRtl ? -1 : 1) * payload.deltaX, minWidth)

  !lazy &&
    mutations.handleColumnResize(
      state.columns
        .slice(props.column.index, props.column.index + cellSpan.value.colSpan)
        .map(column => column.key),
      width
    )

  return width
}

const { target: resizer } = useMoving({
  capture: false,
  onStart: (payload, event) => {
    if (!resizable.value || resizing.value || isGroup.value) return false

    const table = tableActions.getTableElement()

    if (!table || !wrapper.value) return false

    payload.xStart = payload.clientX - table.getBoundingClientRect().left
    payload.isRtl = isRtl.value
    currentWidth = wrapper.value.getBoundingClientRect().width

    mutations.setColumnResizing(true)
    mutations.setResizeLeft(payload.xStart)
    tableActions.emitColResize('Start', {
      ...buildEventPayload(event),
      width: currentWidth
    })
  },
  onMove: (payload, event) => {
    payload.xEnd = Math.max(payload.xStart - currentWidth + minWidth, payload.xEnd)

    mutations.setResizeLeft(payload.xEnd)
    tableActions.emitColResize('Move', {
      ...buildEventPayload(event),
      width: processColResize(payload, state.colResizable !== 'responsive')
    })
  },
  onEnd: (payload, event) => {
    mutations.setColumnResizing(false)
    tableActions.emitColResize('End', {
      ...buildEventPayload(event),
      width: processColResize(payload)
    })
  }
})

const typed = computed(() => columnTypes.includes((props.column as TableTypeColumn).type))
const className = computed(() => {
  let customClass = null

  if (typeof state.headClass === 'function') {
    customClass = state.headClass({
      column: props.column,
      index: props.column.colIndex,
      rowIndex: props.rowIndex
    })
  } else {
    customClass = state.headClass
  }

  return [
    nh.be('head-cell'),
    {
      [nh.bem('head-cell', 'group')]: isGroup.value,
      [nh.bem('head-cell', 'typed')]: typed.value,
      [nh.bem('head-cell', 'center')]: typed.value || props.column.textAlign === 'center',
      [nh.bem('head-cell', 'right')]: props.column.textAlign === 'right',
      [nh.bem('head-cell', 'last')]: inLast.value
    },
    props.column.class,
    customClass
  ]
})
const customStyle = computed(() => {
  if (typeof state.headStyle === 'function') {
    return state.headStyle({
      column: props.column,
      index: props.column.colIndex,
      rowIndex: props.rowIndex
    })
  }

  return state.headStyle
})
const style = computed(() => {
  const totalWidths =
    props.fixed === 'left'
      ? getters.leftFixedWidths
      : props.fixed === 'right'
        ? getters.rightFixedWidths
        : getters.normalWidths
  const { colSpan, rowSpan } = cellSpan.value
  const noFixed = !getters.hasFixedColumn
  const padLeft = noFixed || columns.value[0]?.fixed === 'left' ? state.sidePadding[0] || 0 : 0
  const padRight =
    noFixed || getLast(columns.value)?.fixed === 'right' ? state.sidePadding[1] || 0 : 0
  const width = totalWidths[props.index + colSpan] - totalWidths[props.index]

  let height: number | undefined

  if (rowSpan > 1) {
    height = 0

    for (let i = 0; i < rowSpan; ++i) {
      height += state.rowMap.get(`${TABLE_HEAD_PREFIX}${props.rowIndex + i}`)?.height ?? 0
    }
  }

  return [
    props.column.style || '',
    customStyle.value,
    {
      display: !colSpan ? 'none' : undefined,
      width: `${(props.column.index ? 0 : padLeft) + (inLast.value ? padRight : 0) + width}px`,
      height: height ? `${height}px` : undefined,
      visibility: props.column.fixed && !props.fixed ? 'hidden' : undefined,
      borderRightWidth:
        !state.border && colSpan > 1 && props.index + colSpan >= totalWidths.length - 1
          ? 0
          : undefined,
      transform: `translate3d(${isRtl.value ? '-' : ''}${
        (props.column.index ? padLeft : 0) + totalWidths[props.index]
      }px, 0, 0)`
    }
  ] as StyleValue
})
const attrs = computed(() => {
  let customAttrs: Record<string, any>

  if (typeof state.headAttrs === 'function') {
    customAttrs = state.headAttrs({
      column: props.column,
      index: props.column.colIndex,
      rowIndex: props.rowIndex
    })
  } else {
    customAttrs = state.headAttrs
  }

  return { ...(props.column.attrs || {}), ...(customAttrs || {}) }
})
const sorter = computed(() => {
  return state.sorters.get(props.column.key) || ({} as ParsedTableSorterOptions)
})
const filter = computed(() => {
  return state.filters.get(props.column.key) || ({} as ParsedFilterOptions)
})
const hasFilterActive = computed(() => {
  const options = filter.value.options ?? []

  for (let i = 0, len = options.length; i < len; ++i) {
    if (options[i].active) {
      return true
    }
  }

  return false
})
const checkboxDisabled = computed(() => {
  if (!isSelection(props.column)) {
    return false
  }

  const records = Object.values(getters.disableCheckRows)

  return (
    getters.processedData.length === records.length &&
    !Object.values(getters.disableCheckRows).includes(false)
  )
})

const refreshXScroll = () => nextFrameOnce(tableActions.refreshXScroll)

function isSelection(column: unknown): column is TableSelectionColumn {
  return !isGroup.value && (column as TableTypeColumn).type === 'selection'
}

function buildEventPayload(event: Event) {
  return {
    column: props.column,
    index: props.column.colIndex,
    event
  }
}

function handleMouseEnter(event: MouseEvent) {
  tableActions?.emitHeadEvent('Enter', buildEventPayload(event))
}

function handleMouseLeave(event: MouseEvent) {
  tableActions?.emitHeadEvent('Leave', buildEventPayload(event))
}

function handleClick(event: MouseEvent) {
  tableActions?.emitHeadEvent('Click', buildEventPayload(event))
}

function handleDblclick(event: MouseEvent) {
  tableActions?.emitHeadEvent('Dblclick', buildEventPayload(event))
}

function handleContextmenu(event: MouseEvent) {
  tableActions?.emitHeadEvent('Contextmenu', buildEventPayload(event))
}

function handleSortAsc() {
  const key = props.column.key
  const type = sorter.value.type === 'asc' ? null : 'asc'

  mutations.handleSort(key, type)
  tableActions.emitRowSort()
}

function handleSortDesc() {
  const key = props.column.key
  const type = sorter.value.type === 'desc' ? null : 'desc'

  mutations.handleSort(key, type)
  tableActions.emitRowSort()
}

function handleFilter(value: ParsedFilterOptions['active']) {
  mutations.handleFilter(props.column.key, value)
}

function handleFilterItemSelect(value: string | number, active: boolean) {
  mutations.toggleFilterItemActive({
    key: props.column.key,
    value,
    active,
    disableOthers: true
  })
  handleFilter(value)
  filterVisible.value = false
  tableActions.emitRowFilter()
}

function handleFilterCheck(value: string | number, checked: boolean) {
  mutations.toggleFilterItemActive({
    key: props.column.key,
    value,
    active: checked
  })
}

function handleFilterMultiple() {
  const options = filter.value.options ?? []
  const activeValues = []

  for (let i = 0, len = options.length; i < len; ++i) {
    const option = options[i]

    if (option.active) {
      activeValues.push(option.value)
    }
  }

  handleFilter(activeValues)
  filterVisible.value = false
  tableActions.emitRowFilter()
}

function handleResetFilter() {
  filterVisible.value = false
  handleFilter(null)
  mutations.toggleFilterItemActive({
    key: props.column.key,
    value: null,
    disableOthers: true
  })
  tableActions.emitRowFilter()
}

function handleCheckAllRow() {
  mutations.handleCheckAll()
  tableActions.emitAllRowCheck(state.checkedAll, state.partial)
}

function handleCellResize(entry: ResizeObserverEntry) {
  mutations.setCellHeight(
    props.row.key,
    props.column.key,
    (entry.borderBoxSize?.[0]?.blockSize ?? entry.contentRect.height) + state.borderWidth
  )
}
</script>

<template>
  <div
    v-bind="attrs"
    ref="wrapper"
    :class="className"
    role="columnheader"
    scope="col"
    :colspan="cellSpan.colSpan !== 1 ? cellSpan.colSpan : undefined"
    :rowspan="cellSpan.rowSpan !== 1 ? cellSpan.rowSpan : undefined"
    :style="style"
    :aria-sort="
      !isGroup && sorter.able
        ? sorter.type
          ? sorter.type === 'asc'
            ? 'ascending'
            : 'descending'
          : 'none'
        : undefined
    "
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="handleClick"
    @dblclick="handleDblclick"
    @contextmenu="handleContextmenu"
    @transitionend="refreshXScroll"
  >
    <div
      v-if="column.index === 0"
      :class="nh.be('side-pad')"
      role="none"
      aria-hidden
    ></div>
    <div v-if="isSelection(column)" :class="nh.be('content')">
      <Checkbox
        inherit
        control
        :class="nh.be('selection')"
        :checked="state.checkedAll"
        :partial="state.partial"
        :disabled="checkboxDisabled"
        :size="column.checkboxSize || 'default'"
        @click.prevent="handleCheckAllRow"
      ></Checkbox>
    </div>
    <ResizeObserver
      v-else
      :disabled="column.ellipsis ?? state.ellipsis"
      :on-resize="handleCellResize"
    >
      <span :class="nh.be('content')">
        <Ellipsis
          v-if="column.ellipsis ?? state.ellipsis"
          inherit
          :class="nh.be('ellipsis')"
          :tooltip-theme="state.tooltipTheme"
          :tip-max-width="state.tooltipWidth"
        >
          <Renderer
            v-if="isGroup && isFunction((column as any).renderer)"
            :renderer="(column as any).renderer"
          ></Renderer>
          <Renderer
            v-else-if="isFunction(column.headRenderer)"
            :renderer="column.headRenderer"
            :data="{ column, index }"
          ></Renderer>
          <template v-else>
            {{ column.name }}
          </template>
        </Ellipsis>
        <template v-else>
          <Renderer
            v-if="isGroup && isFunction((column as any).renderer)"
            :renderer="(column as any).renderer"
          ></Renderer>
          <Renderer
            v-else-if="isFunction(column.headRenderer)"
            :renderer="column.headRenderer"
            :data="{ column, index }"
          ></Renderer>
          <template v-else>
            {{ column.name }}
          </template>
        </template>
        <template v-if="!isGroup">
          <div v-if="sorter.able" :class="nh.be('sorter')">
            <span
              :class="{
                [nh.bem('sorter', 'asc')]: true,
                [nh.bem('sorter', 'active')]: sorter.type === 'asc'
              }"
              @click="handleSortAsc()"
            >
              <TableIcon name="asc" :origin="icons.angleUp"></TableIcon>
            </span>
            <span
              :class="{
                [nh.bem('sorter', 'desc')]: true,
                [nh.bem('sorter', 'active')]: sorter.type === 'desc'
              }"
              @click="handleSortDesc()"
            >
              <TableIcon name="desc" :origin="icons.angleDown"></TableIcon>
            </span>
          </div>
          <template v-if="filter.able">
            <Renderer
              v-if="isFunction(column.filterRenderer)"
              :renderer="column.filterRenderer"
              :data="{ column, index, filter, handleFilter }"
            ></Renderer>
            <Tooltip
              v-else
              v-model:visible="filterVisible"
              transfer
              placement="bottom"
              trigger="click"
              :class="{
                [nh.be('filter')]: true,
                [nh.bem('filter', 'visible')]: filterVisible,
                [nh.bem('filter', 'active')]: filter.active
              }"
              :tip-class="{
                [nh.be('filter-wrapper')]: true,
                [nh.bs('vars')]: true,
                [nh.bem('filter-wrapper', 'multiple')]: filter.multiple
              }"
            >
              <template #trigger>
                <div :class="nh.be('filter-trigger')">
                  <TableIcon name="filter" :origin="icons.filter"></TableIcon>
                </div>
              </template>
              <template v-if="filter.multiple" #default>
                <div vertical :class="nh.be('filter-group')">
                  <Checkbox
                    v-for="item in filter.options"
                    :key="item.value"
                    inherit
                    :checked="item.active"
                    :label="item.label"
                    :value="item.value"
                    @change="handleFilterCheck(item.value, $event)"
                  ></Checkbox>
                </div>
                <div :class="nh.be('filter-actions')">
                  <Button
                    inherit
                    text
                    size="small"
                    :disabled="!hasFilterActive"
                    @click="handleFilterMultiple()"
                  >
                    {{ locale.filterConfirm }}
                  </Button>
                  <Button
                    inherit
                    text
                    size="small"
                    @click="handleResetFilter"
                  >
                    {{ locale.filterReset }}
                  </Button>
                </div>
              </template>
              <template v-else #default>
                <div
                  :class="{
                    [nh.be('filter-item')]: true,
                    [nh.bem('filter-item', 'active')]: !filter.active
                  }"
                  @click="handleResetFilter"
                >
                  {{ locale.filterAll }}
                </div>
                <div
                  v-for="item in filter.options"
                  :key="item.value"
                  :class="{
                    [nh.be('filter-item')]: true,
                    [nh.bem('filter-item', 'active')]: item.active
                  }"
                  @click="handleFilterItemSelect(item.value, !item.active)"
                >
                  {{ item.label }}
                </div>
              </template>
            </Tooltip>
          </template>
        </template>
      </span>
    </ResizeObserver>
    <div
      v-if="!isGroup && resizable && !typed && !column.last"
      ref="resizer"
      :class="nh.be('resizer')"
    ></div>
    <div
      v-if="inLast"
      :class="[nh.be('side-pad'), nh.bem('side-pad', 'right')]"
      role="none"
      aria-hidden
    ></div>
  </div>
</template>
