<script setup lang="ts">
import { NativeScroll } from '@/components/native-scroll'
import { Scrollbar } from '@/components/scrollbar'

import {
  computed,
  nextTick,
  onBeforeUnmount,
  onMounted,
  provide,
  reactive,
  ref,
  renderSlot,
  toRef,
  watch
} from 'vue'

import TableColumn from './table-column'
import TableColumnGroup from './table-column-group'
import TableSummary from './table-summary'
import TableHead from './table-head.vue'
import TableBody from './table-body.vue'
import TableFoot from './table-foot.vue'
import { emitEvent, useLocale, useNameHelper, useProps } from '@vexip-ui/config'
import {
  debounce,
  debounceMinor,
  getLast,
  isDefined,
  isValidNumber,
  listToMap,
  nextFrameOnce,
  noop,
  removeArrayItem,
  toNumber
} from '@vexip-ui/utils'
import { useSetTimeout } from '@vexip-ui/hooks'
import { tableProps } from './props'
import { useStore } from './store'
import { DropType, TABLE_ACTIONS, TABLE_SLOTS, TABLE_STORE } from './symbol'

import type { Slots } from 'vue'
import type { StyleType } from '@vexip-ui/config'
import type { NativeScrollExposed, NativeScrollPayload } from '@/components/native-scroll'
import type { ScrollbarExposed } from '@/components/scrollbar'
import type {
  Key,
  MouseEventType,
  MoveEventType,
  StoreOptions,
  TableCellPayload,
  TableColResizePayload,
  TableColumnGroupOptions,
  TableColumnOptions,
  TableFootPayload,
  TableHeadPayload,
  TableKeyConfig,
  TableRowInstance,
  TableRowPayload,
  TableRowState,
  TableSlots,
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

defineOptions({ name: 'Table' })

const _props = defineProps(tableProps)
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
  width: null,
  height: null,
  minHeight: null,
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
  rowHeight: {
    default: null,
    validator: value => value > 0
  },
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
  icons: () => ({}),
  borderWidth: 1,
  dataFilter: {
    default: null,
    isFunc: true
  },
  noTransition: false,
  ellipsis: false,
  slots: () => ({})
})

// only for dnd end payload
const emit = defineEmits(['update:data'])

const slots = defineSlots<TableSlots>()

const nh = useNameHelper('table')
const { timer } = useSetTimeout()

const bodyHeight = ref<number | undefined>(props.height)
const bodyMinHeight = ref(props.height || 0)
const xScrollEnabled = ref(false)
const yScrollEnabled = ref(false)
const xScrollPercent = ref(0)
const yScrollPercent = ref(0)
const headHeight = ref(0)
const footHeight = ref(0)
const indicatorShow = ref(false)
const indicatorType = ref(DropType.BEFORE)
const tempColumns = reactive(new Set<TableColumnGroupOptions | TableColumnOptions>())
const tempSummaries = reactive(new Set<TableSummaryOptions>())
const tableWidth = ref<number | string>()
const hasDragColumn = ref(false)
const bodyWidth = ref(0)

const wrapper = ref<HTMLElement>()
const mainScroll = ref<NativeScrollExposed>()
const xHeadScroll = ref<NativeScrollExposed>()
const xAboveScroll = ref<NativeScrollExposed>()
const xBelowScroll = ref<NativeScrollExposed>()
const thead = ref<HTMLElement>()
const aboveTfoot = ref<HTMLElement>()
const belowTfoot = ref<HTMLElement>()
const indicator = ref<HTMLElement>()
const xScrollbar = ref<ScrollbarExposed>()
const yScrollbar = ref<ScrollbarExposed>()

let isMounted = false

const locale = useLocale('table', toRef(props, 'locale'))
const keyConfig = computed(() => ({ ...defaultKeyConfig, ...props.keyConfig }))
const allColumns = computed(() => Array.from(tempColumns))
const allSummaries = computed(() => Array.from(tempSummaries))

const syncToStoreProps = [
  'rowClass',
  'rowStyle',
  'rowAttrs',
  'cellClass',
  'cellStyle',
  'cellAttrs',
  'headClass',
  'headStyle',
  'headAttrs',
  'footClass',
  'footStyle',
  'footAttrs',
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
  'sidePadding',
  'borderWidth',
  'dataFilter',
  'ellipsis'
] as const

