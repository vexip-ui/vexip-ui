import { defineComponent } from 'vue'

import { rendererProps } from './props'

export default defineComponent({
  name: 'Renderer',
  props: rendererProps,
  setup(props) {
    return () => {
      if (typeof props.renderer !== 'function') {
        return null
      }

      return props.renderer(props.data)
    }
  }
})
