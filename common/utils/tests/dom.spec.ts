import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'

import {
  contains,
  getRangeWidth,
  getXBorder,
  getXMargin,
  getXPadding,
  getYBorder,
  getYMargin,
  getYPadding,
  isDisabled,
  isElement,
  isFocusIn,
  isHidden,
  isHTMLElement,
  isValidElement,
  isVisible,
  queryAll,
  queryTabables,
  toAttrValue,
  toCssSize,
} from '../src'

describe('dom', () => {
  describe('isHTMLElement', () => {
    it('should return true for HTMLElement', () => {
      const div = document.createElement('div')
      expect(isHTMLElement(div)).toBe(true)
    })

    it('should return false for null', () => {
      expect(isHTMLElement(null)).toBe(false)
    })

    it('should return false for undefined', () => {
      expect(isHTMLElement(undefined)).toBe(false)
    })

    it('should return false for text node', () => {
      const text = document.createTextNode('test')
      expect(isHTMLElement(text)).toBe(false)
    })

    it('should return false for comment node', () => {
      const comment = document.createComment('test')
      expect(isHTMLElement(comment)).toBe(false)
    })
  })

  describe('isElement', () => {
    it('should be an alias of isHTMLElement', () => {
      const div = document.createElement('div')
      expect(isElement(div)).toBe(true)
      expect(isElement(null)).toBe(false)
      expect(isElement(undefined)).toBe(false)
    })
  })

  describe('isValidElement', () => {
    it('should return true for HTMLElement', () => {
      const div = document.createElement('div')
      expect(isValidElement(div)).toBe(true)
    })

    it('should return false for null', () => {
      expect(isValidElement(null)).toBe(false)
    })

    it('should return false for undefined', () => {
      expect(isValidElement(undefined)).toBe(false)
    })

    it('should return false for text node', () => {
      const text = document.createTextNode('test')
      expect(isValidElement(text)).toBe(false)
    })

    it('should return false for non-element objects', () => {
      expect(isValidElement({})).toBe(false)
      expect(isValidElement('string')).toBe(false)
      expect(isValidElement(123)).toBe(false)
    })

    it('should support generic type parameter', () => {
      const div = document.createElement('div')
      expect(isValidElement<HTMLDivElement>(div)).toBe(true)
    })
  })

  describe('getXPadding / getYPadding', () => {
    let div: HTMLDivElement

    beforeEach(() => {
      div = document.createElement('div')
      div.style.padding = '10px 20px'
      document.body.appendChild(div)
    })

    afterEach(() => {
      document.body.removeChild(div)
    })

    it('should return horizontal padding', () => {
      const padding = getXPadding(div)
      expect(padding).toBe(40)
    })

    it('should return vertical padding', () => {
      const padding = getYPadding(div)
      expect(padding).toBe(20)
    })

    it('should return 0 for null', () => {
      expect(getXPadding(null)).toBe(0)
      expect(getYPadding(null)).toBe(0)
    })

    it('should return 0 for undefined', () => {
      expect(getXPadding(undefined)).toBe(0)
      expect(getYPadding(undefined)).toBe(0)
    })
  })

  describe('getXMargin / getYMargin', () => {
    let div: HTMLDivElement

    beforeEach(() => {
      div = document.createElement('div')
      div.style.margin = '10px 20px'
      document.body.appendChild(div)
    })

    afterEach(() => {
      document.body.removeChild(div)
    })

    it('should return horizontal margin', () => {
      const margin = getXMargin(div)
      expect(margin).toBe(40)
    })

    it('should return vertical margin', () => {
      const margin = getYMargin(div)
      expect(margin).toBe(20)
    })

    it('should return 0 for null', () => {
      expect(getXMargin(null)).toBe(0)
      expect(getYMargin(null)).toBe(0)
    })
  })

  describe('getXBorder / getYBorder', () => {
    let div: HTMLDivElement

    beforeEach(() => {
      div = document.createElement('div')
      div.style.border = '5px solid black'
      document.body.appendChild(div)
    })

    afterEach(() => {
      document.body.removeChild(div)
    })

    it('should return horizontal border width', () => {
      const border = getXBorder(div)
      expect(border).toBe(10)
    })

    it('should return vertical border width', () => {
      const border = getYBorder(div)
      expect(border).toBe(10)
    })

    it('should return 0 for null', () => {
      expect(getXBorder(null)).toBe(0)
      expect(getYBorder(null)).toBe(0)
    })
  })

  describe('toAttrValue', () => {
    it('should return "true" for true', () => {
      expect(toAttrValue(true)).toBe('true')
    })

    it('should return undefined for false', () => {
      expect(toAttrValue(false)).toBeUndefined()
    })

    it('should return undefined for null', () => {
      expect(toAttrValue(null)).toBeUndefined()
    })

    it('should return undefined for undefined', () => {
      expect(toAttrValue(undefined)).toBeUndefined()
    })

    it('should return string for string value', () => {
      expect(toAttrValue('test')).toBe('test')
    })

    it('should return string for number value', () => {
      expect(toAttrValue(123)).toBe('123')
    })
  })

  describe('toCssSize', () => {
    it('should return px value for number', () => {
      expect(toCssSize(100)).toBe('100px')
    })

    it('should return px value for numeric string', () => {
      expect(toCssSize('100')).toBe('100px')
    })

    it('should return trimmed string for non-numeric string', () => {
      expect(toCssSize('100em ')).toBe('100em')
    })
  })

  describe('contains', () => {
    it('should return true when parent contains child', () => {
      const parent = document.createElement('div')
      const child = document.createElement('span')
      parent.appendChild(child)
      document.body.appendChild(parent)

      expect(contains(child, parent)).toBe(true)

      document.body.removeChild(parent)
    })

    it('should return false when parent does not contain child', () => {
      const parent = document.createElement('div')
      const child = document.createElement('span')
      document.body.appendChild(parent)

      expect(contains(child, parent)).toBe(false)

      document.body.removeChild(parent)
    })

    it('should return false for null or undefined', () => {
      expect(contains(null, null)).toBe(false)
      expect(contains(undefined, undefined)).toBe(false)
      expect(contains(document.createElement('div'), null)).toBe(false)
    })
  })

  describe('isHidden', () => {
    it('should return true for null', () => {
      expect(isHidden(null)).toBe(true)
    })

    it('should return true for undefined', () => {
      expect(isHidden(undefined)).toBe(true)
    })

    it('should return true for element with display: none', () => {
      const div = document.createElement('div')
      div.style.display = 'none'
      document.body.appendChild(div)

      expect(isHidden(div)).toBe(true)

      document.body.removeChild(div)
    })
  })

  describe('isVisible', () => {
    it('should return false for null', () => {
      expect(isVisible(null)).toBe(false)
    })

    it('should return opposite of isHidden', () => {
      const div = document.createElement('div')
      div.style.display = 'none'
      document.body.appendChild(div)

      expect(isVisible(div)).toBe(!isHidden(div))

      document.body.removeChild(div)
    })
  })

  describe('isDisabled', () => {
    it('should return true for disabled button', () => {
      const button = document.createElement('button')
      button.disabled = true
      document.body.appendChild(button)

      expect(isDisabled(button)).toBe(true)

      document.body.removeChild(button)
    })

    it('should return false for enabled button', () => {
      const button = document.createElement('button')
      document.body.appendChild(button)

      expect(isDisabled(button)).toBe(false)

      document.body.removeChild(button)
    })

    it('should return true for null', () => {
      expect(isDisabled(null)).toBe(true)
    })
  })

  describe('queryAll', () => {
    it('should return empty array for null selector', () => {
      expect(queryAll('')).toEqual([])
    })

    it('should return matching elements', () => {
      const div = document.createElement('div')
      div.className = 'test-class'
      document.body.appendChild(div)

      const result = queryAll('.test-class')
      expect(result.length).toBe(1)
      expect(result[0]).toBe(div)

      document.body.removeChild(div)
    })
  })

  describe('queryTabables', () => {
    it('should return tabable elements', () => {
      const input = document.createElement('input')
      document.body.appendChild(input)

      const result = queryTabables()
      expect(result.length).toBeGreaterThan(0)
      expect(result).toContain(input)

      document.body.removeChild(input)
    })
  })

  describe('isFocusIn', () => {
    it('should return false when element is not focused', () => {
      const div = document.createElement('div')
      document.body.appendChild(div)

      expect(isFocusIn(div)).toBe(false)

      document.body.removeChild(div)
    })
  })

  describe('getRangeWidth', () => {
    it('should return 0 for null', () => {
      expect(getRangeWidth(null)).toBe(0)
    })

    it('should return 0 for undefined', () => {
      expect(getRangeWidth(undefined)).toBe(0)
    })
  })
})
