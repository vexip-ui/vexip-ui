import { defineComponent, reactive, watch, inject, onBeforeUnmount } from 'vue'
import { useConfiguredProps } from '@/common/config/install'
import { createSizeProp } from '@/common/config/props'
import { TABLE_ACTION } from './symbol'

import type { PropType } from 'vue'
import type {
  Data,
  ClassType,
  ColumnType,
  FilterOptions,
  SorterOptions,
  // Accessor,
  RenderFn,
  RowState,
  ColumnWithKey,
  TableAction
} from './symbol'

const props = useConfiguredProps('tableColumn', {
  idKey: {
    type: [Number, String],
    required: true
  },
  name: {
    type: String,
    default: ''
  },
  accessor: {
    type: Function as any,
    default: null
  },
  fixed: {
    type: [Boolean, String],
    default: false
  },
  className: {
    type: [String, Object] as PropType<ClassType>,
    default: null
  },
  type: {
    type: String as PropType<ColumnType>,
    default: null,
    validator: (value: ColumnType) => {
      return ['order', 'selection', 'expand'].includes(value)
    }
  },
  width: {
    type: Number,
    default: null
  },
  filter: {
    type: Object as PropType<FilterOptions<any, any>>,
    default: () => ({})
  },
  sorter: {
    type: [Boolean, Object] as PropType<boolean | SorterOptions<any>>,
    default: false
  },
  renderer: {
    type: Function as PropType<RenderFn>,
    default: null
  },
  headRenderer: {
    type: Function as PropType<RenderFn>,
    default: null
  },
  order: {
    type: Number,
    default: 0
  },
  checkboxSize: createSizeProp(),
  disableRow: {
    type: Function as PropType<(data: Data) => boolean>,
    default: null
  },
  truthIndex: {
    type: Boolean,
    default: false
  },
  orderLabel: {
    type: Function as PropType<(index: number) => string | number>,
    default: null
  }
})

const propKeys = Object.keys(props) as (keyof typeof props)[]
const aliases: Partial<Record<keyof typeof props, string>> = {
  idKey: 'key'
}

export default defineComponent({
  name: 'TableColumn',
  functional: true,
  props,
  setup(props, { slots }) {
    const tableAction = inject<TableAction | null>(TABLE_ACTION, null)

    const options = reactive({
      name: undefined,
      key: undefined,
      fixed: undefined,
      className: undefined,
      width: undefined,
      filter: undefined,
      sorter: undefined,
      order: undefined,
      accessor: undefined,
      renderer: undefined,
      headRenderer: undefined,
      type: undefined,
      truthIndex: undefined,
      orderLabel: undefined,
      checkboxSize: undefined,
      disableRow: undefined
    }) as unknown as ColumnWithKey

    for (const key of propKeys) {
      if (key === 'renderer' || key === 'headRenderer') continue

      const aliasKey = (aliases[key] || key) as keyof ColumnWithKey

      // eslint-disable-next-line vue/no-setup-props-destructure
      ;(options[aliasKey] as any) = props[key]

      watch(
        () => props[key],
        value => {
          (options[aliasKey] as any) = value
        }
      )
    }

    watch(() => slots.default, setRenderer)
    watch(() => props.renderer, setRenderer)
    watch(() => slots.head, setHeadRenderer)
    watch(() => props.headRenderer, setHeadRenderer)

    setRenderer()
    setHeadRenderer()

    tableAction?.increaseColumn(options)

    onBeforeUnmount(() => {
      tableAction?.decreaseColumn(options)
    })

    function setRenderer() {
      options.renderer = (data: Data) => {
        if (typeof slots.default === 'function') {
          return slots.default(data)
        }

        if (typeof props.renderer === 'function') {
          return props.renderer(data)
        }

        const row = data.row
        const rowIndex = data.rowIndex as number

        if (typeof props.accessor === 'function') {
          const result = props.accessor(row as Data, rowIndex)

          return (result as string).toString()
        }

        return (row as RowState)[options.key as unknown as keyof RowState].toString()
      }
    }

    function setHeadRenderer() {
      options.headRenderer = (data: Data) => {
        if (typeof slots.head === 'function') {
          return slots.head(data)
        }

        if (typeof props.headRenderer === 'function') {
          return props.headRenderer(data)
        }

        return props.name
      }
    }

    return () => null
  }
})
