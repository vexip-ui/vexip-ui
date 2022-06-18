import { defineComponent, reactive, computed, h, provide, toRef } from 'vue'
import { useNameHelper, useProps } from '@vexip-ui/config'
import { ROW_STATE } from './symbol'

import type { PropType } from 'vue'
import type { Justify, Align, ColumnFlex } from './symbol'

const justifyList = Object.freeze<Justify>(['start', 'end', 'center', 'space-around', 'space-between', 'space-evenly'])
const alignList = Object.freeze<Align>(['top', 'middle', 'bottom', 'stretch'])

export default defineComponent({
  name: 'Row',
  props: {
    tag: String,
    gap: [Number, Array] as PropType<number | number[]>,
    justify: String as PropType<Justify>,
    align: String as PropType<Align>,
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
        default: 'start' as Justify,
        validator: (value: Justify) => justifyList.includes(value)
      },
      align: {
        default: 'top' as Align,
        validator: (value: Align) => alignList.includes(value)
      },
      columnFlex: false
    })

    const nh = useNameHelper('row')

    const className = computed(() => {
      return [nh.b(), nh.bm(props.justify), nh.bm(props.align)]
    })
    const style = computed(() => {
      if (!props.gap) return null

      if (typeof props.gap === 'number') {
        const horizontalMargin = `-${props.gap / 2}px`

        return {
          marginRight: horizontalMargin,
          marginLeft: horizontalMargin
        }
      }

      if (Array.isArray(props.gap)) {
        const [horizontal, vertical] = props.gap
        const horizontalMargin = `-${horizontal / 2}px`
        const verticalMargin = `${vertical / 2}px`

        return {
          margin: `-${verticalMargin} ${horizontalMargin} ${verticalMargin}`
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

    provide(ROW_STATE, reactive({
      columnFlex,
      gap: toRef(props, 'gap')
    }))

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
