<template>
  <div :class="className" :style="style">
    <div v-show="false">
      <slot></slot>
    </div>
    <Scroll
      v-if="useXScroll"
      use-x-bar
      mode="horizontal"
      :class="`${prefix}__scroll`"
      :bar-class="`${prefix}__bar--horizontal`"
      :wheel="false"
      :width="width"
      :bar-fade="barFade"
      @on-scroll="handleXScroll"
    >
      <TableHead ref="head"></TableHead>
      <Scroll
        :class="`${prefix}__scroll`"
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
        :class="`${prefix}__scroll`"
        :height="bodyScrollHeight"
        :scroll-y="bodyScroll"
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
        :class="`${prefix}__scroll`"
        :height="bodyScrollHeight"
        :scroll-y="bodyScroll"
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
        :class="`${prefix}__scroll`"
        :height="bodyScrollHeight"
        :scroll-y="bodyScroll"
        @on-scroll="handleBodyScroll"
      >
        <TableBody fixed="right"></TableBody>
      </Scroll>
    </div>
    <Scrollbar
      v-if="useYBar"
      placement="right"
      :class="`${prefix}__bar--vertical`"
      :scroll="yScrollPercent"
      :fade="barFade"
      :disabled="totalRowHeight <= bodyHeight"
      :bar-length="barLength"
      :style="{top: `${headHeight}px`}"
      @on-scroll="handleYBarScroll"
    ></Scrollbar>
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
  mapGetters
} from './store'
import { debounce } from '../../utils/common'

const { prefix } = require('../../style/basis/variable')

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
  props: {
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
    }
  },
  data() {
    return {
      prefix: `${prefix}-table`,
      bodyHeight: this.height,
      tableWidth: null,
      xScrollPercent: 0,
      yScrollPercent: 0,
      yScrollEnable: false,
      headHeight: 0,
      templateColumns: []
    }
  },
  computed: {
    ...mapState(['leftFixedColumns', 'rightFixedColumns', 'bodyScroll']),
    ...mapGetters(['totalRowHeight']),
    className() {
      const { prefix, stripe, border, highlight, useYBar } = this

      return {
        [prefix]: true,
        [`${prefix}--stripe`]: stripe,
        [`${prefix}--border`]: border,
        [`${prefix}--highlight`]: highlight,
        [`${prefix}--use-y-bar`]: useYBar
      }
    },
    style() {
      const width = this.width

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
          minWidth: `${width}px`
        }
      }

      return {}
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

      return bodyHeight ? Math.min(bodyHeight, totalRowHeight) : totalRowHeight
    },
    barLength() {
      const { bodyScrollHeight, totalRowHeight } = this

      if (bodyScrollHeight && totalRowHeight) {
        return Math.max(
          Math.min((bodyScrollHeight / totalRowHeight) * 100, 99),
          5
        )
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
      },
      deep: true
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
    }
  },
  created() {
    const { rowClass } = this

    this.table = {}
    window.store = this.table.store = this.store = new Store({
      rowClass,
      columns: this.columns,
      data: this.data,
      dataKey: this.dataKey,
      highlight: this.highlight
    })

    this.handleResize = debounce(this.computeTableWidth)
  },
  mounted() {
    this.$nextTick(() => {
      this.computeBodyHeight()
      this.computeTableWidth()
    })

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
      'setStripe'
    ]),
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
      this.setBodyScroll(-clientY)
      this.yScrollPercent = percentY
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
      this.yScrollPercent = percent
      this.setBodyScroll(
        (-percent * (this.totalRowHeight - this.bodyScrollHeight)) / 100
      )
    },
    emitRowClick(data, key, index) {
      this.$emit('on-row-click', data, key, index)
    },
    emitRowCheck(data, checked, key, index) {
      this.$emit('on-row-check', data, checked, key, index)
    },
    emitAllRowCheck(checked) {
      this.$emit('on-row-check-all', checked)
    }
  }
}
</script>
