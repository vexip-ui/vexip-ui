import { defineComponent, h, computed } from 'vue'
import { useNameHelper, useProps } from '@vexip-ui/config'

export default defineComponent({
  name: 'LayoutMain',
  props: {
    tag: String
  },
  setup(_props) {
    const props = useProps('layout', _props, {
      tag: 'main'
    })

    const nh = useNameHelper('layout')

    const className = computed(() => {
      return [nh.be('main')]
    })

    return () => {
      return h(props.tag || 'main', {
        class: className.value
      })
    }
  }
})
