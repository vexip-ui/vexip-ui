import { defineComponent } from 'vue'
import { useNameHelper, useProps } from '@vexip-ui/config'
import { olProps } from './props'

export default defineComponent({
  name: 'OL',
  props: olProps,
  emits: [],
  setup(_props, { slots }) {
    const props = useProps('ol', _props, {
      type: '1'
    })

    const nh = useNameHelper('ol')

    return () => (
      <ol class={[nh.b(), props.inherit && nh.bm('inherit')]} type={props.type}>
        {slots.default?.()}
      </ol>
    )
  }
})
