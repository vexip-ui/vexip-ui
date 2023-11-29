import {
  computed,
  defineComponent,
  inject,
  onBeforeUnmount,
  provide,
  reactive,
  renderSlot,
  watch
} from 'vue'

import TableColumn from './table-column'
import { useProps } from '@vexip-ui/config'
import { tableColumnGroupProps } from './props'
import { COLUMN_GROUP_ACTIONS, TABLE_ACTIONS } from './symbol'

import type { ColumnGroupWithKey, TableColumnOptions } from './symbol'

type GroupPropKey = keyof typeof tableColumnGroupProps

const propKeys = Object.keys(tableColumnGroupProps) as GroupPropKey[]
const ignoredProps: GroupPropKey[] = ['renderer', 'children']

const TableColumnGroup = defineComponent({
  name: 'TableColumnGroup',
  inheritAttrs: false,
  props: tableColumnGroupProps,
  setup(_props, { slots }) {
    const props = useProps('tableColumn', _props, {
      name: {
        default: '',
        static: true
      },
      fixed: {
        default: false,
        static: true
      },
      order: {
        default: 0,
        static: true
      },
      ellipsis: null,
      textAlign: 'center',
      renderer: {
        default: null,
        isFunc: true,
        static: true
      },
      children: {
        default: () => [],
        static: true
      }
    })
    const tableAction = inject(TABLE_ACTIONS, null)
    const parentActions = inject(COLUMN_GROUP_ACTIONS, null)

    const columns = reactive(new Set<TableColumnOptions>())
    const children = computed(() => [...columns])
    const options = reactive({ children }) as ColumnGroupWithKey

    options.key = Symbol('TableColumnGroup')

    for (const key of propKeys) {
      if (ignoredProps.includes(key)) continue

      watch(
        () => props[key],
        value => {
          (options[key as keyof ColumnGroupWithKey] as any) = value
        },
        { immediate: true }
      )
    }

    watch(() => props.renderer, setRenderer, { immediate: true })

    provide(COLUMN_GROUP_ACTIONS, {
      increaseColumn,
      decreaseColumn
    })

    if (parentActions) {
      parentActions.increaseColumn(options)

      onBeforeUnmount(() => {
        parentActions.decreaseColumn(options)
      })
    } else {
      tableAction?.increaseColumn(options)

      onBeforeUnmount(() => {
        tableAction?.decreaseColumn(options)
      })
    }

    function increaseColumn(column: TableColumnOptions) {
      columns.add(column)
    }

    function decreaseColumn(column: TableColumnOptions) {
      columns.delete(column)
    }

    function setRenderer() {
      options.renderer = () => {
        if (typeof slots.head === 'function') {
          return renderSlot(slots, 'head')
        }

        if (typeof props.renderer === 'function') {
          return props.renderer()
        }

        return props.name
      }
    }

    function renderChildren() {
      return props.children.map((child, index) => {
        if ('children' in child) {
          return <TableColumnGroup {...child} key={`__inner-column-${index}`}></TableColumnGroup>
        }

        const { key, ...others } = child

        return <TableColumn {...others} key={`__inner-column-${index}`} id-key={key}></TableColumn>
      })
    }

    return () => [renderSlot(slots, 'default'), ...renderChildren()]
  }
})

export default TableColumnGroup
