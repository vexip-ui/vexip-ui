<template>
  <div
    v-if="!row.hidden"
    ref="wrapper"
    :class="nh.be('group')"
    :draggable="draggable"
    @click="handleClick"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @dragstart.stop="handleDragStart"
    @dragover="handleDragOver"
    @dragend="handleDragEnd"
    @drop="handleDrop"
  >
    <div ref="rowEl" :class="className" :style="style">
      <slot></slot>
    </div>
    <CollapseTransition
      v-if="!!expandColumn"
      appear
      @after-enter="computeRectHeight"
      @after-leave="computeRectHeight"
    >
      <div
        v-if="row.expanded"
        ref="expand"
        :class="nh.be('collapse')"
        :style="expandStyle"
      >
        <Renderer
          v-if="isFunction(expandColumn.renderer)"
          :renderer="expandColumn.renderer"
          :data="{ leftFixed, rightFixed, row: row.data, rowIndex: index }"
        ></Renderer>
        <Renderer
          v-else-if="isFunction(expandRenderer)"
          :renderer="expandRenderer"
          :data="{ leftFixed, rightFixed, row: row.data, rowIndex: index }"
        ></Renderer>
      </div>
    </CollapseTransition>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  ref,
  reactive,
  computed,
  inject,
  watch,
  onMounted,
  onUpdated,
  nextTick,
  toRef
} from 'vue'
import { CollapseTransition } from '@/components/collapse-transition'
import { Renderer } from '@/components/renderer'
import { useNameHelper } from '@vexip-ui/config'
import { isFunction } from '@vexip-ui/utils'
import { TABLE_STORE, TABLE_ACTION, TABLE_HEAD_KEY } from './symbol'

import type { PropType, CSSProperties } from 'vue'
import type { RowState, ExpandColumn, ColumnWithKey } from './symbol'

