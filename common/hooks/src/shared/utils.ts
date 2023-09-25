import { Comment, Fragment, createTextVNode, isVNode, renderSlot, unref } from 'vue'

import { ensureArray, isClient } from '@vexip-ui/utils'

import type {
  ComponentPublicInstance,
  Slots,
  VNode,
  VNodeChild,
  VNodeNormalizedChildren
} from 'vue'
import type { MaybeElement, MaybeInstance, MaybeRef } from './types'

export function createSlotRender(
  slots: Slots,
  names: string[]
): ((params?: any) => VNodeChild) | null
export function createSlotRender(
  slots: Slots,
  names: string[],
  fallback: (params?: any) => VNodeChild
): (params?: any) => VNodeChild
export function createSlotRender(
  slots: Slots,
  names: string[],
  fallback?: (params?: any) => VNodeChild
) {
  for (const name of names) {
    if (slots[name]) {
      return (params: any) =>
        renderSlot(slots, name, params, () => {
          const vnodes = fallback?.(params)

          return vnodes ? ensureArray(vnodes) : []
        })
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

export function proxyExposed<T>(vnode: VNode): T {
  return new Proxy({} as any, {
    get(_, key) {
      if (!vnode.component) return undefined

      return (
        (vnode.component.proxy as any)?.[key] ??
        (vnode.component.exposeProxy as any)?.[key] ??
        (vnode.component.exposed as any)?.[key]
      )
    }
  }) as T
}
