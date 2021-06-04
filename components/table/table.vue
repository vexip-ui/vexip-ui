<template>
  <div ref="wrapper" :class="className" :style="style">
    <div v-show="false">
      <slot></slot>
    </div>
    <Scroll
      v-if="useXScroll"
      use-x-bar
      mode="horizontal"
      :class="[`${prefix}__scroll`, scrollClass.horizontal]"
      :bar-class="`${prefix}__bar--horizontal`"
      :width="width"
      :bar-fade="barFade"
      @on-scroll="handleXScroll"
    >
      <TableHead ref="thead"></TableHead>
      <Scroll
        :class="[`${prefix}__scroll`, scrollClass.major]"
        :height="bodyScrollHeight"
        :scroll-y="bodyScroll"
        @on-scroll="handleBodyScroll"
        @on-y-enable-change="handleYScrollEnableChange"
      >
        <TableBody></TableBody>
      </Scroll>
    </Scroll>
    <template v-else>
      <TableHead ref="thead"></TableHead>
      <Scroll
        :class="[`${prefix}__scroll`, scrollClass.major]"
        :height="bodyScrollHeight"
        :scroll-y="bodyScroll"
        :delta-y="scrollDeltaY"
        @on-scroll="handleBodyScroll"
        @on-y-enable-change="handleYScrollEnableChange"
      >
        <TableBody></TableBody>
      </Scroll>
    </template>
    <div
      v-if="leftFixedColumns.length"
      :class="{
        [`${prefix}__fixed--left`]: true,
        [`${prefix}__fixed--active`]: xScrollPercent
      }"
    >
      <TableHead fixed="left"></TableHead>
      <Scroll
        :class="[`${prefix}__scroll`, scrollClass.left]"
        :height="bodyScrollHeight"
        :scroll-y="bodyScroll"
        :delta-y="scrollDeltaY"
        @on-scroll="handleBodyScroll"
      >
        <TableBody fixed="left"></TableBody>
      </Scroll>
    </div>
    <div
      v-if="rightFixedColumns.length"
      :class="{
        [`${prefix}__fixed--right`]: true,
        [`${prefix}__fixed--active`]: xScrollPercent !== 100
      }"
    >
      <TableHead fixed="right"></TableHead>
      <Scroll
        :class="[`${prefix}__scroll`, scrollClass.right]"
        :height="bodyScrollHeight"
        :scroll-y="bodyScroll"
        :delta-y="scrollDeltaY"
        @on-scroll="handleBodyScroll"
      >
        <TableBody fixed="right"></TableBody>
      </Scroll>
    </div>
    <Scrollbar
      v-if="useYBar && bodyScrollHeight"
      placement="right"
      :class="`${prefix}__bar--vertical`"
      :scroll="yScrollPercent"
      :fade="barFade"
      :disabled="!!bodyHeight && totalRowHeight <= bodyHeight"
      :bar-length="barLength"
      :style="{ top: `${headHeight}px` }"
      @on-scroll="handleYBarScroll"
    ></Scrollbar>
    <div
      v-if="rowDraggable"
      v-show="indicatorShow"
      ref="indicator"
      :class="`${prefix}__indicator`"
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
import { Scroll } from '@/components/scroll'
import { Scrollbar } from '@/components/scrollbar'
import TableHead from './table-head.vue'
import TableBody from './table-body.vue'

import { useConfiguredProps } from '@/common/config/install'
import { isDefined } from '@/common/utils/common'
import { debounce } from '@/common/utils/performance'
import { removeArrayItem } from '@/common/utils/transform'
import { toNumber } from '@/common/utils/number'
import { useStore } from './store'
import { DEFAULT_KEY_FIELD, TABLE_STORE, TABLE_ACTION } from './symbol'

import type { PropType } from 'vue'
import type {
  Key,
  Data,
  ClassType,
  RenderFn,
  ColumnOptions,
  RowClassFn,
  RowState,
  RowInstance
} from './symbol'

type DropType = 'before' | 'after'

