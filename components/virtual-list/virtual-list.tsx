import { defineComponent, toRefs, ref, computed, watch, nextTick } from 'vue'
import { NativeScroll } from '@/components/native-scroll'
import { ResizeObserver } from '@/components/resize-observer'
import { useNameHelper, useProps, eventProp, emitEvent } from '@vexip-ui/config'
import { useVirtual } from '@vexip-ui/hooks'

import type { PropType } from 'vue'
import type { ScrollPayload } from './symbol'

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
    onScroll: eventProp<(payload: ScrollPayload) => void>(),
    onResize: eventProp<(entry: ResizeObserverEntry) => void>()
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

    const { items, itemSize, itemFixed, idKey, bufferSize } = toRefs(props)
    const scroll = ref<InstanceType<typeof NativeScroll>>()
    const list = ref<HTMLElement>()

    const wrapper = computed(() => scroll.value?.content ?? null)

    const {
      indexMap,
      scrollOffset,
      visibleItems,
      listStyle,
      itemsStyle,
      handleScroll,
      handleResize,
      handleItemResize,
      scrollTo,
      scrollBy,
      scrollToKey,
      scrollToIndex,
      ensureIndexInView,
      ensureKeyInView
    } = useVirtual({
      items,
      itemSize,
      itemFixed,
      idKey,
      bufferSize,
      wrapper,
      defaultKeyAt: props.defaultKeyAt,
      autoResize: false
    })

    expose({
      scroll,
      wrapper,
      list,
      scrollOffset,
      scrollTo,
      scrollBy,
      scrollToKey,
      scrollToIndex,
      ensureIndexInView,
      ensureKeyInView,
      refresh
    })

    watch(
      () => props.items.length,
      () => {
        nextTick(refresh)
      }
    )

    function onScroll(payload: ScrollPayload) {
      handleScroll()
      emitEvent(props.onScroll, payload)
    }

    function onResize(entry: ResizeObserverEntry) {
      handleResize(entry)
      emitEvent(props.onResize, entry)
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

      const ListTag = (props.listTag || 'div') as any
      const ItemsTag = (props.itemsTag || 'ul') as any

      let renderingItems = visibleItems.value

      if (import.meta.env.MODE === 'test') {
        // It is difficult to test ResizeObserver in vitest, so directly rendering all items
        renderingItems = props.items
      }

      return (
        <NativeScroll
          ref={scroll}
          class={nh.b()}
          use-y-bar
          scroll-y={scrollOffset.value}
          {...attrs}
          onScroll={onScroll}
          onResize={onResize}
        >
          <ListTag ref={list} class={nh.be('list')} style={listStyle.value}>
            <ItemsTag
              {...itemsAttrs}
              class={[nh.be('items'), itemsClass]}
              style={[itemsStyle.value, itemsOtherStyle]}
            >
              {itemSlot && props.items.length
                ? renderingItems.map(item => {
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
                : slots.empty?.()}
            </ItemsTag>
          </ListTag>
        </NativeScroll>
      )
    }
  }
})
