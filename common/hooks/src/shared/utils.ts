import { Comment, Fragment, createTextVNode, isVNode, renderSlot } from 'vue'

import type { Slots, VNode, VNodeNormalizedChildren } from 'vue'

export function createSlotRender(slots: Slots, names: string[], fallback?: (params?: any) => any) {
  for (const name of names) {
    if (slots[name]) {
      return (params: any) => renderSlot(slots, name, params)
    }
  }

  return fallback || null
}

export function flatVNodes(children: VNodeNormalizedChildren) {
  const result: VNode[] = []
  const loop = Array.isArray(children) ? [...children] : []

  while (loop.length) {
    const vnode = loop.shift()!

    if (vnode === null) continue

    if (Array.isArray(vnode)) {
      loop.unshift(...vnode)
    }

    if (
      typeof vnode !== 'string' &&
      typeof vnode !== 'number' &&
      (!isVNode(vnode) || vnode.type === Comment)
    ) {
      continue
    }

    if (typeof vnode === 'string' || typeof vnode === 'number') {
      result.push(createTextVNode(String(vnode)))
    } else if (vnode.type === Fragment && Array.isArray(vnode.children)) {
      loop.unshift(vnode.children)
    } else {
      result.push(vnode)
    }
  }

  return result
}
