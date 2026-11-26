import { describe, expect, it } from 'vitest'

import { parse, stringify } from '../position-parser'

describe('Edge syntax', () => {
  it('right 3em bottom 10px -> fixed object', () => {
    const src = 'right 3em bottom 10px'
    const pos = parse(src)

    expect(pos).toEqual({
      type: 'edge',
      x: { key: 'right', offset: { type: 'length', value: 3, unit: 'em' } },
      y: { key: 'bottom', offset: { type: 'length', value: 10, unit: 'px' } },
    })

    expect(stringify(pos)).toBe(src)
  })
  it('bottom 10px right 3em  -> fixed object', () => {
    const src = 'bottom 10px right 3em'
    const pos = parse(src)

    expect(pos).toEqual({
      type: 'edge',
      x: { key: 'right', offset: { type: 'length', value: 3, unit: 'em' } },
      y: { key: 'bottom', offset: { type: 'length', value: 10, unit: 'px' } },
    })

    expect(stringify(pos)).toBe('right 3em bottom 10px')
  })
})

describe('Single value syntax', () => {
  it('keyword top → y=top, x=center', () => {
    expect(parse('top')).toEqual({
      type: 'single',
      x: 'center',
      y: 'top',
    })
  })

  it('keyword left → x=left, y=center', () => {
    expect(parse('left')).toEqual({
      type: 'single',
      x: 'left',
      y: 'center',
    })
  })

  it('percent 30% → x=30%, y=center', () => {
    expect(parse('30%')).toEqual({
      type: 'single',
      x: { type: 'percent', value: 30, unit: '%' },
      y: 'center',
    })
  })

  it('length 2.5em → x=2.5em, y=center', () => {
    expect(parse('2.5em')).toEqual({
      type: 'single',
      x: { type: 'length', value: 2.5, unit: 'em' },
      y: 'center',
    })
  })

  it('pure number 100 → 默认 px, x=100px, y=center', () => {
    expect(parse('100')).toEqual({
      type: 'single',
      x: 'center',
      y: 'center',
    })
  })
  it('Zero does not include units, 0 → x=0px, y=center', () => {
    expect(parse('0')).toEqual({
      type: 'single',
      x: { type: 'length', value: 0, unit: 'px' },
      y: 'center',
    })
  })
  it('keyword center → x=center, y=center', () => {
    expect(parse('center')).toEqual({
      type: 'single',
      x: 'center',
      y: 'center',
    })
  })
})
describe('Double value syntax', () => {
  // Normal
  it('left top → x=left, y=top', () => {
    expect(parse('left top')).toEqual({
      type: 'double',
      x: 'left',
      y: 'top',
    })
  })
  // Normalized
  it('top left → After normalization x=left, y=top', () => {
    expect(parse('top left')).toEqual({
      type: 'double',
      x: 'left',
      y: 'top',
    })
  })
  // Positive tests
  it('right 20% → x=right, y=20%', () => {
    const src = 'right 20%'
    const pos = parse(src)
    expect(stringify(pos)).toBe(src)
    expect(pos).toEqual({
      type: 'double',
      x: 'right',
      y: { type: 'percent', value: 20, unit: '%' },
    })
  })
  it('left 20% → x=left, y=20%', () => {
    const src = 'left 20%'
    const pos = parse(src)
    expect(stringify(pos)).toBe(src)
    expect(pos).toEqual({ type: 'double', x: 'left', y: { type: 'percent', value: 20, unit: '%' } })
  })
  it('top 20% → center', () => {
    const src = 'top 20%'
    const pos = parse(src)
    expect(pos).toEqual({ type: 'double', x: 'center', y: 'center' })
  })
  it('bottom 20% → center', () => {
    const src = 'bottom 20%'
    const pos = parse(src)
    expect(pos).toEqual({ type: 'double', x: 'center', y: 'center' })
  })
  // Negative tests
  it('20% right → x=right, y=20%', () => {
    const src = '20% right'
    const pos = parse(src)
    expect(pos).toEqual({ type: 'double', x: 'center', y: 'center' })
  })
  it('20% left → x=left, y=20%', () => {
    const src = '20% left'
    const pos = parse(src)
    expect(pos).toEqual({ type: 'double', x: 'center', y: 'center' })
  })
  it('20% top → center', () => {
    const src = '20% top'
    const pos = parse(src)
    expect(stringify(pos)).toBe(src)
    expect(pos).toEqual({ type: 'double', x: { type: 'percent', value: 20, unit: '%' }, y: 'top' })
  })
  it('20% bottom → center', () => {
    const src = '20% bottom'
    const pos = parse(src)
    expect(stringify(pos)).toBe(src)
    expect(pos).toEqual({
      type: 'double',
      x: { type: 'percent', value: 20, unit: '%' },
      y: 'bottom',
    })
  })

  it('2.5em bottom → x=center, y=2.5em', () => {
    const src = '2.5em bottom'
    const pos = parse(src)

    expect(stringify(pos)).toBe(src)
    expect(pos).toEqual({
      type: 'double',
      x: { type: 'length', value: 2.5, unit: 'em' },
      y: 'bottom',
    })
  })

  it('30px center → x=30px, y=center', () => {
    const src = '30px center'
    const pos = parse(src)
    expect(pos).toEqual({
      type: 'double',
      x: { type: 'length', value: 30, unit: 'px' },
      y: 'center',
    })
    expect(stringify(pos)).toBe(src)
  })

  it('center bottom → x=center, y=bottom', () => {
    expect(parse('center bottom')).toEqual({
      type: 'double',
      x: 'center',
      y: 'bottom',
    })
  })

  it('40% 10px → x=40%, y=10px', () => {
    expect(parse('40% 10px')).toEqual({
      type: 'double',
      x: { type: 'percent', value: 40, unit: '%' },
      y: { type: 'length', value: 10, unit: 'px' },
    })
  })

  it('0 0 → x=0px, y=0px Zero can omit the unit', () => {
    expect(parse('0 0')).toEqual({
      type: 'double',
      x: { type: 'length', value: 0, unit: 'px' },
      y: { type: 'length', value: 0, unit: 'px' },
    })
  })
})
