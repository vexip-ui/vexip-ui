import { describe, expect, it } from 'vitest'

import {
  isHTMLElement,
  isElement,
  isValidElement,
  getXPadding,
  getYPadding,
  getXMargin,
  getYMargin,
  getXBorder,
  getYBorder,
  queryAll,
  isFocusIn,
  contains,
  isHidden,
  isVisible,
  isDisabled,
  queryTabables,
  getRangeWidth,
  toCssSize,
  toAttrValue,
} from '../src'

describe('dom', () => {
  describe('isHTMLElement & isElement (alias)', () => {
    it('should correctly identify HTMLElements', () => {
      const div = document.createElement('div')
      expect(isHTMLElement(div)).toBe(true)
      expect(isElement(div)).toBe(true)
    })

    it('should return false for non-HTMLElements', () => {
      expect(isHTMLElement(null)).toBe(false)
      expect(isHTMLElement(undefined)).toBe(false)
      expect(isHTMLElement({} as Element)).toBe(false)
      expect(isElement(null)).toBe(false)
    })

    it('should handle SVG elements', () => {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      expect(isHTMLElement(svg)).toBe(true)
      expect(isElement(svg)).toBe(true)
    })
  })

  describe('isValidElement', () => {
    it('should correctly identify Elements', () => {
      const div = document.createElement('div')
      expect(isValidElement(div)).toBe(true)
    })

    it('should return false for invalid values', () => {
      expect(isValidElement(null)).toBe(false)
      expect(isValidElement(undefined)).toBe(false)
      expect(isValidElement({})).toBe(false)
      expect(isValidElement('div')).toBe(false)
      expect(isValidElement(123)).toBe(false)
    })

    it('should work with unknown type input', () => {
      const unknownValue: unknown = document.createElement('span')
      if (isValidElement(unknownValue)) {
        expect(unknownValue.nodeType).toBe(1)
      }
    })
  })

  describe('Style sum functions', () => {
    const createStyledElement = (styles: Record<string, string>) => {
      const el = document.createElement('div')
      Object.assign(el.style, styles)
      document.body.appendChild(el)
      return el
    }

    it('getXPadding should return sum of left and right padding', () => {
      const el = createStyledElement({ paddingLeft: '10px', paddingRight: '20px' })
      expect(getXPadding(el)).toBe(30)
      document.body.removeChild(el)
    })

    it('getYPadding should return sum of top and bottom padding', () => {
      const el = createStyledElement({ paddingTop: '5px', paddingBottom: '15px' })
      expect(getYPadding(el)).toBe(20)
      document.body.removeChild(el)
    })

    it('getXMargin should return sum of left and right margin', () => {
      const el = createStyledElement({ marginLeft: '8px', marginRight: '12px' })
      expect(getXMargin(el)).toBe(20)
      document.body.removeChild(el)
    })

    it('getYMargin should return sum of top and bottom margin', () => {
      const el = createStyledElement({ marginTop: '3px', marginBottom: '7px' })
      expect(getYMargin(el)).toBe(10)
      document.body.removeChild(el)
    })

    it('getXBorder should return sum of left and right border width', () => {
      const el = createStyledElement({
        borderLeftWidth: '2px',
        borderRightWidth: '3px',
        borderStyle: 'solid',
      })
      expect(getXBorder(el)).toBe(5)
      document.body.removeChild(el)
    })

    it('getYBorder should return sum of top and bottom border width', () => {
      const el = createStyledElement({
        borderTopWidth: '1px',
        borderBottomWidth: '4px',
        borderStyle: 'solid',
      })
      expect(getYBorder(el)).toBe(5)
      document.body.removeChild(el)
    })

    it('should return 0 for null or undefined element', () => {
      expect(getXPadding(null)).toBe(0)
      expect(getXPadding(undefined)).toBe(0)
      expect(getYPadding(null)).toBe(0)
      expect(getXMargin(null)).toBe(0)
      expect(getYMargin(null)).toBe(0)
      expect(getXBorder(null)).toBe(0)
      expect(getYBorder(null)).toBe(0)
    })
  })

  describe('queryAll', () => {
    it('should return empty array for empty selector', () => {
      expect(queryAll('')).toEqual([])
    })

    it('should find elements by selector', () => {
      const div = document.createElement('div')
      div.className = 'test-query-all'
      document.body.appendChild(div)
      expect(queryAll('.test-query-all').length).toBe(1)
      document.body.removeChild(div)
    })

    it('should accept null root', () => {
      expect(queryAll('div', null)).toBeInstanceOf(Array)
    })

    it('should accept undefined root', () => {
      expect(queryAll('div', undefined)).toBeInstanceOf(Array)
    })
  })

  describe('contains', () => {
    it('should return false for null elements', () => {
      expect(contains(null, null)).toBe(false)
      expect(contains(undefined, null)).toBe(false)
      expect(contains(null, undefined)).toBe(false)
    })

    it('should correctly detect containment', () => {
      const parent = document.createElement('div')
      const child = document.createElement('span')
      parent.appendChild(child)
      document.body.appendChild(parent)

      expect(contains(child, parent)).toBe(true)
      expect(contains(parent, child)).toBe(false)

      document.body.removeChild(parent)
    })
  })

  describe('isHidden & isVisible', () => {
    it('should return true for null element', () => {
      expect(isHidden(null)).toBe(true)
      expect(isHidden(undefined)).toBe(true)
    })

    it('should return false for isVisible when hidden', () => {
      expect(isVisible(null)).toBe(false)
    })

    it('should detect display: none', () => {
      const el = document.createElement('div')
      el.style.display = 'none'
      document.body.appendChild(el)
      expect(isHidden(el)).toBe(true)
      expect(isVisible(el)).toBe(false)
      document.body.removeChild(el)
    })
  })

  describe('isDisabled', () => {
    it('should return true for null or undefined', () => {
      expect(isDisabled(null)).toBe(true)
      expect(isDisabled(undefined)).toBe(true)
    })

    it('should detect disabled attribute', () => {
      const button = document.createElement('button')
      button.disabled = true
      expect(isDisabled(button)).toBe(true)

      const button2 = document.createElement('button')
      button2.setAttribute('disabled', 'true')
      expect(isDisabled(button2)).toBe(true)
    })

    it('should not be disabled for disabled="false"', () => {
      const button = document.createElement('button')
      button.setAttribute('disabled', 'false')
      expect(isDisabled(button)).toBe(false)
    })
  })

  describe('queryTabables', () => {
    it('should return array even for null root', () => {
      expect(queryTabables(null)).toBeInstanceOf(Array)
    })

    it('should return array for undefined root', () => {
      expect(queryTabables(undefined)).toBeInstanceOf(Array)
    })

    it('should include disabled elements when includeDisabled is true', () => {
      const root = document.createElement('div')
      const button1 = document.createElement('button')
      const button2 = document.createElement('button')
      button2.disabled = true
      root.appendChild(button1)
      root.appendChild(button2)
      document.body.appendChild(root)

      expect(queryTabables(root, true).length).toBeGreaterThanOrEqual(
        queryTabables(root, false).length,
      )

      document.body.removeChild(root)
    })
  })

  describe('getRangeWidth', () => {
    it('should return 0 for null or undefined', () => {
      expect(getRangeWidth(null)).toBe(0)
      expect(getRangeWidth(undefined)).toBe(0)
    })

    it('should calculate width for element', () => {
      const el = document.createElement('div')
      el.textContent = 'test'
      document.body.appendChild(el)
      expect(typeof getRangeWidth(el)).toBe('number')
      document.body.removeChild(el)
    })
  })

  describe('toCssSize', () => {
    it('should convert number to px', () => {
      expect(toCssSize(10)).toBe('10px')
      expect(toCssSize(0)).toBe('0px')
      expect(toCssSize('10')).toBe('10px')
    })

    it('should return string as is', () => {
      expect(toCssSize('100%')).toBe('100%')
      expect(toCssSize('auto')).toBe('auto')
      expect(toCssSize('  rem  ')).toBe('rem')
    })
  })

  describe('toAttrValue', () => {
    it('should return undefined for null', () => {
      expect(toAttrValue(null)).toBeUndefined()
    })

    it('should return undefined for undefined', () => {
      expect(toAttrValue(undefined)).toBeUndefined()
    })

    it('should return undefined for false', () => {
      expect(toAttrValue(false)).toBeUndefined()
    })

    it('should return "true" for true', () => {
      expect(toAttrValue(true)).toBe('true')
    })

    it('should convert numbers to strings', () => {
      expect(toAttrValue(123)).toBe('123')
      expect(toAttrValue(0)).toBe('0')
    })

    it('should return strings as is', () => {
      expect(toAttrValue('hello')).toBe('hello')
      expect(toAttrValue('')).toBe('')
    })

    it('should have correct type inference', () => {
      const boolValue: 'true' | undefined = toAttrValue(true)
      expect(boolValue).toBe('true')

      const stringValue: string | undefined = toAttrValue('test')
      expect(stringValue).toBe('test')

      const numberValue: string | undefined = toAttrValue(42)
      expect(numberValue).toBe('42')
    })
  })

  describe('Type safety tests', () => {
    it('should accept Element type for all functions', () => {
      const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg')
      expect(() => {
        isHidden(svg)
        isVisible(svg)
        isDisabled(svg)
        contains(svg, svg)
        getXPadding(svg)
        getYPadding(svg)
        getXMargin(svg)
        getYMargin(svg)
        getXBorder(svg)
        getYBorder(svg)
        getRangeWidth(svg)
      }).not.toThrow()
    })

    it('should accept undefined for all element parameters', () => {
      expect(() => {
        isFocusIn(undefined)
        contains(undefined, undefined)
        isHidden(undefined)
        isVisible(undefined)
        isDisabled(undefined)
        queryTabables(undefined)
        getRangeWidth(undefined)
      }).not.toThrow()
    })
  })
})
