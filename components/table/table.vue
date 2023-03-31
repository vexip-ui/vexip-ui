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
      ref="xScroll"
      inherit
      use-x-bar
      mode="horizontal"
      :class="[nh.be('wrapper'), props.scrollClass.horizontal]"
      :bar-class="nh.bem('bar', 'horizontal')"
      :bar-fade="props.barFade"
      :delta-x="50"
      @scroll="handleXScroll"
      @x-enabled-change="xScrollEnabled = $event"
    >
      <TableHead ref="thead"></TableHead>
      <Scroll
        ref="mainScroll"
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
    <div
      v-if="leftFixedColumns.length"
      :class="{
        [nh.bem('fixed', 'left')]: true,
        [nh.bem('fixed', 'active')]: xScrollEnabled && xScrollPercent > 0
      }"
    >
      <TableHead fixed="left"></TableHead>
      <Scroll
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
      v-if="usingDrag"
      v-show="indicatorShow"
      ref="indicator"
      :class="[
        nh.be('indicator'),
        indicatorType === 'before' && nh.bem('indicator', 'before'),
        indicatorType === 'after' && nh.bem('indicator', 'after')
      ]"
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
  nextFrameOnce,
  warnOnce
} from '@vexip-ui/utils'
import { useSetTimeout } from '@vexip-ui/hooks'
import { tableProps } from './props'
import { useStore } from './store'
import { DropType, TABLE_STORE, TABLE_ACTIONS } from './symbol'

import type {
  Key,
  TableKeyConfig,
  TableColumnOptions,
  TableRowState,
  TableRowInstance,
  TableRowPayload,
  TableCellPayload,
  TableHeadPayload
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
      dataKey: null,
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
      headAttrs: null,
      customSorter: false,
      customFilter: false,
      keyConfig: () => ({}),
      disabledTree: false,
      rowIndent: '16px',
      noCascaded: false
    })

    const nh = useNameHelper('table')
    const bodyHeight = ref<number | undefined>(props.height)
    const xScrollEnabled = ref(false)
    const xScrollPercent = ref(0)
    const yScrollPercent = ref(0)
    const headHeight = ref(0)
    const indicatorShow = ref(false)
    const indicatorType = ref(DropType.BEFORE)
    const templateColumns = ref(new Set<TableColumnOptions>())
    const tableWidth = ref<number | string | null>(null)
    const yScrollEnable = ref(false)

    const wrapper = ref<HTMLElement>()
    const xScroll = ref<InstanceType<typeof Scroll>>()
    const thead = ref<InstanceType<typeof TableHead>>()
    const mainScroll = ref<InstanceType<typeof Scroll>>()
    const indicator = ref<HTMLElement>()
    const scrollbar = ref<InstanceType<typeof Scrollbar>>()

    const userLocale = computed(() => {
      if (isDefined(props.emptyText)) {
        warnOnce(
          "[vexip-ui:Table] 'empty-text' prop has been deprecated, plesae " +
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
          "[vexip-ui:Table] 'data-key' prop has been deprecated, plesae " +
            "using 'id' option of 'key-config' prop to instead it"
        )

        return props.keyConfig.id ?? props.dataKey
      }

      return keyConfig.value.id
    })

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
      dataKey: dataKey.value,
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
      expandRenderer: props.expandRenderer
    })

    provide(TABLE_STORE, store)
    provide(TABLE_ACTIONS, {
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
      const style = {
        [nh.cv('row-indent-width')]:
          typeof props.rowIndent === 'number' ? `${props.rowIndent}px` : props.rowIndent
      }
      const width = tableWidth.value ?? props.width

      if (width !== null) {
        if (typeof width === 'string' && parseFloat(width).toString() !== width) {
          style.width = width
        } else {
          Object.assign(style, {
            width: `${width}px`,
            minWidth: `${width}px`
          })
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
    const usingDrag = computed(() => props.rowDraggable || getters.hasDragColumn)

    const {
      setColumns,
      setDataKey,
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
      setCustomSorter,
      setCustomFilter,
      setKeyConfig,
      setDisabledTree,
      setNoCascaded,
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
      },
      { immediate: true, deep: true }
    )
    watch(dataKey, setDataKey)
    watch(
      () => props.data,
      value => {
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
    watch(locale, setLocale, { deep: true })
    watch(() => props.tooltipTheme, setTooltipTheme)
    watch(() => props.tooltipWidth, setTooltipWidth)
    watch(() => props.singleSorter, setSingleSorter)
    watch(() => props.singleFilter, setSingleFilter)
    watch(() => props.customSorter, setCustomSorter)
    watch(() => props.customFilter, setCustomFilter)
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
    watch(() => props.noCascaded, setNoCascaded)

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
        } else {
          tableWidth.value = `${toNumber(width)}px`
        }
      }

      nextTick(() => {
        xScroll.value?.$el && setTableWidth(xScroll.value?.$el.offsetWidth)
      })
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

      if (!willDropRow || isLeftInsideRight(willDropRow, draggingRow)) return

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
      indicatorType,
      leftFixedColumns: toRef(state, 'leftFixedColumns'),
      rightFixedColumns: toRef(state, 'rightFixedColumns'),
      bodyScroll: toRef(state, 'bodyScroll'),

      className,
      style,
      useXScroll,
      barLength,
      bodyScrollHeight,
      totalHeight: toRef(state, 'totalHeight'),
      usingDrag,

      store,

      wrapper,
      xScroll,
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
