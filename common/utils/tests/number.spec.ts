import { describe, expect, it } from 'vitest'

import { toFixed } from '../src/number'

describe('number', () => {
  it('toFixed', () => {
    expect(toFixed(1.255, 2)).toEqual(1.26)
    expect(toFixed(1.3335, 3)).toEqual(1.334)
    expect(toFixed(17.2745, 2)).toEqual(17.27)
    expect(toFixed(1.09, 2)).toEqual(1.09)
    expect(toFixed(1.009, 2)).toEqual(1.01)
    expect(toFixed(10.999, 2)).toEqual(11)
    expect(toFixed(15.5, 2)).toEqual(15.5)
    expect(toFixed(15.555, 2)).toEqual(15.56)
    expect(toFixed(1.34e-7, 7)).toEqual(1e-7)
    expect(toFixed(1.35e-7, 8)).toEqual(1.4e-7)
  })
})
