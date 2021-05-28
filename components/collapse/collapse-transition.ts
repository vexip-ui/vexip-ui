import { defineComponent, h, Transition } from 'vue'
import { useConfiguredProps } from '@/common/config/install'

const props = useConfiguredProps('collapseTransition', {
  appear: {
    type: Boolean,
    default: false
  },
  horizontal: {
    type: Boolean,
    default: false
  },
  duration: {
    type: Number,
    default: 250,
    validator: (value: number) => {
      return value >= 200
    }
  },
  fadeEffect: {
    type: Boolean,
    default: false
  }
})

export default defineComponent({
  name: 'CollapseTransition',
  functional: true,
  props,
  emits: ['before-enter', 'enter', 'after-enter', 'before-leave', 'leave', 'after-leave'],
  setup(props, { slots, emit }) {
    return () => {
      const duration = props.duration

      let height: 'width' | 'height' = 'height'
      let paddingTop: 'paddingTop' | 'paddingLeft' = 'paddingTop'
      let paddingBottom: 'paddingRight' | 'paddingBottom' = 'paddingBottom'
      let marginTop: 'marginTop' | 'marginLeft' = 'marginTop'
      let marginBottom: 'marginRight' | 'marginBottom' = 'marginBottom'
      let scrollHeight: 'scrollHeight' | 'scrollWidth' = 'scrollHeight'
      let transition = `
        height ${duration}ms ease-in-out,
        padding-top ${duration}ms ease-in-out,
        padding-bottom ${duration}ms ease-in-out,
        margin-top ${duration}ms ease-in-out,
        margin-bottom ${duration}ms ease-in-out
      `

      if (props.horizontal) {
        height = 'width'
        paddingTop = 'paddingLeft'
        paddingBottom = 'paddingRight'
        marginTop = 'marginLeft'
        marginBottom = 'marginRight'
        scrollHeight = 'scrollWidth'
        transition = `
          width ${duration}ms ease-in-out,
          padding-left ${duration}ms ease-in-out,
          padding-right ${duration}ms ease-in-out,
          margin-left ${duration}ms ease-in-out,
          margin-right ${duration}ms ease-in-out
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
          props: {
            appear: props.appear
          },
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

            emit('before-enter', $el)
          },
          onEnter($el) {
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

            emit('enter', $el)
          },
          onAfterEnter($el) {
            const el = $el as HTMLElement

            el.style.transition = styleRecord.transition || ''
            el.style[height] = ''
            el.style.overflow = styleRecord.overflow!
            el.style.boxSizing = styleRecord.boxSizing!

            emit('after-enter', $el)
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

            emit('before-leave', $el)
          },
          onLeave($el) {
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

            emit('leave', $el)
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

            emit('after-leave', $el)
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
