import { defineComponent, toRefs, ref, computed, h } from 'vue'
import { NativeScroll } from '@/components/native-scroll'
import { ResizeObserver } from '@/components/resize-observer'
import { useNameHelper, useProps, eventProp, emitEvent } from '@vexip-ui/config'
import { useVirtual } from '@vexip-ui/mixins'

import type { PropType } from 'vue'

interface ScrollPayload {
  clientX: number,
  clientY: number,
  percentX: number,
  percentY: number
}

export default defineComponent({
  name: 'VirtualList',
  components: {
    NativeScroll,
    ResizeObserver
  },
  inheritAttrs: false,
  props: {
    items: Array as PropType<Array<Record<string, any>>>,
    itemSize: Number,
    itemFixed: Boolean,
    idKey: String,
    defaultKeyAt: [Number, String, Symbol],
    bufferSize: Number,
    listTag: String,
    itemsTag: String,
    itemsAttrs: Object as PropType<Record<string, any>>,
    onScroll: eventProp<(payload: ScrollPayload) => void>()
  },
  emits: [],
  setup(_props, { slots, attrs, expose }) {
    const props = useProps('virtualList', _props, {
      items: {
        default: () => [],
        static: true
      },
      itemSize: 36,
      itemFixed: false,
      idKey: 'id',
      defaultKeyAt: null,
      bufferSize: 5,
      listTag: 'div',
      itemsTag: 'ul',
      itemsAttrs: null
    })

    const nh = useNameHelper('virtual-list')

    const { items, itemSize, itemFixed, idKey, defaultKeyAt, bufferSize } = toRefs(props)
    const scroll = ref<InstanceType<typeof NativeScroll> | null>(null)
    const list = ref<HTMLElement | null>(null)

    const wrapper = computed(() => scroll.value?.content)

    const {
      indexMap,
      scrollOffset,
      visibleItems,
      listStyle,
      itemsStyle,
      handleScroll,
      handleResize,
      handleItemResize
    } = useVirtual({ items, itemSize, itemFixed, idKey, defaultKeyAt, bufferSize, wrapper })

    expose({ scroll, list, refresh })

    function onScroll(payload: ScrollPayload) {
      handleScroll()
      emitEvent(props.onScroll, payload)
    }

    function refresh() {
      scroll.value?.refresh()
    }

    return () => {
      const keyField = props.idKey
      const itemFixed = props.itemFixed
      const keyIndexMap = indexMap.value
      const itemSlot = slots.default
      const { class: itemsClass, style: itemsOtherStyle, ...itemsAttrs } = props.itemsAttrs || {}

      return (
        <NativeScroll
          ref={scroll}
          class={nh.b()}
          use-y-bar
          scroll-y={scrollOffset.value}
          {...attrs}
          onScroll={onScroll}
          onReady={handleResize}
        >
          {h(
            props.listTag || 'div',
            {
              ref: list,
              class: nh.be('list'),
              style: listStyle.value
            },
            [
              h(
                props.itemsTag || 'ul',
                {
                  ...itemsAttrs,
                  class: [nh.be('items'), itemsClass],
                  style: [itemsStyle.value, itemsOtherStyle]
                },
                [
                  itemSlot && props.items.length
                    ? visibleItems.value.map(item => {
                      const key = item[keyField]
                      const index = keyIndexMap.get(key)
                      const vnode = itemSlot({ item, index })[0]

                      if (itemFixed) {
                        vnode.key = key

                        return vnode
                      }

                      const onResize = handleItemResize.bind(null, key)

                      return (
                          <ResizeObserver key={key} throttle onResize={onResize}>
                            {() => vnode}
                          </ResizeObserver>
                      )
                    })
                    : slots.empty?.()
                ]
              )
            ]
          )}
        </NativeScroll>
      )
    }
  }
})
