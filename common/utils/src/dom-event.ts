import { isClient, isDefined } from './common'

/**
 * 专用的类型，用于适配 Vexip UI 中 `transfer` 属性的处理
 */
export interface TransferNode extends Element {
  __transferElement?: Element | null,
}

export interface EventPayload extends EventInit {
  /**
   * 事件的类型
   */
  type: string,
  [prop: string]: any,
}

/**
 * 当前是否可以使用触摸交互
 */
export const USE_TOUCH = isClient && ('ontouchstart' in window || getMaxTouchPoints() > 0)
/**
 * 当前点击的类型，可以使用触摸交互时为 `pointerdown`，否则为 `click`
 */
export const CLICK_TYPE = USE_TOUCH ? 'pointerdown' : 'click'

function getMaxTouchPoints() {
  return typeof navigator !== 'undefined'
    ? navigator.maxTouchPoints || ((navigator as any).msMaxTouchPoints as number) || 0
    : 0
}

/**
 * 为指定的元素派发事件
 *
 * @param el 指定的元素
 * @param payload 事件的属性
 * @param Event 事件类
 *
 * @returns 事件是否派发成功
 */
export function dispatchEvent(el: Element, payload: EventPayload, Event = window.Event) {
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
