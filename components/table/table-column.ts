import { defineComponent, reactive, watch, inject, onBeforeUnmount } from 'vue'
import { useProps, booleanProp, sizeProp, createSizeProp, classProp } from '@vexip-ui/config'
import { isNull } from '@vexip-ui/utils'
import { TABLE_ACTION } from './symbol'

import type { PropType } from 'vue'
import type {
  Data,
  ColumnType,
  FilterOptions,
  SorterOptions,
  RenderFn,
  RowState,
  ColumnWithKey
} from './symbol'

const props = {
  idKey: [Number, String],
  name: String,
  accessor: Function as PropType<(row: Data, index: number) => any>,
  fixed: {
    type: [Boolean, String] as PropType<boolean | 'left' | 'right'>,
    default: null
  },
  className: classProp,
  type: String as PropType<ColumnType>,
  width: Number,
  filter: Object as PropType<FilterOptions<any, any>>,
  sorter: {
    type: [Boolean, Object] as PropType<boolean | SorterOptions<any>>,
    default: null
  },
  renderer: Function as PropType<RenderFn>,
  headRenderer: Function as PropType<RenderFn>,
  order: Number,
  noEllipsis: booleanProp,
  checkboxSize: sizeProp,
  disableRow: Function as PropType<(data: Data) => boolean>,
  truthIndex: booleanProp,
  orderLabel: Function as PropType<(index: number) => string | number>,
  metaData: Object as PropType<Data>
}

const propKeys = Object.keys(props) as (keyof typeof props)[]
const aliases: Partial<Record<keyof typeof props, string>> = {
  idKey: 'key'
}

const columnTypes = Object.freeze<ColumnType>(['order', 'selection', 'expand'])

export default defineComponent({
  name: 'TableColumn',
  functional: true,
  props,
  setup(_props, { slots }) {
    const props = useProps('tableColumn', _props, {
      idKey: {
        default: null,
        validator: (value: number | string) => !isNull(value),
        static: true
      },
      name: '',
      accessor: {
        default: null,
        isFunc: true
      },
      fixed: {
        default: false,
        static: true
      },
      className: null,
      type: {
        default: null,
        validator: (value: ColumnType) => columnTypes.includes(value),
        static: true
      },
      width: null,
      filter: () => ({}),
      sorter: false,
      renderer: {
        default: null,
        isFunc: true
      },
      headRenderer: {
        default: null,
        isFunc: true
      },
      order: {
        default: 0,
        isFunc: true
      },
      noEllipsis: false,
      checkboxSize: createSizeProp(),
      disableRow: {
        default: null,
        isFunc: true
      },
      truthIndex: false,
      orderLabel: {
        default: null,
        isFunc: true
      },
      metaData: {
        default: () => ({}),
        validator: (value: Data) => !isNull(value)
      }
    })

    const tableAction = inject(TABLE_ACTION, null)
    const options = reactive({}) as ColumnWithKey

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

          return isNull(result) ? '' : String(result)
        }

        const result = (row as RowState)[options.key as unknown as keyof RowState]

        return isNull(result) ? '' : String(result)
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
