import { isClient } from './common'
import { isValidNumber, toNumber } from './number'

import type { TransferNode } from './dom-event'

const TABABLE_SELECTOR = [
  'button',
  '[href]:not(.disabled)',
  'input',
  'select',
  'textarea',
  '[tabindex]',
  '[contenteditable]'
]
  .map(s => `${s}:not(:disabled):not([disabled])`)
  .join(', ')

function isElement(el?: Element | null): el is HTMLElement {
  return !!el && el.nodeType === 1
}

function ensureElement(el?: Element | null) {
  return isElement(el) ? el : document.body
}

/**
 * 检索匹配指定选择器的所有元素
 *
 * @param selector 选择器
 * @param root 根元素，不指定时为 `document.body`
 *
 * @returns 匹配的所有元素
 */
export function queryAll(selector: string, root?: Element | null) {
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
export function isFocusIn(el?: Element | null) {
  if (!isClient) return false

  const activeEl = document.activeElement as HTMLElement

  if (!isElement(el) || !activeEl) return false

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
export function contains(el?: Element | null, parent?: HTMLElement | null) {
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
export function isHidden(el?: Element | null) {
  if (!isClient || !isElement(el) || !el.parentNode || !contains(el, document.body)) {
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
export function isVisible(el?: Element | null) {
  return !isHidden(el)
}

/**
 * 判断指定的元素是否被禁用
 *
 * @param el 需判断的元素
 *
 * @returns 元素是否被禁用
 */
export function isDisabled(el?: Element | null) {
  return (
    !isElement(el) ||
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
export function queryTabables(root?: HTMLElement, includeDisabled = false) {
  const isDis = includeDisabled ? () => false : isDisabled

  return queryAll(TABABLE_SELECTOR, root).filter(
    el => isVisible(el) && el.tabIndex > -1 && !isDis(el)
  )
}

/**
 * 获取元素横向的内边距像素值
 *
 * @param el 指定的元素
 *
 * @returns 元素横向的内边距像素值
 */
export function getXPadding(el: HTMLElement | null) {
  if (!isClient || !el) return 0

  const computedStyle = getComputedStyle(el)
  const padding = parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight)

  return padding || 0
}

/**
 * 获取元素纵向的内边距像素值
 *
 * @param el 指定的元素
 *
 * @returns 元素纵向的内边距像素值
 */
export function getYPadding(el: HTMLElement | null) {
  if (!isClient || !el) return 0

  const computedStyle = getComputedStyle(el)
  const padding = parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom)

  return padding || 0
}

/**
 * 获取元素横向的外边距像素值
 *
 * @param el 指定的元素
 *
 * @returns 元素横向的外边距像素值
 */
export function getXMargin(el: HTMLElement | null) {
  if (!isClient || !el) return 0

  const computedStyle = getComputedStyle(el)
  const margin = parseFloat(computedStyle.marginLeft) + parseFloat(computedStyle.marginRight)

  return margin || 0
}

/**
 * 获取元素纵向的外边距像素值
 *
 * @param el 指定的元素
 *
 * @returns 元素纵向的外边距像素值
 */
export function getYMargin(el: HTMLElement | null) {
  if (!isClient || !el) return 0

  const computedStyle = getComputedStyle(el)
  const margin = parseFloat(computedStyle.marginTop) + parseFloat(computedStyle.marginBottom)

  return margin || 0
}

/**
 * 获取元素横向的边框像素值
 *
 * @param el 指定的元素
 *
 * @returns 元素横向的边框像素值
 */
export function getXBorder(el: HTMLElement | null) {
  if (!isClient || !el) return 0

  const computedStyle = getComputedStyle(el)
  const width =
    parseFloat(computedStyle.borderLeftWidth) + parseFloat(computedStyle.borderRightWidth)

  return width || 0
}

/**
 * 获取元素纵向的边框像素值
 *
 * @param el 指定的元素
 *
 * @returns 元素纵向的边框像素值
 */
export function getYBorder(el: HTMLElement | null) {
  if (!isClient || !el) return 0

  const computedStyle = getComputedStyle(el)
  const width =
    parseFloat(computedStyle.borderTopWidth) + parseFloat(computedStyle.borderBottomWidth)

  return width || 0
}

/**
 * 获取元素的选中宽度
 *
 * @param el 指定的元素
 *
 * @returns 元素的选中宽度
 */
export function getRangeWidth(el: HTMLElement | null) {
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
 */
export function toCssSize(value: number | string) {
  return isValidNumber(value, true) ? `${toNumber(value)}px` : String(value).trim()
}
