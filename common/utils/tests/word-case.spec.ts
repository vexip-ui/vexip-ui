import { describe, expect, it } from 'vitest'

import { toCamelCase, toCapitalCase, toKebabCase } from '../src'

describe('word case', () => {
  it('toKebabCase', () => {
    expect(toKebabCase('Abc')).toEqual('abc')
    expect(toKebabCase('AaBbCc')).toEqual('aa-bb-cc')
    expect(toKebabCase('AABbCc')).toEqual('aa-bb-cc')
    expect(toKebabCase('Aa_Bb_Cc')).toEqual('aa_-bb_-cc')
    expect(toKebabCase('AaBb CcDd')).toEqual('aa-bb cc-dd')
    expect(toKebabCase('AAA')).toEqual('aaa')
    expect(toKebabCase('Aa-Bb-Cc')).toEqual('aa-bb-cc')
    expect(toKebabCase('AA-Bb-Cc')).toEqual('aa-bb-cc')
    expect(toKebabCase('AA_Bb-Cc')).toEqual('aa_-bb-cc')
  })

  it('toCapitalCase', () => {
    expect(toCapitalCase('abc')).toEqual('Abc')
    expect(toCapitalCase('aa-bb-cc')).toEqual('AaBbCc')
    expect(toCapitalCase('aa_bb_cc')).toEqual('Aa_bb_cc')
    expect(toCapitalCase('_aa-bb-cc')).toEqual('_aaBbCc')
    expect(toCapitalCase('aa--bb')).toEqual('AaBb')
    expect(toCapitalCase('aa bb cc')).toEqual('AaBbCc')
    expect(toCapitalCase('aa -bb- cc')).toEqual('AaBbCc')
    expect(toCapitalCase(' aa bb cc')).toEqual('AaBbCc')
    expect(toCapitalCase(' aa bb cc ')).toEqual('AaBbCc')
    expect(toCapitalCase('-aa bb cc ')).toEqual('AaBbCc')
    expect(toCapitalCase(' -aa bb cc -')).toEqual('AaBbCc')
  })

  it('toCamelCase', () => {
    expect(toCamelCase('abc')).toEqual('abc')
    expect(toCamelCase('aa-bb-cc')).toEqual('aaBbCc')
    expect(toCamelCase('aa_bb_cc')).toEqual('aa_bb_cc')
    expect(toCamelCase('_aa-bb-cc')).toEqual('_aaBbCc')
    expect(toCamelCase('aa--bb')).toEqual('aaBb')
    expect(toCamelCase('aa bb cc')).toEqual('aaBbCc')
    expect(toCamelCase('aa -bb- cc')).toEqual('aaBbCc')
    expect(toCamelCase(' aa bb cc')).toEqual('aaBbCc')
    expect(toCamelCase(' aa bb cc ')).toEqual('aaBbCc')
    expect(toCamelCase('-aa bb cc ')).toEqual('aaBbCc')
    expect(toCamelCase(' -aa bb cc -')).toEqual('aaBbCc')
  })
})
