import { Spin } from '@/components/spin'

import { createVNode, nextTick, render } from 'vue'

import { isObject } from '@vexip-ui/utils'

import type { SpinProps } from '@/components/spin'
import type { DirectiveBinding, ObjectDirective, VNode } from 'vue'

interface LoadingRecord {
  spin: VNode,
  props: SpinProps,
  originPosition: string
}

function createSpin(
  el: HTMLElement & { __loading?: LoadingRecord },
  binding: DirectiveBinding<boolean | SpinProps>
) {
  const props: SpinProps = isObject(binding.value)
    ? { ...binding.value }
    : { active: binding.value }

  props.inner = true

  const spin = createVNode(Spin, props, null, 0, Object.keys(props))
  const position = getComputedStyle(el).position

  el.__loading = {
    spin,
    props,
    originPosition: position
  }

  if (position === 'static') {
    el.style.position = 'relative'
  }

  render(spin, el)
}

export const vLoading: ObjectDirective<
  HTMLElement & { __loading?: LoadingRecord },
  boolean | SpinProps
> = {
  mounted(el, binding) {
    nextTick(() => createSpin(el, binding))
  },
  updated(el, binding) {
    nextTick(() => {
      if (!el.__loading) {
        createSpin(el, binding)
        return
      }

      const props: SpinProps = isObject(binding.value) ? binding.value : { active: binding.value }
      const component = el.__loading.spin.component

      if (component) {
        Object.keys(props).forEach(key => {
          component.props[key] = props[key as keyof SpinProps]
        })

        component.props.inner = true
      }
    })
  },
  beforeUnmount(el) {
    if (!el.__loading) return

    render(null, el)
    delete el.__loading
  }
}