const store = useStore({
  ...(syncToStoreProps.reduce(
    (prev, current) => ((prev[current] = props[current]), prev),
    {} as any
  ) as StoreOptions),
  columns: allColumns.value,
  summaries: allSummaries.value,
  data: props.data,
  dataKey: keyConfig.value.id,
  virtual: props.virtual,
  locale: locale.value,
  keyConfig: keyConfig.value,
  disabledTree: props.disabledTree,
  colResizable: props.colResizable === true ? 'lazy' : props.colResizable,
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
  emitRowTreeExpand,
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
  renderTableSlot,
  runInLocked,
  updateColumns: () => debounceMinor(updateColumns),
  setColumnProp,
  updateSummaries: () => debounceMinor(updateSummaries),
  setSummaryProp
})
provide(TABLE_SLOTS, slots as Slots)

const { state, getters, mutations } = store

const mergedLocked = computed(() => props.noTransition || state.locked || state.barScrolling)
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
    [nh.bm('locked')]: mergedLocked.value,
    [nh.bm('above-foot')]: state.aboveSummaries.length,
    [nh.bm('below-foot')]: state.belowSummaries.length,
    [nh.bm('using-bar')]: state.barScrolling
  }
})
const style = computed(() => {
  const width = tableWidth.value ?? props.width
  const [padLeft, padRight] = state.sidePadding

  const style: StyleType = {
    [nh.cv('row-indent-width')]:
      typeof props.rowIndent === 'number' ? `${props.rowIndent}px` : props.rowIndent,
    [nh.cv('b-width')]: `${props.borderWidth}px`,
    [nh.cv('expanded-width')]: `${bodyWidth.value}px`
  }

  if (padLeft) {
    style[nh.cv('side-pad-left')] = `${padLeft}px`
  }

  if (padRight) {
    style[nh.cv('side-pad-right')] = `${padRight}px`
  }

  if (isDefined(width)) {
    if (typeof width === 'number' || isValidNumber(width, true)) {
      style.width = `${width}px`
      style.minWidth = `${width}px`
    } else {
      style.width = width
    }
  }

  return style
})
const useXScroll = computed(() => {
  return !!(
    isDefined(props.width) ||
    state.leftFixedColumns.length ||
    state.rightFixedColumns.length
  )
})
const bodyScrollHeight = computed(() => {
  const { totalHeight } = state

  return bodyHeight.value ? Math.min(bodyHeight.value, totalHeight) : undefined
})
const xBarLength = computed(() => mainScroll.value?.xBarLength || 35)
const yBarLength = computed(() => {
  const { totalHeight } = state

  if (bodyScrollHeight.value && totalHeight) {
    return Math.max(Math.min((bodyScrollHeight.value / totalHeight) * 100, 99), 5) || 35
  }

  return 35
})
const totalWidths = computed(() => {
  return (
    (getLast(getters.totalWidths) || 0) + (state.sidePadding[0] || 0) + (state.sidePadding[1] || 0)
  )
})
const leftFixedActive = computed(() => xScrollEnabled.value && xScrollPercent.value > 0)
const rightFixedActive = computed(() => xScrollEnabled.value && xScrollPercent.value < 100)

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
  setLocked,
  setBarScrolling,
  clearSort,
  clearFilter,
  refreshRowIndex,
  clearCheckAll,
  getParentRow,
  getCurrentData,
  flatTreeRows,
  refreshRowDepth,
  queryRow,
  handleCheck,
  setTreeExpanded
} = mutations

watch(allColumns, updateColumns)
watch(allSummaries, updateSummaries)
watch(() => keyConfig.value.id, setDataKey)
watch(() => props.data, forceRefreshData, { deep: true })
watch(() => props.width, computeTableWidth)
watch([() => props.height, () => props.borderWidth], () => {
  nextTick(computeBodyHeight)
})
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
watch([() => props.rowHeight, () => props.rowMinHeight], () => {
  refresh()
})

for (const prop of syncToStoreProps) {
  const watchCallback =
    mutations[
      `set${prop.charAt(0).toLocaleUpperCase()}${prop.slice(1)}` as `set${Capitalize<typeof prop>}`
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
  nextTick(() => {
    hasDragColumn.value = getters.hasDragColumn
  })

  if (mainScroll.value) {
    xScrollEnabled.value = mainScroll.value.enableXScroll
    yScrollEnabled.value = mainScroll.value.enableYScroll
  }
})

