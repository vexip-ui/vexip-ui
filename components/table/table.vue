<template>
  <div
    ref="wrapper"
    :class="className"
    role="table"
    :style="style"
    :aria-rowcount="props.data.length"
  >
    <div v-show="false" role="none">
      <slot></slot>
    </div>
    <div ref="thead" :class="nh.be('head-wrapper')">
      <NativeScroll
        ref="xHeadScroll"
        inherit
        mode="horizontal"
        scroll-only
        :class="[nh.be('wrapper'), props.scrollClass.horizontal]"
        :scroll-x="bodyXScroll"
        @scroll="handleXScroll"
      >
        <TableHead></TableHead>
      </NativeScroll>
      <div
        v-if="leftFixedColumns.length"
        :class="{
          [nh.bem('fixed', 'left')]: true,
          [nh.bem('fixed', 'active')]: xScrollEnabled && xScrollPercent > 0
        }"
      >
        <TableHead fixed="left"></TableHead>
      </div>
      <div
        v-if="rightFixedColumns.length"
        :class="{
          [nh.bem('fixed', 'right')]: true,
          [nh.bem('fixed', 'active')]: xScrollEnabled && xScrollPercent < 100
        }"
      >
        <TableHead fixed="right"></TableHead>
      </div>
    </div>
    <div
      v-if="aboveSummaries.length"
      ref="aboveTfoot"
      :class="[nh.be('foot-wrapper'), nh.bem('foot-wrapper', 'above')]"
    >
      <NativeScroll
        ref="xAboveScroll"
        inherit
        mode="horizontal"
        scroll-only
        :class="[nh.be('wrapper'), props.scrollClass.horizontal]"
        :scroll-x="bodyXScroll"
        @scroll="handleXScroll"
      >
        <TableFoot above></TableFoot>
      </NativeScroll>
      <div
        v-if="leftFixedColumns.length"
        :class="{
          [nh.bem('fixed', 'left')]: true,
          [nh.bem('fixed', 'active')]: xScrollEnabled && xScrollPercent > 0
        }"
      >
        <TableFoot fixed="left" above></TableFoot>
      </div>
      <div
        v-if="rightFixedColumns.length"
        :class="{
          [nh.bem('fixed', 'right')]: true,
          [nh.bem('fixed', 'active')]: xScrollEnabled && xScrollPercent < 100
        }"
      >
        <TableFoot fixed="right" above></TableFoot>
      </div>
    </div>
    <div :class="nh.be('wrapper')">
      <NativeScroll
        ref="xScroll"
        inherit
        mode="horizontal"
        scroll-only
        :class="props.scrollClass.horizontal"
        :bar-class="nh.bem('bar', 'horizontal')"
        :scroll-x="bodyXScroll"
        @scroll="handleXScroll"
        @x-enabled-change="xScrollEnabled = $event"
      >
        <NativeScroll
          ref="yScroll"
          inherit
          observe-deep
          scroll-only
          :class="[nh.be('body-wrapper'), props.scrollClass.major]"
          :height="bodyScrollHeight"
          :scroll-y="bodyYScroll"
          :style="{ minWidth: `${totalWidths}px` }"
          @scroll="handleYScroll"
          @y-enabled-change="yScrollEnabled = $event"
        >
          <TableBody>
            <template #empty="{ isFixed }">
              <slot name="empty" :is-fixed="isFixed"></slot>
            </template>
          </TableBody>
        </NativeScroll>
      </NativeScroll>
      <div
        v-if="leftFixedColumns.length"
        :class="{
          [nh.bem('fixed', 'left')]: true,
          [nh.bem('fixed', 'active')]: xScrollEnabled && xScrollPercent > 0
        }"
      >
        <NativeScroll
          inherit
          observe-deep
          scroll-only
          :class="[nh.be('body-wrapper'), props.scrollClass.left]"
          :height="bodyScrollHeight"
          :scroll-y="bodyYScroll"
          @scroll="handleYScroll"
        >
          <TableBody fixed="left">
            <template #empty="{ isFixed }">
              <slot name="empty" :is-fixed="isFixed"></slot>
            </template>
          </TableBody>
        </NativeScroll>
      </div>
      <div
        v-if="rightFixedColumns.length"
        :class="{
          [nh.bem('fixed', 'right')]: true,
          [nh.bem('fixed', 'active')]: xScrollEnabled && xScrollPercent < 100
        }"
      >
        <NativeScroll
          inherit
          observe-deep
          scroll-only
          :class="[nh.be('body-wrapper'), props.scrollClass.right]"
          :height="bodyScrollHeight"
          :scroll-y="bodyYScroll"
          @scroll="handleYScroll"
        >
          <TableBody fixed="right">
            <slot></slot>
          </TableBody>
        </NativeScroll>
      </div>
    </div>
    <div
      v-if="belowSummaries.length"
      ref="belowTfoot"
      :class="[nh.be('foot-wrapper'), nh.bem('foot-wrapper', 'below')]"
    >
      <NativeScroll
        ref="xBelowScroll"
        inherit
        mode="horizontal"
        scroll-only
        :class="[nh.be('wrapper'), props.scrollClass.horizontal]"
        :bar-class="nh.bem('bar', 'horizontal')"
        :bar-fade="props.barFade"
        :scroll-x="bodyXScroll"
        @scroll="handleXScroll"
      >
        <TableFoot></TableFoot>
      </NativeScroll>
      <div
        v-if="leftFixedColumns.length"
        :class="{
          [nh.bem('fixed', 'left')]: true,
          [nh.bem('fixed', 'active')]: xScrollEnabled && xScrollPercent > 0
        }"
      >
        <TableFoot fixed="left"></TableFoot>
      </div>
      <div
        v-if="rightFixedColumns.length"
        :class="{
          [nh.bem('fixed', 'right')]: true,
          [nh.bem('fixed', 'active')]: xScrollEnabled && xScrollPercent < 100
        }"
      >
        <TableFoot fixed="right"></TableFoot>
      </div>
    </div>
    <Scrollbar
      v-if="props.useXBar && useXScroll"
      ref="xScrollbar"
      inherit
      placement="bottom"
      :class="nh.bem('bar', 'horizontal')"
      :fade="props.barFade"
      :disabled="!xScrollEnabled"
      :bar-length="xBarLength"
      :style="{ bottom: `${footHeight}px` }"
      @scroll="handleXBarScroll"
    ></Scrollbar>
    <Scrollbar
      v-if="props.useYBar && bodyScrollHeight"
      ref="yScrollbar"
      inherit
      placement="right"
      :class="nh.bem('bar', 'vertical')"
      :fade="props.barFade"
      :disabled="!yScrollEnabled"
      :bar-length="yBarLength"
      :style="{ top: `${headHeight}px`, bottom: `${footHeight}px` }"
      @scroll="handleYBarScroll"
    ></Scrollbar>
    <div
      v-if="props.rowDraggable || hasDragColumn"
      v-show="indicatorShow"
      ref="indicator"
      :class="[
        nh.be('indicator'),
        indicatorType === 'before' && nh.bem('indicator', 'before'),
        indicatorType === 'after' && nh.bem('indicator', 'after')
      ]"
    ></div>
    <div
      v-if="props.colResizable"
      v-show="colResizing"
      :class="nh.be('resize-indicator')"
      :style="{ left: `${resizeLeft}px` }"
    ></div>
  </div>
