import { defineComponent, computed } from 'vue'
import { useNameHelper, useProps } from '@vexip-ui/config'
import { ulProps } from './props'

export default defineComponent({
  name: 'UL',
  props: ulProps,
  emits: [],
  setup(_props, { slots }) {
    const props = useProps('ul', _props, {
      listStyle: 'circle'
    })

    const nh = useNameHelper('ul')

    const className = computed(() => {
      return {
        [nh.b()]: true,
        [nh.bm('inherit')]: props.inherit,
        [nh.bm('no-marker')]: props.listStyle === 'none'
      }
    })

    return () => (
      <ul class={className.value} style={{ listStyleType: props.listStyle }}>
        {slots.default?.()}
      </ul>
    )
  }
})
