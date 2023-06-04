import { Transition, defineComponent, h } from 'vue'

import { emitEvent, useProps } from '@vexip-ui/config'
import { collapseTransitionProps } from './props'

export default defineComponent({
  name: 'CollapseTransition',
  props: collapseTransitionProps,
  emits: [],
  setup(_props, { slots }) {
    const props = useProps('collapseTransition', _props, {
      appear: false,
      mode: {
        default: 'default',
        validator: value => ['in-out', 'out-in', 'default'].includes(value)
      },
      horizontal: false,
      duration: {
        default: 250,
        validator: (value: number) => value >= 200
      },
      timing: null,
      fadeEffect: false
    })

    let enterStage: 'before' | 'in' | null = null
    let leaveStage: 'before' | 'in' | null = null

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
          padding-inline-start ${duration}ms ${timing},
          padding-inline-end ${duration}ms ${timing},
          margin-inline-start ${duration}ms ${timing},
          margin-inline-end ${duration}ms ${timing}
        `
      }

      if (props.fadeEffect) {
        transition = `
          ${transition},
          opacity ${duration}ms ease
        `
      }

      const enterRecord: Partial<CSSStyleDeclaration> = {}
      const leaveRecord: Partial<CSSStyleDeclaration> = {}

      return h(
        Transition,
        {
          appear: props.appear,
          mode: props.mode,
          onBeforeEnter($el) {
            if (enterStage) return

            enterStage = 'before'
            const el = $el as HTMLElement

            enterRecord.paddingTop = el.style[paddingTop]
            enterRecord.paddingBottom = el.style[paddingBottom]
            enterRecord.marginTop = el.style[marginTop]
            enterRecord.marginBottom = el.style[marginBottom]
            enterRecord.transition = el.style.transition
            enterRecord.boxSizing = el.style.boxSizing
            enterRecord.opacity = el.style.opacity

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
          onEnter($el) {
            if (enterStage === 'in') return

            enterStage = 'in'
            const el = $el as HTMLElement

            enterRecord.overflow = el.style.overflow

            if (el[scrollHeight] !== 0) {
              el.style[height] = `${el[scrollHeight]}px`
            } else {
              el.style[height] = ''
            }

            el.style[paddingTop] = enterRecord.paddingTop!
            el.style[paddingBottom] = enterRecord.paddingBottom!
            el.style[marginTop] = enterRecord.marginTop!
            el.style[marginBottom] = enterRecord.marginBottom!
            el.style.overflow = 'hidden'

            if (props.fadeEffect) {
              el.style.opacity = enterRecord.opacity!
            }

            emitEvent(props.onEnter, $el)
          },
          onAfterEnter($el) {
            const el = $el as HTMLElement

            el.style.transition = enterRecord.transition || ''
            el.style[height] = ''
            el.style.overflow = enterRecord.overflow!
            el.style.boxSizing = enterRecord.boxSizing!

            enterStage = null
            emitEvent(props.onAfterEnter, $el)
          },
          onEnterCancelled($el) {
            const el = $el as HTMLElement

            el.style.transition = enterRecord.transition || ''
            el.style[height] = ''
            el.style.overflow = enterRecord.overflow!
            el.style.boxSizing = enterRecord.boxSizing!

            enterStage = null
            emitEvent(props.onEnterCancelled, $el)
          },
          onBeforeLeave($el) {
            if (leaveStage) return

            leaveStage = 'before'
            const el = $el as HTMLElement

            leaveRecord.paddingTop = el.style[paddingTop]
            leaveRecord.paddingBottom = el.style[paddingBottom]
            leaveRecord.marginTop = el.style[marginTop]
            leaveRecord.marginBottom = el.style[marginBottom]
            leaveRecord.overflow = el.style.overflow
            leaveRecord.boxSizing = el.style.boxSizing
            leaveRecord.opacity = el.style.opacity

            el.style[height] = `${el[scrollHeight]}px`
            el.style.overflow = 'hidden'

            emitEvent(props.onBeforeLeave, $el)
          },
          onLeave($el) {
            if (leaveStage === 'in') return

            leaveStage = 'in'
            const el = $el as HTMLElement

            if (el[scrollHeight] !== 0) {
              leaveRecord.transition = el.style.transition

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

            emitEvent(props.onLeave, $el)
          },
          onAfterLeave($el) {
            const el = $el as HTMLElement

            el.style[height] = ''
            el.style[paddingTop] = leaveRecord.paddingTop!
            el.style[paddingBottom] = leaveRecord.paddingBottom!
            el.style[marginTop] = leaveRecord.marginTop!
            el.style[marginBottom] = leaveRecord.marginBottom!
            el.style.overflow = leaveRecord.overflow!
            el.style.transition = leaveRecord.transition || ''
            el.style.boxSizing = leaveRecord.boxSizing!
            el.style.opacity = leaveRecord.opacity!

            leaveStage = null
            emitEvent(props.onAfterLeave, $el)
          },
          onLeaveCancelled($el) {
            const el = $el as HTMLElement

            el.style[height] = ''
            el.style[paddingTop] = leaveRecord.paddingTop!
            el.style[paddingBottom] = leaveRecord.paddingBottom!
            el.style[marginTop] = leaveRecord.marginTop!
            el.style[marginBottom] = leaveRecord.marginBottom!
            el.style.overflow = leaveRecord.overflow!
            el.style.transition = leaveRecord.transition || ''
            el.style.boxSizing = leaveRecord.boxSizing!
            el.style.opacity = leaveRecord.opacity!

            leaveStage = null
            emitEvent(props.onLeaveCancelled, $el)
          }
        },
        {
          default: () => slots.default && slots.default()
        }
      )
    }
  }
})
