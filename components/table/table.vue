<template>
  <div :class="className" :style="style">
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
      <TableHead ref="head"></TableHead>
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
      <TableHead ref="head"></TableHead>
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
      :disabled="totalRowHeight <= bodyHeight"
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

<script>
import Scroll from '../scroll'
import Scrollbar from '../scroll/scrollbar'
import TableHead from './table-head'
import TableBody from './table-body'
import Store, {
  DEFAULT_KEY_FIELD,
  mapState,
  mapMutations,
  mapGetters,
  mapActions
} from './store'
import { useConfigurableProps } from '../../src/config/properties'
import { debounce, isNull, removeArrayItem } from '../../src/utils/common'

const { prefix } = require('../../src/style/basis/variable')

const props = useConfigurableProps({
  columns: {
    type: Array,
    default() {
      return []
    }
  },
  data: {
    type: Array,
    default() {
      return []
    }
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
    type: [String, Array, Object, Function],
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
    type: Object,
    default() {
      return {}
    }
  },
  expandRenderer: {
    type: Function,
    default: null
  },
  currentPage: {
    type: Number,
    default: 1,
    validator(value) {
      return value > 0
    }
  },
  pageSize: {
    type: Number,
    default: null
  },
  transparent: {
    type: Boolean,
    default: false
  }
})

