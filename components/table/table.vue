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
    <Scroll
      v-if="useXScroll"
      inherit
      use-x-bar
      mode="horizontal"
      :class="[nh.be('wrapper'), props.scrollClass.horizontal]"
      :bar-class="nh.bem('bar', 'horizontal')"
      :width="props.width"
      :bar-fade="props.barFade"
      :delta-x="50"
      @scroll="handleXScroll"
      @x-enabled-change="xScrollEnabled = $event"
    >
      <TableHead ref="thead"></TableHead>
      <Scroll
        inherit
        :class="[nh.be('body-wrapper'), props.scrollClass.major]"
        :height="bodyScrollHeight"
        :scroll-y="bodyScroll"
        @scroll="handleBodyScroll"
        @y-enabled-change="handleYScrollEnableChange"
        @ready="syncVerticalScroll"
      >
        <TableBody>
          <template #empty="{ isFixed }">
            <slot name="empty" :is-fixed="isFixed"></slot>
          </template>
        </TableBody>
      </Scroll>
    </Scroll>
    <template v-else>
      <TableHead ref="thead"></TableHead>
      <Scroll
        ref="mainScroll"
        inherit
        :class="[nh.be('body-wrapper'), props.scrollClass.major]"
        :height="bodyScrollHeight"
        :scroll-y="bodyScroll"
        :delta-y="props.scrollDeltaY"
        @scroll="handleBodyScroll"
        @y-enabled-change="handleYScrollEnableChange"
        @ready="syncVerticalScroll"
      >
        <TableBody>
          <template #empty="{ isFixed }">
            <slot name="empty" :is-fixed="isFixed"></slot>
          </template>
        </TableBody>
      </Scroll>
    </template>
    <div
      v-if="leftFixedColumns.length"
      :class="{
        [nh.bem('fixed', 'left')]: true,
        [nh.bem('fixed', 'active')]: xScrollEnabled && xScrollPercent > 0
      }"
    >
      <TableHead fixed="left"></TableHead>
      <Scroll
        ref="mainScroll"
        inherit
        :class="[nh.be('body-wrapper'), props.scrollClass.left]"
        :height="bodyScrollHeight"
        :scroll-y="bodyScroll"
        :delta-y="props.scrollDeltaY"
        @scroll="handleBodyScroll"
      >
        <TableBody fixed="left">
          <template #empty="{ isFixed }">
            <slot name="empty" :is-fixed="isFixed"></slot>
          </template>
        </TableBody>
      </Scroll>
    </div>
    <div
      v-if="rightFixedColumns.length"
      :class="{
        [nh.bem('fixed', 'right')]: true,
        [nh.bem('fixed', 'active')]: xScrollEnabled && xScrollPercent < 100
      }"
    >
      <TableHead fixed="right"></TableHead>
      <Scroll
        inherit
        :class="[nh.be('body-wrapper'), props.scrollClass.right]"
        :height="bodyScrollHeight"
        :scroll-y="bodyScroll"
        :delta-y="props.scrollDeltaY"
        @scroll="handleBodyScroll"
      >
        <TableBody fixed="right">
          <slot></slot>
        </TableBody>
      </Scroll>
    </div>
    <Scrollbar
      v-if="props.useYBar && bodyScrollHeight"
      ref="scrollbar"
      inherit
      placement="right"
      :class="nh.bem('bar', 'vertical')"
      :fade="props.barFade"
      :disabled="!!bodyHeight && totalHeight <= bodyHeight"
      :bar-length="barLength"
      :style="{ top: `${headHeight}px` }"
      @scroll="handleYBarScroll"
    ></Scrollbar>
    <div
      v-if="props.rowDraggable"
      v-show="indicatorShow"
      ref="indicator"
      :class="nh.be('indicator')"
    ></div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  computed,
  watch,
  provide,
  nextTick,
  onMounted,
  onBeforeUnmount,
  toRef
} from 'vue'
import TableHead from './table-head.vue'
import TableBody from './table-body.vue'
import { Scroll } from '@/components/scroll'
import { Scrollbar } from '@/components/scrollbar'
import { useNameHelper, useProps, useLocale, emitEvent } from '@vexip-ui/config'
import {
  isDefined,
  debounce,
  transformListToMap,
  removeArrayItem,
  toNumber,
  nextFrameOnce
} from '@vexip-ui/utils'
import { useSetTimeout } from '@vexip-ui/hooks'
import { tableProps } from './props'
import { useStore } from './store'
import { DEFAULT_KEY_FIELD, TABLE_STORE, TABLE_ACTION, TABLE_LOCALE } from './symbol'

