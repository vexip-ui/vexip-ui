import { defineComponent, computed } from 'vue'
import { useNameHelper, useProps } from '@vexip-ui/config'

import type { PropType } from 'vue'
import type { TypographyType } from './symbol'

export default defineComponent({
  name: 'Blockquote',
  props: {
    type: String as PropType<TypographyType>
  },
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
        [nh.bm(props.type)]: props.type !== 'default'
      }
    })

    return () => <blockquote class={className.value}>{slots.default?.()}</blockquote>
  }
})
