import { defineComponent } from 'vue'
import Text from './text'
import { useProps, booleanProp } from '@vexip-ui/config'

import type { PropType } from 'vue'
import type { TypographyType } from './symbol'

export default defineComponent({
  name: 'Strong',
  props: {
    type: String as PropType<TypographyType>,
    delete: booleanProp,
    italic: booleanProp,
    underline: booleanProp,
    mark: booleanProp,
    disabled: booleanProp,
    keyboard: booleanProp,
    thin: booleanProp,
    reversed: booleanProp
  },
  emits: [],
  setup(_props, { slots }) {
    const props = useProps('text', _props, {
      type: 'default',
      delete: false,
      italic: false,
      underline: false,
      mark: false,
      disabled: false,
      keyboard: false,
      thin: false,
      reversed: false
    })

    return () => (
      <Text {...props} tag={'strong'} strong>
        {slots.default?.()}
      </Text>
    )
  }
})