const props = useConfiguredProps('table', {
  // TODO: colums 正确的类型推导
  columns: {
    type: Array as PropType<any[]>,
    default: () => []
  },
  data: {
    type: Array as PropType<Data[]>,
    default: () => []
  },
  dataKey: {
    type: String,
    default: DEFAULT_KEY_FIELD
  },
  width: {
    type: [Number, String],
    default: null
  },
  height: {
    type: Number,
    default: null
  },
  rowClass: {
    type: [String, Object, Function] as PropType<ClassType | RowClassFn>,
    default: null
  },
  stripe: {
    type: Boolean,
    default: false
  },
  border: {
    type: Boolean,
    default: false
  },
  highlight: {
    type: Boolean,
    default: false
  },
  useYBar: {
    type: Boolean,
    default: false
  },
  barFade: {
    type: Number,
    default: 1500
  },
  scrollDeltaY: {
    type: Number,
    default: 20
  },
  rowDraggable: {
    type: Boolean,
    default: false
  },
  rowHeight: {
    type: Number,
    default: null
  },
  renderCount: {
    type: Number,
    default: null
  },
  scrollClass: {
    type: Object as PropType<{
      horizontal: ClassType,
      major: ClassType,
      left: ClassType,
      right: ClassType
    }>,
    default: () => ({})
  },
  expandRenderer: {
    type: Function as PropType<RenderFn>,
    default: null
  },
  currentPage: {
    type: Number,
    default: 1,
    validator: (value: number) => {
      return value > 0
    }
  },
  pageSize: {
    type: Number,
    default: 0
  },
  transparent: {
    type: Boolean,
    default: false
  }
})

