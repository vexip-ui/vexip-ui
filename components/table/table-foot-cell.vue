<script setup lang="ts">
import { Ellipsis } from '@/components/ellipsis'
import { Renderer } from '@/components/renderer'
import { ResizeObserver } from '@/components/resize-observer'

import { computed, inject, ref } from 'vue'

import { useNameHelper } from '@vexip-ui/config'
import { useRtl } from '@vexip-ui/hooks'
import { isFunction } from '@vexip-ui/utils'
import { TABLE_ACTIONS, TABLE_STORE, columnTypes } from './symbol'

import type { PropType } from 'vue'
import type { ColumnWithKey, SummaryWithKey, TableRowState, TableTypeColumn } from './symbol'

defineOptions({ name: 'TableFootCell' })

const props = defineProps({
  row: {
    type: Object as PropType<TableRowState>,
    default: () => ({})
  },
  column: {
    type: Object as PropType<ColumnWithKey>,
    default: () => ({})
  },
  colIndex: {
    type: Number,
    default: -1
  },
  summary: {
    type: Object as PropType<SummaryWithKey>,
    default: () => ({})
  },
  summaryIndex: {
    type: Number,
    default: -1
  },
  fixed: {
    type: String as PropType<'left' | 'right' | undefined>,
    default: null
  },
  above: {
    type: Boolean,
    default: false
  }
})

const { state, getters, mutations } = inject(TABLE_STORE)!
const tableActions = inject(TABLE_ACTIONS)!

const nh = useNameHelper('table')
const { isRtl } = useRtl()

const wrapper = ref<HTMLElement>()

const inLast = computed(() => {
  return props.column.index + cellSpan.value.colSpan >= state.columns.length
})
const columns = computed(() => {
  return props.fixed === 'left'
    ? state.leftFixedColumns
    : props.fixed === 'right'
      ? state.rightFixedColumns
      : state.normalColumns
})
// We use 'a' and 'b' to distinguish above and below
const prefix = computed(() => (props.above ? 'af' : 'bf'))
const summaries = computed(() => (props.above ? state.aboveSummaries : state.belowSummaries))
const heights = computed(() => (props.above ? getters.topFixedHeights : getters.bottomFixedHeights))
const className = computed(() => {
  let customClass = null

  if (typeof state.footClass === 'function') {
    customClass = state.footClass({
      column: props.column,
      columnIndex: props.column.index,
      summary: props.summary,
      summaryIndex: props.summaryIndex
    })
  } else {
    customClass = state.footClass
  }

  const typed = columnTypes.includes((props.column as TableTypeColumn).type)

  return [
    nh.be('foot-cell'),
    {
      [nh.bem('foot-cell', 'typed')]: typed,
      [nh.bem('foot-cell', 'center')]: typed || props.column.textAlign === 'center',
      [nh.bem('foot-cell', 'right')]: props.column.textAlign === 'right',
      [nh.bem('foot-cell', 'last')]: inLast.value
    },
    props.column.class,
    customClass
  ]
})
const cellSpan = computed(() => {
  return (
    state.cellSpanMap
      .get(props.fixed || 'default')!
      .get(`${prefix.value}${props.summaryIndex},${props.column.index}`) || {
      colSpan: 1,
      rowSpan: 1
    }
  )
})
const customStyle = computed(() => {
  if (typeof state.footStyle === 'function') {
    return state.footStyle({
      column: props.column,
      columnIndex: props.column.index,
      summary: props.summary,
      summaryIndex: props.summaryIndex
    })
  }

  return state.cellStyle
})
const style = computed(() => {
  const totalWidths =
    props.fixed === 'left'
      ? getters.leftFixedWidths
      : props.fixed === 'right'
        ? getters.rightFixedWidths
        : getters.normalWidths
  const { colSpan, rowSpan } = cellSpan.value
  const padLeft = columns.value[0]?.fixed === 'left' ? state.sidePadding[0] || 0 : 0
  const padRight = columns.value.at(-1)?.fixed === 'right' ? state.sidePadding[1] || 0 : 0
  const width = totalWidths[props.colIndex + colSpan] - totalWidths[props.colIndex]

  let height: number | undefined

  if (rowSpan > 1) {
    height = heights.value[props.summaryIndex + rowSpan] - heights.value[props.summaryIndex]
  }

  return [
    props.column.style || '',
    customStyle.value,
    {
      display: !colSpan || !rowSpan ? 'none' : undefined,
      width: `${(props.column.index ? 0 : padLeft) + (inLast.value ? padRight : 0) + width}px`,
      height: height ? `${height}px` : undefined,
      visibility: props.column.fixed && !props.fixed ? 'hidden' : undefined,
      borderRightWidth:
        !state.border && colSpan > 1 && props.colIndex + colSpan >= totalWidths.length - 1
          ? 0
          : undefined,
      borderBottomWidth:
        rowSpan > 1 && props.summaryIndex + rowSpan >= summaries.value.length ? 0 : undefined,
      transform: `translate3d(${isRtl.value ? '-' : ''}${
        (props.column.index ? padLeft : 0) + totalWidths[props.colIndex]
      }px, 0, 0)`
    }
  ]
})
const attrs = computed(() => {
  let customAttrs: Record<string, any>

  if (typeof state.footAttrs === 'function') {
    customAttrs = state.footAttrs({
      column: props.column,
      columnIndex: props.column.index,
      summary: props.summary,
      summaryIndex: props.summaryIndex
    })
  } else {
    customAttrs = state.footAttrs
  }

  return { ...(props.column.attrs || {}), ...(customAttrs || {}) }
})
const summaryData = computed(() => getters.summaryData.get(props.column.key))

