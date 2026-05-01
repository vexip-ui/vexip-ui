import { describe, expect, it, vi, beforeEach, afterEach } from 'vitest'
import {
  queryAll,
  isFocusIn,
  contains,
  isHidden,
  isVisible,
  isDisabled,
  queryTabables,
  getXPadding,
  getYPadding,
  getXMargin,
  getYMargin,
  getXBorder,
  getYBorder,
  getRangeWidth,
  toCssSize,
  toAttrValue,
} from '../src'

describe('dom', () => {
  // Mock document and window for SSR testing
  const originalWindow = globalThis.window
  const originalDocument = globalThis.document

  afterEach(() => {
    vi.restoreAllMocks()
  })

  describe('queryAll', () => {
    it('should return empty array when not in client', () => {
      // @ts-expect-error - mocking window
      globalThis.window = undefined
      expect(queryAll('.test')).toEqual([])
      globalThis.window = originalWindow
    })

    it('should return empty array for empty selector', () => {
      expect(queryAll('')).toEqual([])
    })

    it('should query elements with selector', () => {
      const div = document.createElement('div')
      div.className = 'test-element'
      document.body.appendChild(div)

      const results = queryAll('.test-element')
      expect(results.length).toBeGreaterThanOrEqual(1)
      expect(results[0]).toBeInstanceOf(HTMLElement)

      document.body.removeChild(div)
    })

    it('should query within root element', () => {
      const root = document.createElement('div')
      const child = document.createElement('span')
      child.className = 'child'
      root.appendChild(child)
      document.body.appendChild(root)

      const results = queryAll('.child', root)
      expect(results).toHaveLength(1)
      expect(results[0]).toBe(child)

      document.body.removeChild(root)
    })

    it('should handle null root', () => {
      const div = document.createElement('div')
      div.className = 'null-root-test'
      document.body.appendChild(div)

      const results = queryAll('.null-root-test', null)
      expect(results.length).toBeGreaterThanOrEqual(1)

      document.body.removeChild(div)
    })

    it('should handle undefined root', () => {
      const div = document.createElement('div')
      div.className = 'undefined-root-test'
      document.body.appendChild(div)

      const results = queryAll('.undefined-root-test', undefined)
      expect(results.length).toBeGreaterThanOrEqual(1)

      document.body.removeChild(div)
    })
  })

  describe('isFocusIn', () => {
    it('should return false when not in client', () => {
      // @ts-expect-error - mocking window
      globalThis.window = undefined
      expect(isFocusIn(document.body)).toBe(false)
      globalThis.window = originalWindow
    })

    it('should return false for null element', () => {
      expect(isFocusIn(null)).toBe(false)
    })

    it('should return false for undefined element', () => {
      expect(isFocusIn(undefined)).toBe(false)
    })

    it('should return true when element is active', () => {
      const input = document.createElement('input')
      document.body.appendChild(input)
      input.focus()

      expect(isFocusIn(input)).toBe(true)

      document.body.removeChild(input)
    })

    it('should return true when element contains active element', () => {
      const parent = document.createElement('div')
      const input = document.createElement('input')
      parent.appendChild(input)
      document.body.appendChild(parent)
      input.focus()

      expect(isFocusIn(parent)).toBe(true)

      document.body.removeChild(parent)
    })
  })

  describe('contains', () => {
    it('should return false when el is null', () => {
      const parent = document.createElement('div')
      expect(contains(null, parent)).toBe(false)
    })

    it('should return false when parent is null', () => {
      const child = document.createElement('div')
      expect(contains(child, null)).toBe(false)
    })

    it('should return true when parent contains el', () => {
      const parent = document.createElement('div')
      const child = document.createElement('span')
      parent.appendChild(child)

      expect(contains(child, parent)).toBe(true)
    })

    it('should return false when parent does not contain el', () => {
      const parent = document.createElement('div')
      const child = document.createElement('span')

      expect(contains(child, parent)).toBe(false)
    })

    it('should handle __transferElement', () => {
      const parent = document.createElement('div') as any
      const transferEl = document.createElement('div')
      parent.__transferElement = transferEl
      const child = document.createElement('span')
      transferEl.appendChild(child)

      expect(contains(child, parent)).toBe(true)
    })
  })

  describe('isHidden', () => {
    it('should return true when not in client', () => {
      // @ts-expect-error - mocking window
      globalThis.window = undefined
      const div = document.createElement('div')
      expect(isHidden(div)).toBe(true)
      globalThis.window = originalWindow
    })

    it('should return true for null element', () => {
      expect(isHidden(null)).toBe(true)
    })

    it('should return true for undefined element', () => {
      expect(isHidden(undefined)).toBe(true)
    })

    it('should return true for element not in document', () => {
      const div = document.createElement('div')
      expect(isHidden(div)).toBe(true)
    })

    it('should return true for element with display none', () => {
      const div = document.createElement('div')
      div.style.display = 'none'
      document.body.appendChild(div)

      expect(isHidden(div)).toBe(true)

      document.body.removeChild(div)
    })

    it('should return false for visible element', () => {
      const div = document.createElement('div')
      div.style.width = '100px'
      div.style.height = '100px'
      document.body.appendChild(div)

      expect(isHidden(div)).toBe(false)

      document.body.removeChild(div)
    })
  })

  describe('isVisible', () => {
    it('should return false for hidden element', () => {
      const div = document.createElement('div')
      div.style.display = 'none'
      document.body.appendChild(div)

      expect(isVisible(div)).toBe(false)

      document.body.removeChild(div)
    })

    it('should return true for visible element', () => {
      const div = document.createElement('div')
      div.style.width = '100px'
      div.style.height = '100px'
      document.body.appendChild(div)

      expect(isVisible(div)).toBe(true)

      document.body.removeChild(div)
    })
  })

  describe('isDisabled', () => {
    it('should return true for null element', () => {
      expect(isDisabled(null)).toBe(true)
    })

    it('should return true for undefined element', () => {
      expect(isDisabled(undefined)).toBe(true)
    })

    it('should return true for element with disabled attribute', () => {
      const button = document.createElement('button')
      button.setAttribute('disabled', '')
      expect(isDisabled(button)).toBe(true)
    })

    it('should return false for element with disabled="false"', () => {
      const button = document.createElement('button')
      button.setAttribute('disabled', 'false')
      expect(isDisabled(button)).toBe(false)
    })

    it('should return true for input with disabled property', () => {
      const input = document.createElement('input')
      input.disabled = true
      expect(isDisabled(input)).toBe(true)
    })

    it('should return false for enabled element', () => {
      const button = document.createElement('button')
      expect(isDisabled(button)).toBe(false)
    })
  })

  describe('queryTabables', () => {
    it('should return tabable elements', () => {
      const container = document.createElement('div')
      const button = document.createElement('button')
      const input = document.createElement('input')
      const disabledButton = document.createElement('button')
      disabledButton.disabled = true

      container.appendChild(button)
      container.appendChild(input)
      container.appendChild(disabledButton)
      document.body.appendChild(container)

      const tabables = queryTabables(container)
      expect(tabables).toContain(button)
      expect(tabables).toContain(input)
      expect(tabables).not.toContain(disabledButton)

      document.body.removeChild(container)
    })

    it('should include disabled elements when includeDisabled is true', () => {
      const container = document.createElement('div')
      const disabledButton = document.createElement('button')
      disabledButton.disabled = true

      container.appendChild(disabledButton)
      document.body.appendChild(container)

      const tabables = queryTabables(container, true)
      expect(tabables).toContain(disabledButton)

      document.body.removeChild(container)
    })

    it('should handle null root', () => {
      const tabables = queryTabables(null)
      expect(Array.isArray(tabables)).toBe(true)
    })
  })

  describe('getXPadding', () => {
    it('should return 0 for null element', () => {
      expect(getXPadding(null)).toBe(0)
    })

    it('should return 0 for undefined element', () => {
      expect(getXPadding(undefined)).toBe(0)
    })

    it('should calculate horizontal padding', () => {
      const div = document.createElement('div')
      div.style.paddingLeft = '10px'
      div.style.paddingRight = '20px'
      document.body.appendChild(div)

      expect(getXPadding(div)).toBe(30)

      document.body.removeChild(div)
    })

    it('should work with Element type', () => {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      svg.setAttribute('style', 'padding-left: 5px; padding-right: 5px;')
      document.body.appendChild(svg)

      expect(getXPadding(svg)).toBe(10)

      document.body.removeChild(svg)
    })
  })

  describe('getYPadding', () => {
    it('should return 0 for null element', () => {
      expect(getYPadding(null)).toBe(0)
    })

    it('should calculate vertical padding', () => {
      const div = document.createElement('div')
      div.style.paddingTop = '10px'
      div.style.paddingBottom = '20px'
      document.body.appendChild(div)

      expect(getYPadding(div)).toBe(30)

      document.body.removeChild(div)
    })
  })

  describe('getXMargin', () => {
    it('should return 0 for null element', () => {
      expect(getXMargin(null)).toBe(0)
    })

    it('should calculate horizontal margin', () => {
      const div = document.createElement('div')
      div.style.marginLeft = '10px'
      div.style.marginRight = '20px'
      document.body.appendChild(div)

      expect(getXMargin(div)).toBe(30)

      document.body.removeChild(div)
    })
  })

  describe('getYMargin', () => {
    it('should return 0 for null element', () => {
      expect(getYMargin(null)).toBe(0)
    })

    it('should calculate vertical margin', () => {
      const div = document.createElement('div')
      div.style.marginTop = '10px'
      div.style.marginBottom = '20px'
      document.body.appendChild(div)

      expect(getYMargin(div)).toBe(30)

      document.body.removeChild(div)
    })
  })

  describe('getXBorder', () => {
    it('should return 0 for null element', () => {
      expect(getXBorder(null)).toBe(0)
    })

    it('should calculate horizontal border width', () => {
      const div = document.createElement('div')
      div.style.borderLeftWidth = '1px'
      div.style.borderRightWidth = '2px'
      document.body.appendChild(div)

      expect(getXBorder(div)).toBe(3)

      document.body.removeChild(div)
    })
  })

  describe('getYBorder', () => {
    it('should return 0 for null element', () => {
      expect(getYBorder(null)).toBe(0)
    })

    it('should calculate vertical border width', () => {
      const div = document.createElement('div')
      div.style.borderTopWidth = '1px'
      div.style.borderBottomWidth = '2px'
      document.body.appendChild(div)

      expect(getYBorder(div)).toBe(3)

      document.body.removeChild(div)
    })
  })

  describe('getRangeWidth', () => {
    it('should return 0 for null element', () => {
      expect(getRangeWidth(null)).toBe(0)
    })

    it('should return 0 for undefined element', () => {
      expect(getRangeWidth(undefined)).toBe(0)
    })

    it('should return 0 when not in client', () => {
      // @ts-expect-error - mocking window
      globalThis.window = undefined
      const div = document.createElement('div')
      expect(getRangeWidth(div)).toBe(0)
      globalThis.window = originalWindow
    })

    it('should calculate range width with padding', () => {
      const div = document.createElement('div')
      div.textContent = 'Hello World'
      div.style.paddingLeft = '10px'
      div.style.paddingRight = '10px'
      document.body.appendChild(div)

      const width = getRangeWidth(div)
      expect(width).toBeGreaterThan(20) // Should include padding

      document.body.removeChild(div)
    })
  })

  describe('toCssSize', () => {
    it('should convert number to px', () => {
      expect(toCssSize(10)).toBe('10px')
    })

    it('should convert numeric string to px', () => {
      expect(toCssSize('20')).toBe('20px')
    })

    it('should keep css unit strings as is', () => {
      expect(toCssSize('100%')).toBe('100%')
      expect(toCssSize('10em')).toBe('10em')
      expect(toCssSize('auto')).toBe('auto')
    })

    it('should trim string values', () => {
      expect(toCssSize('  100%  ')).toBe('100%')
    })
  })

  describe('toAttrValue', () => {
    it('should convert true to "true"', () => {
      expect(toAttrValue(true)).toBe('true')
    })

    it('should return undefined for false', () => {
      expect(toAttrValue(false)).toBeUndefined()
    })

    it('should convert string to string', () => {
      expect(toAttrValue('test')).toBe('test')
    })

    it('should convert number to string', () => {
      expect(toAttrValue(42)).toBe('42')
    })

    it('should return undefined for null', () => {
      expect(toAttrValue(null)).toBeUndefined()
    })

    it('should return undefined for undefined', () => {
      expect(toAttrValue(undefined)).toBeUndefined()
    })

    it('should convert 0 to "0"', () => {
      expect(toAttrValue(0)).toBe('0')
    })

    it('should convert empty string to empty string', () => {
      expect(toAttrValue('')).toBe('')
    })

    it('should have correct return type for boolean', () => {
      const result = toAttrValue(true)
      // Type check: result should be 'true' | undefined
      expect(result === 'true' || result === undefined).toBe(true)
    })

    it('should have correct return type for string', () => {
      const result = toAttrValue('test')
      // Type check: result should be string | undefined
      expect(typeof result === 'string' || result === undefined).toBe(true)
    })
  })
})
