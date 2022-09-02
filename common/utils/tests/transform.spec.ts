import { describe, it, expect } from 'vitest'
import { sortByProps } from '../src/transform'

describe('transform', () => {
  it('sortByProps', () => {
    const data = Array.from({ length: 10 }, (_, i) => ({
      name: `n${Math.floor(i / 2)}`,
      label: `l${i % 2}`
    })).sort(() => Math.random() - 0.5)

    expect(
      sortByProps(data, [
        {
          key: 'name',
          type: 'asc'
        },
        {
          key: 'label',
          type: 'asc'
        }
      ])
    ).toEqual([
      { name: 'n0', label: 'l0' },
      { name: 'n0', label: 'l1' },
      { name: 'n1', label: 'l0' },
      { name: 'n1', label: 'l1' },
      { name: 'n2', label: 'l0' },
      { name: 'n2', label: 'l1' },
      { name: 'n3', label: 'l0' },
      { name: 'n3', label: 'l1' },
      { name: 'n4', label: 'l0' },
      { name: 'n4', label: 'l1' }
    ])
  })
})
