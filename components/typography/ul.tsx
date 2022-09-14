import { defineComponent, computed } from 'vue'
import { useNameHelper, useProps } from '@vexip-ui/config'

export default defineComponent({
  name: 'UL',
  props: {
    listStyle: String
  },
  emits: [],
  setup(_props, { slots }) {
    const props = useProps('text', _props, {
      listStyle: 'circle'
    })

    const nh = useNameHelper('ul')

    const className = computed(() => {
      return {
        [nh.b()]: true,
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
