import { defineComponent, computed } from 'vue'
import { useNameHelper, useProps } from '@vexip-ui/config'

export default defineComponent({
  name: 'LayoutMain',
  props: {
    tag: String
  },
  setup(_props, { slots }) {
    const props = useProps('layout', _props, {
      tag: 'main'
    })

    const nh = useNameHelper('layout')

    const className = computed(() => {
      return [nh.be('main')]
    })

    return () => {
      const CustomTag = (props.tag || 'main') as any

      return <CustomTag class={className.value}>{slots.default?.()}</CustomTag>
    }
  }
})
