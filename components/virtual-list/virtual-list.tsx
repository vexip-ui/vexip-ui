import { defineComponent, toRefs, ref, computed, h } from 'vue'
import { NativeScroll } from '@/components/native-scroll'
import { ResizeObserver } from '@/components/resize-observer'
import { useVirtual } from '@vexip-ui/mixins'

import type { PropType } from 'vue'

export default defineComponent({
  name: 'VirtualList',
  inheritAttrs: false,
  components: {
    NativeScroll,
    ResizeObserver
  },
  props: {
    items: {
      type: Array as PropType<Array<Record<string, any>>>,
      default: () => []
    },
    itemSize: {
      type: Number,
      default: 36
    },
    itemFixed: {
      type: Boolean,
      default: false
    },
    idKey: {
      type: String,
      default: 'id'
    },
    defaultKeyAt: {
      type: [Number, String, Symbol],
      default: null
    },
    bufferSize: {
      type: Number,
      default: 5
    },
    listTag: {
      type: String,
      default: 'div'
    },
    itemsTag: {
      type: String,
      default: 'ul'
    },
    itemsAttrs: {
      type: Object as PropType<Record<string, any>>,
      default: null
    }
  },
  emits: ['scroll'],
  setup(props, { emit, slots, attrs, expose }) {
    const prefix = 'vxp-virtual-list'

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

    function onScroll(...payload: any[]) {
      handleScroll()
      emit('scroll', ...payload)
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
            class={prefix}
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
                class: `${prefix}__list`,
                style: listStyle.value
              },
              [
                h(
                  props.itemsTag || 'ul',
                  {
                    ...itemsAttrs,
                    class: [`${prefix}__items`, itemsClass],
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
