import { afterAll, beforeAll, describe, expect, it, vi } from 'vitest'

import {
  differenceDays,
  differenceFullWeeks,
  differenceWeeks,
  format,
  startOfYear,
  toDate,
} from '../src'

describe('date', () => {
  it('pads two-digit years', () => {
    expect(format(new Date(2005, 0, 1), 'yy')).toBe('05')
    expect(format(new Date(2000, 5, 1), 'yy-MM')).toBe('00-06')
  })

  it('finds the start of a year with a custom starting month', () => {
    expect(startOfYear(new Date(2024, 11, 15), 11)).toEqual(new Date(2024, 11, 1))
    expect(startOfYear(new Date(2024, 2, 15), 4)).toEqual(new Date(2023, 4, 1))
    expect(startOfYear(new Date(2024, 2, 31), 1)).toEqual(new Date(2024, 1, 1))
    expect(startOfYear(new Date(2024, 0, 1), -1)).toEqual(new Date(2023, 11, 1))
  })

  describe.each(['America/New_York', 'Asia/Shanghai', 'UTC'])('local dates in %s', timezone => {
    beforeAll(() => {
      vi.stubEnv('TZ', timezone)
    })
    afterAll(() => {
      vi.unstubAllEnvs()
    })

    it('reads ISO date-only strings at local midnight and respects explicit offsets', () => {
      expect(toDate('2024-01-05')).toEqual(new Date(2024, 0, 5))
      expect(toDate('2024-02')).toEqual(new Date(2024, 1, 1))
      expect(toDate('2024')).toEqual(new Date(2024, 0, 1))
      expect(toDate('2024-01-05T00:00:00-05:00').getTime()).toBe(Date.UTC(2024, 0, 5, 5))
      expect(() => toDate('2024-13-01', true)).toThrow(RangeError)
    })

    it('counts calendar days across spring and autumn clock changes', () => {
      expect(differenceDays(new Date(2024, 2, 9), new Date(2024, 2, 11))).toBe(2)
      expect(differenceDays(new Date(2024, 10, 4), new Date(2024, 10, 2))).toBe(-2)
    })

    it('counts calendar week boundaries separately from full weeks', () => {
      const saturday = new Date(2024, 2, 9)
      const nextSaturday = new Date(2024, 2, 16)
      const friday = new Date(2024, 2, 15)

      expect(differenceWeeks(saturday, friday, 1)).toBe(1)
      expect(differenceFullWeeks(saturday, friday)).toBe(0)
      expect(differenceFullWeeks(saturday, nextSaturday)).toBe(1)
    })
  })
})