onBeforeUnmount(() => {
  isMounted = false

  window.removeEventListener('resize', handlerResize)
})

defineExpose({
  bodyHeight,
  xScrollEnabled,
  yScrollEnabled,
  xScrollPercent,
  yScrollPercent,
  headHeight,
  footHeight,
  indicatorShow,
  bodyScrollHeight,
  totalWidths,
  totalHeight: computed(() => state.totalHeight),
  locked: mergedLocked,

  store,

  wrapper,
  mainScroll,
  xHeadScroll,
  xAboveScroll,
  xBelowScroll,
  thead,
  aboveTfoot,
  belowTfoot,
  indicator,
  xScrollbar,
  yScrollbar,

  clearSort,
  clearFilter,
  clearSelected: clearCheckAll,
  refresh,
  refreshData: forceRefreshData,
  getSelected,
  getData: getCurrentData,
  selectRow: setRowChecked,
  treeExpandRow: setRowTreeExpanded
})

function forceRefreshData(data = props.data) {
  return runInLocked(() => {
    setData(data)
    nextTick(() => computeRenderRows(true))
    refreshPercentScroll()
  })
}

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
    mainScroll.value?.content && setTableWidth(mainScroll.value.content.offsetWidth)
    refreshXScroll()
  })
}

function computeBodyHeight() {
  const height = props.height
  const minHeight = props.minHeight
  const borderWidth = props.borderWidth

  let fixedHeight = 0

  if (thead.value || aboveTfoot.value || belowTfoot.value) {
    if (thead.value) {
      fixedHeight = thead.value.offsetHeight
    }

    if (aboveTfoot.value) {
      fixedHeight += aboveTfoot.value.offsetHeight
    }

    if (belowTfoot.value) {
      fixedHeight = belowTfoot.value.offsetHeight
    }
  } else {
    // one row as head placeholder
    fixedHeight = props.rowHeight || props.rowMinHeight
  }

  fixedHeight += 2 * borderWidth

  if (isDefined(height)) {
    bodyHeight.value = height - fixedHeight
  } else {
    bodyHeight.value = undefined
  }

  if (isDefined(minHeight)) {
    bodyMinHeight.value = Math.min(minHeight, height ?? Infinity) - fixedHeight
  } else {
    bodyMinHeight.value = 0
  }
}

function handleMainScroll(payload: NativeScrollPayload) {
  if (state.barScrolling) return

  if (payload.type !== 'vertical') {
    handleXScroll(payload)
  }

  if (payload.type !== 'horizontal') {
    handleYScroll(payload)
  }
}

function handleXScroll({ clientX, percentX }: { clientX: number, percentX: number }) {
  if (state.barScrolling) return

  xScrollPercent.value = percentX
  setBodyXScroll(clientX)
  syncBarScroll()
  emitEvent(props.onScroll, {
    type: 'horizontal',
    client: clientX,
    percent: percentX
  })
}

function handleYScroll({ clientY, percentY }: { clientY: number, percentY: number }) {
  if (state.barScrolling) return

  yScrollPercent.value = percentY
  setBodyYScroll(clientY)
  syncBarScroll()
  emitYScroll(clientY, percentY)
}

function handleXBarScroll(percent: number) {
  if (!mainScroll.value) return

  const client = (mainScroll.value.xScrollLimit * percent) / 100

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
  runInLocked()
  nextFrameOnce(computeRenderRows)
  emitEvent(props.onScroll, { type: 'vertical', client, percent })
}

function handleResize() {
  if (mainScroll.value?.content) {
    bodyWidth.value = mainScroll.value.content.offsetWidth
  }

  isMounted && refresh()
}

function increaseColumn(column: TableColumnOptions) {
  tempColumns.add(column)
}

function decreaseColumn(column: TableColumnOptions) {
  tempColumns.delete(column)
}

function increaseSummary(summary: TableSummaryOptions) {
  tempSummaries.add(summary)
}

function decreaseSummary(summary: TableSummaryOptions) {
  tempSummaries.delete(summary)
}

