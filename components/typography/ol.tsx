import { defineComponent } from 'vue'
import { useNameHelper, useProps } from '@vexip-ui/config'

import type { PropType } from 'vue'

export default defineComponent({
  name: 'OL',
  props: {
    type: String as PropType<'a' | 'A' | 'i' | 'I' | '1'>
  },
  emits: [],
  setup(_props, { slots }) {
    const props = useProps('text', _props, {
      type: '1'
    })

    const nh = useNameHelper('ol')

    return () => (
      <ol class={nh.b()} type={props.type}>
        {slots.default?.()}
      </ol>
    )
  }
})
