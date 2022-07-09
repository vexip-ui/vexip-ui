import { defineComponent, h, computed } from 'vue'
import { useNameHelper, useProps } from '@vexip-ui/config'

export default defineComponent({
  name: 'LayoutHeader',
  props: {
    tag: String
  },
  setup(_props) {
    const props = useProps('layout', _props, {
      tag: 'header'
    })

    const nh = useNameHelper('layout')

    const className = computed(() => {
      return [nh.be('header')]
    })

    return () => {
      return h(props.tag || 'header', {
        class: className.value
      })
    }
  }
})
