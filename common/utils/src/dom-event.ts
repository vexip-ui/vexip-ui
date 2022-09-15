import { isDefined } from './common'

export interface TransferNode extends Node {
  __transferNode?: Node,
  __transferElement?: Node
}

export interface EventPayload extends EventInit {
  type: string,
  [prop: string]: any
}

export const USE_TOUCH =
  typeof window !== 'undefined' && ('ontouchstart' in window || getMaxTouchPoints() > 0)
export const CLICK_TYPE = USE_TOUCH ? 'touchstart' : 'click'

function getMaxTouchPoints() {
  return typeof navigator !== 'undefined'
    ? navigator.maxTouchPoints || ((navigator as any).msMaxTouchPoints as number) || 0
    : 0
}

const events: Map<string, Set<TransferNode>> = new Map()

export function createEvent(type: string) {
  if (!events.has(type)) {
    events.set(type, new Set())
  }
}

export function getObservers(type: string) {
  return events.get(type) ?? events.set(type, new Set()).get(type)!
}

export function observe(el: TransferNode, types: string | string[]) {
  if (typeof types === 'string') {
    types = [types as string]
  }

  if (Array.isArray(types)) {
    for (let i = 0, len = types.length; i < len; ++i) {
      const type = types[i]

      if (!events.has(type)) {
        events.set(type, new Set())
      }

      events.get(type)!.add(el)
    }
  }
}

export function disconnect(el: TransferNode, types: string | string[]) {
  if (typeof types === 'string') {
    types = [types as string]
  }

  if (Array.isArray(types)) {
    for (let i = 0, len = types.length; i < len; ++i) {
      const type = types[i]

      if (events.has(type)) {
        events.get(type)?.delete(el)
      }
    }
  }
}

export function dispatchEvent(el: TransferNode, payload: EventPayload, Event = window.Event) {
  const { type, bubbles = false, cancelable = false, ...data } = payload

  if (!isDefined(type) || type === '') return false

  let event

  if (isDefined(Event)) {
    event = new Event(type, { bubbles, cancelable })
  } else {
    event = document.createEvent('HTMLEvents')
    event.initEvent(type, bubbles, cancelable)
  }

  Object.assign(event, data)

  return el.dispatchEvent(event)
}
