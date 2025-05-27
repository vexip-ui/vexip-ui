import { computed, defineComponent } from 'vue'

import { useNameHelper, useProps } from '@vexip-ui/config'
import { layoutMainProps } from './props'
import { useLayoutState } from './helper'

export default defineComponent({
  name: 'LayoutMain',
  props: layoutMainProps,
  setup(_props, { slots }) {
    const props = useProps('layoutMain', _props, {
      tag: 'main',
      fixed: false,
    })

    const nh = useNameHelper('layout')
    const state = useLayoutState()

    const className = computed(() => {
      return [nh.be('main'), props.fixed && nh.bem('main', 'fixed'), state.classes.main]
    })

    return () => {
      const CustomTag = (props.tag || 'main') as any

      return <CustomTag class={className.value}>{slots.default?.()}</CustomTag>
    }
  },
})
