<template>
  <div
    v-if="!row.hidden"
    ref="wrapper"
    :class="[nh.be('group'), row.checked && nh.bem('group', 'checked')]"
    :draggable="draggable || row.dragging"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="handleClick"
    @dblclick="handleDblclick"
    @contextmenu="handleContextmenu"
    @dragstart.stop="handleDragStart"
    @dragover="handleDragOver"
    @drop="handleDrop"
    @dragend="handleDragEnd"
  >
    <div
      ref="rowEl"
      :class="className"
      role="row"
      :style="style"
      :aria-rowindex="index"
      v-bind="attrs"
    >
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
import { CollapseTransition } from '@/components/collapse-transition'
import { Renderer } from '@/components/renderer'

import {
  computed,
  defineComponent,
  inject,
  nextTick,
  onMounted,
  onUpdated,
  reactive,
  ref,
  toRef,
  watch
} from 'vue'

import { useNameHelper } from '@vexip-ui/config'
import { isFunction } from '@vexip-ui/utils'
import { TABLE_ACTIONS, TABLE_HEAD_KEY, TABLE_STORE } from './symbol'

import type { CSSProperties, PropType } from 'vue'
import type { TableExpandColumn, TableRowState } from './symbol'

export default defineComponent({
  name: 'TableRow',
  components: {
    CollapseTransition,
    Renderer
  },
  props: {
    row: {
      type: Object as PropType<TableRowState>,
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
    fixed: {
      type: String as PropType<'left' | 'right' | undefined>,
      default: null
    }
  },
  setup(props) {
    const { state, getters, mutations } = inject(TABLE_STORE)!
    const tableAction = inject(TABLE_ACTIONS)!

    const nh = useNameHelper('table')

    const wrapper = ref<HTMLElement>()
    const rowElement = ref<HTMLElement>()
    const expandElement = ref<HTMLElement>()

    const instance = reactive({
      el: wrapper,
      row: toRef(props, 'row')
    })

    const rowKey = computed(() => (props.isHead ? TABLE_HEAD_KEY : props.row.key))
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
          [nh.bem('row', 'hover')]: !props.isHead && state.highlight && props.row.hover,
          [nh.bem('row', 'stripe')]: props.index % 2 === 1,
          [nh.bem('row', 'checked')]: props.row.checked
        },
        customClass
      ]
    })
    const style = computed(() => {
      let customStyle: any = ''

      if (!props.isHead) {
        if (typeof state.rowStyle === 'function') {
          customStyle = state.rowStyle(props.row.data, props.index)
        } else {
          customStyle = state.rowStyle
        }
      }

      return [
        customStyle,
        {
          minHeight: !state.rowHeight ? `${state.rowMinHeight}px` : undefined
        }
      ]
    })
    const attrs = computed(() => {
      if (!props.isHead) {
        if (typeof state.rowAttrs === 'function') {
          return state.rowAttrs(props.row.data, props.index)
        } else {
          return state.rowAttrs
        }
      }

      return null
    })
    const draggable = computed(() => !props.isHead && state.rowDraggable)
    const dragging = computed(() => state.dragging)
    const expandColumn = computed(() => {
      return state.columns.find(column => (column as TableExpandColumn).type === 'expand') as
        | TableExpandColumn
        | undefined
    })
    const expandRenderer = computed(() => state.expandRenderer)
    const expandStyle = computed<CSSProperties>(() => {
      return props.fixed
        ? {
            width: `${
              props.fixed === 'right'
                ? getters.rightFixedWidths.at(-1)
                : getters.leftFixedWidths.at(-1)
            }px`,
            whiteSpace: 'nowrap'
          }
        : {}
    })
    const cellDraggable = computed(() => {
      return getters.hasDragColumn && !getters.disableDragRows.has(rowKey.value)
    })

    function getRowHeight(row: TableRowState) {
      if (!row) return 0

      return (row.borderHeight || 0) + (row.height || 0) + (row.expandHeight || 0)
    }

    function computeRectHeight() {
      if (!Object.keys(props.row).length || props.row.hidden) return

      computeBorderHeight()
      computeRowHeight()

      if (state.heightBITree && !props.fixed) {
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
        mutations.fixRowHeight(rowKey.value, state.rowHeight)

        nextTick(() => {
          if (rowElement.value) {
            rowElement.value.style.height = `${state.rowHeight}px`
            rowElement.value.style.maxHeight = `${state.rowHeight}px`
          }
        })
      } else {
        nextTick(() => {
          if (!props.fixed) {
            if (rowElement.value) {
              mutations.fixRowHeight(rowKey.value, rowElement.value.offsetHeight)
            }
          } else {
            setTimeout(() => {
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
        mutations.setRowExpandHeight(rowKey.value, expandElement.value?.offsetHeight || 0)
      }
    }

    function buildEventPayload(event: Event) {
      return {
        row: props.row.data,
        key: props.row.key,
        index: props.index,
        event
      }
    }

    function handleMouseEnter(event: MouseEvent) {
      mutations.setRowHover(rowKey.value, true)

      if (!props.isHead && tableAction) {
        tableAction.emitRowEvent('Enter', buildEventPayload(event))
      }
    }

    function handleMouseLeave(event: MouseEvent) {
      mutations.setRowHover(rowKey.value, false)

      if (!props.isHead && tableAction) {
        tableAction.emitRowEvent('Leave', buildEventPayload(event))
      }
    }

    function handleClick(event: MouseEvent) {
      if (!props.isHead && tableAction) {
        tableAction.emitRowEvent('Click', buildEventPayload(event))
      }
    }

    function handleDblclick(event: MouseEvent) {
      if (!props.isHead && tableAction) {
        tableAction.emitRowEvent('Dblclick', buildEventPayload(event))
      }
    }

    function handleContextmenu(event: MouseEvent) {
      if (!props.isHead && tableAction) {
        tableAction.emitRowEvent('Contextmenu', buildEventPayload(event))
      }
    }

    function handleDragStart(event: DragEvent) {
      if (!draggable.value && !cellDraggable.value) return

      tableAction.handleRowDragStart(instance, event)
    }

    function shouldProcessDrag() {
      return (draggable.value || cellDraggable.value) && dragging.value
    }

    function handleDragOver(event: DragEvent) {
      if (!shouldProcessDrag() || (cellDraggable.value && !getters.rowDragging)) return

      event.stopPropagation()
      event.preventDefault()
      tableAction.handleRowDragOver(instance, event)
    }

    function handleDrop(event: DragEvent) {
      if (!shouldProcessDrag()) return

      event.stopPropagation()
      event.preventDefault()
      tableAction.handleRowDrop(instance, event)
      nextTick(() => mutations.handleDrag(rowKey.value, false))
    }

    function handleDragEnd(event: DragEvent) {
      if (!shouldProcessDrag()) return

      event.stopPropagation()
      tableAction.handleRowDragEnd(event)
      nextTick(() => mutations.handleDrag(rowKey.value, false))
    }

    return {
      nh,

      className,
      style,
      attrs,
      draggable,
      expandColumn,
      expandRenderer,
      expandStyle,
      leftFixed: computed(() => getters.leftFixedWidths.at(-1)),
      rightFixed: computed(() => getters.rightFixedWidths.at(-1)),

      wrapper,
      rowEl: rowElement,
      expand: expandElement,

      isFunction,
      handleMouseEnter,
      handleMouseLeave,
      handleClick,
      handleDblclick,
      handleContextmenu,
      handleDragStart,
      handleDragOver,
      handleDrop,
      handleDragEnd,
      computeRectHeight
    }
  }
})
</script>
