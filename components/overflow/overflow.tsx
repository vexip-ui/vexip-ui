import { defineComponent, ref, computed, onMounted, onBeforeUnmount } from 'vue'
import { ResizeObserver } from '@/components/resize-observer'
import { useNameHelper, useProps, booleanProp, booleanStringProp } from '@vexip-ui/config'
import { useResize } from '@vexip-ui/mixins'
import { nextFrameOnce, noop } from '@vexip-ui/utils'

import type { PropType } from 'vue'

export default defineComponent({
  name: 'Overflow',
  props: {
    items: Array as PropType<Array<Record<string, any>>>,
    tag: String,
    attrFlag: booleanStringProp,
    static: booleanProp,
    getCounter: Function as PropType<() => HTMLElement | null>,
    getPrefix: Function as PropType<() => HTMLElement | null>,
    getSuffix: Function as PropType<() => HTMLElement | null>,
    onRestChange: Function as PropType<(rest: number) => void>,
    onToggle: Function as PropType<(overflow: boolean) => void>
  },
  setup(_props, { slots, expose }) {
    const props = useProps('overflow', _props, {
      items: {
        default: () => [],
        static: true
      },
      tag: 'div',
      attrFlag: false,
      static: false,
      getCounter: {
        default: null,
        isFunc: true
      },
      getPrefix: {
        default: null,
        isFunc: true
      },
      getSuffix: {
        default: null,
        isFunc: true
      },
      onRestChange: {
        default: null,
        isFunc: true
      },
      onToggle: {
        default: null,
        isFunc: true
      }
    })

    const nh = useNameHelper('overflow')
    const { observeResize, unobserveResize } = useResize()
    const restCount = ref(0)

    const wrapper = ref<HTMLElement | null>(null)
    const counter = ref<HTMLElement | null>(null)

    const className = computed(() => {
      return [nh.b(), nh.bs('vars')]
    })
    const hiddenFlag = computed(() => {
      return props.attrFlag ? (props.attrFlag === true ? 'hidden' : props.attrFlag) : false
    })

    expose({ refresh })

    onMounted(() => {
      refresh()
      wrapper.value && observeResize(wrapper.value, handleResize)
    })
    onBeforeUnmount(() => {
      wrapper.value && unobserveResize(wrapper.value)
    })

    function toggleDisplay(el: HTMLElement, show: boolean) {
      if (hiddenFlag.value) {
        show ? el.removeAttribute(hiddenFlag.value) : el.setAttribute(hiddenFlag.value, '')
      } else {
        if (show) {
          el.style.display = ''
        } else {
          el.style.display = 'none'
        }
      }
    }

    function computeHorizontalMargin(el: HTMLElement) {
      const style = getComputedStyle(el)
      const marginLeft = parseFloat(style.marginLeft)
      const marginRight = parseFloat(style.marginRight)

      return marginLeft + marginRight
    }

    function computeOuterWidth(el: HTMLElement) {
      return el.offsetWidth + computeHorizontalMargin(el)
    }

    let lastOverflow = false

    function refresh() {
      if (!wrapper.value) return

      let counterEl: HTMLElement | null

      if (typeof props.getCounter === 'function') {
        counterEl = props.getCounter()
      } else {
        counterEl = counter.value
      }

      if (!counterEl) return

      toggleDisplay(counterEl, true)

      const children = wrapper.value.children
      const wrapperWidth = wrapper.value.offsetWidth
      const childWidths: number[] = []

      let totalWidth = 0
      let overflow = false

      const counterMargin = computeHorizontalMargin(counterEl)
      const updateRest = typeof props.onRestChange === 'function' ? props.onRestChange : noop

      for (let i = 0, len = children.length - 1; i < len; ++i) {
        if (i < 0) continue

        const child = children[i] as HTMLElement

        if (overflow) {
          toggleDisplay(child, false)
          continue
        } else {
          toggleDisplay(child, true)
        }

        const childWidth = computeOuterWidth(child)

        totalWidth += childWidth
        childWidths[i] = childWidth

        if (totalWidth > wrapperWidth) {
          for (let j = i; j >= 0; --j) {
            restCount.value = len - j
            totalWidth -= childWidths[j]

            updateRest(restCount.value)

            if (totalWidth + counterEl.offsetWidth + counterMargin <= wrapperWidth || !j) {
              overflow = true
              i = j - 1
              break
            }
          }
        }
      }

      if (!overflow) {
        toggleDisplay(counterEl, false)
      }

      if (overflow !== lastOverflow) {
        lastOverflow = overflow
        typeof props.onToggle === 'function' && props.onToggle(overflow)
      }
    }

    function handleResize() {
      nextFrameOnce(refresh)
    }

    return () => {
      const CustomTag = (props.tag || 'div') as any
      const itemSlot = slots.default
      const staticItem = props.static

      return (
        <CustomTag ref={wrapper} class={className.value}>
          {itemSlot && props.items.length
            ? props.items.map((item, index) => {
              const vnode = itemSlot({ item, index })[0]

              if (staticItem) {
                vnode.key = index

                return vnode
              }

              return (
                  <ResizeObserver key={index} throttle onResize={handleResize}>
                    {() => vnode}
                  </ResizeObserver>
              )
            })
            : itemSlot?.()}
          {slots.counter
            ? (
                slots.counter({ count: restCount.value })
              )
            : (
            <span ref={counter} style={{ display: 'inline-block' }}></span>
              )}
        </CustomTag>
      )
    }
  }
})
