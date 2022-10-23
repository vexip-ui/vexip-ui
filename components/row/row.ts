import { defineComponent, reactive, computed, h, provide, toRef } from 'vue'
import { useNameHelper, useProps } from '@vexip-ui/config'
import { ROW_STATE } from './symbol'

import type { PropType } from 'vue'
import type { RowGridJustify, RowGridAlign, ColumnFlex } from './symbol'

const justifyList = Object.freeze<RowGridJustify>([
  'start',
  'end',
  'center',
  'space-around',
  'space-between',
  'space-evenly'
])
const alignList = Object.freeze<RowGridAlign>(['top', 'middle', 'bottom', 'stretch'])

export default defineComponent({
  name: 'Row',
  props: {
    tag: String,
    gap: [Number, Array] as PropType<number | number[]>,
    justify: String as PropType<RowGridJustify>,
    align: String as PropType<RowGridAlign>,
    columnFlex: {
      type: [Boolean, Object] as PropType<boolean | Partial<ColumnFlex>>,
      default: null
    }
  },
  setup(_props, { slots }) {
    const props = useProps('row', _props, {
      tag: 'div',
      gap: 0,
      justify: {
        default: 'start',
        validator: value => justifyList.includes(value)
      },
      align: {
        default: 'top',
        validator: value => alignList.includes(value)
      },
      columnFlex: false
    })

    const nh = useNameHelper('row')

    const className = computed(() => {
      return [nh.b(), nh.bs('vars'), nh.bm(props.justify), nh.bm(props.align)]
    })
    const style = computed(() => {
      if (!props.gap) return null

      if (typeof props.gap === 'number') {
        return {
          [nh.cv('h-gap')]: `${props.gap}px`
        }
      }

      if (Array.isArray(props.gap)) {
        const [horizontal, vertical] = props.gap

        return {
          [nh.cv('h-gap')]: `${horizontal}px`,
          [nh.cv('v-gap')]: `${vertical}px`
        }
      }

      return null
    })
    const columnFlex = computed(() => {
      if (props.columnFlex === true) {
        return {
          justify: 'start',
          align: 'top'
        }
      } else if (props.columnFlex) {
        return {
          justify: 'start',
          align: 'top',
          ...props.columnFlex
        }
      }

      return false
    })

    provide(
      ROW_STATE,
      reactive({
        columnFlex,
        gap: toRef(props, 'gap')
      })
    )

    return () =>
      h(
        props.tag || 'div',
        {
          class: className.value,
          style: style.value
        },
        {
          default: () => slots.default && slots.default()
        }
      )
  }
})
