import { defineComponent } from 'vue'

import type { PropType } from 'vue'

export default defineComponent({
  name: 'Renderer',
  props: {
    renderer: {
      type: Function,
      default: null
    },
    data: {
      type: Object as PropType<Record<string, any>>,
      default: undefined
    }
  },
  setup(props) {
    return () => {
      if (typeof props.renderer !== 'function') {
        return null
      }

      return props.renderer(props.data)
    }
  }
})
