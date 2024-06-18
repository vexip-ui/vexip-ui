import { describe, expect, it, vi } from 'vitest'

import {
  decide,
  getType,
  has,
  is,
  isArray,
  isBigInt,
  isBoolean,
  isDate,
  isDefined,
  isEmpty,
  isFalse,
  isFunction,
  isIterable,
  isMap,
  isNaN,
  isNull,
  isNumber,
  isObject,
  isPromise,
  isRegExp,
  isSet,
  isString,
  isSymbol,
  isTrue,
  range,
  toFalse,
  toTrue
} from '../src'

describe('number', () => {
  it('is', () => {
    expect(is('', 'String')).toBe(true)
    expect(is('', 'Number')).toBe(false)
    expect(is(1, 'Number')).toBe(true)
    expect(is(true, 'Boolean')).toBe(true)
    expect(is(false, 'Boolean')).toBe(true)
    expect(is(undefined, 'Undefined')).toBe(true)
    expect(is(null, 'Null')).toBe(true)
    expect(is({}, 'Object')).toBe(true)
    expect(is([], 'Array')).toBe(true)
    expect(is(new Date(), 'Date')).toBe(true)
    expect(is(() => {}, 'Function')).toBe(true)
    expect(is(BigInt('1'), 'BigInt')).toBe(true)
    expect(is(Symbol(''), 'Symbol')).toBe(true)
    expect(is(new Set(), 'Set')).toBe(true)
    expect(is(new Map(), 'Map')).toBe(true)
    expect(is(new WeakMap(), 'WeakMap')).toBe(true)
  })

  it('has', () => {
    expect(has({}, 'a')).toBe(false)
    expect(has({ a: 1 }, 'a')).toBe(true)
  })

  it('isDefined', () => {
    expect(isDefined(null)).toBe(false)
    expect(isDefined(undefined)).toBe(false)
    expect(isDefined(1)).toBe(true)
    expect(isDefined(0)).toBe(true)
    expect(isDefined([])).toBe(true)
    expect(isDefined('')).toBe(true)
  })

  it('isNull', () => {
    expect(isNull(null)).toBe(true)
    expect(isNull(undefined)).toBe(true)
    expect(isNull(1)).toBe(false)
    expect(isNull(0)).toBe(false)
    expect(isNull([])).toBe(false)
    expect(isNull('')).toBe(false)
  })

  it('isNumber', () => {
    expect(isNumber('')).toBe(false)
    expect(isNumber(0)).toBe(true)
    expect(isNumber(1)).toBe(true)
    expect(isNumber(-0.123)).toBe(true)
    expect(isNumber(0xa)).toBe(true)
    expect(isNumber('123')).toBe(false)
    expect(isNumber(NaN)).toBe(true)
    expect(isNumber(null)).toBe(false)
    expect(isNumber(undefined)).toBe(false)
  })

  it('isNaN', () => {
    expect(isNaN(0)).toBe(false)
    expect(isNaN(1)).toBe(false)
    expect(isNaN(NaN)).toBe(true)
    expect(isNaN(undefined)).toBe(false)
    expect(isNaN(null)).toBe(false)
  })

  it('isString', () => {
    expect(isString(1)).toBe(false)
    expect(isString('1')).toBe(true)
    expect(isString('')).toBe(true)
    expect(isString(0)).toBe(false)
    expect(isString(null)).toBe(false)
  })

  it('isBoolean', () => {
    expect(isBoolean(1)).toBe(false)
    expect(isBoolean('1')).toBe(false)
    expect(isBoolean('')).toBe(false)
    expect(isBoolean(0)).toBe(false)
    expect(isBoolean(null)).toBe(false)
    expect(isBoolean(true)).toBe(true)
    expect(isBoolean(false)).toBe(true)
  })

  it('isTrue', () => {
    expect(isTrue(true)).toBe(true)
    expect(isTrue(false)).toBe(false)
    expect(isTrue(1)).toBe(false)
    expect(isTrue(null)).toBe(false)
  })

  it('isFalse', () => {
    expect(isFalse(true)).toBe(false)
    expect(isFalse(false)).toBe(true)
    expect(isFalse(1)).toBe(false)
    expect(isFalse(null)).toBe(false)
  })

  it('isSymbol', () => {
    expect(isSymbol(1)).toBe(false)
    expect(isSymbol('1')).toBe(false)
    expect(isSymbol(Symbol(''))).toBe(true)
    expect(isSymbol(0)).toBe(false)
    expect(isSymbol(null)).toBe(false)
  })

  it('isBigInt', () => {
    expect(isBigInt('')).toBe(false)
    expect(isBigInt(0)).toBe(false)
    expect(isBigInt(1)).toBe(false)
    expect(isBigInt('123')).toBe(false)
    expect(isBigInt(BigInt('123'))).toBe(true)
    expect(isBigInt(null)).toBe(false)
    expect(isBigInt(undefined)).toBe(false)
  })

  it('isArray', () => {
    expect(isArray([])).toBe(true)
    expect(isArray([1])).toBe(true)
    expect(isArray(['', null])).toBe(true)
    expect(isArray({})).toBe(false)
    expect(isArray(null)).toBe(false)
    expect(isArray('')).toBe(false)
  })

  it('isObject', () => {
    expect(isObject([])).toBe(false)
    expect(isObject({})).toBe(true)
    expect(isObject(new Date())).toBe(false)
    expect(isObject(null)).toBe(false)
    expect(isObject('')).toBe(false)
    expect(isObject(undefined)).toBe(false)
  })

  it('isPromise', () => {
    expect(isPromise(new Promise<void>(resolve => resolve()))).toBe(true)
    expect(isPromise({})).toBe(false)
    expect(isPromise({ then: () => {} })).toBe(false)
    expect(isPromise({ catch: () => {} })).toBe(false)
    expect(isPromise({ then: () => {}, catch: () => {} })).toBe(true)

    const array = [] as any
    array.then = () => {}
    array.catch = () => {}
    expect(isPromise(array)).toBe(true)
  })

  it('isFunction', () => {
    expect(isFunction(() => {})).toBe(true)
    expect(isFunction(function () {})).toBe(true)
    expect(isFunction(class {})).toBe(true)
    expect(isFunction(null)).toBe(false)
    expect(isFunction({})).toBe(false)
  })

  it('isSet', () => {
    expect(isSet(new Set())).toBe(true)
    expect(isSet({})).toBe(false)
  })

  it('isMap', () => {
    expect(isMap(new Map())).toBe(true)
    expect(isMap({})).toBe(false)
  })

  it('isDate', () => {
    expect(isDate(new Date())).toBe(true)
    expect(isDate({})).toBe(false)
  })

  it('isRegExp', () => {
    expect(isRegExp(/1/)).toBe(true)
    expect(isRegExp(new RegExp('1'))).toBe(true)
    expect(isRegExp({})).toBe(false)
  })

  it('isEmpty', () => {
    expect(isEmpty(false)).toBe(false)
    expect(isEmpty('')).toBe(true)
    expect(isEmpty('1')).toBe(false)
    expect(isEmpty(1)).toBe(false)
    expect(isEmpty(NaN)).toBe(true)
    expect(isEmpty([])).toBe(true)
    expect(isEmpty([1])).toBe(false)
    expect(isEmpty({})).toBe(true)
    expect(isEmpty({ a: 1 })).toBe(false)
    expect(isEmpty(new Set())).toBe(true)
    expect(isEmpty(new Set([1]))).toBe(false)
    expect(isEmpty(new Map())).toBe(true)
    expect(isEmpty(new Map([['a', 1]]))).toBe(false)
  })

  it('isIterable', () => {
    expect(isIterable([])).toBe(true)
    expect(isIterable('')).toBe(true)
    expect(isIterable(new Set())).toBe(true)
    expect(isIterable(new Map())).toBe(true)
    expect(isIterable({ [Symbol.iterator]: () => {} })).toBe(true)
    expect(isIterable(1)).toBe(false)
  })

  it('toTrue', () => {
    expect(toTrue()).toBe(true)
    expect(toTrue(1)).toBe(true)
  })

  it('toFalse', () => {
    expect(toFalse()).toBe(false)
    expect(toFalse(1)).toBe(false)
  })

  it('range', () => {
    expect(range(3)).toEqual([1, 2, 3])
    expect(range(3, 3)).toEqual([3, 4, 5])
    expect(range(3, 3, 3)).toEqual([3, 6, 9])
  })

  it('getType', () => {
    expect(getType('')).toEqual('String')
    expect(getType(1)).toEqual('Number')
    expect(getType(true)).toEqual('Boolean')
    expect(getType(false)).toEqual('Boolean')
    expect(getType(undefined)).toEqual('Undefined')
    expect(getType(null)).toEqual('Null')
    expect(getType({})).toEqual('Object')
    expect(getType([])).toEqual('Array')
    expect(getType(new Date())).toEqual('Date')
    expect(getType(() => {})).toEqual('Function')
    expect(getType(BigInt('1'))).toEqual('BigInt')
    expect(getType(Symbol(''))).toEqual('Symbol')
    expect(getType(new Set())).toEqual('Set')
    expect(getType(new Map())).toEqual('Map')
    expect(getType(new WeakMap())).toEqual('WeakMap')
  })

  it('decide', async () => {
    const fn1 = vi.fn()
    const fn2 = vi.fn()
    const fn3 = vi.fn()
    const clear = () => {
      fn1.mockClear()
      fn2.mockClear()
      fn3.mockClear()
    }

    expect(await decide([])).toBe(false)
    expect(await decide([[false, fn1]])).toBe(false)
    expect(fn1).toHaveBeenCalledTimes(0)

    expect(await decide([[() => false, fn1]])).toBe(false)
    expect(fn1).toHaveBeenCalledTimes(0)

    expect(await decide([[true, fn1]])).toBe(true)
    expect(fn1).toHaveBeenCalledTimes(1)
    clear()

    expect(await decide([[() => true, fn1]])).toBe(true)
    expect(fn1).toHaveBeenCalledTimes(1)
    clear()

    expect(
      await decide([
        [false, fn1],
        [true, fn2],
        [true, fn3]
      ])
    ).toBe(true)
    expect(fn1).toHaveBeenCalledTimes(0)
    expect(fn2).toHaveBeenCalledTimes(1)
    expect(fn3).toHaveBeenCalledTimes(0)
    clear()

    await decide([[false, fn1]], { afterMatchAny: fn2 })
    expect(fn1).toHaveBeenCalledTimes(0)
    expect(fn2).toHaveBeenCalledTimes(0)
    clear()

    await decide([[true, fn1]], { afterMatchAny: fn2 })
    expect(fn1).toHaveBeenCalledTimes(1)
    expect(fn2).toHaveBeenCalledTimes(1)
    clear()
  })
})
