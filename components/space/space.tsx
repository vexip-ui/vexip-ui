import {
  defineComponent,
  computed,
  h,
  renderSlot,
  isVNode,
  createTextVNode,
  Fragment,
  Comment
} from 'vue'
import { useProps, booleanProp } from '@vexip-ui/config'

import type { PropType, VNode, VNodeNormalizedChildren } from 'vue'
import type { ComponentSize } from '@vexip-ui/config'
import type { Align, Justify } from './symbol'

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
    itemStyle: [String, Object] as PropType<string | Record<string, any>>
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
      itemStyle: null
    })

    const prefix = 'vxp-space'
    const className = computed(() => {
      return {
        [prefix]: true,
        [`${prefix}-vars`]: true,
        [`${prefix}--inline`]: props.inline,
        [`${prefix}--${props.size}`]: typeof props.size === 'string' && props.size !== 'default',
        [`${prefix}--vertical`]: props.vertical,
        [`${prefix}--no-wrap`]: props.vertical || props.noWrap
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

      return style
    })

    function parseFlexStyle(value: string) {
      return value === 'start' || value === 'end' ? `flex-${value}` : value
    }

    function flatVNodes(children: VNodeNormalizedChildren) {
      const result: VNode[] = []
      const loop = Array.isArray(children) ? [...children] : []

      while (loop.length) {
        const vnode = loop.shift()!

        if (vnode === null) continue

        if (Array.isArray(vnode)) {
          loop.push(...vnode)
        }

        if (!isVNode(vnode) || vnode.type === Comment) continue

        if (vnode.type === Fragment && Array.isArray(vnode.children)) {
          loop.push(vnode.children)
        } else if (typeof vnode === 'string' || typeof vnode === 'number') {
          result.push(createTextVNode(vnode))
        } else {
          result.push(vnode)
        }
      }

      return result
    }

    return () => {
      const children = renderSlot(slots, 'default').children

      if (!children?.length) return null

      return (
        h(
          props.tag || 'div',
          {
            class: className.value,
            style: style.value
          },
          flatVNodes(children).map((vnode) => (
            <div
              class={`${prefix}__item`}
              role="none"
              style={props.itemStyle}
            >
              {vnode}
            </div>
          ))
        )
      )
    }
  }
})