</template>

<script lang="ts">
import { NativeScroll } from '@/components/native-scroll'
import { Scrollbar } from '@/components/scrollbar'

import {
  computed,
  defineComponent,
  nextTick,
  onBeforeUnmount,
  onMounted,
  provide,
  ref,
  renderSlot,
  toRef,
  watch
} from 'vue'

import TableHead from './table-head.vue'
import TableBody from './table-body.vue'
import TableFoot from './table-foot.vue'
import { emitEvent, useLocale, useNameHelper, useProps } from '@vexip-ui/config'
import {
  debounce,
  isDefined,
  nextFrameOnce,
  removeArrayItem,
  toNumber,
  transformListToMap,
  warnOnce
} from '@vexip-ui/utils'
import { useSetTimeout } from '@vexip-ui/hooks'
import { tableProps } from './props'
import { useStore } from './store'
import { DropType, TABLE_ACTIONS, TABLE_SLOTS, TABLE_STORE } from './symbol'

import type { StyleType } from '@vexip-ui/config'
import type { NativeScrollExposed } from '@/components/native-scroll'
import type { ScrollbarExposed } from '@/components/scrollbar'
import type {
  Key,
  MouseEventType,
  MoveEventType,
  TableCellPayload,
  TableColResizePayload,
  TableColumnOptions,
  TableFootPayload,
  TableHeadPayload,
  TableKeyConfig,
  TableRowInstance,
  TableRowPayload,
  TableRowState,
  TableSummaryOptions
} from './symbol'

