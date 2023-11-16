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

import { useProps } from '@vexip-ui/config'
import { tableColumnGroupProps } from './props'
import { COLUMN_GROUP_ACTIONS, TABLE_ACTIONS } from './symbol'

import type { ColumnGroupWithKey, TableColumnOptions } from './symbol'

type GroupPropKey = keyof typeof tableColumnGroupProps

const propKeys = Object.keys(tableColumnGroupProps) as GroupPropKey[]
const ignoredProps: GroupPropKey[] = ['renderer']

export default defineComponent({
  name: 'TableColumn',
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
      renderer: {
        default: null,
        isFunc: true,
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
        if (typeof slots.default === 'function') {
          return renderSlot(slots, 'default')
        }

        if (typeof props.renderer === 'function') {
          return props.renderer()
        }

        return props.name
      }
    }

    return () => renderSlot(slots, 'default')
  }
})