export default {
  name: 'Table',
  components: {
    Scroll,
    Scrollbar,
    TableHead,
    TableBody
  },
  provide() {
    return { table: this }
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
  data() {
    return {
      prefix: `${prefix}-table`,
      bodyHeight: this.height,
      tableWidth: null,
      xScrollPercent: 0,
      yScrollPercent: 0,
      yScrollEnable: false,
      headHeight: 0,
      templateColumns: [],
      indicatorShow: false,
      store: null,
      scrollTimer: null
    }
  },
  computed: {
    ...mapState(['leftFixedColumns', 'rightFixedColumns', 'bodyScroll']),
    ...mapGetters(['totalRowHeight', 'filteredData', 'processedData']),
    table() {
      return this
    },
    className() {
      const { prefix, stripe, border, highlight, useYBar, transparent } = this

      return {
        [prefix]: true,
        [`${prefix}--stripe`]: stripe,
        [`${prefix}--border`]: border,
        [`${prefix}--highlight`]: highlight,
        [`${prefix}--use-y-bar`]: useYBar,
        [`${prefix}--transparent`]: transparent
      }
    },
    style() {
      const width = this.tableWidth ?? this.width

      if (width !== null) {
        if (
          typeof width === 'string' &&
          parseFloat(width).toString() !== width
        ) {
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
    },
    rowData() {
      return this.store?.state.data ?? []
    },
    useXScroll() {
      return (
        this.width &&
        (this.leftFixedColumns.length || this.rightFixedColumns.length)
      )
    },
    bodyScrollHeight() {
      const { bodyHeight, totalRowHeight } = this

      if (Number.isNaN(totalRowHeight)) {
        return bodyHeight
      }

      return bodyHeight ? Math.min(bodyHeight, totalRowHeight) : bodyHeight
    },
    barLength() {
      const { bodyScrollHeight, totalRowHeight } = this

      if (bodyScrollHeight && totalRowHeight) {
        return Math.max(
          Math.min((bodyScrollHeight / totalRowHeight) * 100, 99),
          5
        ) || 35
      }

      return 35
    },
    allColumns() {
      return [].concat(this.columns, this.templateColumns)
    }
  },
  watch: {
    // columns (value) {
    //   if (!this.templateColumns.length) {
    //     this.setColumns(value)
    //   }
    // },
    // templateColumns (value) {
    //   this.setColumns(value)
    // },
    allColumns: {
      handler(value) {
        this.setColumns(value)
      },
      deep: true
    },
    data: {
      handler(value) {
        this.setData(value)
        this.setPageSize(this.pageSize)
        this.refreshPercentScroll()
      },
      deep: true
    },
    width() {
      this.computeTableWidth()
    },
    height() {
      this.$nextTick(() => {
        this.computeBodyHeight()
      })
    },
    rowClass(value) {
      this.setRowClass(value)
    },
    highlight(value) {
      this.setHighlight(value)
    },
    currentPage(value) {
      this.setCurrentPage(value)
    },
    pageSize(value) {
      this.setPageSize(value)
    }
  },
  created() {
    const { rowClass, allColumns, data, dataKey, highlight, renderCount, currentPage, pageSize } = this

    this.store = new Store({
      rowClass,
      data,
      dataKey,
      highlight,
      renderCount,
      currentPage,
      columns: allColumns,
      pageSize: isNull(pageSize) ? data.length : pageSize
    })

    this.handleResize = debounce(this.computeTableWidth)

    this.$watch('bodyScrollHeight', this.refreshPercentScroll)
  },
  mounted() {
    this.refresh()

    window.addEventListener('resize', this.handleResize)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    ...mapMutations([
      'setColumns',
      'setData',
      'setRowClass',
      'setBodyScroll',
      'setTableWidth',
      'setHighlight',
      'setStripe',
      'refreshRowIndex',
      'setCurrentPage',
      'setPageSize'
    ]),
    ...mapActions(['setRenderRows']),
    computeTableWidth() {
      const width = this.width

      if (width !== null) {
        if (
          typeof width === 'string' &&
          parseFloat(width).toString() !== width
        ) {
          this.tableWidth = width
          this.$nextTick(() => {
            this.setTableWidth(this.$el.getBoundingClientRect().width)
          })
        } else {
          this.tableWidth = `${width}px`
          this.setTableWidth(parseFloat(width))
        }
      }
    },
    computeBodyHeight() {
      const height = this.height

      if (height === null) {
        this.bodyHeight = null

        return
      }

      const head = this.$refs.head.$el

      if (head) {
        this.headHeight = head.getBoundingClientRect().height
        this.bodyHeight = height - this.headHeight
      } else {
        this.bodyHeight = height
      }
    },
    handleBodyScroll({ clientY, percentY }) {
      this.yScrollPercent = percentY
      this.setBodyScroll(clientY)
      this.emitYScroll(clientY, percentY)
    },
    handleXScroll({ percentX }) {
      this.xScrollPercent = percentX
    },
    getSelected() {
      const data = this.store.state.data
      const selectedData = []

      for (let i = 0, len = data.length; i < len; i++) {
        const row = data[i]

        if (row.checked) {
          selectedData.push(row.data)
        }
      }

      return selectedData
    },
    handleYScrollEnableChange(able) {
      this.yScrollEnable = able
    },
    handleYBarScroll(percent) {
      const client =
        (percent * (this.totalRowHeight - this.bodyScrollHeight)) / 100

      this.yScrollPercent = percent
      this.setBodyScroll(client)
      // this.emitYScroll(client, percent)
    },
    emitYScroll(client, percent) {
      this.$emit('on-body-scroll', { client, percent })

      this.$nextTick(() => {
        this.computeRenderRows()
      })
    },
    emitRowClick(data, key, index) {
      this.$emit('on-row-click', data, key, index)
    },
    emitRowCheck(data, checked, key, index) {
      this.$emit('on-row-check', data, checked, key, index)
    },
    emitAllRowCheck(checked) {
      this.$emit('on-row-check-all', checked)
    },
    emitRowExpand(data, expanded, key, index) {
      this.$emit('on-row-expand', data, expanded, key, index)
    },
    emitRowFilter() {
      this.$emit('on-row-filter', this.filteredData)
    },
    handleRowDragStart(rowInstance) {
      this.dragState = {
        draggingRow: rowInstance.row,
        tableRect: this.$el.getBoundingClientRect()
      }

      this.$emit('on-row-drag-start', rowInstance.row.data)
    },
    handleRowDragOver(rowInstance, event) {
      const dragState = this.dragState
      const indicator = this.$refs.indicator
      const dropRowRect = rowInstance.$el.getBoundingClientRect()
      const tableRect = dragState.tableRect
      const prevPercent = 0.5
      const distance = event.clientY - dropRowRect.top
      const dropRowHeight = dropRowRect.height

      let dropType
      let indicatorTop = -9999

      if (distance < dropRowHeight * prevPercent) {
        dropType = 'before'
        indicatorTop = dropRowRect.top - tableRect.top
      } else {
        dropType = 'after'
        indicatorTop = dropRowRect.bottom - tableRect.top
      }

      indicator.style.top = `${indicatorTop - 2}px`

      // dragState.willDropRow = rowInstance.row
      dragState.dropType = dropType

      this.indicatorShow = true
      this.$emit('on-row-drag-over', rowInstance.row.data)
    },
    handleRowDrop(rowInstance) {
      const dragState = this.dragState
      const { draggingRow, dropType } = dragState
      const willDropRow = rowInstance.row

      if (draggingRow.key === willDropRow.key) return

      let index = this.rowData.findIndex(row => row.key === willDropRow.key)

      if (~index) {
        const originIndex = this.rowData.findIndex(
          row => row.key === draggingRow.key
        )

        removeArrayItem(this.rowData, row => row.key === draggingRow.key)

        if (originIndex > index && dropType === 'after') {
          index += 1
        } else if (originIndex < index && dropType === 'before') {
          index -= 1
        }

        this.rowData.splice(index, 0, draggingRow)
        this.refreshRowIndex()
        this.$emit('on-row-drop', rowInstance.row.data, dropType)
      }
    },
    handleRowDragEnd() {
      const { draggingRow } = this.dragState

      this.dragState = {}
      this.indicatorShow = false
      this.$emit(
        'on-row-drag-end',
        draggingRow.data,
        this.rowData.map(row => row.data)
      )
    },
    computeRenderRows() {
      const {
        bodyScroll,
        totalRowHeight,
        renderCount,
        rowHeight,
        processedData
      } = this
      const rowCount = processedData.length

      if (!renderCount || !rowHeight) {
        this.setRenderRows(0, rowCount)

        return
      }

      if (bodyScroll >= totalRowHeight) return

      const start = Math.floor((bodyScroll / totalRowHeight) * rowCount)

      if (start + renderCount > rowCount) {
        this.setRenderRows(rowCount - renderCount, rowCount)
      } else {
        this.setRenderRows(start, start + renderCount)
      }
    },
    refresh() {
      this.$nextTick(() => {
        this.computeTableWidth()
        this.computeBodyHeight()
        this.$nextTick(this.computeRenderRows)
        this.refreshPercentScroll()
      })
    },
    refreshPercentScroll() {
      clearTimeout(this.scrollTimer)

      this.scrollTimer = setTimeout(() => {
        const { bodyScroll, totalRowHeight, bodyScrollHeight } = this

        this.yScrollPercent =
          (bodyScroll / (totalRowHeight - bodyScrollHeight || 1)) * 100

        if (this.yScrollPercent > 100) this.yScrollPercent = 100
        if (this.yScrollPercent < 0) this.yScrollPercent = 0
      }, 10)
    }
  }
}
</script>
