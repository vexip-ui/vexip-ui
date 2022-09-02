import { createVNode, render, nextTick } from 'vue'
import { Spin } from '@/components/spin'
import { isObject } from '@vexip-ui/utils'

import type { VNode, ObjectDirective } from 'vue'

interface LoadingRecord {
  spin: VNode,
  props: any,
  originPosition: string
}

export const loading: ObjectDirective<HTMLElement & { __loading?: LoadingRecord }, any> = {
  mounted(el, binding) {
    nextTick(() => {
      const props = isObject(binding.value)
        ? { ...binding.value }
        : ({ active: binding.value } as any)

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
    })
  },
  updated(el, binding) {
    nextTick(() => {
      if (!el.__loading) return

      const props = isObject(binding.value) ? binding.value : { active: binding.value }
      const component = el.__loading.spin.component

      if (component) {
        Object.keys(props).forEach(key => {
          component.props[key] = props[key]
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
