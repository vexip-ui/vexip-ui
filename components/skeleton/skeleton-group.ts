import { defineComponent, provide, h, renderSlot } from 'vue'
import { useNameHelper, useProps } from '@vexip-ui/config'
import { skeletonGroupProps } from './props'
import { GROUP_STATE } from './symbol'

export default defineComponent({
  name: 'SkeletonGroup',
  props: skeletonGroupProps,
  setup(_props, { slots }) {
    const props = useProps('skeletonGroup', _props, {
      size: null,
      tag: false,
      itemTag: null,
      activated: false,
      round: false,
      circle: false,
      block: false,
      loading: true
    })

    const nh = useNameHelper('skeletonGroup')

    provide(GROUP_STATE, props)

    return () => {
      if (props.tag) {
        return h(
          typeof props.tag === 'string' ? props.tag : 'div',
          {
            class: nh.b(),
            role: 'group'
          },
          {
            default: () => slots.default?.()
          }
        )
      }

      return renderSlot(slots, 'default')
    }
  }
})
