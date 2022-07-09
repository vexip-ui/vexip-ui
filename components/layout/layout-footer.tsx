import { defineComponent, h, computed } from 'vue'
import { useNameHelper, useProps } from '@vexip-ui/config'

export default defineComponent({
  name: 'LayoutFooter',
  props: {
    tag: String
  },
  setup(_props) {
    const props = useProps('layout', _props, {
      tag: 'footer'
    })

    const nh = useNameHelper('layout')

    const className = computed(() => {
      return [nh.be('footer')]
    })

    return () => {
      return h(props.tag || 'footer', {
        class: className.value
      })
    }
  }
})
