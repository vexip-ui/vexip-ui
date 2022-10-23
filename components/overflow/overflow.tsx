import {
  defineComponent,
  ref,
  computed,
  watch,
  onMounted,
  onBeforeUnmount,
  nextTick,
  createTextVNode,
  Fragment
} from 'vue'
import { ResizeObserver } from '@/components/resize-observer'
import {
  useNameHelper,
  useProps,
  booleanProp,
  booleanStringProp,
  eventProp,
  emitEvent
} from '@vexip-ui/config'
import { useResize } from '@vexip-ui/hooks'
import { isDefined } from '@vexip-ui/utils'

import type { PropType } from 'vue'

const TEXT_VNODE = createTextVNode('').type

export default defineComponent({
  name: 'Overflow',
  props: {
    items: Array as PropType<any[]>,
    tag: String,
    attrFlag: booleanStringProp,
    static: booleanProp,
    onRestChange: eventProp<(rest: number) => void>(),
    onToggle: eventProp<(overflow: boolean) => void>()
  },
  emits: [],
  setup(_props, { slots, expose }) {
    const props = useProps('overflow', _props, {
      items: {
        default: null,
        static: true
      },
      tag: 'div',
      attrFlag: false,
      static: false,
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

    const wrapper = ref<HTMLElement>()
    const counter = ref<HTMLElement>()

    const className = computed(() => {
      return [nh.b(), nh.bs('vars')]
    })
    const hiddenFlag = computed(() => {
      return props.attrFlag ? (props.attrFlag === true ? 'hidden' : props.attrFlag) : false
    })

    watch(
      () => props.items?.length,
      () => {
        nextTick(refresh)
      }
    )

    expose({ refresh })

    onMounted(() => {
      refresh()
      wrapper.value && observeResize(wrapper.value, refresh)
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
      const marginLeft = parseFloat(style.marginLeft) || 0
      const marginRight = parseFloat(style.marginRight) || 0

      return marginLeft + marginRight
    }

    function computeHorizontalPadding(el: HTMLElement) {
      const style = getComputedStyle(el)
      const paddingLeft = parseFloat(style.paddingLeft) || 0
      const paddingRight = parseFloat(style.paddingRight) || 0

      return paddingLeft + paddingRight
    }

    function computeOuterWidth(el: HTMLElement) {
      return el.offsetWidth + computeHorizontalMargin(el)
    }

    let lastOverflow = false
    let lastRestCount = restCount.value

    function refresh() {
      const counterEl = counter.value

      if (!wrapper.value || !counterEl) return

      toggleDisplay(counterEl, true)

      const children = wrapper.value.children
      const wrapperWidth = wrapper.value.offsetWidth - computeHorizontalPadding(wrapper.value)
      const childWidths: number[] = []

      let totalWidth = 0
      let overflow = false

      const counterMargin = computeHorizontalMargin(counterEl)
      const updateRest = (count: number) => emitEvent(props.onRestChange, count)

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

            if (totalWidth + counterEl.offsetWidth + counterMargin <= wrapperWidth || !j) {
              overflow = true
              i = j - 1
              break
            }
          }
        }
      }

      if (lastRestCount !== restCount.value) {
        lastRestCount = restCount.value
        updateRest(restCount.value)
      }

      toggleDisplay(counterEl, overflow)

      if (overflow !== lastOverflow) {
        lastOverflow = overflow
        emitEvent(props.onToggle, overflow)
      }
    }

    function syncCounterRef(el?: HTMLElement | null) {
      if (el) {
        counter.value = el.nextElementSibling as HTMLElement | undefined
      } else {
        counter.value = undefined
      }
    }

    return () => {
      const CustomTag = (props.tag || 'div') as any
      const itemSlot = slots.default
      const staticItem = props.static
      const counterVNode = slots.counter?.({ count: restCount.value })[0] || null

      const renderCounter = () =>
        counterVNode?.type === TEXT_VNODE ? <span>{counterVNode}</span> : counterVNode

      return (
        <CustomTag ref={wrapper} class={className.value}>
          {itemSlot && isDefined(props.items)
            ? props.items.map((item, index) => {
              const vnode = itemSlot({ item, index })[0]

              if (staticItem) {
                vnode.key = index

                return vnode
              }

              return (
                  <ResizeObserver key={index} onResize={refresh}>
                    {() => vnode}
                  </ResizeObserver>
              )
            })
            : itemSlot?.()}
          {counterVNode
            ? (
            <Fragment ref={syncCounterRef as any}>{renderCounter()}</Fragment>
              )
            : (
            <span ref={counter} style={{ display: 'inline-block' }}></span>
              )}
        </CustomTag>
      )
    }
  }
})
