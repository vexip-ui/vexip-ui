import { computed, defineComponent } from 'vue'

import { useNameHelper, useProps } from '@vexip-ui/config'
import { blockquoteProps } from './props'

export default defineComponent({
  name: 'Blockquote',
  props: blockquoteProps,
  emits: [],
  setup(_props, { slots }) {
    const props = useProps('blockquote', _props, {
      type: 'default'
    })

    const nh = useNameHelper('blockquote')

    const className = computed(() => {
      return {
        [nh.b()]: true,
        [nh.bs('vars')]: true,
        [nh.bm('inherit')]: props.inherit,
        [nh.bm(props.type)]: props.type !== 'default'
      }
    })

    return () => <blockquote class={className.value}>{slots.default?.()}</blockquote>
  }
})
