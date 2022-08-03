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
