import {
  Fragment,
  createTextVNode,
  defineComponent,
  inject,
  mergeProps,
  reactive,
  ref,
  watch
} from 'vue'

import { useNameHelper, useProps } from '@vexip-ui/config'
import { frameAreaItemProps } from './props'
import { FRAME_AREA_STATE } from './symbol'

const TEXT_VNODE = createTextVNode('').type

export default defineComponent({
  name: 'FrameAreaItem',
  inheritAttrs: true,
  props: frameAreaItemProps,
  emits: [],
  setup(_props, { attrs, slots }) {
    const props = useProps('frameArea', _props, {
      wrapper: false
    })

    const frameAreaState = inject(FRAME_AREA_STATE)

    const nh = useNameHelper('frame-area')

    const rect = reactive({
      top: 0,
      left: 0,
      width: 0,
      height: 0
    })

    const wrapper = ref<HTMLElement>()

    watch(
      () => frameAreaState?.fencing,
      value => {
        if (value) {
          updateRect()
        }
      }
    )

    function syncWrapperRef(el?: HTMLElement | null) {
      wrapper.value = el ? (el.nextElementSibling as HTMLElement | undefined) : undefined
    }

    function updateRect() {
      if (!wrapper.value) return

      const { top, left, width, height } = wrapper.value.getBoundingClientRect()

      rect.top = top
      rect.left = left
      rect.width = width
      rect.height = height

      console.log(rect)
    }

    return () => {
      const Wrapper = props.wrapper
        ? ((props.wrapper === true ? 'span' : props.wrapper) as any)
        : null
      const content = slots.default?.()
      const contentVNode = content?.[0] ?? null

      const renderContent = () => {
        if (!contentVNode) return null

        if (contentVNode.type === TEXT_VNODE) {
          return <span {...attrs}>{contentVNode}</span>
        }

        contentVNode.props = mergeProps(contentVNode.props || {}, attrs)

        return contentVNode
      }

      return Wrapper ? (
        <Wrapper {...attrs} ref={wrapper} class={nh.be('item')}>
          {content}
        </Wrapper>
      ) : (
        <Fragment ref={syncWrapperRef as any}>{renderContent()}</Fragment>
      )
    }
  }
})
