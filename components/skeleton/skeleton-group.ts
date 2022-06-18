import { defineComponent, provide, h, renderSlot } from 'vue'
import { useProps, booleanProp, booleanStringProp, sizeProp } from '@vexip-ui/config'
import { GROUP_STATE } from './symbol'

export default defineComponent({
  name: 'SkeletonGroup',
  props: {
    size: sizeProp,
    tag: booleanStringProp,
    itemTag: String,
    activated: booleanProp,
    round: booleanProp,
    circle: booleanProp,
    block: booleanProp,
    loading: booleanProp
  },
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

    const prefix = 'vxp-skeletonGroup'

    provide(GROUP_STATE, props)

    return () => {
      if (props.tag) {
        return h(
          typeof props.tag === 'string' ? props.tag : 'div',
          {
            class: prefix
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
