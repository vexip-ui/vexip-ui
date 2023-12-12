import { describe, expect, it } from 'vitest'

import postcss from 'postcss'
import { transformLogical } from '../src/postcss-transform-logical'

import type { Processor } from 'postcss'

describe('postcss-transform-logical', () => {
  function buildStyle(origin: string, insert: string, replace = false) {
    return [`a { ${origin} }`, replace ? `a { ${insert} }` : `a { ${insert}; ${origin} }`] as const
  }

  // let count = 1

  async function checkBase(processor: Processor, input: string, output: string) {
    it(input, async () => {
      const result = await processor.process(input, { from: undefined })

      expect(result.warnings().length).toBe(0)
      expect(result.css).toEqual(output)
    })
  }

  describe('none options', () => {
    const check = checkBase.bind(null, postcss([transformLogical()]))

    check(...buildStyle('inline-size: 10px', 'width: 10px'))
    check(...buildStyle('block-size: 10px', 'height: 10px'))
    check(...buildStyle('min-inline-size: 10px', 'min-width: 10px'))
    check(...buildStyle('min-block-size: 10px', 'min-height: 10px'))
    check(...buildStyle('max-inline-size: 10px', 'max-width: 10px'))
    check(...buildStyle('max-block-size: 10px', 'max-height: 10px'))

    check(...buildStyle('inset-inline-start: 10px', 'left: 10px'))
    check(...buildStyle('inset-inline-end: 10px', 'right: 10px'))
    check(...buildStyle('inset-block-start: 10px', 'top: 10px'))
    check(...buildStyle('inset-block-end: 10px', 'bottom: 10px'))
    check(...buildStyle('inset-inline: 10px', 'left: 10px; right: 10px'))
    check(...buildStyle('inset-block: 10px', 'top: 10px; bottom: 10px'))
    ;['padding', 'margin'].forEach(prefix => {
      check(...buildStyle(`${prefix}-inline-start: 10px`, `${prefix}-left: 10px`))
      check(...buildStyle(`${prefix}-inline-end: 10px`, `${prefix}-right: 10px`))
      check(...buildStyle(`${prefix}-block-start: 10px`, `${prefix}-top: 10px`))
      check(...buildStyle(`${prefix}-block-end: 10px`, `${prefix}-bottom: 10px`))
      check(...buildStyle(`${prefix}-inline: 10px`, `${prefix}-left: 10px; ${prefix}-right: 10px`))
      check(...buildStyle(`${prefix}-block: 10px`, `${prefix}-top: 10px; ${prefix}-bottom: 10px`))
    })

    check(...buildStyle('border-inline-start: 10px', 'border-left: 10px'))
    check(...buildStyle('border-inline-end: 10px', 'border-right: 10px'))
    check(...buildStyle('border-block-start: 10px', 'border-top: 10px'))
    check(...buildStyle('border-block-end: 10px', 'border-bottom: 10px'))
    check(...buildStyle('border-inline: 10px', 'border-left: 10px; border-right: 10px'))
    check(...buildStyle('border-block: 10px', 'border-top: 10px; border-bottom: 10px'))
    ;['width', 'style', 'color'].forEach(unit => {
      check(...buildStyle(`border-inline-start-${unit}: 10px`, `border-left-${unit}: 10px`))
      check(...buildStyle(`border-inline-end-${unit}: 10px`, `border-right-${unit}: 10px`))
      check(...buildStyle(`border-block-start-${unit}: 10px`, `border-top-${unit}: 10px`))
      check(...buildStyle(`border-block-end-${unit}: 10px`, `border-bottom-${unit}: 10px`))
      check(
        ...buildStyle(
          `border-inline-${unit}: 10px`,
          `border-left-${unit}: 10px; border-right-${unit}: 10px`
        )
      )
      check(
        ...buildStyle(
          `border-block-${unit}: 10px`,
          `border-top-${unit}: 10px; border-bottom-${unit}: 10px`
        )
      )
    })

    check(...buildStyle('border-start-start-radius: 10px', 'border-top-left-radius: 10px'))
    check(...buildStyle('border-start-end-radius: 10px', 'border-top-right-radius: 10px'))
    check(...buildStyle('border-end-end-radius: 10px', 'border-bottom-right-radius: 10px'))
    check(...buildStyle('border-end-start-radius: 10px', 'border-bottom-left-radius: 10px'))
  })

  describe('replace: true', () => {
    const check = checkBase.bind(null, postcss([transformLogical({ replace: true })]))

    const style = (input: string, output: string) => buildStyle(input, output, true)

    check(...style('inline-size: 10px', 'width: 10px'))
    check(...style('block-size: 10px', 'height: 10px'))
    check(...style('min-inline-size: 10px', 'min-width: 10px'))
    check(...style('min-block-size: 10px', 'min-height: 10px'))
    check(...style('max-inline-size: 10px', 'max-width: 10px'))
    check(...style('max-block-size: 10px', 'max-height: 10px'))

    check(...style('inset-inline-start: 10px', 'left: 10px'))
    check(...style('inset-inline-end: 10px', 'right: 10px'))
    check(...style('inset-block-start: 10px', 'top: 10px'))
    check(...style('inset-block-end: 10px', 'bottom: 10px'))
    check(...style('inset-inline: 10px', 'left: 10px; right: 10px'))
    check(...style('inset-block: 10px', 'top: 10px; bottom: 10px'))
    ;['padding', 'margin'].forEach(prefix => {
      check(...style(`${prefix}-inline-start: 10px`, `${prefix}-left: 10px`))
      check(...style(`${prefix}-inline-end: 10px`, `${prefix}-right: 10px`))
      check(...style(`${prefix}-block-start: 10px`, `${prefix}-top: 10px`))
      check(...style(`${prefix}-block-end: 10px`, `${prefix}-bottom: 10px`))
      check(...style(`${prefix}-inline: 10px`, `${prefix}-left: 10px; ${prefix}-right: 10px`))
      check(...style(`${prefix}-block: 10px`, `${prefix}-top: 10px; ${prefix}-bottom: 10px`))
    })

    check(...style('border-inline-start: 10px', 'border-left: 10px'))
    check(...style('border-inline-end: 10px', 'border-right: 10px'))
    check(...style('border-block-start: 10px', 'border-top: 10px'))
    check(...style('border-block-end: 10px', 'border-bottom: 10px'))
    check(...style('border-inline: 10px', 'border-left: 10px; border-right: 10px'))
    check(...style('border-block: 10px', 'border-top: 10px; border-bottom: 10px'))
    ;['width', 'style', 'color'].forEach(unit => {
      check(...style(`border-inline-start-${unit}: 10px`, `border-left-${unit}: 10px`))
      check(...style(`border-inline-end-${unit}: 10px`, `border-right-${unit}: 10px`))
      check(...style(`border-block-start-${unit}: 10px`, `border-top-${unit}: 10px`))
      check(...style(`border-block-end-${unit}: 10px`, `border-bottom-${unit}: 10px`))
      check(
        ...style(
          `border-inline-${unit}: 10px`,
          `border-left-${unit}: 10px; border-right-${unit}: 10px`
        )
      )
      check(
        ...style(
          `border-block-${unit}: 10px`,
          `border-top-${unit}: 10px; border-bottom-${unit}: 10px`
        )
      )
    })

    check(...style('border-start-start-radius: 10px', 'border-top-left-radius: 10px'))
    check(...style('border-start-end-radius: 10px', 'border-top-right-radius: 10px'))
    check(...style('border-end-end-radius: 10px', 'border-bottom-right-radius: 10px'))
    check(...style('border-end-start-radius: 10px', 'border-bottom-left-radius: 10px'))
  })

  describe('rtl: true', () => {
    const check = checkBase.bind(null, postcss([transformLogical({ rtl: true })]))

    const style = (input: string, output: string) => buildStyle(input, output, true)

    check(...style('inline-size: 10px', 'width: 10px'))
    check(...style('block-size: 10px', 'height: 10px'))
    check(...style('min-inline-size: 10px', 'min-width: 10px'))
    check(...style('min-block-size: 10px', 'min-height: 10px'))
    check(...style('max-inline-size: 10px', 'max-width: 10px'))
    check(...style('max-block-size: 10px', 'max-height: 10px'))

    check(...style('inset-inline-start: 10px', 'right: 10px'))
    check(...style('inset-inline-end: 10px', 'left: 10px'))
    check(...style('inset-block-start: 10px', 'top: 10px'))
    check(...style('inset-block-end: 10px', 'bottom: 10px'))
    check(...style('inset-inline: 10px', 'right: 10px; left: 10px'))
    check(...style('inset-block: 10px', 'top: 10px; bottom: 10px'))
    ;['padding', 'margin'].forEach(prefix => {
      check(...style(`${prefix}-inline-start: 10px`, `${prefix}-right: 10px`))
      check(...style(`${prefix}-inline-end: 10px`, `${prefix}-left: 10px`))
      check(...style(`${prefix}-block-start: 10px`, `${prefix}-top: 10px`))
      check(...style(`${prefix}-block-end: 10px`, `${prefix}-bottom: 10px`))
      check(...style(`${prefix}-inline: 10px`, `${prefix}-right: 10px; ${prefix}-left: 10px`))
      check(...style(`${prefix}-block: 10px`, `${prefix}-top: 10px; ${prefix}-bottom: 10px`))
    })

    check(...style('border-inline-start: 10px', 'border-right: 10px'))
    check(...style('border-inline-end: 10px', 'border-left: 10px'))
    check(...style('border-block-start: 10px', 'border-top: 10px'))
    check(...style('border-block-end: 10px', 'border-bottom: 10px'))
    check(...style('border-inline: 10px', 'border-right: 10px; border-left: 10px'))
    check(...style('border-block: 10px', 'border-top: 10px; border-bottom: 10px'))
    ;['width', 'style', 'color'].forEach(unit => {
      check(...style(`border-inline-start-${unit}: 10px`, `border-right-${unit}: 10px`))
      check(...style(`border-inline-end-${unit}: 10px`, `border-left-${unit}: 10px`))
      check(...style(`border-block-start-${unit}: 10px`, `border-top-${unit}: 10px`))
      check(...style(`border-block-end-${unit}: 10px`, `border-bottom-${unit}: 10px`))
      check(
        ...style(
          `border-inline-${unit}: 10px`,
          `border-right-${unit}: 10px; border-left-${unit}: 10px`
        )
      )
      check(
        ...style(
          `border-block-${unit}: 10px`,
          `border-top-${unit}: 10px; border-bottom-${unit}: 10px`
        )
      )
    })

    check(...style('border-start-start-radius: 10px', 'border-top-right-radius: 10px'))
    check(...style('border-start-end-radius: 10px', 'border-top-left-radius: 10px'))
    check(...style('border-end-end-radius: 10px', 'border-bottom-left-radius: 10px'))
    check(...style('border-end-start-radius: 10px', 'border-bottom-right-radius: 10px'))
  })
})
