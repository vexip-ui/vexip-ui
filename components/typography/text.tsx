import { computed, defineComponent, renderSlot } from 'vue'

import { useNameHelper, useProps } from '@vexip-ui/config'
import { textProps } from './props'

export default defineComponent({
  name: 'Text',
  props: textProps,
  emits: [],
  setup(_props, { slots }) {
    const props = useProps('text', _props, {
      type: 'default',
      tag: 'span',
      delete: false,
      strong: false,
      italic: false,
      underline: false,
      code: false,
      mark: false,
      disabled: false,
      keyboard: false,
      thin: false,
      reversed: false
    })

    const nh = useNameHelper('text')

    const className = computed(() => {
      return {
        [nh.b()]: true,
        [nh.bs('vars')]: true,
        [nh.bm('inherit')]: props.inherit,
        [nh.bm(props.type)]: props.type !== 'default',
        [nh.bm('delete')]: props.delete,
        [nh.bm('strong')]: props.strong,
        [nh.bm('italic')]: props.italic,
        [nh.bm('underline')]: props.underline,
        [nh.bm('code')]: props.code,
        [nh.bm('mark')]: props.mark,
        [nh.bm('disabled')]: props.disabled,
        [nh.bm('keyboard')]: props.keyboard,
        [nh.bm('thin')]: props.thin,
        [nh.bm('reversed')]: props.reversed
      }
    })

    return () => {
      const CustomTag = props.tag || ('span' as any)
      const children = renderSlot(slots, 'default')

      return props.code
        ? (
        <code class={className.value}>{props.delete ? <del>{children}</del> : children}</code>
          )
        : props.keyboard
          ? (
        <kbd class={className.value}>{props.delete ? <del>{children}</del> : children}</kbd>
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
