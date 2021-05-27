import { defineComponent } from 'vue'

import type { PropType } from 'vue'

export default defineComponent({
  functional: true,
  props: {
    renderer: {
      type: Function,
      required: true
    },
    data: {
      type: Object as PropType<Record<string, unknown>>,
      default: undefined
    }
  },
  setup(props) {
    return () => props.renderer(props.data)
  }
})
