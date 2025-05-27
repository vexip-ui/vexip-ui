import { describe, expect, it } from 'vitest'

import { deepClone } from '../src'

describe('deep clone', () => {
  it('object', () => {
    const obj = { a: 1, b: [2, { c: 3 }] }
    const cloned = deepClone(obj)

    expect(cloned).toEqual(obj)
    expect(cloned !== obj).toBe(true)
    expect(cloned.b !== obj.b).toBe(true)
    expect(cloned.b[1] !== obj.b[1]).toBe(true)
  })

  it('array', () => {
    const obj = [{ a: 1 }, { b: 2 }, 3]
    const cloned = deepClone(obj)

    expect(cloned).toEqual(obj)
    expect(cloned !== obj).toBe(true)
    expect(cloned[0] !== obj[0]).toBe(true)
    expect(cloned[1] !== obj[1]).toBe(true)
  })

  it('circular reference', () => {
    const obj: any = { a: 1, b: { c: 2 } }
    obj.b.d = obj
    const cloned = deepClone(obj)

    expect(cloned).toEqual(obj)
    expect(cloned !== obj).toBe(true)
    expect(cloned.b !== obj.b).toBe(true)
    expect(cloned.b.d === cloned).toBe(true)
  })

  it('complex object', () => {
    const obj = {
      a: 1,
      b: [2, { c: 3 }],
      d: new Set<any>([4, { e: 5 }]),
      f: new Map<any, any>([
        ['g', 6],
        ['h', { i: 7 }],
        ['j', new Set([8])],
      ]),
      k: new Date('2000-01-01'),
    }

    obj.d.add(obj)
    obj.f.set('l', obj)

    const cloned = deepClone(obj)

    expect(cloned).toEqual(obj)
    expect(cloned.d !== obj.d).toBe(true)
    expect(cloned.f !== obj.f).toBe(true)
    expect(cloned.f.get('j') !== obj.f.get('j')).toBe(true)
    expect(cloned.k !== obj.k).toBe(true)
    expect(cloned.d.has(cloned)).toBe(true)
    expect(cloned.f.get('l') === cloned).toBe(true)
  })
})
