import { isNull, getType } from './common'

interface TransferNode extends Node {
  __transferNode?: Node
}

interface EventPayload extends EventInit {
  type: string
  [prop: string]: any
}

export const USE_TOUCH =
  !isNull(window) &&
  ('ontouchstart' in window ||
    (!isNull(navigator) && navigator.msMaxTouchPoints > 0))
export const CLICK_TYPE = USE_TOUCH ? 'touchstart' : 'click'

export const CLICK_OUTSIDE = 'clickoutside'

const events: { [prop: string]: Set<TransferNode> } = {
  [CLICK_OUTSIDE]: new Set()
}

document.addEventListener(
  CLICK_TYPE,
  (event: Event & { path?: TransferNode[] }) => {
    const target = event.target
    const type = CLICK_OUTSIDE
    const path = event.path || (event.composedPath && event.composedPath())

    events[type].forEach((el: TransferNode) => {
      if (
        el !== target &&
        !(path ? path.includes(el) : el.contains(target as Node)) &&
        (!el.__transferNode ||
          (el.__transferNode !== target &&
            !el.__transferNode.contains(target as Node)))
      ) {
        dispatchEvent(el, { type })
      }
    })
  }
)

export function observe(el: TransferNode, types: string | string[]): void {
  if (getType(types) === 'string') {
    types = [types as string]
  }

  if (getType(types) === 'array') {
    for (let i = 0, len = types.length; i < len; i++) {
      const type = types[i]

      if (events[type]) {
        events[type].add(el)
      }
    }
  }
}

export function disconnect(el: TransferNode, types: string | string[]): void {
  if (getType(types) === 'string') {
    types = [types as string]
  }

  if (getType(types) === 'array') {
    for (let i = 0, len = types.length; i < len; i++) {
      const type = types[i]

      if (events[type]) {
        events[type].delete(el)
      }
    }
  }
}

export function dispatchEvent(
  el: TransferNode,
  payload: EventPayload,
  Event = window.Event
): boolean {
  const { type, bubbles = false, cancelable = false, ...data } = payload

  if (isNull(type) || type === '') return false

  let event

  if (!isNull(Event)) {
    event = new Event(type, { bubbles, cancelable })
  } else {
    event = document.createEvent('HTMLEvents')
    event.initEvent(type, bubbles, cancelable)
  }

  Object.assign(event, data)

  return el.dispatchEvent(event)
}