import type {
  DropType,
  TableColumnOptions,
  RowState,
  RowInstance,
  TableRowPayload,
  TableCellPayload,
  TableHeadPayload
} from './symbol'

export default defineComponent({
  name: 'Table',
  components: {
    Scroll,
    Scrollbar,
    TableHead,
    TableBody
  },
  props: tableProps,
  emits: [],
  setup(_props) {
    const props = useProps('table', _props, {
      locale: null,
      columns: {
        default: () => [],
        static: true
      },
      data: {
        default: () => [],
        static: true
      },
      dataKey: DEFAULT_KEY_FIELD,
      width: null,
      height: null,
      rowClass: null,
      rowStyle: null,
      rowAttrs: null,
      stripe: false,
      border: false,
      highlight: false,
      useYBar: false,
      barFade: 1500,
      scrollDeltaY: 36,
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
      headAttrs: null
    })

    const nh = useNameHelper('table')
    const bodyHeight = ref<number | undefined>(props.height)
    const xScrollEnabled = ref(false)
    const xScrollPercent = ref(0)
    const yScrollPercent = ref(0)
    const headHeight = ref(0)
    const indicatorShow = ref(false)
    const templateColumns = ref(new Set<TableColumnOptions>())
    const tableWidth = ref<number | string | null>(null)
    const yScrollEnable = ref(false)

    const wrapper = ref<HTMLElement>()
    const thead = ref<InstanceType<typeof TableHead>>()
    const mainScroll = ref<InstanceType<typeof Scroll>>()
    const indicator = ref<HTMLElement>()
    const scrollbar = ref<InstanceType<typeof Scrollbar>>()

    const locale = useLocale('table', toRef(props, 'locale'))

    const store = useStore({
      columns: props.columns as TableColumnOptions[],
      data: props.data,
      rowClass: props.rowClass,
      rowStyle: props.rowStyle,
      rowAttrs: props.rowAttrs,
      cellClass: props.cellClass,
      cellStyle: props.cellStyle,
      cellAttrs: props.cellAttrs,
      headClass: props.headClass,
      headStyle: props.headStyle,
      headAttrs: props.headAttrs,
      dataKey: props.dataKey,
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
      expandRenderer: props.expandRenderer
    })

    provide(TABLE_STORE, store)
    provide(TABLE_ACTION, {
      increaseColumn,
      decreaseColumn,
      emitRowEnter,
      emitRowLeave,
      emitRowClick,
      emitRowDblclick,
      emitRowContextmenu,
      emitRowCheck,
      emitAllRowCheck,
      emitRowExpand,
      emitRowFilter,
      emitRowSort,
      handleRowDragStart,
      handleRowDragOver,
      handleRowDrop,
      handleRowDragEnd,
      emitCellEnter,
      emitCellLeave,
      emitCellClick,
      emitCellDblclick,
      emitCellContextmenu,
      emitHeadEnter,
      emitHeadLeave,
      emitHeadClick,
      emitHeadDblclick,
      emitHeadContextmenu
    })

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
        [nh.bm('virtual')]: props.virtual
      }
    })
    const style = computed(() => {
      const width = tableWidth.value ?? props.width

      if (width !== null) {
        if (typeof width === 'string' && parseFloat(width).toString() !== width) {
          return {
            width
          }
        }

        return {
          width: `${width}px`,
          minWidth: `${width}px`
        }
      }

      return {}
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
    const barLength = computed(() => {
      const { totalHeight } = state

      if (bodyScrollHeight.value && totalHeight) {
        return Math.max(Math.min((bodyScrollHeight.value / totalHeight) * 100, 99), 5) || 35
      }

      return 35
    })
    const allColumns = computed(() => {
      return [...templateColumns.value].concat(props.columns as TableColumnOptions[])
    })

    const {
      setColumns,
      setData,
      setPageSize,
      setRowClass,
      setHighlight,
      setCurrentPage,
      setTableWidth,
      setBodyScroll,
      setRenderRows,
      setGlobalRowHeight,
      setRowDraggable,
      setLocale,
      setTooltipTheme,
      setTooltipWidth,
      setSingleSorter,
      setSingleFilter,
      setDragging,
      clearSort,
      clearFilter,
      refreshRowIndex,
      clearCheckAll
    } = mutations

    watch(
      allColumns,
      value => {
        setColumns(value)
      },
      { immediate: true, deep: true }
    )
    watch(
      () => props.data,
      value => {
        setPageSize(props.pageSize || value.length)
        setData(value)

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
    watch(() => props.rowClass, setRowClass)
    watch(() => props.highlight, setHighlight)
    watch(() => props.currentPage, setCurrentPage)
    watch(() => props.pageSize, setPageSize)
    watch(() => props.rowHeight, setGlobalRowHeight)
    watch(() => props.rowDraggable, setRowDraggable)
    watch(locale, setLocale)
    watch(() => props.tooltipTheme, setTooltipTheme)
    watch(() => props.tooltipWidth, setTooltipWidth)
    watch(() => props.singleSorter, setSingleSorter)
    watch(() => props.singleFilter, setSingleFilter)

    function syncBarScroll() {
      scrollbar.value?.handleScroll(yScrollPercent.value)
    }

    const handlerResize = debounce(refresh)

    onMounted(() => {
      watch(bodyScrollHeight, refreshPercentScroll)

      refresh()
      window.addEventListener('resize', handlerResize)
    })

    onBeforeUnmount(() => {
      window.removeEventListener('resize', handlerResize)
    })

    function computeTableWidth() {
      const width = props.width

      if (isDefined(width)) {
        if (typeof width === 'string' && parseFloat(width).toString() !== width) {
          tableWidth.value = width

          nextTick(() => {
            wrapper.value && setTableWidth(wrapper.value.offsetWidth)
          })
        } else {
          const numberWidth = toNumber(width)

          tableWidth.value = `${numberWidth}px`
          setTableWidth(numberWidth)
        }
      } else {
        nextTick(() => {
          wrapper.value && setTableWidth(wrapper.value.offsetWidth)
        })
      }
    }

    function computeBodyHeight() {
      const height = props.height

      if (isDefined(height)) {
        const tableHead = thead.value?.$el as HTMLElement

        if (tableHead) {
          headHeight.value = tableHead.offsetHeight
          bodyHeight.value = height - headHeight.value
        } else {
          bodyHeight.value = height - (props.rowHeight || props.rowMinHeight)
        }
      } else {
        bodyHeight.value = undefined
      }
    }

    function handleBodyScroll({ clientY, percentY }: { clientY: number, percentY: number }) {
      yScrollPercent.value = percentY
      setBodyScroll(clientY)
      syncBarScroll()
      emitYScroll(clientY, percentY)
    }

    function handleXScroll({ percentX }: { percentX: number }) {
      xScrollPercent.value = percentX
    }

    function handleYScrollEnableChange(able: boolean) {
      yScrollEnable.value = able
    }

    function handleYBarScroll(percent: number) {
      const { totalHeight } = state
      const client = (percent * (totalHeight - (bodyScrollHeight.value ?? 0))) / 100

      yScrollPercent.value = percent
      setBodyScroll(client)
      nextFrameOnce(computeRenderRows)
      emitEvent(props.onBodyScroll, { client, percent })
    }

    function emitYScroll(client: number, percent: number) {
      nextFrameOnce(computeRenderRows)
      emitEvent(props.onBodyScroll, { client, percent })
    }

    function increaseColumn(column: TableColumnOptions) {
      templateColumns.value.add(column)
    }

    function decreaseColumn(column: TableColumnOptions) {
      templateColumns.value.delete(column)
    }

    function emitRowEnter(payload: TableRowPayload) {
      emitEvent(props.onRowEnter, payload)
    }

    function emitRowLeave(payload: TableRowPayload) {
      emitEvent(props.onRowLeave, payload)
    }

    function emitRowClick(payload: TableRowPayload) {
      emitEvent(props.onRowClick, payload)
    }

    function emitRowDblclick(payload: TableRowPayload) {
      emitEvent(props.onRowDblclick, payload)
    }

    function emitRowContextmenu(payload: TableRowPayload) {
      emitEvent(props.onRowContextmenu, payload)
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
      const profiles = Object.keys(filters)
        .filter(key => filters[key].active)
        .map(key => {
          const column = columnMap[key]

          return {
            name: column.name,
            key: column.key,
            metaData: column.metaData!,
            active: filters[key].active
          }
        })

      emitEvent(
        props.onRowFilter,
        profiles,
        getters.filteredData.map(row => row.data)
      )
    }

    function emitRowSort() {
      const { columns, sorters } = state
      const columnMap = transformListToMap(columns, 'key')
      const profiles = Object.keys(sorters)
        .filter(key => sorters[key].type)
        .map(key => {
          const column = columnMap[key]

          return {
            name: column.name,
            key: column.key,
            metaData: column.metaData!,
            type: sorters[key].type
          }
        })

      emitEvent(
        props.onRowSort,
        profiles,
        getters.sortedData.map(row => row.data)
      )
    }

    let dragState: {
      draggingRow: RowState,
      tableRect: DOMRect,
      dropType?: DropType
    } | null

    function handleRowDragStart(rowInstance: RowInstance, event: DragEvent) {
      dragState = {
        draggingRow: rowInstance.row,
        tableRect: wrapper.value!.getBoundingClientRect()
      }

      setDragging(true)
      emitEvent(props.onRowDragStart, rowInstance.row.data, event)
    }

    function handleRowDragOver(rowInstance: RowInstance, event: DragEvent) {
      if (!dragState || !rowInstance.el) return

      const dropRowRect = rowInstance.el.getBoundingClientRect()
      const tableRect = dragState.tableRect
      const prevPercent = 0.5
      const distance = event.clientY - dropRowRect.top
      const dropRowHeight = dropRowRect.height

      let dropType: DropType = 'none'
      let indicatorTop = -9999

      if (distance < dropRowHeight * prevPercent) {
        dropType = 'before'
        indicatorTop = dropRowRect.top - tableRect.top
      } else {
        dropType = 'after'
        indicatorTop = dropRowRect.bottom - tableRect.top
      }

      indicator.value!.style.top = `${indicatorTop - 2}px`

      // dragState.willDropRow = rowInstance.row
      dragState.dropType = dropType

      indicatorShow.value = true
      emitEvent(props.onRowDragOver, rowInstance.row.data, event)
    }

    function handleRowDrop(rowInstance: RowInstance, event: DragEvent) {
      if (!dragState) return

      const { draggingRow, dropType } = dragState
      const willDropRow = rowInstance.row

      if (draggingRow.key === willDropRow.key) return

      const rowData = state.rowData

      let index = rowData.findIndex(row => row.key === willDropRow.key)

      if (~index) {
        const originIndex = rowData.findIndex(row => row.key === draggingRow.key)

        removeArrayItem(rowData, row => row.key === draggingRow.key)

        if (originIndex > index && dropType === 'after') {
          index += 1
        } else if (originIndex < index && dropType === 'before') {
          index -= 1
        }

        rowData.splice(index, 0, draggingRow)
        refreshRowIndex()
        emitEvent(props.onRowDrop, rowInstance.row.data, dropType!, event)
      }
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

    function emitCellEnter(payload: TableCellPayload) {
      emitEvent(props.onCellEnter, payload)
    }

    function emitCellLeave(payload: TableCellPayload) {
      emitEvent(props.onCellLeave, payload)
    }

    function emitCellClick(payload: TableCellPayload) {
      emitEvent(props.onCellClick, payload)
    }

    function emitCellDblclick(payload: TableCellPayload) {
      emitEvent(props.onCellDblclick, payload)
    }

    function emitCellContextmenu(payload: TableCellPayload) {
      emitEvent(props.onCellContextmenu, payload)
    }

    function emitHeadEnter(payload: TableHeadPayload) {
      emitEvent(props.onHeadEnter, payload)
    }

    function emitHeadLeave(payload: TableHeadPayload) {
      emitEvent(props.onHeadLeave, payload)
    }

    function emitHeadClick(payload: TableHeadPayload) {
      emitEvent(props.onHeadClick, payload)
    }

    function emitHeadDblclick(payload: TableHeadPayload) {
      emitEvent(props.onHeadDblclick, payload)
    }

    function emitHeadContextmenu(payload: TableHeadPayload) {
      emitEvent(props.onHeadContextmenu, payload)
    }

    function computeRenderRows() {
      const { totalHeight, bodyScroll, heightBITree } = state
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

      let viewStart = bodyScroll
      let viewEnd = bodyScroll + viewHeight

      if (viewEnd > totalHeight) {
        viewEnd = totalHeight
        viewStart = viewEnd - viewHeight
      }

      const start = heightBITree.boundIndex(viewStart)
      const end = heightBITree.boundIndex(viewEnd)
      const renderStart = Math.max(start - props.bufferCount, 0)
      const renderEnd = Math.min(end + props.bufferCount + 1, rowCount)

      setRenderRows(renderStart, renderEnd)
    }

    function refresh() {
      setTimeout(() => {
        computeTableWidth()
        computeBodyHeight()
        refreshPercentScroll()
        nextFrameOnce(computeRenderRows)
      }, 0)
    }

    function syncVerticalScroll() {
      if (mainScroll.value) {
        setBodyScroll(-mainScroll.value.currentScroll.y)
      }
    }

    const { timer } = useSetTimeout()

    function refreshPercentScroll() {
      clearTimeout(timer.scroll)

      timer.scroll = setTimeout(() => {
        const { totalHeight, bodyScroll } = state

        yScrollPercent.value = Math.max(
          Math.min((bodyScroll / (totalHeight - (bodyScrollHeight.value ?? 0) || 1)) * 100, 100),
          0
        )
        syncBarScroll()
        nextTick(computeBodyHeight)
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

    return {
      props,
      nh,
      bodyHeight,
      xScrollEnabled,
      xScrollPercent,
      yScrollPercent,
      headHeight,
      indicatorShow,
      leftFixedColumns: toRef(state, 'leftFixedColumns'),
      rightFixedColumns: toRef(state, 'rightFixedColumns'),
      bodyScroll: toRef(state, 'bodyScroll'),

      className,
      style,
      useXScroll,
      barLength,
      bodyScrollHeight,
      totalHeight: toRef(state, 'totalHeight'),

      store,

      wrapper,
      thead,
      mainScroll,
      indicator,
      scrollbar,

      handleBodyScroll,
      handleXScroll,
      handleYScrollEnableChange,
      handleYBarScroll,
      syncVerticalScroll,

      clearSort,
      clearFilter,
      clearSelected: clearCheckAll,
      refresh,
      getSelected
    }
  }
})
</script>
