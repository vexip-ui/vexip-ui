import { isClient, isDefined } from './common'
import { isValidNumber, toNumber } from './number'

import type { TransferNode } from './dom-event'

const TABABLE_SELECTOR: string = [
  'button',
  '[href]:not(.disabled)',
  'input',
  'select',
  'textarea',
  '[tabindex]',
  '[contenteditable]',
]
  .map(s => `${s}:not(:disabled):not([disabled])`)
  .join(', ')

function isHTMLElement(el?: Element | null | undefined): el is HTMLElement {
  return !!el && el.nodeType === 1
}

/**
 * 判断一个值是否为有效的 Element 元素
 *
 * @param value 需判断的值
 *
 * @returns 是否为有效的 Element 元素
 */
export function isValidElement<T extends Element = Element>(
  value: unknown,
): value is T {
  return isHTMLElement(value as Element)
}

function ensureElement(el?: Element | null | undefined) {
  return isHTMLElement(el) ? el : document.body
}

/**
 * 检索匹配指定选择器的所有元素
 *
 * @param selector 选择器
 * @param root 根元素，不指定时为 `document.body`
 *
 * @returns 匹配的所有元素
 */
export function queryAll(selector: string, root?: Element | null | undefined) {
  if (!isClient || !selector) return []

  return Array.from(ensureElement(root).querySelectorAll(selector)) as HTMLElement[]
}

/**
 * 判断指定的元素是否聚焦或包含聚焦的元素
 *
 * @param el 需判断的元素
 *
 * @returns 是否聚焦或包含聚焦的元素
 */
export function isFocusIn(el?: Element | null | undefined) {
  if (!isClient) return false

  const activeEl = document.activeElement as HTMLElement

  if (!isHTMLElement(el) || !activeEl) return false

  return el === activeEl || contains(activeEl, el)
}

/**
 * 判断一个元素是否包含另一个元素
 *
 * @param el 被包含的元素（子元素）
 * @param parent 包含的元素（父元素）
 *
 * @returns 元素是否包含另一个元素
 */
export function contains(el?: Element | null | undefined, parent?: HTMLElement | null | undefined) {
  if (!el || !parent) return false

  const tel = (parent as TransferNode).__transferElement

  return parent.contains(el) || (!!tel && (tel === el || tel.contains(el)))
}

/**
 * 判断指定的元素是否隐藏
 *
 * @param el 需判断的元素
 *
 * @returns 元素是否隐藏
 */
export function isHidden(el?: Element | null | undefined) {
  if (!isClient || !isHTMLElement(el) || !el.parentNode || !contains(el, document.body)) {
    return true
  }

  if (el.style.display === 'none') {
    return true
  }

  const rect = el.getBoundingClientRect()

  return !(rect && rect.width > 0 && rect.height > 0)
}

/**
 * 判断指定的元素是否可见
 *
 * @param el 需判断的元素
 *
 * @returns 元素是否可见
 */
export function isVisible(el?: Element | null | undefined) {
  return !isHidden(el)
}

/**
 * 判断指定的元素是否被禁用
 *
 * @param el 需判断的元素
 *
 * @returns 元素是否被禁用
 */
export function isDisabled(el?: Element | null | undefined) {
  return (
    !isHTMLElement(el) ||
    (el.hasAttribute('disabled') && el.getAttribute('disabled') !== 'false') ||
    (el as HTMLInputElement).disabled
  )
}

/**
 * 检索可以被切换焦点（Tab）的元素
 *
 * @param root 根元素，不指定时为 `document.body`
 * @param includeDisabled 是否包含被禁用的元素
 *
 * @returns 可以被切换焦点的元素
 */
export function queryTabables(root?: HTMLElement | null | undefined, includeDisabled = false) {
  const isDis = includeDisabled ? () => false : isDisabled

  return queryAll(TABABLE_SELECTOR, root).filter(
    el => isVisible(el) && el.tabIndex > -1 && !isDis(el),
  )
}

type CSSBoxProperty = 'padding' | 'margin' | 'border'
type CSSDirection = 'Left' | 'Right' | 'Top' | 'Bottom'

function getBoxValue(
  el: Element | null | undefined,
  type: CSSBoxProperty,
  directions: [CSSDirection, CSSDirection],
): number {
  if (!isClient || !el) return 0

  const computedStyle = getComputedStyle(el)
  const prop = type === 'border' ? 'Width' : ''
  const value =
    parseFloat(computedStyle.getPropertyValue(`${type}${directions[0]}${prop}`)) +
    parseFloat(computedStyle.getPropertyValue(`${type}${directions[1]}${prop}`))

  return value || 0
}

/**
 * 获取元素横向的内边距像素值
 *
 * @param el 指定的元素
 *
 * @returns 元素横向的内边距像素值
 */
export function getXPadding(el: Element | null | undefined): number {
  return getBoxValue(el, 'padding', ['Left', 'Right'])
}

/**
 * 获取元素纵向的内边距像素值
 *
 * @param el 指定的元素
 *
 * @returns 元素纵向的内边距像素值
 */
export function getYPadding(el: Element | null | undefined): number {
  return getBoxValue(el, 'padding', ['Top', 'Bottom'])
}

/**
 * 获取元素横向的外边距像素值
 *
 * @param el 指定的元素
 *
 * @returns 元素横向的外边距像素值
 */
export function getXMargin(el: Element | null | undefined): number {
  return getBoxValue(el, 'margin', ['Left', 'Right'])
}

/**
 * 获取元素纵向的外边距像素值
 *
 * @param el 指定的元素
 *
 * @returns 元素纵向的外边距像素值
 */
export function getYMargin(el: Element | null | undefined): number {
  return getBoxValue(el, 'margin', ['Top', 'Bottom'])
}

/**
 * 获取元素横向的边框像素值
 *
 * @param el 指定的元素
 *
 * @returns 元素横向的边框像素值
 */
export function getXBorder(el: Element | null | undefined): number {
  return getBoxValue(el, 'border', ['Left', 'Right'])
}

/**
 * 获取元素纵向的边框像素值
 *
 * @param el 指定的元素
 *
 * @returns 元素纵向的边框像素值
 */
export function getYBorder(el: Element | null | undefined): number {
  return getBoxValue(el, 'border', ['Top', 'Bottom'])
}

/**
 * 获取元素的选中宽度
 *
 * @param el 指定的元素
 *
 * @returns 元素的选中宽度
 */
export function getRangeWidth(el: Element | null | undefined) {
  if (!isClient || !el) return 0

  const range = document.createRange()

  range.setStart(el, 0)
  range.setEnd(el, el.childNodes.length)

  const rangeWidth = range.getBoundingClientRect().width
  const xPadding = getXPadding(el)

  return rangeWidth + xPadding
}

/**
 * 给定的值如果为合法数字，则将转换为像素值
 *
 * @param value 需要判断的值
 *
 * @returns 转换后的像素值
 */
export function toCssSize(value: number | string) {
  return isValidNumber(value, true) ? `${toNumber(value)}px` : String(value).trim()
}

/**
 * 将指定的值转换为 HTML 属性值
 *
 * @param value 需要转换的值
 *
 * @returns 转换后的 HTML 属性值
 */
export function toAttrValue<T extends string | number | boolean | null | undefined>(
  value: T,
): T extends boolean ? 'true' | undefined : string | undefined {
  return (isDefined(value) && value !== false ? String(value) : undefined) as T extends boolean
    ? 'true' | undefined
    : string | undefined
}

export { isHTMLElement, isHTMLElement as isElement }
