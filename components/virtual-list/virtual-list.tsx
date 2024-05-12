import { NativeScroll } from '@/components/native-scroll'
import { ResizeObserver } from '@/components/resize-observer'

import { computed, defineComponent, nextTick, ref, renderSlot, toRefs, watch } from 'vue'

import { emitEvent, useNameHelper, useProps } from '@vexip-ui/config'
import { createSlotRender, useVirtual } from '@vexip-ui/hooks'
import { virtualListProps } from './props'

import type { NativeScrollExposed } from '@/components/native-scroll'
import type { ScrollPayload } from './symbol'

export default defineComponent({
  name: 'VirtualList',
  components: {
    NativeScroll,
    ResizeObserver
  },
  inheritAttrs: false,
  props: virtualListProps,
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
      itemsAttrs: null,
      hideBar: false,
      lockItems: false,
      autoplay: false,
      ignoreResize: false,
      disabled: false
    })

    const nh = useNameHelper('virtual-list')

    const { items, itemSize, itemFixed, idKey, bufferSize } = toRefs(props)

    const scroll = ref<NativeScrollExposed>()
    const list = ref<HTMLElement>()
    const wrapper = computed(() => scroll.value?.content)

    const {
      indexMap,
      heightTree,
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
      indexMap,
      heightTree,
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

    const className = computed(() => {
      return [
        nh.b(),
        props.inherit && nh.bm('inherit'),
        props.disabled && nh.bm('disabled'),
        attrs.class
      ]
    })

    function onScroll(payload: ScrollPayload) {
      handleScroll()
      emitEvent(props.onScroll, payload)
    }

    function onResize(entry: ResizeObserverEntry) {
      if (props.ignoreResize) return

      handleResize(entry)
      emitEvent(props.onResize, entry)
    }

    function onItemResize(key: number | string | symbol, entry: ResizeObserverEntry) {
      if (!props.lockItems && !props.ignoreResize) {
        handleItemResize(key, entry)
      }
    }

    function refresh() {
      return scroll.value?.refresh() ?? Promise.resolve()
    }

    function renderList(items: Record<string, any>[]) {
      const keyField = props.idKey
      const itemFixed = props.itemFixed
      const keyIndexMap = indexMap.value
      const { class: itemsClass, style: itemsOtherStyle, ...itemsAttrs } = props.itemsAttrs || {}

      const ListTag = (props.listTag || 'div') as any
      const ItemsTag = (props.itemsTag || 'ul') as any

      return (
        <ResizeObserver onResize={refresh}>
          <ListTag ref={list} class={nh.be('list')} style={listStyle.value}>
            <ItemsTag
              {...itemsAttrs}
              class={[nh.be('items'), itemsClass]}
              style={[itemsStyle.value, itemsOtherStyle]}
            >
              {slots.default && props.items.length
                ? items.map(item => {
                  const key = item[keyField]
                  const index = keyIndexMap.get(key)
                  const vnode = renderSlot(slots, 'default', { item, index })

                  if (itemFixed) {
                    vnode.key = key

                    return vnode
                  }

                  const onResize = onItemResize.bind(null, key)

                  return (
                    <ResizeObserver key={key} onResize={onResize}>
                      {() => vnode}
                    </ResizeObserver>
                  )
                })
                : renderSlot(slots, 'empty')}
            </ItemsTag>
          </ListTag>
        </ResizeObserver>
      )
    }

    return () => {
      let renderingItems = visibleItems.value

      if (import.meta.env.MODE === 'test') {
        // It is difficult to test ResizeObserver in vitest, so directly rendering all items
        renderingItems = props.items
      }

      return (
        <NativeScroll
          {...attrs}
          ref={scroll}
          class={className.value}
          inherit={props.inherit}
          use-y-bar={!props.hideBar}
          scroll-y={scrollOffset.value}
          autoplay={props.autoplay}
          onScroll={onScroll}
          onResize={onResize}
        >
          {{
            default: () => {
              if (props.disabled) {
                return slots.default && props.items.length
                  ? props.items.map((item, index) => renderSlot(slots, 'default', { item, index }))
                  : renderSlot(slots, 'empty')
              }

              return renderList(renderingItems)
            },
            prefixTrap: createSlotRender(slots, ['prefix-trap', 'prefixTrap']),
            suffixTrap: createSlotRender(slots, ['suffix-trap', 'suffixTrap'])
          }}
        </NativeScroll>
      )
    }
  }
})
