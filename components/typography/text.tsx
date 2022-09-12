import { defineComponent, computed } from 'vue'
import { useNameHelper, useProps, booleanProp } from '@vexip-ui/config'

import type { PropType } from 'vue'
import type { TextType } from './symbol'

export default defineComponent({
  name: 'Text',
  props: {
    type: String as PropType<TextType>,
    tag: String,
    delete: booleanProp,
    strong: booleanProp,
    italic: booleanProp,
    underline: booleanProp,
    code: booleanProp
  },
  emits: [],
  setup(_props, { slots }) {
    const props = useProps('text', _props, {
      type: 'default',
      tag: 'span',
      delete: false,
      strong: false,
      italic: false,
      underline: false,
      code: false
    })

    const nh = useNameHelper('text')

    const className = computed(() => {
      return {
        [nh.b()]: true,
        [nh.bs('vars')]: true,
        [nh.bm(props.type)]: props.type !== 'default',
        [nh.bm('delete')]: props.delete,
        [nh.bm('strong')]: props.strong,
        [nh.bm('italic')]: props.italic,
        [nh.bm('underline')]: props.underline,
        [nh.bm('code')]: props.code
      }
    })

    return () => {
      const CustomTag = props.tag || ('span' as any)
      const children = slots.default?.()

      return props.code
        ? (
        <code class={className.value}>{props.delete ? <del>{children}</del> : children}</code>
          )
        : props.delete
          ? (
        <del class={className.value}>{children}</del>
            )
          : (
        <CustomTag class={className.value}>{children}</CustomTag>
            )
    }
  }
})
