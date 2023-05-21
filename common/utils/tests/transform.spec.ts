import { describe, expect, it } from 'vitest'

import { flatTree, sortByProps } from '../src/transform'

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

  it('flatTree', () => {
    const getData = () => [
      {
        name: '1',
        children: [
          { name: '2' },
          { name: '3' },
          {
            name: '4',
            children: [{ name: '5' }, { name: '6' }]
          },
          { name: '7' }
        ]
      },
      {
        name: '8'
      }
    ]

    expect(flatTree(getData())).toMatchObject([
      { name: '1', parent: null, id: 1 },
      { name: '8', parent: null, id: 2 },
      { name: '2', parent: 1, id: 3 },
      { name: '3', parent: 1, id: 4 },
      { name: '4', parent: 1, id: 5 },
      { name: '7', parent: 1, id: 6 },
      { name: '5', parent: 5, id: 7 },
      { name: '6', parent: 5, id: 8 }
    ])

    expect(flatTree(getData(), { depthFirst: true })).toMatchObject([
      { name: '1', parent: null, id: 1 },
      { name: '2', parent: 1, id: 2 },
      { name: '3', parent: 1, id: 3 },
      { name: '4', parent: 1, id: 4 },
      { name: '5', parent: 4, id: 5 },
      { name: '6', parent: 4, id: 6 },
      { name: '7', parent: 1, id: 7 },
      { name: '8', parent: null, id: 8 }
    ])

    for (const item of flatTree(getData(), { injectId: false })) {
      expect(item).not.toHaveProperty('id')
      expect(item).not.toHaveProperty('parent')
    }

    const filtered = flatTree(getData(), { filter: item => item.name !== '4' })
    expect(filtered.length).toBe(7)
    expect(filtered.find(item => item.name === '4')).toBeUndefined()
  })
})
