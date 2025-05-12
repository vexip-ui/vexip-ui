import { describe, expect, it } from 'vitest'

import {
  filterTree,
  flatTree,
  listToMap,
  mapTree,
  normalizePath,
  sortByProps,
  transformTree,
  walkTree,
} from '../src'

describe('transform', () => {
  it('normalizePath', () => {
    expect(normalizePath('a')).toEqual('a')
    expect(normalizePath('/a/b/c')).toEqual('/a/b/c')
    expect(normalizePath('\\a\\b\\c')).toEqual('/a/b/c')
    expect(normalizePath('a/b\\c')).toEqual('a/b/c')
    expect(normalizePath('D:\\\\a/b\\c')).toEqual('D:/a/b/c')
    expect(normalizePath('./b\\c')).toEqual('./b/c')
    expect(normalizePath('..\\b/c')).toEqual('../b/c')
  })

  it('transformListToMap', () => {
    expect(listToMap([{ id: '1' }, { id: '2' }], 'id')).toMatchObject({
      1: { id: '1' },
      2: { id: '2' },
    })
    expect(listToMap([{ id: '1' }, { id: '2' }], i => i.id)).toMatchObject({
      1: { id: '1' },
      2: { id: '2' },
    })
    expect(listToMap([{ id: '1' }, { id: '2' }], 'id', i => i.id)).toMatchObject({
      1: '1',
      2: '2',
    })
    expect(listToMap([{ id: '1' }, { id: '2' }], 'id', undefined, true)).toMatchObject(
      new Map().set('1', { id: '1' }).set('2', { id: '2' }),
    )
    expect(
      listToMap(
        [{ id: '1' }, { id: '2' }],
        i => i.id,
        i => i.id,
        true,
      ),
    ).toMatchObject(new Map().set('1', '1').set('2', '2'))
  })

  it('sortByProps', () => {
    const data = Array.from({ length: 10 }, (_, i) => ({
      name: `n${Math.floor(i / 2)}`,
      label: `l${i % 2}`,
    })).sort(() => Math.random() - 0.5)

    expect(
      sortByProps(data, [
        {
          key: 'name',
          type: 'asc',
        },
        {
          key: 'label',
          type: 'asc',
        },
      ]),
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
      { name: 'n4', label: 'l1' },
    ])
  })

  it('transformTree', () => {
    const data = [
      { name: '1', parent: null, id: 1 },
      { name: '2', parent: 1, id: 2 },
      { name: '3', parent: 1, id: 3 },
      { name: '4', parent: 1, id: 4 },
      { name: '5', parent: 4, id: 5 },
      { name: '6', parent: 4, id: 6 },
      { name: '7', parent: 1, id: 7 },
      { name: '8', parent: null, id: 8 },
    ]

    expect(transformTree(data)).toMatchObject([
      {
        name: '1',
        children: [
          { name: '2' },
          { name: '3' },
          {
            name: '4',
            children: [{ name: '5' }, { name: '6' }],
          },
          { name: '7' },
        ],
      },
      {
        name: '8',
      },
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
            children: [{ name: '5' }, { name: '6' }],
          },
          { name: '7' },
        ],
      },
      {
        name: '8',
      },
    ]

    expect(flatTree(getData())).toMatchObject([
      { name: '1', parent: null, id: 1 },
      { name: '8', parent: null, id: 2 },
      { name: '2', parent: 1, id: 3 },
      { name: '3', parent: 1, id: 4 },
      { name: '4', parent: 1, id: 5 },
      { name: '7', parent: 1, id: 6 },
      { name: '5', parent: 5, id: 7 },
      { name: '6', parent: 5, id: 8 },
    ])

    expect(flatTree(getData(), { depthFirst: true })).toMatchObject([
      { name: '1', parent: null, id: 1 },
      { name: '2', parent: 1, id: 2 },
      { name: '3', parent: 1, id: 3 },
      { name: '4', parent: 1, id: 4 },
      { name: '5', parent: 4, id: 5 },
      { name: '6', parent: 4, id: 6 },
      { name: '7', parent: 1, id: 7 },
      { name: '8', parent: null, id: 8 },
    ])

    for (const item of flatTree(getData(), { injectId: false })) {
      expect(item).not.toHaveProperty('id')
      expect(item).not.toHaveProperty('parent')
    }

    const filtered = flatTree(getData(), { filter: item => item.name !== '4' })
    expect(filtered.length).toBe(7)
    expect(filtered.find(item => item.name === '4')).toBeUndefined()
  })

  it('walkTree', () => {
    const data = [
      {
        name: '1',
        children: [
          { name: '2' },
          { name: '3' },
          {
            name: '4',
            children: [{ name: '5' }, { name: '6' }],
          },
          { name: '7' },
        ],
      },
      {
        name: '8',
      },
    ]

    let results = [
      { name: '1', depth: 0 },
      { name: '8', depth: 0 },
      { name: '2', depth: 1 },
      { name: '3', depth: 1 },
      { name: '4', depth: 1 },
      { name: '7', depth: 1 },
      { name: '5', depth: 2 },
      { name: '6', depth: 2 },
    ]
    walkTree(data, (item, depth) => {
      const result = results.shift()!

      expect(result).toBeTruthy()
      expect(item.name).toEqual(result.name)
      expect(depth).toEqual(result.depth)
    })

    results = [
      { name: '1', depth: 0 },
      { name: '2', depth: 1 },
      { name: '3', depth: 1 },
      { name: '4', depth: 1 },
      { name: '5', depth: 2 },
      { name: '6', depth: 2 },
      { name: '7', depth: 1 },
      { name: '8', depth: 0 },
    ]
    walkTree(
      data,
      (item, depth) => {
        const result = results.shift()!

        expect(result).toBeTruthy()
        expect(item.name).toEqual(result.name)
        expect(depth).toEqual(result.depth)
      },
      { depthFirst: true },
    )
  })

  it('mapTree', () => {
    const data = [
      {
        name: '1',
        children: [
          { name: '2' },
          { name: '3' },
          {
            name: '4',
            children: [{ name: '5' }, { name: '6' }],
          },
          { name: '7' },
        ],
      },
      {
        name: '8',
      },
    ]
    const mapData = [
      {
        label: '1',
        children: [
          { label: '2' },
          { label: '3' },
          {
            label: '4',
            children: [{ label: '5' }, { label: '6' }],
          },
          { label: '7' },
        ],
      },
      {
        label: '8',
      },
    ]

    let results = [
      { name: '1', depth: 0 },
      { name: '8', depth: 0 },
      { name: '2', depth: 1 },
      { name: '3', depth: 1 },
      { name: '4', depth: 1 },
      { name: '7', depth: 1 },
      { name: '5', depth: 2 },
      { name: '6', depth: 2 },
    ]
    expect(
      mapTree(data, (item, depth) => {
        const result = results.shift()!

        expect(result).toBeTruthy()
        expect(item.name).toEqual(result.name)
        expect(depth).toEqual(result.depth)

        return { label: item.name }
      }),
    ).toMatchObject(mapData)

    results = [
      { name: '1', depth: 0 },
      { name: '2', depth: 1 },
      { name: '3', depth: 1 },
      { name: '4', depth: 1 },
      { name: '5', depth: 2 },
      { name: '6', depth: 2 },
      { name: '7', depth: 1 },
      { name: '8', depth: 0 },
    ]
    expect(
      mapTree(
        data,
        (item, depth) => {
          const result = results.shift()!

          expect(result).toBeTruthy()
          expect(item.name).toEqual(result.name)
          expect(depth).toEqual(result.depth)

          return { label: item.name }
        },
        { depthFirst: true },
      ),
    ).toMatchObject(mapData)
  })

  it('filterTree', () => {
    const data = [
      {
        name: '1',
        children: [
          { name: '2' },
          { name: '3' },
          {
            name: '4',
            children: [{ name: '5' }, { name: '6' }],
          },
          { name: '7' },
        ],
      },
      {
        name: '8',
      },
    ]

    expect(filterTree(data, item => item.name === '4')).toMatchObject([
      {
        name: '1',
        children: [
          {
            name: '4',
            children: [{ name: '5' }, { name: '6' }],
          },
        ],
      },
    ])
    expect(filterTree(data, item => item.name === '4', { leafOnly: true })).toMatchObject([])
  })
})