function buildEventPayload(event: Event) {
  return {
    column: props.column,
    columnIndex: props.column.index,
    summary: props.summary,
    summaryIndex: props.summaryIndex,
    event
  }
}

function handleMouseEnter(event: MouseEvent) {
  tableActions?.emitFootEvent('Enter', buildEventPayload(event))
}

function handleMouseLeave(event: MouseEvent) {
  tableActions?.emitFootEvent('Leave', buildEventPayload(event))
}

function handleClick(event: MouseEvent) {
  tableActions?.emitFootEvent('Click', buildEventPayload(event))
}

function handleDblclick(event: MouseEvent) {
  tableActions?.emitFootEvent('Dblclick', buildEventPayload(event))
}

function handleContextmenu(event: MouseEvent) {
  tableActions?.emitFootEvent('Contextmenu', buildEventPayload(event))
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
    role="cell"
    :scope="column.first ? 'row' : undefined"
    :colspan="cellSpan.colSpan !== 1 ? cellSpan.colSpan : undefined"
    :rowspan="cellSpan.rowSpan !== 1 ? cellSpan.rowSpan : undefined"
    :style="style"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="handleClick"
    @dblclick="handleDblclick"
    @contextmenu="handleContextmenu"
  >
    <div
      v-if="column.index === 0"
      :class="nh.be('side-pad')"
      role="none"
      aria-hidden
    ></div>
    <ResizeObserver
      v-if="isFunction(summary.renderer)"
      :disabled="column.ellipsis"
      :on-resize="handleCellResize"
    >
      <span :class="nh.be('content')">
        <Ellipsis
          v-if="column.ellipsis"
          inherit
          :class="nh.be('ellipsis')"
          :tooltip-theme="state.tooltipTheme"
          :tip-max-width="state.tooltipWidth"
        >
          <Renderer
            :renderer="summary.renderer"
            :data="{ column, index: column.index, rows: state.data, meta: summaryData }"
          ></Renderer>
        </Ellipsis>
        <Renderer
          v-else
          :renderer="summary.renderer"
          :data="{ column, index: column.index, rows: state.data, meta: summaryData }"
        ></Renderer>
      </span>
    </ResizeObserver>
    <div
      v-if="inLast"
      :class="[nh.be('side-pad'), nh.bem('side-pad', 'right')]"
      role="none"
      aria-hidden
    ></div>
  </div>
</template>
