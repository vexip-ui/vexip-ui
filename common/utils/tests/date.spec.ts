import { describe, expect, it } from 'vitest'

import { getWeekOfYear, getWeekYear, getWeeksInYear, startOfWeek, yearWeekToDate } from '../src'

describe('week dates', () => {
  it('assigns the entire New Year week to the new week-year', () => {
    for (let day = 28; day <= 34; ++day) {
      const date = new Date(2025, 11, day)

      expect(getWeekYear(date)).toBe(2026)
      expect(getWeekOfYear(date)).toBe(1)
      expect(yearWeekToDate(2026, 1)).toEqual(new Date(2025, 11, 28))
    }
  })

  it('round trips leap years and year boundaries for every week start', () => {
    for (let start = 0; start < 7; ++start) {
      for (const year of [2000, 2004, 2008, 2012, 2016, 2024, 2025, 2026]) {
        expect([52, 53]).toContain(getWeeksInYear(year, start))

        for (let day = 1; day <= 366; ++day) {
          const date = new Date(year, 0, day)
          const weekYear = getWeekYear(date, start)
          const week = getWeekOfYear(date, start)

          expect(week).toBeGreaterThanOrEqual(1)
          expect(week).toBeLessThanOrEqual(getWeeksInYear(weekYear, start))
          expect(yearWeekToDate(weekYear, week, start)).toEqual(startOfWeek(date, start))
        }
      }
    }
  })

  it('counts calendar weeks across daylight saving transitions', () => {
    expect(getWeekOfYear(new Date(2024, 2, 17))).toBe(12)
    expect(yearWeekToDate(2024, 12)).toEqual(new Date(2024, 2, 17))
    expect(getWeekOfYear(new Date(2024, 10, 10))).toBe(46)
  })
})
