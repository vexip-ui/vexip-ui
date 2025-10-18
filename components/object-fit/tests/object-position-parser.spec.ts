import { describe, expect, it, vi } from 'vitest'

import PositionParser from '../PositionParser'

describe('边缘语法', () => {
  it('right 3em bottom 10px -> fixed object', () => {
    const src = 'right 3em bottom 10px'
    const pos = PositionParser.parse(src)

    expect(pos).toEqual({
      type: 'edge',
      x: { key: 'right', offset: { type: 'length', value: 3, unit: 'em' } },
      y: { key: 'bottom', offset: { type: 'length', value: 10, unit: 'px' } },
    })

    expect(PositionParser.stringify(pos)).toBe(src)
  })
  it('bottom 10px right 3em  -> fixed object', () => {
    const src = 'bottom 10px right 3em'
    const pos = PositionParser.parse(src)

    expect(pos).toEqual({
      type: 'edge',
      x: { key: 'right', offset: { type: 'length', value: 3, unit: 'em' } },
      y: { key: 'bottom', offset: { type: 'length', value: 10, unit: 'px' } },
    })

    expect(PositionParser.stringify(pos)).toBe('right 3em bottom 10px')
  })
})

describe('单值语法', () => {
  it('关键字 top → y=top, x=center', () => {
    expect(PositionParser.parse('top')).toEqual({
      type: 'single',
      x: 'center',
      y: 'top',
    })
  })

  it('关键字 left → x=left, y=center', () => {
    expect(PositionParser.parse('left')).toEqual({
      type: 'single',
      x: 'left',
      y: 'center',
    })
  })

  it('百分比 30% → x=30%, y=center', () => {
    expect(PositionParser.parse('30%')).toEqual({
      type: 'single',
      x: { type: 'percent', value: 30, unit: '%' },
      y: 'center',
    })
  })

  it('长度 2.5em → x=2.5em, y=center', () => {
    expect(PositionParser.parse('2.5em')).toEqual({
      type: 'single',
      x: { type: 'length', value: 2.5, unit: 'em' },
      y: 'center',
    })
  })

  it('纯数字 100 → 默认 px, x=100px, y=center', () => {
    expect(PositionParser.parse('100')).toEqual({
      type: 'single',
      x: 'center',
      y: 'center',
    })
  })
  it('零不带单位 0 → x=0px, y=center', () => {
    expect(PositionParser.parse('0')).toEqual({
      type: 'single',
      x: { type: 'length', value: 0, unit: 'px' },
      y: 'center',
    })
  })
  it('关键字 center → x=center, y=center', () => {
    expect(PositionParser.parse('center')).toEqual({
      type: 'single',
      x: 'center',
      y: 'center',
    })
  })
})
describe('双值语法', () => {
  // 普通
  it('left top → x=left, y=top', () => {
    expect(PositionParser.parse('left top')).toEqual({
      type: 'double',
      x: 'left',
      y: 'top',
    })
  })
  // 归一化
  it('top left → 归一化后 x=left, y=top', () => {
    expect(PositionParser.parse('top left')).toEqual({
      type: 'double',
      x: 'left',
      y: 'top',
    })
  })
  // 正向测试
  it('right 20% → x=right, y=20%', () => {
    const src = 'right 20%'
    const pos = PositionParser.parse(src)
    expect(PositionParser.stringify(pos)).toBe(src)
    expect(pos).toEqual({
      type: 'double',
      x: 'right',
      y: { type: 'percent', value: 20, unit: '%' },
    })
  })
  it('left 20% → x=left, y=20%', () => {
    const src = 'left 20%'
    const pos = PositionParser.parse(src)
    expect(PositionParser.stringify(pos)).toBe(src)
    expect(pos).toEqual({ type: 'double', x: 'left', y: { type: 'percent', value: 20, unit: '%' } })
  })
  it('top 20% → center', () => {
    const src = 'top 20%'
    const pos = PositionParser.parse(src)
    expect(pos).toEqual({ type: 'double', x: 'center', y: 'center' })
  })
  it('bottom 20% → center', () => {
    const src = 'bottom 20%'
    const pos = PositionParser.parse(src)
    expect(pos).toEqual({ type: 'double', x: 'center', y: 'center' })
  })
  // 反向测试
  it('20% right → x=right, y=20%', () => {
    const src = '20% right'
    const pos = PositionParser.parse(src)
    expect(pos).toEqual({ type: 'double', x: 'center', y: 'center' })
  })
  it('20% left → x=left, y=20%', () => {
    const src = '20% left'
    const pos = PositionParser.parse(src)
    expect(pos).toEqual({ type: 'double', x: 'center', y: 'center' })
  })
  it('20% top → center', () => {
    const src = '20% top'
    const pos = PositionParser.parse(src)
    expect(PositionParser.stringify(pos)).toBe(src)
    expect(pos).toEqual({ type: 'double', x: { type: 'percent', value: 20, unit: '%' }, y: 'top' })
  })
  it('20% bottom → center', () => {
    const src = '20% bottom'
    const pos = PositionParser.parse(src)
    expect(PositionParser.stringify(pos)).toBe(src)
    expect(pos).toEqual({
      type: 'double',
      x: { type: 'percent', value: 20, unit: '%' },
      y: 'bottom',
    })
  })

  it('2.5em bottom → x=center, y=2.5em', () => {
    const src = '2.5em bottom'
    const pos = PositionParser.parse(src)

    expect(PositionParser.stringify(pos)).toBe(src)
    expect(pos).toEqual({
      type: 'double',
      x: { type: 'length', value: 2.5, unit: 'em' },
      y: 'bottom',
    })
  })

  it('30px center → x=30px, y=center', () => {
    const src = '30px center'
    const pos = PositionParser.parse(src)
    console.log(pos)

    expect(pos).toEqual({
      type: 'double',
      x: { type: 'length', value: 30, unit: 'px' },
      y: 'center',
    })
    expect(PositionParser.stringify(pos)).toBe(src)
  })

  it('center bottom → x=center, y=bottom', () => {
    expect(PositionParser.parse('center bottom')).toEqual({
      type: 'double',
      x: 'center',
      y: 'bottom',
    })
  })

  it('40% 10px → x=40%, y=10px', () => {
    expect(PositionParser.parse('40% 10px')).toEqual({
      type: 'double',
      x: { type: 'percent', value: 40, unit: '%' },
      y: { type: 'length', value: 10, unit: 'px' },
    })
  })

  it('0 0 → x=0px, y=0px 零可省略单位', () => {
    expect(PositionParser.parse('0 0')).toEqual({
      type: 'double',
      x: { type: 'length', value: 0, unit: 'px' },
      y: { type: 'length', value: 0, unit: 'px' },
    })
  })
})