export default defineComponent({
  name: 'Table',
  components: {
    Scroll,
    Scrollbar,
    TableHead,
    TableBody
  },
  props,
  emits: [
    'on-body-scroll',
    'on-row-click',
    'on-row-check',
    'on-row-check-all',
    'on-row-expand',
    'on-row-drag-start',
    'on-row-drag-over',
    'on-row-drop',
    'on-row-drag-end',
    'on-row-filter'
  ],
  setup(props, { emit }) {
    const prefix = 'vxp-table'
    const bodyHeight = ref<number | undefined>(props.height)
    const xScrollPercent = ref(0)
    const yScrollPercent = ref(0)
    const headHeight = ref(0)
    const indicatorShow = ref(false)
    const templateColumns = ref(new Set<ColumnOptions>())
    const tableWidth = ref<number | string | null>(null)
    const yScrollEnable = ref(false)

    const wrapper = ref<HTMLElement | null>(null)
    const thead = ref<InstanceType<typeof TableHead> | null>(null)
    const indicator = ref<HTMLElement | null>(null)

    const store = useStore({
      columns: props.columns as ColumnOptions[],
      data: props.data,
      rowClass: props.rowClass,
      dataKey: props.dataKey,
      highlight: props.highlight,
      renderCount: props.renderCount,
      currentPage: props.currentPage,
      pageSize: props.pageSize,
      rowHeight: props.rowHeight,
      rowDraggable: props.rowDraggable
    })

    provide(TABLE_STORE, store)
    provide(TABLE_ACTION, {
      increaseColumn,
      decreaseColumn,
      emitRowClick,
      emitRowCheck,
      emitAllRowCheck,
      emitRowExpand,
      emitRowFilter,
      handleRowDragStart,
      handleRowDragOver,
      handleRowDrop,
      handleRowDragEnd
    })

    const { state, getters, mutations } = store

    const className = computed(() => {
      return {
        [prefix]: true,
        [`${prefix}--stripe`]: props.stripe,
        [`${prefix}--border`]: props.border,
        [`${prefix}--highlight`]: props.highlight,
        [`${prefix}--use-y-bar`]: props.useYBar,
        [`${prefix}--transparent`]: props.transparent
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
      const { totalRowHeight } = getters

      if (Number.isNaN(totalRowHeight)) {
        return bodyHeight.value
      }

      return bodyHeight.value ? Math.min(bodyHeight.value, totalRowHeight) : bodyHeight.value
    })
    const barLength = computed(() => {
      const { totalRowHeight } = getters

      if (bodyScrollHeight.value && totalRowHeight) {
        return Math.max(Math.min((bodyScrollHeight.value / totalRowHeight) * 100, 99), 5) || 35
      }

      return 35
    })
    const allColumns = computed(() => {
      return [...templateColumns.value].concat(props.columns as ColumnOptions[])
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
      refreshRowIndex
    } = mutations

    watch(
      allColumns,
      value => {
        setColumns(value)
      },
      { deep: true }
    )
    watch(
      () => props.data,
      value => {
        setData(value)
        setPageSize(props.pageSize)
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
            // wrapper.value && setTableWidth(wrapper.value.getBoundingClientRect().width)
            wrapper.value && setTableWidth(wrapper.value.offsetWidth)
          })
        } else {
          const numberWidth = toNumber(width)

          tableWidth.value = `${numberWidth}px`
          setTableWidth(numberWidth)
        }
      }
    }

    function computeBodyHeight() {
      const height = props.height

      if (isDefined(height)) {
        const tableHead = thead.value?.wrapper

        if (tableHead) {
          headHeight.value = tableHead.getBoundingClientRect().height
          bodyHeight.value = height - headHeight.value
        } else {
          bodyHeight.value = height
        }
      } else {
        bodyHeight.value = undefined
      }
    }

    function handleBodyScroll({ clientY, percentY }: { clientY: number, percentY: number }) {
      yScrollPercent.value = percentY
      setBodyScroll(clientY)
      emitYScroll(clientY, percentY)
    }

    function handleXScroll({ percentX }: { percentX: number }) {
      xScrollPercent.value = percentX
    }

    function handleYScrollEnableChange(able: boolean) {
      yScrollEnable.value = able
    }

    function handleYBarScroll(percent: number) {
      const { totalRowHeight } = getters
      const client = (percent * (totalRowHeight - (bodyScrollHeight.value ?? 0))) / 100

      yScrollPercent.value = percent
      setBodyScroll(client)
      // this.emitYScroll(client, percent)
    }

    function emitYScroll(client: number, percent: number) {
      emit('on-body-scroll', { client, percent })

      nextTick(() => {
        computeRenderRows()
      })
    }

    function increaseColumn(column: ColumnOptions) {
      templateColumns.value.add(column)
    }

    function decreaseColumn(column: ColumnOptions) {
      templateColumns.value.delete(column)
    }

    function emitRowClick(data: Data, key: Key, index: number) {
      emit('on-row-click', data, key, index)
    }

    function emitRowCheck(data: Data, checked: boolean, key: Key, index: number) {
      emit('on-row-check', data, checked, key, index)
    }

    function emitAllRowCheck(checked: boolean) {
      emit('on-row-check-all', checked)
    }

    function emitRowExpand(data: Data, expanded: boolean, key: Key, index: number) {
      emit('on-row-expand', data, expanded, key, index)
    }

    function emitRowFilter() {
      emit('on-row-filter', getters.filteredData)
    }

    let dragState: {
      draggingRow: RowState,
      tableRect: DOMRect,
      dropType?: DropType
    } | null

    function handleRowDragStart(rowInstance: RowInstance) {
      dragState = {
        draggingRow: rowInstance.row,
        tableRect: wrapper.value!.getBoundingClientRect()
      }

      emit('on-row-drag-start', rowInstance.row.data)
    }

    function handleRowDragOver(rowInstance: RowInstance, event: DragEvent) {
      if (!dragState || !rowInstance.el) return

      const dropRowRect = rowInstance.el.getBoundingClientRect()
      const tableRect = dragState.tableRect
      const prevPercent = 0.5
      const distance = event.clientY - dropRowRect.top
      const dropRowHeight = dropRowRect.height

      let dropType: DropType
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
      emit('on-row-drag-over', rowInstance.row.data)
    }

    function handleRowDrop(rowInstance: RowInstance) {
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
        emit('on-row-drop', rowInstance.row.data, dropType)
      }
    }

    function handleRowDragEnd() {
      if (!dragState) return

      const { draggingRow } = dragState

      dragState = null
      indicatorShow.value = false
      emit(
        'on-row-drag-end',
        draggingRow.data,
        state.rowData.map(row => row.data)
      )
    }

    function computeRenderRows() {
      const { bodyScroll, renderCount } = state
      const { totalRowHeight, processedData } = getters
      const rowCount = processedData.length

      if (!renderCount || !props.rowHeight) {
        setRenderRows(0, rowCount)

        return
      }

      if (bodyScroll >= totalRowHeight) return

      const start = Math.floor((bodyScroll / totalRowHeight || 1) * rowCount)

      if (start + renderCount > rowCount) {
        setRenderRows(rowCount - renderCount, rowCount)
      } else {
        setRenderRows(start, start + renderCount)
      }
    }

    function refresh() {
      nextTick(() => {
        computeTableWidth()
        computeBodyHeight()
        refreshPercentScroll()
        nextTick(computeRenderRows)
      })
    }

    let scrollTimer: number

    function refreshPercentScroll() {
      window.clearTimeout(scrollTimer)

      scrollTimer = window.setTimeout(() => {
        const { bodyScroll } = state
        const { totalRowHeight } = getters

        yScrollPercent.value = Math.max(
          Math.min((bodyScroll / (totalRowHeight - (bodyScrollHeight.value ?? 0) || 1)) * 100, 100),
          0
        )
      }, 10)
    }

    function getSelected() {
      const data = state.rowData
      const selectedData = []

      for (let i = 0, len = data.length; i < len; i++) {
        const row = data[i]

        if (row.checked) {
          selectedData.push(row.data)
        }
      }

      return selectedData
    }

    return {
      prefix,
      bodyHeight,
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
      totalRowHeight: toRef(getters, 'totalRowHeight'),

      wrapper,
      thead,
      indicator,

      handleBodyScroll,
      handleXScroll,
      handleYScrollEnableChange,
      handleYBarScroll,

      getSelected
    }
  }
})
</script>
