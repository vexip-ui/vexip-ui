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
  return !!el && el.nodeType === Node.ELEMENT_NODE
}

function ensureElement(el?: Element | null) {
  return isElement(el) ? el : document.body
}

export function queryAll(selector: string, root?: Element | null) {
  if (!selector) return []

  return Array.from(ensureElement(root).querySelectorAll(selector)) as HTMLElement[]
}

export function isFocusIn(el?: Element | null) {
  const activeEl = document.activeElement as HTMLElement

  if (!isElement(el) || !activeEl) return false

  return el === activeEl || contains(activeEl, el)
}

export function contains(el?: Element | null, parent?: HTMLElement | null) {
  if (!el || !parent) return false

  const tel = (parent as TransferNode).__transferElement

  return parent.contains(el) || (!!tel && (tel === el || tel.contains(el)))
}

export function isHidden(el?: Element | null) {
  if (!isElement(el) || !el.parentNode || !contains(el, document.body)) {
    return true
  }

  if (el.style.display === 'none') {
    return true
  }

  const rect = el.getBoundingClientRect()

  return !(rect && rect.width > 0 && rect.height > 0)
}

export function isVisible(el?: Element | null) {
  return !isHidden(el)
}

export function isDisabled(el?: Element | null) {
  return (
    !isElement(el) ||
    (el.hasAttribute('disabled') && el.getAttribute('disabled') !== 'false') ||
    (el as HTMLInputElement).disabled
  )
}

export function queryTabables(root?: HTMLElement, includeDisabled = false) {
  const isDis = includeDisabled ? () => false : isDisabled

  return queryAll(TABABLE_SELECTOR, root).filter(
    el => isVisible(el) && el.tabIndex > -1 && !isDis(el)
  )
}

export function getXPadding(el: HTMLElement | null) {
  if (!el) return 0

  const computedStyle = getComputedStyle(el)
  const padding = parseFloat(computedStyle.paddingLeft) + parseFloat(computedStyle.paddingRight)

  return padding || 0
}

export function getYPadding(el: HTMLElement | null) {
  if (!el) return 0

  const computedStyle = getComputedStyle(el)
  const padding = parseFloat(computedStyle.paddingTop) + parseFloat(computedStyle.paddingBottom)

  return padding || 0
}

export function getXMargin(el: HTMLElement | null) {
  if (!el) return 0

  const computedStyle = getComputedStyle(el)
  const margin = parseFloat(computedStyle.marginLeft) + parseFloat(computedStyle.marginRight)

  return margin || 0
}

export function getYMargin(el: HTMLElement | null) {
  if (!el) return 0

  const computedStyle = getComputedStyle(el)
  const margin = parseFloat(computedStyle.marginTop) + parseFloat(computedStyle.marginBottom)

  return margin || 0
}

export function getXBorder(el: HTMLElement | null) {
  if (!el) return 0

  const computedStyle = getComputedStyle(el)
  const width =
    parseFloat(computedStyle.borderLeftWidth) + parseFloat(computedStyle.borderRightWidth)

  return width || 0
}

export function getYBorder(el: HTMLElement | null) {
  if (!el) return 0

  const computedStyle = getComputedStyle(el)
  const width =
    parseFloat(computedStyle.borderTopWidth) + parseFloat(computedStyle.borderBottomWidth)

  return width || 0
}

export function getRangeWidth(el: HTMLElement | null) {
  if (!el) return 0

  const range = document.createRange()

  range.setStart(el, 0)
  range.setEnd(el, el.childNodes.length)

  const rangeWidth = range.getBoundingClientRect().width
  const xPadding = getXPadding(el)

  return rangeWidth + xPadding
}