function updateColumns() {
  runInLocked(() => {
    setColumns(allColumns.value)
    isMounted && computeTableWidth()
    nextTick(() => {
      hasDragColumn.value = getters.hasDragColumn
    })
  })
}

function setColumnProp(key: Key, prop: string, value: any) {
  mutations.setColumnProp(key, prop, value)
}

function updateSummaries() {
  runInLocked(() => {
    setSummaries(allSummaries.value)
  })
}

function setSummaryProp(key: Key, prop: string, value: any) {
  mutations.setSummaryProp(key, prop, value)
}

function getTableElement() {
  return wrapper.value
}

function refreshXScroll() {
  mainScroll.value?.refresh()
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

function emitRowTreeExpand(payload: TableRowPayload & { expanded: boolean }) {
  emitEvent(props.onRowTreeExpand, payload)
}

function emitRowFilter() {
  const { columns, filters } = state
  const columnMap = listToMap(columns, 'key')
  const profiles = Array.from(filters.keys())
    .filter(key => filters.get(key)!.active)
    .map(key => {
      const column = columnMap[key as string]

      return {
        name: column.name,
        key: column.key,
        meta: column.meta!,
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
  const columnMap = listToMap(columns, 'key')
  const profiles = Array.from(sorters.keys())
    .filter(key => sorters.get(key)!.type)
    .map(key => {
      const column = columnMap[key as string]
      const sorter = sorters.get(key)!

      return {
        name: column.name,
        key: column.key,
        meta: column.meta!,
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
  dropType: DropType,
  dropped: boolean
} | null

function handleRowDragStart(rowInstance: TableRowInstance, event: DragEvent) {
  dragState = {
    draggingRow: rowInstance.row,
    tableRect: wrapper.value!.getBoundingClientRect(),
    willDropRow: null,
    dropType: DropType.BEFORE,
    dropped: false
  }

  setDragging(true)
  emitEvent(props.onRowDragStart, rowInstance.row.data, event)
}

function handleRowDragOver(rowInstance: TableRowInstance, event: DragEvent) {
  if (!dragState || !rowInstance.el) return

  const dropRowRect = rowInstance.el.getBoundingClientRect()
  const tableRect = dragState.tableRect
  const prevPercent = state.disabledTree ? 0.5 : 0.25
  const nextPercent = state.disabledTree ? 0.5 : 0.75
  const distance = event.clientY - dropRowRect.top
  const dropRowHeight = dropRowRect.height

  let dropType: DropType
  let indicatorTop = -9999
  let isIndicatorShow = true

  if (distance < dropRowHeight * prevPercent) {
    dropType = DropType.BEFORE
    indicatorTop = dropRowRect.top - tableRect.top
  } else if (distance >= dropRowHeight * nextPercent) {
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

  if (!willDropRow || isLeftInsideRight(willDropRow, draggingRow)) return

  let currentKey: Key
  let parent: TableRowState | null

  if (draggingRow) {
    parent = getParentRow(draggingRow.key)

    if (!parent) {
      parent = {
        children: state.treeRowData
      } as TableRowState
    }

    currentKey = draggingRow.key
    removeArrayItem(parent.children, item => item.key === currentKey)

    if (!parent.children?.length) {
      parent.treeExpanded = false
    }
  }

  if (dropType === DropType.INNER) {
    if (!Array.isArray(willDropRow.children)) {
      willDropRow.children = []
    }

    const children = Array.from(willDropRow.children)

    children.push(draggingRow)

    willDropRow.children = children
    willDropRow.treeExpanded = true
    draggingRow.parent = willDropRow.key
  } else {
    currentKey = willDropRow.key
    parent = getParentRow(willDropRow.key)

    if (!parent) {
      parent = {
        children: state.treeRowData
      } as TableRowState
    }

    const index = parent.children.findIndex(row => row.key === currentKey)

    if (~index) {
      parent.children.splice(+(dropType === DropType.AFTER) + index, 0, draggingRow)

      draggingRow.parent = parent.key
    }
  }

  dragState.dropped = true

  refreshRowDepth()
  flatTreeRows()
  refreshRowIndex()
  emitEvent(props.onRowDrop, rowInstance.row.data, dropType!, event)
}

function handleRowDragEnd(event: DragEvent) {
  if (!dragState) return

  const { draggingRow, dropped } = dragState

  dragState = null
  indicatorShow.value = false

  nextTick(() => {
    const allDataPayload = dropped ? getCurrentData() : state.data

    setDragging(false)
    dropped && emit('update:data', allDataPayload)
    emitEvent(props.onRowDragEnd, draggingRow.data, allDataPayload, event)
  })
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
    setRenderRows(0, rowCount, force)

    return
  }

  const viewHeight = Math.max(
    Math.min(bodyHeight.value || 0, bodyScrollHeight.value || 0),
    bodyMinHeight.value
  )

  if (!viewHeight) {
    setRenderRows(0, 0, force)
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
  return runInLocked(() => {
    nextTick(computeTableWidth)
    setTimeout(() => {
      computeBodyHeight()
      refreshPercentScroll()
      nextFrameOnce(computeRenderRows)
    }, 0)
  })
}

async function runInLocked(handler = noop, delay = 250) {
  clearTimeout(timer.locked)

  setLocked(true)
  await handler()

  return new Promise<void>(resolve => {
    timer.locked = setTimeout(() => {
      setLocked(false)
      resolve()
    }, delay)
  })
}

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
    runInLocked()
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

function setRowChecked(keyOrData: Key | Record<any, any>, checked?: boolean) {
  const row = queryRow(keyOrData)

  if (!row || getters.disableCheckRows.has(row.key)) return

  handleCheck(row.key, checked ?? !row.checked)
}

function setRowTreeExpanded(keyOrData: Key | Record<any, any>, expanded?: boolean) {
  const row = queryRow(keyOrData)

  if (!row) return

  runInLocked()
  setTreeExpanded(row.key, expanded ?? !row.treeExpanded)
}

function renderTableSlot({ name }: { name: string }) {
  return renderSlot(slots as Slots, name)
}
</script>

<template>
  <div
    ref="wrapper"
    :class="className"
    role="table"
    :style="style"
    :aria-rowcount="props.data.length"
  >
    <div v-show="false" role="none" aria-hidden>
      <slot></slot>
      <template
        v-for="(column, index) in props.columns"
        :key="(column as TableColumnOptions).key ?? `__inner-column-${index}`"
      >
        <TableColumnGroup v-if="'children' in column" v-bind="column"></TableColumnGroup>
        <TableColumn v-else v-bind="column" :id-key="column.key"></TableColumn>
      </template>
      <TableSummary
        v-for="({ key, ...others }, index) in props.summaries"
        v-bind="others"
        :key="`__inner-summary-${index}`"
        :id-key="key"
      ></TableSummary>
    </div>
    <div ref="thead" :class="nh.be('head-wrapper')">
      <NativeScroll
        ref="xHeadScroll"
        inherit
        mode="horizontal"
        scroll-only
        :class="[nh.be('wrapper'), props.scrollClass.horizontal]"
        :scroll-x="state.bodyXScroll"
        @scroll="handleXScroll"
      >
        <div
          v-if="state.leftFixedColumns.length"
          :class="{
            [nh.bem('fixed', 'left')]: true,
            [nh.bem('fixed', 'active')]: leftFixedActive
          }"
        >
          <TableHead fixed="left"></TableHead>
        </div>
        <TableHead></TableHead>
        <div
          v-if="state.rightFixedColumns.length"
          :class="{
            [nh.bem('fixed', 'right')]: true,
            [nh.bem('fixed', 'active')]: rightFixedActive
          }"
        >
          <TableHead fixed="right"></TableHead>
        </div>
      </NativeScroll>
    </div>
    <div
      v-if="state.aboveSummaries.length"
      ref="aboveTfoot"
      :class="[nh.be('foot-wrapper'), nh.bem('foot-wrapper', 'above')]"
    >
      <NativeScroll
        ref="xAboveScroll"
        inherit
        mode="horizontal"
        scroll-only
        :class="[nh.be('wrapper'), props.scrollClass.horizontal]"
        :scroll-x="state.bodyXScroll"
        @scroll="handleXScroll"
      >
        <div
          v-if="state.leftFixedColumns.length"
          :class="{
            [nh.bem('fixed', 'left')]: true,
            [nh.bem('fixed', 'active')]: leftFixedActive
          }"
        >
          <TableFoot fixed="left" above></TableFoot>
        </div>
        <TableFoot above></TableFoot>
        <div
          v-if="state.rightFixedColumns.length"
          :class="{
            [nh.bem('fixed', 'right')]: true,
            [nh.bem('fixed', 'active')]: rightFixedActive
          }"
        >
          <TableFoot fixed="right" above></TableFoot>
        </div>
      </NativeScroll>
    </div>
    <div
      :class="[
        nh.be('body-wrapper'),
        state.totalHeight >= bodyMinHeight && nh.bem('body-wrapper', 'scrolled')
      ]"
      :style="{
        ...(!bodyScrollHeight && state.totalHeight
          ? {
            height: `${state.totalHeight}px`,
            transition:
              props.noTransition || state.locked
                ? undefined
                : `height ${nh.gnv('transition-base')}`
          }
          : undefined),
        minHeight: `${bodyMinHeight}px`
      }"
    >
      <NativeScroll
        ref="mainScroll"
        inherit
        mode="both"
        scroll-only
        observe-deep
        :class="[nh.be('wrapper'), props.scrollClass.major]"
        :bar-class="nh.bem('bar', 'horizontal')"
        :height="bodyScrollHeight"
        :scroll-x="state.bodyXScroll"
        :scroll-y="state.bodyYScroll"
        @scroll="handleMainScroll"
        @x-enabled-change="xScrollEnabled = $event"
        @y-enabled-change="yScrollEnabled = $event"
        @resize="handleResize"
      >
        <div
          v-if="state.leftFixedColumns.length"
          :class="{
            [nh.bem('fixed', 'left')]: true,
            [nh.bem('fixed', 'active')]: leftFixedActive
          }"
          :style="{ minHeight: `${state.totalHeight}px` }"
        >
          <TableBody fixed="left">
            <template v-if="slots.empty || props.slots.empty" #empty="{ isFixed }">
              <slot name="empty" :is-fixed="isFixed">
                <Renderer :renderer="props.slots.empty" :data="{ isFixed }"></Renderer>
              </slot>
            </template>
          </TableBody>
        </div>
        <TableBody>
          <template v-if="slots.empty || props.slots.empty" #empty="{ isFixed }">
            <slot name="empty" :is-fixed="isFixed">
              <Renderer :renderer="props.slots.empty" :data="{ isFixed }"></Renderer>
            </slot>
          </template>
        </TableBody>
        <div
          v-if="state.rightFixedColumns.length"
          :class="{
            [nh.bem('fixed', 'right')]: true,
            [nh.bem('fixed', 'active')]: rightFixedActive
          }"
          :style="{ minHeight: `${state.totalHeight}px` }"
        >
          <TableBody fixed="right">
            <template v-if="slots.empty || props.slots.empty" #empty="{ isFixed }">
              <slot name="empty" :is-fixed="isFixed">
                <Renderer :renderer="props.slots.empty" :data="{ isFixed }"></Renderer>
              </slot>
            </template>
          </TableBody>
        </div>
      </NativeScroll>
    </div>
    <div
      v-if="state.belowSummaries.length"
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
        :scroll-x="state.bodyXScroll"
        @scroll="handleXScroll"
      >
        <div
          v-if="state.leftFixedColumns.length"
          :class="{
            [nh.bem('fixed', 'left')]: true,
            [nh.bem('fixed', 'active')]: leftFixedActive
          }"
        >
          <TableFoot fixed="left"></TableFoot>
        </div>
        <TableFoot></TableFoot>
        <div
          v-if="state.rightFixedColumns.length"
          :class="{
            [nh.bem('fixed', 'right')]: true,
            [nh.bem('fixed', 'active')]: rightFixedActive
          }"
        >
          <TableFoot fixed="right"></TableFoot>
        </div>
      </NativeScroll>
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
      @scroll-start="setBarScrolling(true)"
      @scroll="handleXBarScroll"
      @scroll-end="setBarScrolling(false)"
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
      @scroll-start="setBarScrolling(true)"
      @scroll="handleYBarScroll"
      @scroll-end="setBarScrolling(false)"
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
      v-if="state.colResizable === 'lazy'"
      v-show="state.colResizing"
      :class="nh.be('resize-indicator')"
      :style="{ left: `${state.resizeLeft}px` }"
    ></div>
  </div>
</template>
