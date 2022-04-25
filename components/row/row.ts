import { defineComponent, computed, h, provide, toRef } from 'vue'
import { useConfiguredProps } from '@vexip-ui/config'
import { ROW_GUTTER } from './symbol'

import type { PropType } from 'vue'

export type RowJustify = 'start' | 'end' | 'center' | 'space-around' | 'space-between'
export type RowAlign = 'top' | 'middle' | 'bottom'

const props = useConfiguredProps('row', {
  tag: {
    type: String,
    default: 'div'
  },
  gutter: {
    type: [Number, Array] as PropType<number | number[]>,
    default: 0
  },
  justify: {
    default: 'start' as RowJustify,
    validator: (value: RowJustify) => {
      return ['start', 'end', 'center', 'space-around', 'space-between'].includes(value)
    }
  },
  align: {
    default: 'top' as RowAlign,
    validator: (value: RowAlign) => {
      return ['top', 'middle', 'bottom'].includes(value)
    }
  }
})

export default defineComponent({
  name: 'Row',
  props,
  setup(props, { slots }) {
    const prefix = 'vxp-row'

    const className = computed(() => {
      return [prefix, `${prefix}--${props.justify}`, `${prefix}--${props.align}`]
    })
    const style = computed(() => {
      if (!props.gutter) return null

      if (typeof props.gutter === 'number') {
        const horizontalMargin = `-${props.gutter / 2}px`

        return {
          marginRight: horizontalMargin,
          marginLeft: horizontalMargin
        }
      }

      if (Array.isArray(props.gutter)) {
        const [horizontal, vertical] = props.gutter
        const horizontalMargin = `-${horizontal / 2}px`
        const verticalMargin = `${vertical / 2}px`

        return {
          margin: `-${verticalMargin} ${horizontalMargin} ${verticalMargin}`
        }
      }

      return null
    })

    provide(ROW_GUTTER, toRef(props, 'gutter'))

    return () =>
      h(
        props.tag,
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
