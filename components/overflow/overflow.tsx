import { ResizeObserver } from '@/components/resize-observer'

import {
  Fragment,
  computed,
  createTextVNode,
  defineComponent,
  nextTick,
  onMounted,
  ref,
  watch
} from 'vue'

import { emitEvent, useNameHelper, useProps } from '@vexip-ui/config'
import { isDefined } from '@vexip-ui/utils'
import { overflowProps } from './props'

const TEXT_VNODE = createTextVNode('').type

export default defineComponent({
  name: 'Overflow',
  inheritAttrs: false,
  props: overflowProps,
  emits: [],
  setup(_props, { attrs, slots, expose }) {
    const props = useProps('overflow', _props, {
      items: {
        default: null,
        static: true
      },
      tag: 'div',
      attrFlag: false,
      static: false,
      maxCount: 0
    })

    const nh = useNameHelper('overflow')
    const restCount = ref(0)

    const wrapper = ref<HTMLElement>()
    const counter = ref<HTMLElement>()
    const suffix = ref<HTMLElement>()

    const className = computed(() => {
      return [
        nh.b(),
        nh.bs('vars'),
        {
          [nh.bm('inherit')]: props.inherit,
          [nh.bm('manual')]: props.maxCount > 0
        }
      ]
    })
    const hiddenFlag = computed(() => {
      return props.attrFlag ? (props.attrFlag === true ? 'hidden' : props.attrFlag) : false
    })

    watch([() => props.items?.length, () => props.maxCount], () => {
      nextTick(refresh)
    })

    expose({ refresh })

    onMounted(refresh)

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
      const childCount = children.length

      let overflow = false

      if (props.maxCount > 0) {
        for (let i = 0, len = childCount - 1; i < len; ++i) {
          const child = children[i] as HTMLElement

          child.style.display = i < props.maxCount ? '' : 'none'
        }

        if (props.maxCount > childCount - 1) {
          toggleDisplay(counterEl, false)

          restCount.value = 0
        } else {
          restCount.value = childCount - 1 - props.maxCount - (slots.suffix ? 1 : 0)
          overflow = restCount.value > 0
        }

        postRefresh(overflow)
        return
      }

      const suffixEl = suffix.value
      const wrapperWidth = wrapper.value.offsetWidth - computeHorizontalPadding(wrapper.value)
      const childWidths: number[] = []

      let totalWidth = suffixEl ? suffixEl.offsetWidth : 0

      const counterMargin = computeHorizontalMargin(counterEl)
      const length = childCount - (suffixEl ? 2 : 1)

      for (let i = 0; i < length; ++i) {
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
            restCount.value = length - j
            totalWidth -= childWidths[j]

            if (totalWidth + counterEl.offsetWidth + counterMargin <= wrapperWidth || !j) {
              overflow = true
              i = j - 1

              if (suffixEl) {
                suffixEl.style.maxWidth =
                  i === -1 ? `${wrapperWidth - counterEl.offsetWidth}px` : ''
              }

              break
            }
          }
        }
      }

      postRefresh(overflow)
    }

    function postRefresh(overflow: boolean) {
      if (lastRestCount !== restCount.value) {
        lastRestCount = restCount.value
        emitEvent(props.onRestChange, restCount.value)
      }

      counter.value && toggleDisplay(counter.value, overflow)

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
      const render = () => (
        <CustomTag {...attrs} ref={wrapper} class={className.value}>
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
          {slots.suffix
            ? (
              <ResizeObserver onResize={refresh}>
                <div ref={suffix} class={nh.be('suffix')}>
                  {slots.suffix()}
                </div>
              </ResizeObserver>
              )
            : null}
        </CustomTag>
      )

      if (import.meta.env.MODE === 'test') {
        // It is difficult to test ResizeObserver in vitest, so directly rendering all items
        return render()
      }

      return <ResizeObserver onResize={refresh}>{render()}</ResizeObserver>
    }
  }
})