const props = {
  row: {
    type: Object as PropType<RowState>,
    default: () => ({})
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
}

export default defineComponent({
  name: 'TableRow',
  components: {
    CollapseTransition,
    Renderer
  },
  props,
  setup(props) {
    const { state, mutations } = inject(TABLE_STORE)!
    const tableAction = inject(TABLE_ACTION)!

    const nh = useNameHelper('table')

    const wrapper = ref<HTMLElement | null>(null)
    const rowElement = ref<HTMLElement | null>(null)
    const expandElement = ref<HTMLElement | null>(null)

    const instance = reactive({
      el: wrapper,
      row: toRef(props, 'row')
    })

    const rowKey = computed(() => props.isHead ? TABLE_HEAD_KEY : props.row.key)
    const className = computed(() => {
      let customClass = null

      if (!props.isHead) {
        if (typeof state.rowClass === 'function') {
          customClass = state.rowClass(props.row.data, props.index)
        } else {
          customClass = state.rowClass
        }
      }

      return [
        nh.be('row'),
        {
          [nh.bem('row', 'hover')]: state.highlight && props.row.hover,
          [nh.bem('row', 'stripe')]: props.index % 2 === 1
        },
        customClass
      ]
    })
    const style = computed(() => {
      return {
        minHeight: !state.rowHeight ? `${state.rowMinHeight}px` : undefined
      }
    })
    const draggable = computed(() => !props.isHead && state.rowDraggable)
    const dragging = computed(() => state.dragging)
    const expandColumn = computed(() => {
      return state.columns.find(column => (column as ExpandColumn).type === 'expand') as
        | ExpandColumn
        | undefined
    })
    const expandRenderer = computed(() => state.expandRenderer)
    const expandStyle = computed<CSSProperties>(() => {
      return props.isFixed
        ? {
            width: '1px',
            // height: `${props.row.expandHeight}px`,
            overflow: 'hidden',
            whiteSpace: 'nowrap',
            visibility: 'hidden'
          }
        : {}
    })
    const leftFixed = computed(() => computeFixedWidth(state.leftFixedColumns))
    const rightFixed = computed(() => computeFixedWidth(state.rightFixedColumns))

    function getRowHeight(row: RowState) {
      if (!row) return 0

      return (row.borderHeight || 0) + (row.height || 0) + (row.expandHeight || 0)
    }

    function computeFixedWidth(columns: ColumnWithKey[]) {
      if (!columns?.length) {
        return 0
      }

      const widths = state.widths

      let width = 0

      for (let i = 0, len = columns.length; i < len; ++i) {
        const column = columns[i]
        const key = column.key
        const columnWidth = widths[key]

        width += columnWidth
      }

      return width
    }

    function computeRectHeight() {
      if (!Object.keys(props.row).length || props.row.hidden) return

      computeBorderHeight()
      computeRowHeight()

      if (state.heightBITree && !props.isFixed) {
        nextTick(() => {
          const height = getRowHeight(props.row)
          const tree = state.heightBITree
          const prev = tree.get(props.index)

          if (height !== prev) {
            tree.add(props.index, height - prev)
            mutations.updateTotalHeight()
          }
        })
      }
    }

    watch(
      () => props.row.hidden,
      value => {
        !value && computeRectHeight()
      }
    )
    watch(
      () => props.row,
      () => {
        computeRectHeight()
      }
    )

    onMounted(() => {
      computeRectHeight()
      mutations.updateTotalHeight()
    })

    onUpdated(() => {
      if (!state.rowHeight) {
        computeRectHeight()
      } else if (!props.row.hidden) {
        computeBorderHeight()
      }
    })

    function computeRowHeight() {
      if (state.rowHeight) {
        mutations.setRowHeight(rowKey.value, state.rowHeight)

        nextTick(() => {
          if (rowElement.value) {
            rowElement.value.style.height = `${state.rowHeight}px`
            rowElement.value.style.maxHeight = `${state.rowHeight}px`
          }
        })
      } else {
        nextTick(() => {
          if (!props.isFixed) {
            if (rowElement.value) {
              mutations.setRowHeight(rowKey.value, rowElement.value.offsetHeight)
            }
          } else {
            window.setTimeout(() => {
              if (rowElement.value) {
                rowElement.value.style.height = `${props.row.height}px`
              }
            }, 0)
          }
        })
      }
    }

    function computeBorderHeight() {
      if (wrapper.value) {
        const style = getComputedStyle(wrapper.value)
        const borderHeight = parseFloat(style.borderTopWidth) + parseFloat(style.borderBottomWidth)

        mutations.setBorderHeight(rowKey.value, borderHeight)
        mutations.setRowExpandHeight(
          rowKey.value,
          expandElement.value?.offsetHeight || 0
        )
      }
    }

    function handleMouseEnter() {
      mutations.setRowHover(rowKey.value, true)

      if (!props.isHead && tableAction) {
        const { data, key, index } = props.row

        tableAction.emitRowEnter(data, key, index)
      }
    }

    function handleMouseLeave() {
      mutations.setRowHover(rowKey.value, false)

      if (!props.isHead && tableAction) {
        const { data, key, index } = props.row

        tableAction.emitRowLeave(data, key, index)
      }
    }

    function handleClick() {
      if (!props.isHead && tableAction) {
        const { data, key, index } = props.row

        tableAction.emitRowClick(data, key, index)
      }
    }

    function handleDragStart() {
      if (!draggable.value) return

      tableAction.handleRowDragStart(instance)
    }

    function handleDragOver(event: DragEvent) {
      if (!draggable.value || !dragging.value) return

      event.stopPropagation()
      event.preventDefault()
      tableAction.handleRowDragOver(instance, event)
    }

    function handleDrop(event: DragEvent) {
      if (!draggable.value || !dragging.value) return

      event.stopPropagation()
      event.preventDefault()
      tableAction.handleRowDrop(instance)
    }

    function handleDragEnd(event: DragEvent) {
      if (!draggable.value || !dragging.value) return

      event.stopPropagation()
      tableAction.handleRowDragEnd()
    }

    return {
      nh,

      className,
      style,
      draggable,
      expandColumn,
      expandRenderer,
      expandStyle,
      leftFixed,
      rightFixed,

      wrapper,
      rowEl: rowElement,
      expand: expandElement,

      isFunction,
      handleClick,
      handleMouseEnter,
      handleMouseLeave,
      handleDragStart,
      handleDragOver,
      handleDrop,
      handleDragEnd,
      computeRectHeight
    }
  }
})
</script>
