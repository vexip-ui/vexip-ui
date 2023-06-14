<template>
  <div
    :class="className"
    role="cell"
    :scope="column.first ? 'row' : undefined"
    :colspan="cellSpan.colSpan !== 1 ? cellSpan.colSpan : undefined"
    :rowspan="cellSpan.rowSpan !== 1 ? cellSpan.rowSpan : undefined"
    :style="style"
    v-bind="attrs"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="handleClick"
    @dblclick="handleDblclick"
    @contextmenu="handleContextmenu"
  >
    <template v-if="isFunction(summary.renderer)">
      <Ellipsis
        v-if="!column.noEllipsis"
        inherit
        :tooltip-theme="tooltipTheme"
        :tip-max-width="tooltipWidth"
      >
        <Renderer
          :renderer="summary.renderer"
          :data="{ column, index: columnIndex, rows: data, meta: summaryData }"
        ></Renderer>
      </Ellipsis>
      <Renderer
        v-else
        :renderer="summary.renderer"
        :data="{ column, index: columnIndex, rows: data, meta: summaryData }"
      ></Renderer>
    </template>
  </div>
</template>

<script lang="ts">
import { Ellipsis } from '@/components/ellipsis'
import { Renderer } from '@/components/renderer'

import { computed, defineComponent, inject, toRef } from 'vue'

import { useNameHelper } from '@vexip-ui/config'
import { boundRange, isFunction } from '@vexip-ui/utils'
import { TABLE_ACTIONS, TABLE_STORE } from './symbol'

import type { PropType } from 'vue'
import type { ColumnWithKey, SummaryCellSpanFn, SummaryWithKey } from './symbol'

export default defineComponent({
  name: 'TableFootCell',
  components: {
    Ellipsis,
    Renderer
  },
  props: {
    column: {
      type: Object as PropType<ColumnWithKey>,
      default: () => ({})
    },
    columnIndex: {
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
  },
  setup(props) {
    const { state, getters, mutations } = inject(TABLE_STORE)!
    const tableActions = inject(TABLE_ACTIONS)!

    const nh = useNameHelper('table')

    const prefix = computed(() => (props.above ? 'af' : 'bf'))
    const summaries = computed(() => (props.above ? state.aboveSummaries : state.belowSummaries))
    const heights = computed(() =>
      props.above ? getters.topFixedHeights : getters.bottomFixedHeights
    )
    const className = computed(() => {
      let customClass = null

      if (typeof state.footClass === 'function') {
        customClass = state.footClass({
          column: props.column,
          columnIndex: props.columnIndex,
          summary: props.summary,
          summaryIndex: props.summaryIndex
        })
      } else {
        customClass = state.footClass
      }

      return [
        nh.be('foot-cell'),
        {
          [nh.bem('foot-cell', 'center')]: props.column.textAlign === 'center',
          [nh.bem('foot-cell', 'right')]: props.column.textAlign === 'right',
          [nh.bem('foot-cell', 'wrap')]: props.column.noEllipsis
        },
        props.column.className,
        props.column.class,
        customClass
      ]
    })
    const cellSpan = computed(() => {
      const fixed = props.fixed || 'default'

      if (
        state.collapseMap
          .get(fixed)!
          .has(`${prefix.value}${props.summaryIndex},${props.columnIndex}`)
      ) {
        return { colSpan: 0, rowSpan: 0 }
      }

      const columns =
        fixed === 'left'
          ? state.leftFixedColumns
          : fixed === 'right'
            ? state.rightFixedColumns
            : state.columns

      let result: ReturnType<SummaryCellSpanFn>

      if (typeof props.summary.cellSpan === 'function') {
        result = props.summary.cellSpan({
          column: props.column,
          index: props.columnIndex,
          fixed: props.fixed
        })
      }

      const { colSpan, rowSpan } = result || { colSpan: 1, rowSpan: 1 }
      const span = { colSpan: colSpan ?? 1, rowSpan: rowSpan ?? 1 }

      span.colSpan = boundRange(span.colSpan, 0, columns.length - props.columnIndex)
      span.rowSpan = boundRange(span.rowSpan, 0, summaries.value.length - props.summaryIndex)

      mutations.updateCellSpan(props.summaryIndex, props.columnIndex, fixed, span, prefix.value)

      return span
    })
    const style = computed(() => {
      const totalWidths =
        props.fixed === 'left'
          ? getters.leftFixedWidths
          : props.fixed === 'right'
            ? getters.rightFixedWidths
            : getters.totalWidths
      const { colSpan, rowSpan } = cellSpan.value
      const width = totalWidths[props.columnIndex + colSpan] - totalWidths[props.columnIndex]

      let height: number | undefined

      if (rowSpan > 1) {
        height = heights.value[props.summaryIndex + rowSpan] - heights.value[props.summaryIndex]
      }

      let customStyle

      if (typeof state.footStyle === 'function') {
        customStyle = state.footStyle({
          column: props.column,
          columnIndex: props.columnIndex,
          summary: props.summary,
          summaryIndex: props.summaryIndex
        })
      } else {
        customStyle = state.cellStyle
      }

      return [
        props.column.style || '',
        customStyle,
        {
          display: !colSpan || !rowSpan ? 'none' : undefined,
          width: `${width}px`,
          height: height ? `${height}px` : undefined,
          borderRightWidth:
            !state.border && colSpan > 1 && props.columnIndex + colSpan >= totalWidths.length - 1
              ? 0
              : undefined,
          borderBottomWidth:
            rowSpan > 1 && props.summaryIndex + rowSpan >= summaries.value.length ? 0 : undefined,
          transform: `translate3d(${totalWidths[props.columnIndex]}px, 0, 0)`
        }
      ]
    })
    const attrs = computed(() => {
      let customAttrs: Record<string, any>

      if (typeof state.footAttrs === 'function') {
        customAttrs = state.footAttrs({
          column: props.column,
          columnIndex: props.columnIndex,
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
        columnIndex: props.columnIndex,
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

    return {
      nh,

      className,
      cellSpan,
      style,
      attrs,
      summaryData,
      data: toRef(state, 'data'),
      tooltipTheme: toRef(state, 'tooltipTheme'),
      tooltipWidth: toRef(state, 'tooltipWidth'),

      isFunction,
      handleMouseEnter,
      handleMouseLeave,
      handleClick,
      handleDblclick,
      handleContextmenu
    }
  }
})
</script>
