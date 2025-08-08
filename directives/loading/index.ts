import { Spin } from '@/components/spin'

import { createVNode, nextTick, render } from 'vue'

import { isObject } from '@vexip-ui/utils'

import type { SpinProps } from '@/components/spin'
import type { DirectiveBinding, ObjectDirective, VNode } from 'vue'

interface LoadingRecord {
  spin: VNode,
  props: SpinProps,
  originPosition: string,
}

type LoadingElement = HTMLElement & { __loading?: LoadingRecord }

function createSpin(
  el: LoadingElement,
  binding: DirectiveBinding<boolean | SpinProps>,
  vnode: VNode<any, LoadingElement>,
) {
  const props: SpinProps = isObject(binding.value)
    ? { ...binding.value }
    : { active: binding.value }

  props.inner = true

  const spin = createVNode(Spin, props, null, 0, Object.keys(props))
  const position = getComputedStyle(el).position

  spin.appContext = vnode.appContext ?? (vnode as any).ctx?.appContext

  el.__loading = {
    spin,
    props,
    originPosition: position,
  }

  if (position === 'static') {
    el.style.position = 'relative'
  }

  render(spin, el)
}

export const vLoading: ObjectDirective<LoadingElement, boolean | SpinProps> = {
  mounted(el, binding, vnode) {
    nextTick(() => createSpin(el, binding, vnode))
  },
  updated(el, binding, vnode) {
    nextTick(() => {
      if (!el.__loading) {
        createSpin(el, binding, vnode)
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
  },
}
