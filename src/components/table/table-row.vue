<template>
  <div
    v-if="!row.hidden"
    :class="`${prefix}__group`"
    :draggable="draggable"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @dragstart.stop="handleDragStart"
    @dragover.stop="handleDragOver"
    @dragend.stop="handleDragEnd"
    @drop.stop="handleDrop"
  >
    <div :class="className">
      <slot></slot>
    </div>
    <div :class="`${prefix}__collapse`">
      <slot name="collapse"></slot>
    </div>
  </div>
</template>

<script>
import { mapState, mapMutations } from './store'

const { prefix } = require('../../style/basis/variable')

export default {
  name: 'TableRow',
  components: {},
  inject: ['table'],
  props: {
    row: {
      type: Object,
      default() {
        return {}
      }
    },
    index: {
      type: Number,
      default: null
    },
    isHead: {
      type: Boolean,
      default: false
    },
    isFixed: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      prefix: `${prefix}-table`
    }
  },
  computed: {
    ...mapState(['rowClass', 'highlight', 'stripe']),
    className() {
      const { prefix, rowClass, row, index, isHead, highlight } = this

      let customClass = null

      if (!isHead) {
        if (typeof rowClass === 'function') {
          customClass = rowClass(row.data, index)
        } else {
          customClass = rowClass
        }
      }

      return [
        `${prefix}__row`,
        {
          [`${prefix}__row--hover`]: highlight && row.hover
        },
        customClass
      ]
    },
    draggable() {
      return !this.isHead && this.table.rowDraggable
    }
  },
  watch: {
    'row.hidden'(value) {
      if (!value) {
        this.computeRowHeight()
      }
    }
  },
  mounted() {
    this.computeRowHeight()
  },
  updated() {
    if (!this.isFixed && !this.table.rowHeight) {
      this.computeRowHeight()
    }
  },
  methods: {
    ...mapMutations(['setRowHeight', 'setRowHover']),
    handleClick() {
      if (!this.isHead && this.table) {
        const { data, key, index } = this.row

        this.table.emitRowClick(data, key, index)
      }
    },
    computeRowHeight() {
      if (this.table.rowHeight) {
        this.$nextTick(() => {
          this.setRowHeight(this.row.key, this.table.rowHeight)

          if (this.$el?.style) {
            this.$el.style.maxHeight = `${this.table.rowHeight}px`
          }
        })
      } else {
        this.$nextTick(() => {
          if (!this.isFixed) {
            if (this.$el?.getBoundingClientRect) {
              const height = this.$el.getBoundingClientRect().height

              this.setRowHeight(this.row.key, height)
            }
          } else {
            setTimeout(() => {
              if (this.$el?.style) {
                this.$el.style.height = `${this.row.height}px`
              }
            }, 0)
          }
        })
      }
    },
    handleMouseEnter() {
      this.setRowHover(this.row.key, true)
    },
    handleMouseLeave() {
      this.setRowHover(this.row.key, false)
    },
    handleDragStart() {
      if (!this.draggable) return

      this.table.handleRowDragStart(this)
    },
    handleDragOver(event) {
      if (!this.draggable) return

      event.preventDefault()

      this.table.handleRowDragOver(this, event)
    },
    handleDrop(event) {
      if (!this.draggable) return

      event.preventDefault()

      this.table.handleRowDrop(this)
    },
    handleDragEnd() {
      if (!this.draggable) return

      this.table.handleRowDragEnd()
    }
  }
}
</script>