const defaultKeyConfig: Required<TableKeyConfig> = {
  id: 'id',
  children: 'children',
  checked: 'checked',
  height: 'height',
  expanded: 'expanded',
  treeExpanded: 'treeExpanded'
}

export default defineComponent({
  name: 'Table',
  components: {
    NativeScroll,
    Scrollbar,
    TableHead,
    TableBody,
    TableFoot
  },
  props: tableProps,
  emits: [],
  setup(_props, { slots }) {
    const props = useProps('table', _props, {
      locale: null,
      columns: {
        default: () => [],
        static: true
      },
      summaries: {
        default: () => [],
        static: true
      },
      data: {
        default: () => [],
        static: true
      },
      dataKey: null,
      width: null,
      height: null,
      rowClass: null,
      rowStyle: null,
      rowAttrs: null,
      stripe: false,
      border: false,
      highlight: false,
      useXBar: false,
      useYBar: false,
      barFade: 1500,
      rowDraggable: false,
      rowHeight: null,
      rowMinHeight: {
        default: 36,
        validator: value => value > 0
      },
      virtual: false,
      bufferCount: {
        default: 5,
        validator: value => value >= 0
      },
      scrollClass: () => ({}),
      expandRenderer: {
        default: null,
        isFunc: true
      },
      currentPage: {
        default: 1,
        validator: value => value > 0,
        static: true
      },
      pageSize: 0,
      transparent: false,
      emptyText: null,
      tooltipTheme: {
        default: 'dark',
        validator: value => ['light', 'dark'].includes(value)
      },
      tooltipWidth: 500,
      singleSorter: false,
      singleFilter: false,
      cellClass: null,
      cellStyle: null,
      cellAttrs: null,
      headClass: null,
      headStyle: null,
      headAttrs: null,
      footClass: null,
      footStyle: null,
      footAttrs: null,
      customSorter: false,
      customFilter: false,
      keyConfig: () => ({}),
      disabledTree: false,
      rowIndent: '16px',
      noCascaded: false,
      colResizable: false,
      cellSpan: {
        default: null,
        isFunc: true
      },
      sidePadding: 0,
      icons: () => ({})
    })

    const nh = useNameHelper('table')
    const bodyHeight = ref<number | undefined>(props.height)
    const xScrollEnabled = ref(false)
    const yScrollEnabled = ref(false)
    const xScrollPercent = ref(0)
    const yScrollPercent = ref(0)
    const headHeight = ref(0)
    const footHeight = ref(0)
    const indicatorShow = ref(false)
    const indicatorType = ref(DropType.BEFORE)
    const tempColumns = ref(new Set<TableColumnOptions>())
    const tempSummaries = ref(new Set<TableSummaryOptions>())
    const tableWidth = ref<number | string>()
    const hasDragColumn = ref(false)
    const noTransition = ref(true)

    const wrapper = ref<HTMLElement>()
    const xScroll = ref<NativeScrollExposed>()
    const xHeadScroll = ref<NativeScrollExposed>()
    const xAboveScroll = ref<NativeScrollExposed>()
    const xBelowScroll = ref<NativeScrollExposed>()
    const thead = ref<HTMLElement>()
    const aboveTfoot = ref<HTMLElement>()
    const belowTfoot = ref<HTMLElement>()
    const yScroll = ref<NativeScrollExposed>()
    const indicator = ref<HTMLElement>()
    const xScrollbar = ref<ScrollbarExposed>()
    const yScrollbar = ref<ScrollbarExposed>()

    let isMounted = false

    if (isDefined(props.onBodyScroll)) {
      warnOnce(
        "[vexip-ui:Table] 'body-scroll' event has been deprecated, please " +
          "using 'scroll' event to replace it"
      )
    }

    const userLocale = computed(() => {
      if (isDefined(props.emptyText)) {
        warnOnce(
          "[vexip-ui:Table] 'empty-text' prop has been deprecated, please " +
            "using 'empty' option of 'locale' prop to instead it"
        )

        return { empty: props.emptyText, ...props.locale }
      }

      return props.locale
    })

    const locale = useLocale('table', userLocale)
    const keyConfig = computed(() => ({ ...defaultKeyConfig, ...props.keyConfig }))
    const dataKey = computed(() => {
      if (isDefined(props.dataKey)) {
        warnOnce(
          "[vexip-ui:Table] 'data-key' prop has been deprecated, please " +
            "using 'id' option of 'key-config' prop to instead it"
        )

        return props.keyConfig.id ?? props.dataKey
      }

      return keyConfig.value.id
    })
    const allColumns = computed(() => {
      return Array.from(tempColumns.value).concat(props.columns)
    })
    const allSummaries = computed(() => {
      return Array.from(tempSummaries.value).concat(props.summaries)
    })

    const store = useStore({
      columns: allColumns.value,
      summaries: allSummaries.value,
      data: props.data,
      dataKey: dataKey.value,
      rowClass: props.rowClass,
      rowStyle: props.rowStyle,
      rowAttrs: props.rowAttrs,
      cellClass: props.cellClass,
      cellStyle: props.cellStyle,
      cellAttrs: props.cellAttrs,
      headClass: props.headClass,
      headStyle: props.headStyle,
      headAttrs: props.headAttrs,
      footClass: props.footClass,
      footStyle: props.footStyle,
      footAttrs: props.footAttrs,
      border: props.border,
      stripe: props.stripe,
      highlight: props.highlight,
      currentPage: props.currentPage,
      pageSize: props.pageSize,
      rowHeight: props.rowHeight,
      rowMinHeight: props.rowMinHeight,
      virtual: props.virtual,
      rowDraggable: props.rowDraggable,
      locale: locale.value,
      tooltipTheme: props.tooltipTheme,
      tooltipWidth: props.tooltipWidth,
      singleSorter: props.singleSorter,
      singleFilter: props.singleFilter,
      customSorter: props.customSorter,
      customFilter: props.customFilter,
      keyConfig: keyConfig.value,
      disabledTree: props.disabledTree,
      noCascaded: props.noCascaded,
      colResizable: props.colResizable,
      expandRenderer: props.expandRenderer,
      cellSpan: props.cellSpan,
      sidePadding: Array.isArray(props.sidePadding)
        ? props.sidePadding
        : [props.sidePadding, props.sidePadding]
    })

    provide(TABLE_STORE, store)
    provide(TABLE_ACTIONS, {
      increaseColumn,
      decreaseColumn,
      increaseSummary,
      decreaseSummary,
      getTableElement,
      refreshXScroll,
      emitRowCheck,
      emitAllRowCheck,
      emitRowExpand,
      emitRowFilter,
      emitRowSort,
      handleRowDragStart,
      handleRowDragOver,
      handleRowDrop,
      handleRowDragEnd,
      emitRowEvent,
      emitCellEvent,
      emitHeadEvent,
      emitColResize,
      emitFootEvent,
      hasIcon: name => !!props.icons[name],
      getIcon: name => props.icons[name],
      renderTableSlot
    })
    provide(TABLE_SLOTS, slots)

    const { state, getters, mutations } = store

    const className = computed(() => {
      return {
        [nh.b()]: true,
        [nh.bs('vars')]: true,
        [nh.bm('inherit')]: props.inherit,
        [nh.bm('stripe')]: props.stripe,
        [nh.bm('border')]: props.border,
        [nh.bm('highlight')]: props.highlight,
        [nh.bm('use-y-bar')]: props.useYBar,
        [nh.bm('transparent')]: props.transparent,
        [nh.bm('virtual')]: props.virtual,
        [nh.bm('col-resizable')]: props.colResizable,
        [nh.bm('col-resizing')]: state.colResizing,
        [nh.bm('locked')]: noTransition.value,
        [nh.bm('above-foot')]: state.aboveSummaries.length,
        [nh.bm('below-foot')]: state.belowSummaries.length
      }
    })
    const style = computed(() => {
      const style: StyleType = {
        [nh.cv('row-indent-width')]:
          typeof props.rowIndent === 'number' ? `${props.rowIndent}px` : props.rowIndent
      }
      const width = tableWidth.value ?? props.width
      const [padLeft, padRight] = state.sidePadding

      if (padLeft) {
        style[nh.cv('side-pad-left')] = `${padLeft}px`
      }

      if (padRight) {
        style[nh.cv('side-pad-right')] = `${padRight}px`
      }

      if (isDefined(width)) {
        if (typeof width === 'string' && parseFloat(width).toString() !== width) {
          style.width = width
        } else {
          style.width = `${width}px`
          style.minWidth = `${width}px`
        }
      }

      return style
    })
    const useXScroll = computed(() => {
      return !!(props.width && (state.leftFixedColumns.length || state.rightFixedColumns.length))
    })
    const bodyScrollHeight = computed(() => {
      const { totalHeight } = state

      if (Number.isNaN(totalHeight)) {
        return bodyHeight.value
      }

      return bodyHeight.value ? Math.min(bodyHeight.value, totalHeight) : bodyHeight.value
    })
    const xBarLength = computed(() => xScroll.value?.xBarLength || 35)
    const yBarLength = computed(() => {
      const { totalHeight } = state

      if (bodyScrollHeight.value && totalHeight) {
        return Math.max(Math.min((bodyScrollHeight.value / totalHeight) * 100, 99), 5) || 35
      }

      return 35
    })
    const totalWidths = computed(() => {
      return (
        (getters.totalWidths.at(-1) || 0) +
        (state.sidePadding[0] || 0) +
        (state.sidePadding[1] || 0)
      )
    })

    const {
      setColumns,
      setSummaries,
      setData,
      setDataKey,
      setTableWidth,
      setBodyYScroll,
      setBodyXScroll,
      setRenderRows,
      setVirtual,
      setLocale,
      setDragging,
      setKeyConfig,
      setDisabledTree,
      clearSort,
      clearFilter,
      refreshRowIndex,
      clearCheckAll,
      getParentRow
    } = mutations

    watch(
      allColumns,
      value => {
        setColumns(value)
        isMounted && computeTableWidth()
        nextTick(() => {
          hasDragColumn.value = getters.hasDragColumn
        })
      },
      { immediate: true, deep: true }
    )
    watch(
      allSummaries,
      value => {
        setSummaries(value)
      },
      { deep: true }
    )
    watch(dataKey, setDataKey)
    watch(
      () => props.data,
      value => {
        setData(value)
        nextTick(() => computeRenderRows(true))
        refreshPercentScroll()
      },
      { deep: true }
    )
    watch(() => props.width, computeTableWidth)
    watch(
      () => props.height,
      () => {
        nextTick(computeBodyHeight)
      }
    )
    watch(locale, setLocale, { deep: true })
    watch(
      () => props.virtual,
      value => {
        setVirtual(value)
        setData(props.data)
        refreshPercentScroll()
      }
    )
    watch(
      keyConfig,
      config => {
        setKeyConfig(config)
        setData(props.data)
      },
      { deep: true }
    )
    watch(
      () => props.disabledTree,
      value => {
        setDisabledTree(value)
        setData(props.data)
      }
    )

    const normalProps = [
      'rowClass',
      'rowStyle',
      'rowAttrs',
      'cellClass',
      'cellStyle',
      'cellAttrs',
      'headClass',
      'headStyle',
      'headAttrs',
      'border',
      'stripe',
      'highlight',
      'currentPage',
      'pageSize',
      'rowHeight',
      'rowMinHeight',
      'rowDraggable',
      'tooltipTheme',
      'tooltipWidth',
      'singleSorter',
      'singleFilter',
      'customSorter',
      'customFilter',
      'noCascaded',
      'colResizable',
      'expandRenderer',
      'cellSpan',
      'sidePadding'
    ] as const

    for (const prop of normalProps) {
      const watchCallback =
        mutations[
          `set${prop.charAt(0).toLocaleUpperCase()}${prop.slice(1)}` as `set${Capitalize<
            typeof prop
          >}`
        ]

      watch(() => props[prop], watchCallback as any)
    }

    function syncBarScroll() {
      xScrollbar.value?.handleScroll(xScrollPercent.value)
      yScrollbar.value?.handleScroll(yScrollPercent.value)
    }

    const handlerResize = debounce(refresh)

    onMounted(() => {
      isMounted = true

      watch(bodyScrollHeight, refreshPercentScroll)
      refresh()
      window.addEventListener('resize', handlerResize)

      xScrollEnabled.value = xScroll.value?.enableXScroll ?? false
      yScrollEnabled.value = yScroll.value?.enableYScroll ?? false
    })

    onBeforeUnmount(() => {
      isMounted = false

      window.removeEventListener('resize', handlerResize)
    })

    function computeTableWidth() {
      const width = props.width

      if (isDefined(width)) {
        if (typeof width === 'string' && parseFloat(width).toString() !== width) {
          tableWidth.value = width
        } else {
          tableWidth.value = `${toNumber(width)}px`
        }
      }

      nextTick(() => {
        xScroll.value?.content && setTableWidth(xScroll.value.content.offsetWidth)
        refreshXScroll()
      })
    }

    function computeBodyHeight() {
      const height = props.height

      if (isDefined(height)) {
        headHeight.value = 0
        footHeight.value = 0

        if (thead.value || aboveTfoot.value || belowTfoot.value) {
          if (thead.value) {
            headHeight.value = thead.value.offsetHeight
          }

          if (aboveTfoot.value) {
            headHeight.value += aboveTfoot.value.offsetHeight
          }

          if (belowTfoot.value) {
            footHeight.value = belowTfoot.value.offsetHeight
          }

          bodyHeight.value = height - headHeight.value - footHeight.value
        } else {
          bodyHeight.value = height - (props.rowHeight || props.rowMinHeight)
        }
      } else {
        bodyHeight.value = undefined
      }
    }

    function handleXScroll({ clientX, percentX }: { clientX: number, percentX: number }) {
      xScrollPercent.value = percentX
      setBodyXScroll(clientX)
      syncBarScroll()
      emitEvent(props.onScroll, { type: 'horizontal', client: clientX, percent: percentX })
    }

    function handleYScroll({ clientY, percentY }: { clientY: number, percentY: number }) {
      yScrollPercent.value = percentY
      setBodyYScroll(clientY)
      syncBarScroll()
      emitYScroll(clientY, percentY)
    }

    function handleXBarScroll(percent: number) {
      if (!xScroll.value) return

      const client = (xScroll.value.xScrollLimit * percent) / 100

      xScrollPercent.value = percent
      setBodyXScroll(client)
      emitEvent(props.onScroll, { type: 'horizontal', client, percent })
    }

    function handleYBarScroll(percent: number) {
      const { totalHeight } = state
      const client = (percent * (totalHeight - (bodyScrollHeight.value ?? 0))) / 100

      yScrollPercent.value = percent
      setBodyYScroll(client)
      emitYScroll(client, percent)
    }

    function emitYScroll(client: number, percent: number) {
      nextFrameOnce(computeRenderRows)
      emitEvent(props.onBodyScroll, { client, percent })
      emitEvent(props.onScroll, { type: 'vertical', client, percent })
    }

    function increaseColumn(column: TableColumnOptions) {
      tempColumns.value.add(column)
    }

    function decreaseColumn(column: TableColumnOptions) {
      tempColumns.value.delete(column)
    }

    function increaseSummary(summary: TableSummaryOptions) {
      tempSummaries.value.add(summary)
    }

    function decreaseSummary(summary: TableSummaryOptions) {
      tempSummaries.value.delete(summary)
    }

    function getTableElement() {
      return wrapper.value
    }

    function refreshXScroll() {
      xScroll.value?.refresh()
      xHeadScroll.value?.refresh()
      xAboveScroll.value?.refresh()
      xBelowScroll.value?.refresh()
    }

    function emitRowCheck(payload: TableRowPayload & { checked: boolean }) {
      emitEvent(props.onRowCheck, payload)
    }

    function emitAllRowCheck(checked: boolean, partial: boolean) {
      emitEvent(props.onRowCheckAll, checked, partial)
    }

    function emitRowExpand(payload: TableRowPayload & { expanded: boolean }) {
      emitEvent(props.onRowExpand, payload)
    }

    function emitRowFilter() {
      const { columns, filters } = state
      const columnMap = transformListToMap(columns, 'key')
      const profiles = Array.from(filters.keys())
        .filter(key => filters.get(key)!.active)
        .map(key => {
          const column = columnMap[key as string]

          return {
            name: column.name,
            key: column.key,
            metaData: column.metaData!,
            active: filters.get(key)!.active!
          }
        })

      computeRenderRows(true)
      emitEvent(
        props.onRowFilter,
        profiles,
        getters.filteredData.map(row => row.data)
      )
    }

    function emitRowSort() {
      const { columns, sorters } = state
      const columnMap = transformListToMap(columns, 'key')
      const profiles = Array.from(sorters.keys())
        .filter(key => sorters.get(key)!.type)
        .map(key => {
          const column = columnMap[key as string]
          const sorter = sorters.get(key)!

          return {
            name: column.name,
            key: column.key,
            metaData: column.metaData!,
            type: sorter.type!,
            order: sorter.order
          }
        })

      computeRenderRows(true)
      emitEvent(
        props.onRowSort,
        profiles,
        getters.sortedData.map(row => row.data)
      )
    }

    let dragState: {
      draggingRow: TableRowState,
      tableRect: DOMRect,
      willDropRow: TableRowState | null,
      dropType: DropType
    } | null

    function handleRowDragStart(rowInstance: TableRowInstance, event: DragEvent) {
      dragState = {
        draggingRow: rowInstance.row,
        tableRect: wrapper.value!.getBoundingClientRect(),
        willDropRow: null,
        dropType: DropType.BEFORE
      }

      setDragging(true)
      emitEvent(props.onRowDragStart, rowInstance.row.data, event)
    }

    function handleRowDragOver(rowInstance: TableRowInstance, event: DragEvent) {
      if (!dragState || !rowInstance.el) return

      const dropRowRect = rowInstance.el.getBoundingClientRect()
      const tableRect = dragState.tableRect
      const prevPercent = 0.25
      const nextPercent = 0.75
      const distance = event.clientY - dropRowRect.top
      const dropRowHeight = dropRowRect.height

      let dropType: DropType
      let indicatorTop = -9999
      let isIndicatorShow = true

      if (distance < dropRowHeight * prevPercent) {
        dropType = DropType.BEFORE
        indicatorTop = dropRowRect.top - tableRect.top
      } else if (distance > dropRowHeight * nextPercent) {
        dropType = DropType.AFTER
        indicatorTop = dropRowRect.bottom - tableRect.top
      } else {
        dropType = DropType.INNER
        isIndicatorShow = false
      }

      if (indicator.value) {
        indicator.value.style.top = `${indicatorTop - 2}px`
      }

      dragState.willDropRow = rowInstance.row
      dragState.dropType = dropType

      indicatorShow.value = isIndicatorShow
      indicatorType.value = dropType

      emitEvent(props.onRowDragOver, rowInstance.row.data, event)
    }

    function isLeftInsideRight(left: TableRowState, right: TableRowState) {
      if (!left || !right) return true

      while (left) {
        if (left === right || left.key === right.key) {
          return true
        }

        left = getParentRow(left.key)!
      }

      return false
    }

    function handleRowDrop(rowInstance: TableRowInstance, event: DragEvent) {
      if (!dragState) return

      const { draggingRow, willDropRow, dropType } = dragState
      const { rowData } = state

      if (!willDropRow || isLeftInsideRight(draggingRow, willDropRow)) return

      let currentKey: Key
      let parent: TableRowState | null

      if (draggingRow) {
        parent = getParentRow(draggingRow.key)
        currentKey = draggingRow.key

        if (parent) {
          removeArrayItem(parent.children, row => row.key === currentKey)
        }

        removeArrayItem(rowData, row => row.key === currentKey)
      }

      if (dropType === DropType.INNER) {
        if (!Array.isArray(willDropRow.children)) {
          willDropRow.children = []
        }

        const children = Array.from(willDropRow.children)

        children.push(draggingRow)
        willDropRow.children = children
        draggingRow.parent = willDropRow.key
        draggingRow.depth = willDropRow.depth + 1
      } else {
        parent = getParentRow(willDropRow.key)
        currentKey = willDropRow.key

        if (parent) {
          const index = parent.children.findIndex(row => row.key === currentKey)

          if (~index) {
            parent.children.splice(+(dropType === DropType.AFTER) + index, 0, draggingRow)

            draggingRow.parent = parent.key
            draggingRow.depth = parent.depth + 1
          }
        } else {
          draggingRow.parent = undefined
          draggingRow.depth = 0
        }

        const index = rowData.findIndex(row => row.key === currentKey)

        if (~index) {
          rowData.splice(+(dropType === DropType.AFTER) + index, 0, draggingRow)
        }
      }

      refreshRowIndex()
      emitEvent(props.onRowDrop, rowInstance.row.data, dropType!, event)
    }

    function handleRowDragEnd(event: DragEvent) {
      if (!dragState) return

      const { draggingRow } = dragState

      dragState = null
      indicatorShow.value = false

      setDragging(false)
      emitEvent(
        props.onRowDragEnd,
        draggingRow.data,
        state.rowData.map(row => row.data),
        event
      )
    }

    function emitRowEvent(type: MouseEventType, payload: TableRowPayload) {
      emitEvent(props[`onRow${type}`], payload)
    }

    function emitCellEvent(type: MouseEventType, payload: TableCellPayload) {
      emitEvent(props[`onCell${type}`], payload)
    }

    function emitHeadEvent(type: MouseEventType, payload: TableHeadPayload) {
      emitEvent(props[`onHead${type}`], payload)
    }

    function emitColResize(type: MoveEventType, payload: TableColResizePayload) {
      emitEvent(props[`onColResize${type}`], payload)
    }

    function emitFootEvent(type: MouseEventType, payload: TableFootPayload) {
      emitEvent(props[`onFoot${type}`], payload)
    }

    function computeRenderRows(force = false) {
      const { totalHeight, bodyYScroll, heightBITree } = state
      const { processedData } = getters
      const rowCount = processedData.length

      if (!props.virtual) {
        setRenderRows(0, rowCount)

        return
      }

      const viewHeight = Math.min(bodyHeight.value || 0, bodyScrollHeight.value || 0)

      if (!viewHeight) {
        setRenderRows(0, 0)
      }

      let viewStart = bodyYScroll
      let viewEnd = bodyYScroll + viewHeight

      if (viewEnd > totalHeight) {
        viewEnd = totalHeight
        viewStart = viewEnd - viewHeight
      }

      const start = heightBITree.boundIndex(viewStart)
      const end = heightBITree.boundIndex(viewEnd)
      const renderStart = Math.max(start - props.bufferCount, 0)
      const renderEnd = Math.min(end + props.bufferCount + 1, rowCount)

      setRenderRows(renderStart, renderEnd, force)
    }

    function refresh() {
      noTransition.value = true
      nextTick(computeTableWidth)
      setTimeout(() => {
        computeBodyHeight()
        refreshPercentScroll()
        nextFrameOnce(computeRenderRows)
        noTransition.value = false
      }, 0)
    }

    const { timer } = useSetTimeout()

    function refreshPercentScroll() {
      clearTimeout(timer.scroll)

      timer.scroll = setTimeout(() => {
        const { totalHeight, bodyYScroll } = state

        yScrollPercent.value = Math.max(
          Math.min((bodyYScroll / (totalHeight - (bodyScrollHeight.value ?? 0) || 1)) * 100, 100),
          0
        )
        syncBarScroll()
        nextTick(() => {
          computeBodyHeight()
        })
        nextFrameOnce(computeRenderRows)
      }, 10)
    }

    function getSelected() {
      const data = state.rowData
      const selectedData = []

      for (let i = 0, len = data.length; i < len; ++i) {
        const row = data[i]

        if (row.checked) {
          selectedData.push(row.data)
        }
      }

      return selectedData
    }

    function renderTableSlot({ name }: { name: string }) {
      return renderSlot(slots, name)
    }

    return {
      props,
      nh,
      bodyHeight,
      xScrollEnabled,
      yScrollEnabled,
      xScrollPercent,
      yScrollPercent,
      headHeight,
      footHeight,
      indicatorShow,
      indicatorType,
      aboveSummaries: toRef(state, 'aboveSummaries'),
      belowSummaries: toRef(state, 'belowSummaries'),
      leftFixedColumns: toRef(state, 'leftFixedColumns'),
      rightFixedColumns: toRef(state, 'rightFixedColumns'),
      bodyYScroll: toRef(state, 'bodyYScroll'),
      bodyXScroll: toRef(state, 'bodyXScroll'),
      hasDragColumn,
      colResizing: toRef(state, 'colResizing'),
      resizeLeft: toRef(state, 'resizeLeft'),

      className,
      style,
      useXScroll,
      xBarLength,
      yBarLength,
      bodyScrollHeight,
      totalWidths,
      totalHeight: toRef(state, 'totalHeight'),

      store,

      wrapper,
      xScroll,
      yScroll,
      xHeadScroll,
      xAboveScroll,
      xBelowScroll,
      thead,
      aboveTfoot,
      belowTfoot,
      indicator,
      xScrollbar,
      yScrollbar,

      handleYScroll,
      handleXScroll,
      handleXBarScroll,
      handleYBarScroll,
      // syncVerticalScroll,

      clearSort,
      clearFilter,
      clearSelected: clearCheckAll,
      refresh,
      getSelected
    }
  }
})
</script>
