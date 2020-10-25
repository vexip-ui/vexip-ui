function implementHandler(handler, ...args) {
  if (Array.isArray(handler)) {
    for (const _handler of handler) {
      typeof _handler === 'function' && _handler(...args)
    }
  } else {
    typeof handler === 'function' && handler(...args)
  }
}

export default {
  name: 'CollapseTransition',
  functional: true,
  props: {
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
      validator(value) {
        return value >= 200
      }
    },
    fadeEffect: {
      type: Boolean,
      default: false
    }
  },
  render(h, { props, children, listeners }) {
    const duration = props.duration

    let height = 'height'
    let paddingTop = 'paddingTop'
    let paddingBottom = 'paddingBottom'
    let marginTop = 'marginTop'
    let marginBottom = 'marginBottom'
    let scrollHeight = 'scrollHeight'
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

    const styleRecord = {}

    const data = {
      props: {
        appear: props.appear
      },
      on: {
        beforeEnter(el) {
          styleRecord.paddingTop = el.style[paddingTop]
          styleRecord.paddingBottom = el.style[paddingBottom]
          styleRecord.marginTop = el.style[marginTop]
          styleRecord.marginBottom = el.style[marginBottom]
          styleRecord.transition = el.style[transition]
          styleRecord.boxSizing = el.style.boxSizing
          styleRecord.opacity = el.style.opacity

          el.style.transition = transition

          el.style[height] = 0
          el.style[paddingTop] = 0
          el.style[paddingBottom] = 0
          el.style[marginTop] = 0
          el.style[marginBottom] = 0
          el.style.boxSizing = 'content-box'

          if (props.fadeEffect) {
            el.style.opacity = 0
          }

          implementHandler(listeners['before-enter'], el)
        },
        enter(el) {
          styleRecord.overflow = el.style.overflow

          if (el.scrollHeight !== 0) {
            el.style[height] = `${el[scrollHeight]}px`
          } else {
            el.style[height] = ''
          }

          el.style[paddingTop] = styleRecord.paddingTop
          el.style[paddingBottom] = styleRecord.paddingBottom
          el.style[marginTop] = styleRecord.marginTop
          el.style[marginBottom] = styleRecord.marginBottom
          el.style.overflow = 'hidden'

          if (props.fadeEffect) {
            el.style.opacity = styleRecord.opacity
          }

          implementHandler(listeners.enter, el)
        },
        afterEnter(el) {
          el.style.transition = styleRecord.transition || ''
          el.style[height] = ''
          el.style.overflow = styleRecord.overflow
          el.style.boxSizing = styleRecord.boxSizing

          implementHandler(listeners['after-enter'], el)
        },
        beforeLeave(el) {
          styleRecord.paddingTop = el.style[paddingTop]
          styleRecord.paddingBottom = el.style[paddingBottom]
          styleRecord.marginTop = el.style[marginTop]
          styleRecord.marginBottom = el.style[marginBottom]
          styleRecord.overflow = el.style.overflow
          styleRecord.boxSizing = el.style.boxSizing
          styleRecord.opacity = el.style.opacity

          el.style[height] = `${el[scrollHeight]}px`
          el.style.overflow = 'hidden'

          implementHandler(listeners['before-leave'], el)
        },
        leave(el) {
          if (el[scrollHeight] !== 0) {
            styleRecord.transition = el.style.transition

            el.style.transition = transition

            el.style[height] = 0
            el.style[paddingTop] = 0
            el.style[paddingBottom] = 0
            el.style[marginTop] = 0
            el.style[marginBottom] = 0

            if (props.fadeEffect) {
              el.style.opacity = 0
            }
          }

          implementHandler(listeners.leave, el)
        },
        afterLeave(el) {
          el.style[height] = ''
          el.style[paddingTop] = styleRecord.paddingTop
          el.style[paddingBottom] = styleRecord.paddingBottom
          el.style[marginTop] = styleRecord.marginTop
          el.style[marginBottom] = styleRecord.marginBottom
          el.style.overflow = styleRecord.overflow
          el.style.transition = styleRecord.transition || ''
          el.style.boxSizing = styleRecord.boxSizing
          el.style.opacity = styleRecord.opacity

          implementHandler(listeners['after-leave'], el)
        }
      }
    }

    return h('transition', data, children)
  }
}
