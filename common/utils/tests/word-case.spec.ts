import { describe, expect, it } from 'vitest'

import { toCapitalCase } from '../src'

describe('word case', () => {
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
})
