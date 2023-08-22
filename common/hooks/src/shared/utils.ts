import { Comment, Fragment, createTextVNode, isVNode, renderSlot, unref } from 'vue'

import { isClient } from '@vexip-ui/utils'

import type { ComponentPublicInstance, Slots, VNode, VNodeNormalizedChildren } from 'vue'
import type { MaybeElement, MaybeInstance, MaybeRef } from './types'

export function createSlotRender(slots: Slots, names: string[]): ((params?: any) => any) | null
export function createSlotRender(
  slots: Slots,
  names: string[],
  fallback: (params?: any) => any
): (params?: any) => any
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

export function unrefElement<T extends string | MaybeInstance>(
  ref: MaybeRef<T>
): T extends string | ComponentPublicInstance ? MaybeElement : T {
  const plain = unref(ref)

  if (typeof plain === 'string') {
    return isClient ? document.querySelector(plain) : (null as any)
  }

  return (plain as ComponentPublicInstance)?.$el ?? plain
}
