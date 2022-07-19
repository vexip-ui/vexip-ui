import { defineComponent, h, Transition } from 'vue'
import { useProps, booleanProp, eventProp, emitEvent } from '@vexip-ui/config'

import type { PropType } from 'vue'

type TransitionMode = 'in-out' | 'out-in' | 'default'

export default defineComponent({
  name: 'CollapseTransition',
  functional: true,
  props: {
    appear: booleanProp,
    mode: String as PropType<TransitionMode>,
    horizontal: booleanProp,
    duration: Number,
    timing: String,
    fadeEffect: booleanProp,
    onBeforeEnter: eventProp<(el: Element) => void>(),
    onEnter: eventProp<(el: Element, done: () => void) => void>(),
    onAfterEnter: eventProp<(el: Element) => void>(),
    onEnterCancelled: eventProp<(el: Element) => void>(),
    onBeforeLeave: eventProp<(el: Element) => void>(),
    onLeave: eventProp<(el: Element, done: () => void) => void>(),
    onAfterLeave: eventProp<(el: Element) => void>(),
    onLeaveCancelled: eventProp<(el: Element) => void>()
  },
  emits: [],
  setup(_props, { slots }) {
    const props = useProps('collapseTransition', _props, {
      appear: false,
      mode: {
        default: 'default' as TransitionMode,
        validator: (value: TransitionMode) => ['in-out', 'out-in', 'default'].includes(value)
      },
      horizontal: false,
      duration: {
        default: 250,
        validator: (value: number) => value >= 200
      },
      timing: null,
      fadeEffect: false
    })

    return () => {
      const duration = props.duration
      const timing = props.timing || 'ease-in-out'

      let height: 'width' | 'height' = 'height'
      let paddingTop: 'paddingTop' | 'paddingLeft' = 'paddingTop'
      let paddingBottom: 'paddingRight' | 'paddingBottom' = 'paddingBottom'
      let marginTop: 'marginTop' | 'marginLeft' = 'marginTop'
      let marginBottom: 'marginRight' | 'marginBottom' = 'marginBottom'
      let scrollHeight: 'scrollHeight' | 'scrollWidth' = 'scrollHeight'
      let transition = `
        height ${duration}ms ${timing},
        padding-top ${duration}ms ${timing},
        padding-bottom ${duration}ms ${timing},
        margin-top ${duration}ms ${timing},
        margin-bottom ${duration}ms ${timing}
      `

      if (props.horizontal) {
        height = 'width'
        paddingTop = 'paddingLeft'
        paddingBottom = 'paddingRight'
        marginTop = 'marginLeft'
        marginBottom = 'marginRight'
        scrollHeight = 'scrollWidth'
        transition = `
          width ${duration}ms ${timing},
          padding-left ${duration}ms ${timing},
          padding-right ${duration}ms ${timing},
          margin-left ${duration}ms ${timing},
          margin-right ${duration}ms ${timing}
        `
      }

      if (props.fadeEffect) {
        transition = `
          ${transition},
          opacity ${duration}ms ease
        `
      }

      const styleRecord: Partial<CSSStyleDeclaration> = {}

      return h(
        Transition,
        {
          appear: props.appear,
          mode: props.mode,
          onBeforeEnter($el) {
            const el = $el as HTMLElement

            styleRecord.paddingTop = el.style[paddingTop]
            styleRecord.paddingBottom = el.style[paddingBottom]
            styleRecord.marginTop = el.style[marginTop]
            styleRecord.marginBottom = el.style[marginBottom]
            styleRecord.transition = el.style.transition
            styleRecord.boxSizing = el.style.boxSizing
            styleRecord.opacity = el.style.opacity

            el.style.transition = transition

            el.style[height] = '0'
            el.style[paddingTop] = '0'
            el.style[paddingBottom] = '0'
            el.style[marginTop] = '0'
            el.style[marginBottom] = '0'
            el.style.boxSizing = 'content-box'

            if (props.fadeEffect) {
              el.style.opacity = '0'
            }

            emitEvent(props.onBeforeEnter, $el)
          },
          onEnter($el, done) {
            const el = $el as HTMLElement

            styleRecord.overflow = el.style.overflow

            if (el[scrollHeight] !== 0) {
              el.style[height] = `${el[scrollHeight]}px`
            } else {
              el.style[height] = ''
            }

            el.style[paddingTop] = styleRecord.paddingTop!
            el.style[paddingBottom] = styleRecord.paddingBottom!
            el.style[marginTop] = styleRecord.marginTop!
            el.style[marginBottom] = styleRecord.marginBottom!
            el.style.overflow = 'hidden'

            if (props.fadeEffect) {
              el.style.opacity = styleRecord.opacity!
            }

            emitEvent(props.onEnter, $el, done)
          },
          onAfterEnter($el) {
            const el = $el as HTMLElement

            el.style.transition = styleRecord.transition || ''
            el.style[height] = ''
            el.style.overflow = styleRecord.overflow!
            el.style.boxSizing = styleRecord.boxSizing!

            emitEvent(props.onAfterEnter, $el)
          },
          onBeforeLeave($el) {
            const el = $el as HTMLElement

            styleRecord.paddingTop = el.style[paddingTop]
            styleRecord.paddingBottom = el.style[paddingBottom]
            styleRecord.marginTop = el.style[marginTop]
            styleRecord.marginBottom = el.style[marginBottom]
            styleRecord.overflow = el.style.overflow
            styleRecord.boxSizing = el.style.boxSizing
            styleRecord.opacity = el.style.opacity

            el.style[height] = `${el[scrollHeight]}px`
            el.style.overflow = 'hidden'

            emitEvent(props.onBeforeLeave, $el)
          },
          onLeave($el, done) {
            const el = $el as HTMLElement

            if (el[scrollHeight] !== 0) {
              styleRecord.transition = el.style.transition

              el.style.transition = transition

              el.style[height] = '0'
              el.style[paddingTop] = '0'
              el.style[paddingBottom] = '0'
              el.style[marginTop] = '0'
              el.style[marginBottom] = '0'

              if (props.fadeEffect) {
                el.style.opacity = '0'
              }
            }

            emitEvent(props.onLeave, $el, done)
          },
          onAfterLeave($el) {
            const el = $el as HTMLElement

            el.style[height] = ''
            el.style[paddingTop] = styleRecord.paddingTop!
            el.style[paddingBottom] = styleRecord.paddingBottom!
            el.style[marginTop] = styleRecord.marginTop!
            el.style[marginBottom] = styleRecord.marginBottom!
            el.style.overflow = styleRecord.overflow!
            el.style.transition = styleRecord.transition || ''
            el.style.boxSizing = styleRecord.boxSizing!
            el.style.opacity = styleRecord.opacity!

            emitEvent(props.onAfterLeave, $el)
          }
        },
        {
          default() {
            return slots.default && slots.default()
          }
        }
      )
    }
  }
})
