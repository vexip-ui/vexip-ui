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
    }
  },
  render(h, { props, children }) {
    let height = 'height'
    let paddingTop = 'paddingTop'
    let paddingBottom = 'paddingBottom'
    let scrollHeight = 'scrollHeight'
    let transition = `
      height 200ms ease-in-out,
      padding-top 200ms ease,
      padding-bottom 200ms ease
    `

    if (props.horizontal) {
      height = 'width'
      paddingTop = 'paddingLeft'
      paddingBottom = 'paddingRight'
      scrollHeight = 'scrollWidth'
      transition = `
        width 200ms ease-in-out,
        padding-left 200ms ease,
        padding-right 200ms ease
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
          styleRecord.transition = el.style[transition]
          styleRecord.boxSizing = el.style.boxSizing

          el.style.transition = transition

          el.style[height] = 0
          el.style[paddingTop] = 0
          el.style[paddingBottom] = 0
          el.style.boxSizing = 'content-box'
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
          el.style.overflow = 'hidden'
        },
        afterEnter(el) {
          el.style.transition = styleRecord.transition
          el.style[height] = ''
          el.style.overflow = styleRecord.overflow
          el.style.boxSizing = styleRecord.boxSizing
        },
        beforeLeave(el) {
          styleRecord.paddingTop = el.style[paddingTop]
          styleRecord.paddingBottom = el.style[paddingBottom]
          styleRecord.overflow = el.style.overflow
          styleRecord.boxSizing = el.style.boxSizing

          el.style[height] = `${el[scrollHeight]}px`
          el.style.overflow = 'hidden'
        },
        leave(el) {
          if (el[scrollHeight] !== 0) {
            styleRecord.transition = el.style.transition

            el.style.transition = transition

            el.style[height] = 0
            el.style[paddingTop] = 0
            el.style[paddingBottom] = 0
          }
        },
        afterLeave(el) {
          el.style[height] = ''
          el.style[paddingTop] = styleRecord.paddingTop
          el.style[paddingBottom] = styleRecord.paddingBottom
          el.style.overflow = styleRecord.overflow
          el.style.transition = styleRecord.transition
          el.style.boxSizing = styleRecord.boxSizing
        }
      }
    }

    return h('transition', data, children)
  }
}
