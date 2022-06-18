import { defineComponent, computed, h, renderSlot,} from 'vue'
import { useProps, booleanProp } from '@vexip-ui/config'
import { supportFlexGap } from '@vexip-ui/utils'
import { flatVNodes } from './helper'

import type { PropType } from 'vue'
import type { ComponentSize } from '@vexip-ui/config'
import type { Align, Justify } from './symbol'

const useFlexGap = supportFlexGap()

function parseFlexStyle(value: string) {
  return value === 'start' || value === 'end' ? `flex-${value}` : value
}

export default defineComponent({
  name: 'Space',
  props: {
    vertical: booleanProp,
    inline: booleanProp,
    tag: String,
    align: String as PropType<Align>,
    justify: String as PropType<Justify>,
    noWrap: booleanProp,
    size: [String, Number, Array] as PropType<ComponentSize | number | [number, number]>,
    itemStyle: [String, Object] as PropType<string | Record<string, any>>,
    gapDisabled: booleanProp
  },
  setup(_props, { slots }) {
    const props = useProps('space', _props, {
      vertical: false,
      inline: false,
      tag: 'div',
      align: 'stretch',
      justify: 'start',
      noWrap: false,
      size: 'default',
      itemStyle: null,
      gapDisabled: !useFlexGap
    })

    const prefix = 'vxp-space'
    const varMap: Record<string, any> = {
      h: `var(--${prefix}-h-gap)`,
      hh: `calc(var(--${prefix}-h-gap) * 0.5)`,
      mhh: `calc(var(--${prefix}-h-gap) * -0.5)`,
      v: `var(--${prefix}-v-gap)`,
      hv: `calc(var(--${prefix}-v-gap) * 0.5)`,
      mhv: `calc(var(--${prefix}-v-gap) * -0.5)`
    }

    const className = computed(() => {
      return {
        [prefix]: true,
        [`${prefix}-vars`]: true,
        [`${prefix}--inline`]: props.inline,
        [`${prefix}--${props.size}`]: typeof props.size === 'string' && props.size !== 'default',
        [`${prefix}--vertical`]: props.vertical,
        [`${prefix}--no-wrap`]: props.vertical || props.noWrap,
        [`${prefix}--no-gap`]: props.gapDisabled
      }
    })
    const style = computed(() => {
      const { justify, align, size } = props

      const style: Record<string, string> = {
        alignItems: parseFlexStyle(align),
        justifyContent: parseFlexStyle(justify)
      }

      if (typeof size !== 'string') {
        const normalizedSize = Array.isArray(size) ? size : [size, size]

        style['--vxp-space-h-gap'] = `${normalizedSize[0]}px`,
        style['--vxp-space-v-gap'] = `${normalizedSize[1]}px`
      }

      if (props.gapDisabled && !props.vertical) {
        style.marginTop = varMap.mhv
        style.marginBottom = varMap.mhv
      }

      return style
    })

    return () => {
      const children = renderSlot(slots, 'default').children

      if (!children?.length) return null

      const vnodes = flatVNodes(children)
      const lastIndex = vnodes.length - 1
      const justify = props.justify
      const justifySpace = justify.startsWith('space')
      const notBetween = justify !== 'space-between'

      return h(
        props.tag || 'div',
        {
          class: className.value,
          style: style.value
        },
        vnodes.map((vnode, index) => (
          <div
            class={`${prefix}__item`}
            role="none"
            style={[
              props.itemStyle,
              !props.gapDisabled
                ? ''
                : props.vertical
                ? {
                    marginBottom: index !== lastIndex ? varMap.v : undefined
                  }
                : {
                    paddingTop: varMap.hv,
                    paddingBottom: varMap.hv,
                    marginRight: justifySpace
                      ? notBetween || index !== lastIndex
                        ? varMap.hh
                        : undefined
                      : index !== lastIndex
                      ? varMap.h
                      : undefined,
                    marginLeft: justifySpace
                      ? notBetween || index !== 0
                        ? varMap.hh
                        : undefined
                      : undefined
                  }
            ]}
          >
            {vnode}
          </div>
        ))
      )
    }
  }
})
