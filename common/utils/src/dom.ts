import { isClient, isDefined } from './common'
import { isValidNumber, toNumber } from './number'

import type { TransferNode } from './dom-event'

type CSSProperty = 'padding' | 'margin' | 'borderWidth'
type Direction = 'Left' | 'Right' | 'Top' | 'Bottom'
type Axis = 'X' | 'Y'

const AXIS_DIRECTIONS: Record<Axis, [Direction, Direction]> = {
  X: ['Left', 'Right'],
  Y: ['Top', 'Bottom'],
}

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

function isElement<T extends Element = Element>(el?: Element | null): el is T {
  return !!el && el.nodeType === 1
}

function ensureElement(el?: Element | null): HTMLElement {
  return isElement<HTMLElement>(el) ? el : document.body
}

function getAxisValue(el: Element | null | undefined, property: CSSProperty, axis: Axis): number {
  if (!isClient || !el) return 0
  const computedStyle = getComputedStyle(el)
  const [start, end] = AXIS_DIRECTIONS[axis]
  const startValue = parseFloat(computedStyle[`${property}${start}` as keyof CSSStyleDeclaration] as string)
  const endValue = parseFloat(computedStyle[`${property}${end}` as keyof CSSStyleDeclaration] as string)
  return (startValue + endValue) || 0
}

/**
 * 检索匹配指定选择器的所有元素
 * @param selector 选择器
 * @param root 根元素，不指定时为 `document.body`
 * @returns 匹配的所有元素
 */
export function queryAll(selector: string, root?: Element | null): HTMLElement[] {
  if (!isClient || !selector) return []
  return Array.from(ensureElement(root).querySelectorAll(selector))
}

/**
 * 判断指定的元素是否聚焦或包含聚焦的元素
 * @param el 需判断的元素
 * @returns 是否聚焦或包含聚焦的元素
 */
export function isFocusIn(el?: Element | null): boolean {
  if (!isClient) return false
  const activeEl = document.activeElement
  if (!isElement(el) || !activeEl) return false
  return el === activeEl || contains(activeEl, el)
}

/**
 * 判断一个元素是否包含另一个元素
 * @param el 被包含的元素（子元素）
 * @param parent 包含的元素（父元素）
 * @returns 元素是否包含另一个元素
 */
export function contains(el?: Element | null, parent?: Element | null): boolean {
  if (!el || !parent) return false
  const tel = (parent as TransferNode).__transferElement
  return parent.contains(el) || (!!tel && (tel === el || tel.contains(el)))
}

/**
 * 判断指定的元素是否隐藏
 * @param el 需判断的元素
 * @returns 元素是否隐藏
 */
export function isHidden(el?: Element | null): boolean {
  if (!isClient || !isElement(el) || !el.parentNode || !contains(el, document.body)) return true
  if ((el as HTMLElement).style?.display === 'none') return true
  const rect = el.getBoundingClientRect()
  return !(rect && rect.width > 0 && rect.height > 0)
}

/**
 * 判断指定的元素是否可见
 * @param el 需判断的元素
 * @returns 元素是否可见
 */
export function isVisible(el?: Element | null): boolean {
  return !isHidden(el)
}

/**
 * 判断指定的元素是否被禁用
 * @param el 需判断的元素
 * @returns 元素是否被禁用
 */
export function isDisabled(el?: Element | null): boolean {
  if (!isElement<HTMLElement>(el)) return true
  return (el.hasAttribute('disabled') && el.getAttribute('disabled') !== 'false') || 'disabled' in el && (el as { disabled?: boolean }).disabled === true
}

/**
 * 检索可以被切换焦点（Tab）的元素
 * @param root 根元素，不指定时为 `document.body`
 * @param includeDisabled 是否包含被禁用的元素
 * @returns 可以被切换焦点的元素
 */
export function queryTabables(root?: Element | null, includeDisabled = false): HTMLElement[] {
  const isDis = includeDisabled ? () => false : isDisabled
  return queryAll(TABABLE_SELECTOR, root).filter(el => isVisible(el) && el.tabIndex > -1 && !isDis(el))
}

/**
 * 获取元素横向的内边距像素值
 * @param el 指定的元素
 * @returns 元素横向的内边距像素值
 */
export function getXPadding(el: Element | null | undefined): number {
  return getAxisValue(el, 'padding', 'X')
}

/**
 * 获取元素纵向的内边距像素值
 * @param el 指定的元素
 * @returns 元素纵向的内边距像素值
 */
export function getYPadding(el: Element | null | undefined): number {
  return getAxisValue(el, 'padding', 'Y')
}

/**
 * 获取元素横向的外边距像素值
 * @param el 指定的元素
 * @returns 元素横向的外边距像素值
 */
export function getXMargin(el: Element | null | undefined): number {
  return getAxisValue(el, 'margin', 'X')
}

/**
 * 获取元素纵向的外边距像素值
 * @param el 指定的元素
 * @returns 元素纵向的外边距像素值
 */
export function getYMargin(el: Element | null | undefined): number {
  return getAxisValue(el, 'margin', 'Y')
}

/**
 * 获取元素横向的边框像素值
 * @param el 指定的元素
 * @returns 元素横向的边框像素值
 */
export function getXBorder(el: Element | null | undefined): number {
  return getAxisValue(el, 'borderWidth', 'X')
}

/**
 * 获取元素纵向的边框像素值
 * @param el 指定的元素
 * @returns 元素纵向的边框像素值
 */
export function getYBorder(el: Element | null | undefined): number {
  return getAxisValue(el, 'borderWidth', 'Y')
}

/**
 * 获取元素的选中宽度
 * @param el 指定的元素
 * @returns 元素的选中宽度
 */
export function getRangeWidth(el: Element | null | undefined): number {
  if (!isClient || !el) return 0
  const range = document.createRange()
  range.setStart(el, 0)
  range.setEnd(el, el.childNodes.length)
  return range.getBoundingClientRect().width + getXPadding(el)
}

/**
 * 给定的值如果为合法数字，则将转换为像素值
 * @param value 需要判断的值
 * @returns 转换后的像素值
 */
export function toCssSize(value: number | string): string {
  return isValidNumber(value, true) ? `${toNumber(value)}px` : String(value).trim()
}

/**
 * 将指定的值转换为 HTML 属性值
 * @param value 需要转换的值
 * @returns 转换后的 HTML 属性值
 */
export function toAttrValue(value: true): 'true'
export function toAttrValue(value: false | null | undefined): undefined
export function toAttrValue(value: string | number): string
export function toAttrValue(value: string | number | boolean | null | undefined): string | undefined
export function toAttrValue(value?: string | number | boolean | null): string | undefined {
  return isDefined(value) && value !== false ? String(value) : undefined
}
