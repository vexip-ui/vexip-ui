import { defineComponent, h, ref, computed } from 'vue'
// import { Menu } from '@/components/menu'
// import { MenuItem } from '@/components/menu-item'
import { useNameHelper, useProps, booleanProp } from '@vexip-ui/config'

import type { PropType } from 'vue'
import type { MenuOptions } from './symbol'

export default defineComponent({
  name: 'LayoutAside',
  props: {
    tag: String,
    expanded: booleanProp,
    reduced: booleanProp,
    menus: Object as PropType<MenuOptions[]>
  },
  setup(_props) {
    const props = useProps('layout', _props, {
      tag: 'aside',
      reduced: false,
      menus: {
        default: () => [],
        static: true
      }
    })

    const nh = useNameHelper('layout')
    const currentReduced = ref(props.reduced)

    const className = computed(() => {
      return [
        nh.be('aside'),
        {
          [nh.bem('aside', 'expanded')]: props.expanded,
          [nh.bem('aside', 'reduced')]: currentReduced.value
        }
      ]
    })

    return () => {
      return h(props.tag || 'aside', {
        class: className.value
      })
    }
  }
})
