import { createPopper } from '@popperjs/core'
import { useConfigurableProps } from '../../src/config/properties'

export const placementWhileList = [
  'auto',
  'auto-start',
  'auto-end',
  'top',
  'top-start',
  'top-end',
  'bottom',
  'bottom-start',
  'bottom-end',
  'left',
  'left-start',
  'left-end',
  'right',
  'right-start',
  'right-end'
]

export function usePopper(params = {}) {
  const isDrop = params.isDrop === true

  const props = useConfigurableProps({
    transfer: {
      type: [Boolean, String],
      default: false
    },
    placement: {
      default: 'bottom',
      validator(value) {
        return placementWhileList.includes(value)
      }
    }
  })

  return {
    props,
    data() {
      return {
        popperParent: null
      }
    },
    watch: {
      placement(value) {
        this.popper && this.popper.setOptions({ placement: value })
      }
    },
    beforeDestroy() {
      this.destroyPopper()
    },
    deactivated() {
      this.destroyPopper()
    },
    methods: {
      createPopper() {
        let { reference, popper } = this.$refs

        if (!reference) {
          reference = this.referenceObject
          // referenceObject {
          //   getBoundingClientRect : function => ElementRect
          //   clientWidth : number
          //   clientHeight : number
          // }
        }

        if (!reference || !popper) return

        if (this.transfer) {
          this.__targetNode = document.body

          if (typeof this.transfer === 'string') {
            this.__targetNode =
              document.querySelector(this.transfer) || document.body
          }

          this.popperParent = popper.parentNode

          if (!this.popperParent) {
            console.error('[Vexip warn] Popper element is not in the document')

            return
          }

          if (!this.popperHome) {
            this.popperHome = document.createComment('')
          }

          this.popperParent.replaceChild(this.popperHome, popper)
          this.$el.__transferNode = popper
          this.__targetNode.appendChild(popper)
        }

        let options = {
          placement: this.placement,
          modifiers: [
            {
              name: 'preventOverflow',
              options: {
                rootBoundary: 'window'
              }
            },
            {
              name: 'computeStyles',
              options: {
                gpuAcceleration: false
              }
            }
          ]
        }

        if (isDrop) {
          options.modifiers.push({
            name: 'setTransformOrigin',
            enabled: true,
            phase: 'afterWrite',
            fn({ state }) {
              const origin = setPopperDropOrigin(state.placement)

              if (origin) {
                state.elements.popper.style.transformOrigin = origin
              }
            }
          })
        }

        if (this.popperOptions) {
          options = {
            ...options,
            ...this.popperOptions
          }
        }

        this.popper = createPopper(reference, popper, options)
        this.popperElement = this.$refs.popper
      },
      updatePopper() {
        this.$nextTick(() => {
          if (this.popper) {
            this.popper.forceUpdate()
          } else {
            this.createPopper()
          }
        })
      },
      destroyPopper() {
        if (
          this.popperElement &&
          this.popperElement.parentNode === this.__targetNode
        ) {
          this.__targetNode.removeChild(this.popperElement)
        }

        if (this.popperParent && this.$refs.popper && this.popperHome) {
          this.popperParent.replaceChild(this.$refs.popper, this.popperHome)
        }

        this.popper && this.popper.destroy()
        this.popper = null
        this.popperElement = null
        this.popperParent = null
      }
    }
  }
}

/**
 * @param {String} placement
 */
function setPopperDropOrigin(placement) {
  if (placement !== 'left' && placement !== 'right') {
    const [placementStart, placementEnd] = placement.split('-')

    return placementStart === 'bottom' ||
      (placementStart !== 'top' && placementEnd === 'start')
      ? 'center top'
      : 'center bottom'
  }
}
