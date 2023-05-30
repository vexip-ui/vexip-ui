import { doubleDigits } from './number'

export type Dateable = number | string | Date

export const SECOND_ON_MILLS = 1000

export const MINUTE_ON_SECONDS = 60
export const MINUTE_ON_MILLS = MINUTE_ON_SECONDS * SECOND_ON_MILLS

export const HOUR_ON_MINUTES = 60
export const HOUR_ON_SECONDS = HOUR_ON_MINUTES * MINUTE_ON_SECONDS
export const HOUR_ON_MILLS = HOUR_ON_SECONDS * SECOND_ON_MILLS

export const DAY_ON_HOURS = 24
export const DAY_ON_MINUTES = DAY_ON_HOURS * HOUR_ON_MINUTES
export const DAY_ON_SECONDS = DAY_ON_MINUTES * MINUTE_ON_SECONDS
export const DAY_ON_MILLIS = DAY_ON_SECONDS * SECOND_ON_MILLS

export const WEEK_ON_DAYS = 7
export const WEEK_ON_HOURS = WEEK_ON_DAYS * DAY_ON_HOURS
export const WEEK_ON_MINUTES = WEEK_ON_HOURS * HOUR_ON_MINUTES
export const WEEK_ON_SECONDS = WEEK_ON_MINUTES * MINUTE_ON_SECONDS
export const WEEK_ON_MILLIS = WEEK_ON_SECONDS * SECOND_ON_MILLS

export const QUARTER_ON_MONTHS = 3

export const YEAR_ON_QUARTERS = 4
export const YEAR_ON_MONTHS = YEAR_ON_QUARTERS * QUARTER_ON_MONTHS

type Formatter = (date: Date, match: string) => string | number

interface Formatters {
  [prop: string]: Formatter
}

const formatters: Formatters = {
  y(date, match) {
    const year = date.getFullYear()

    return match.length === 4 ? year : (year % 1000) % 100
  },
  M(date, match) {
    const month = date.getMonth() + 1

    return match.length === 2 ? doubleDigits(month) : month
  },
  d(date, match) {
    const day = date.getDate()

    return match.length === 2 ? doubleDigits(day) : day
  },
  H(date, match) {
    const hour = date.getHours()

    return match.length === 2 ? doubleDigits(hour) : hour
  },
  m(date, match) {
    const minute = date.getMinutes()

    return match.length === 2 ? doubleDigits(minute) : minute
  },
  s(date, match) {
    const second = date.getSeconds()

    return match.length === 2 ? doubleDigits(second) : second
  },
  q(date, match) {
    const quarter = Math.ceil((date.getMonth() + 1) / 3)

    return match.length === 2 ? doubleDigits(quarter) : quarter
  }
}

const formatRegExp = /[yMdHmsq](\w)*|./g
const quotationRegExp = /'(.+?)'/g

/**
 * 将任意可转为 Date 的变量转为一个新日期
 *
 * @param any 任意可转换的值
 * @param strict 是否在传入非法值时抛错
 */
export function toDate(any: Dateable, strict = false) {
  const date = new Date(any)

  if (strict && Number.isNaN(+date)) {
    throw new RangeError('Invalid date value')
  }

  if (typeof any === 'string' && !any.includes(':')) {
    date.setHours(0)
    date.setMinutes(0)
    date.setSeconds(0)
  }

  return date
}

/**
 * 将日期格式化成指定格式
 *
 * @param date 需要格式化的Date对象
 * @param pattern 格式化结构 年-y 月-M 日-d 时-H 分-m 秒-s 季度-q
 *
 * @example format(new Date(), 'yyyy-MM-dd')
 * @example format(Date.now(), 'yyyy-MM-dd\'T\'HH:mm:ss\'Z\'')
 */
export function format(date: Dateable, pattern = 'yyyy-MM-dd HH:mm:ss') {
  date = toDate(date)

  const matchs = pattern.match(formatRegExp)
  const length = matchs?.length

  if (!length) {
    return pattern
  }

  let i = 0
  let result = ''

  while (i < length) {
    const substring = (matchs as RegExpMatchArray)[i]
    const firstCharacter = substring[0]
    const formatter = formatters[firstCharacter]

    if (formatter) {
      result += formatter(date, substring)
    } else {
      result += substring
    }

    ++i
  }

  return result.replace(quotationRegExp, '$1')
}

/**
 * 获取日期的时间部分
 *
 * @param date 给定的日期
 */
export function getTime(date: Dateable) {
  date = toDate(date)

  return `${doubleDigits(date.getHours())}:${doubleDigits(date.getMinutes())}:${doubleDigits(
    date.getSeconds()
  )}`
}

/**
 * 获取日期所在的季度
 *
 * @param date 给定的日期
 */
export function getQuarter(date: Dateable) {
  date = toDate(date)

  return Math.floor(date.getMonth() / 3) + 1
}

const weeksForChinese = ['日', '一', '二', '三', '四', '五', '六']

/**
 * 获取中文星期
 *
 * @param date 给定的日期
 */
export function getChineseWeek(date: Date) {
  return weeksForChinese[date.getDay()]
}

/**
 * 为日期增减给定的毫秒
 *
 * @param date 原始日期
 * @param amount 增减的毫秒
 */
export function addMilliseconds(date: Dateable, amount: number) {
  date = toDate(date)
  date.setTime(date.getTime() + amount)

  return date
}

/**
 * 为日期增减给定的秒
 *
 * @param date 原始日期
 * @param amount 增减的秒
 */
export function addSeconds(date: Dateable, amount: number) {
  amount *= SECOND_ON_MILLS

  return addMilliseconds(date, amount)
}

/**
 * 为日期增减给定的分钟
 *
 * @param date 原始日期
 * @param amount 增减的分钟
 */
export function addMinutes(date: Dateable, amount: number) {
  amount *= MINUTE_ON_SECONDS

  return addSeconds(date, amount)
}

/**
 * 为日期增减给定的小时
 *
 * @param date 原始日期
 * @param amount 增减的小时
 */
export function addHours(date: Dateable, amount: number) {
  amount *= HOUR_ON_MINUTES

  return addMinutes(date, amount)
}

/**
 * 为日期增减给定的半天数（12小时）
 *
 * @param date 原始日期
 * @param amount 增减的半天数
 */
export function addHalfDays(date: Dateable, amount: number) {
  amount *= 12

  return addHours(date, amount)
}

/**
 * 为日期增减给定的天数
 *
 * @param date 原始日期
 * @param amount 增减的天数
 */
export function addDays(date: Dateable, amount: number) {
  date = toDate(date)
  amount = ~~amount

  date.setDate(date.getDate() + amount)

  return date
}

/**
 * 为日期增减给定的周数
 *
 * @param date 原始日期
 * @param amount 增减的周数
 */
export function addWeeks(date: Dateable, amount: number) {
  amount *= WEEK_ON_DAYS

  return addDays(date, amount)
}

/**
 * 为日期增减给定的月数
 *
 * @param date 原始日期
 * @param amount 增减的月数
 */
export function addMonths(date: Dateable, amount: number) {
  date = toDate(date)
  amount = ~~amount

  date.setMonth(date.getMonth() + amount)

  return date
}

/**
 * 为日期增减给定的季度（3个月）
 *
 * @param date 原始日期
 * @param amount 增减的季度
 */
export function addQuarters(date: Dateable, amount: number) {
  amount *= QUARTER_ON_MONTHS

  return addMonths(date, amount)
}

/**
 * 为日期增减给定的年份
 *
 * @param date 原始日期
 * @param amount 增减的年份
 */
export function addYears(date: Dateable, amount: number) {
  amount *= YEAR_ON_MONTHS

  return addMonths(date, amount)
}

/**
 * 生成一个日期 range 数组
 *
 * @param start 开始日期
 * @param size range 的大小, 默认 42 (一般电子日历为 6 行 7 列)
 * @param step range 的跨幅
 */
export function rangeDate(start: Dateable, size = 42, step = 1) {
  start = toDate(start)

  const dateRange: Date[] = []

  for (let i = 0; i < size; ++i) {
    dateRange.push(addDays(start, i * step))
  }

  return dateRange
}

/**
 * 生成一个月份 range 数组
 *
 * @param start 开始日期
 * @param size range 的大小, 默认 12 (一年)
 * @param step range 的跨幅
 */
export function rangeMonth(start: Dateable, size = 12, step = 1) {
  start = toDate(start)

  const dateRange: Date[] = []

  for (let i = 0; i < size; ++i) {
    dateRange.push(addMonths(start, i * step))
  }

  return dateRange
}

/**
 * 根据给定的日期获取上一个周日
 *
 * @param date 原始日期
 */
export function getLastSunday(date: Date) {
  const day = date.getDay() ?? 7

  return addDays(date, -day)
}

/**
 * 获取给定的日期所在秒的开始日期（毫秒归零）
 *
 * @param date 原始日期
 */
export function startOfSecond(date: Dateable) {
  date = toDate(date)
  date.setMilliseconds(0)

  return date
}

/**
 * 获取给定的日期所在分钟的开始日期 (秒归零)
 *
 * @param date 原始日期
 */
export function startOfMinute(date: Dateable) {
  date = toDate(date)
  date.setSeconds(0, 0)

  return date
}

/**
 * 获取给定的日期所在小时的开始日期 (分钟归零)
 *
 * @param date 原始日期
 */
export function startOfHour(date: Dateable) {
  date = toDate(date)
  date.setMinutes(0, 0, 0)

  return date
}

/**
 * 获取给定的日期所在天的开始日期
 *
 * @param date 原始日期
 */
export function startOfDay(date: Dateable) {
  date = toDate(date)
  date.setHours(0, 0, 0, 0)

  return date
}

/**
 * 获取给定日期所在天的结束日期
 *
 * @param date 原始日期
 */
export function endOfDay(date: Dateable) {
  date = toDate(date)
  date.setHours(23, 59, 59, 999)

  return date
}

/**
 * 获取给定的日期所在周的第一天的开始日期
 *
 * @param date 需要解析的时间
 * @param startOn 设定周的第一天，默认为周日
 */
export function startOfWeek(date: Dateable, startOn = 0) {
  startOn = startOn % 7

  if (startOn < 0) {
    startOn += 7
  }

  date = toDate(date)

  const day = date.getDay()
  const difference = (day < startOn ? 7 : 0) + day - startOn

  date.setDate(date.getDate() - difference)
  date.setHours(0, 0, 0, 0)

  return date
}

/**
 * 判断给定的年份是否为闰年
 *
 * @param year 原始年份
 */
export function isLeapYear(year: number) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0
}

/**
 * 获取给定的日期所在月份的第一天的开始日期
 *
 * @param date 原始日期
 * @param startOn 设定一个月的第一天，默认为 1 号
 */
export function startOfMonth(date: Dateable, startOn = 1) {
  date = toDate(date)

  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  let lastDay

  if (month < 7) {
    if (month !== 2) {
      lastDay = 30 + (month % 2)
    } else {
      if (isLeapYear(year)) {
        lastDay = 29
      } else {
        lastDay = 28
      }
    }
  } else {
    lastDay = 31 - (month % 2)
  }

  startOn = startOn % lastDay

  if (startOn < 0) {
    startOn += lastDay
  }

  if (day < startOn) {
    date.setMonth(month - 1)
  }

  date.setDate(startOn)
  date.setHours(0, 0, 0, 0)

  return date
}

/**
 * 获取给定日期所在季度的第一天的开始日期
 *
 * @param date 原始日期
 */
export function startOfQuarter(date: Dateable) {
  date = toDate(date)

  const quarter = getQuarter(date)

  date.setDate(1)
  date.setHours(0, 0, 0, 0)
  date.setMonth((quarter - 1) * 3)

  return date
}

/**
 * 获取给定日期所在年份的第一天的开始日期
 *
 * @param date 原始日期
 * @param startOn 设定年的开始月份，默认为一月
 */
export function startOfYear(date: Dateable, startOn = 0) {
  startOn = startOn % 11

  if (startOn < 0) {
    startOn += 11
  }

  date = toDate(date)

  const month = date.getMonth()
  const difference = (month < startOn ? 11 : 0) + month - startOn

  date.setMonth(date.getMonth() - difference)
  date.setDate(1)
  date.setHours(0, 0, 0, 0)

  return date
}

/**
 * 比较两个日期相差的毫秒
 *
 * @param left 原始日期
 * @param right 原始日期
 */
export function differenceMilliseconds(left: Dateable, right: Dateable) {
  left = toDate(left)
  right = toDate(right)

  return right.getTime() - left.getTime()
}

/**
 * 比较两个日期相差的秒
 *
 * @param left 原始日期
 * @param right 原始日期
 */
export function differenceSeconds(left: Dateable, right: Dateable) {
  const diff = differenceMilliseconds(left, right) / SECOND_ON_MILLS

  return diff > 0 ? Math.floor(diff) : Math.ceil(diff)
}

/**
 * 比较两个日期相差的分钟
 *
 * @param left 原始日期
 * @param right 原始日期
 */
export function differenceMinutes(left: Dateable, right: Dateable) {
  const diff = differenceMilliseconds(left, right) / MINUTE_ON_MILLS

  return diff > 0 ? Math.floor(diff) : Math.ceil(diff)
}

/**
 * 比较两个日期相差的小时
 *
 * @param left 原始日期
 * @param right 原始日期
 */
export function differenceHours(left: Dateable, right: Dateable) {
  const diff = differenceMilliseconds(left, right) / HOUR_ON_MILLS

  return diff > 0 ? Math.floor(diff) : Math.ceil(diff)
}

/**
 * 比较两个日期相差的天数
 *
 * @param left 原始日期
 * @param right 原始日期
 */
export function differenceDays(left: Dateable, right: Dateable) {
  left = startOfDay(left)
  right = startOfDay(right)

  return (right.getTime() - left.getTime()) / DAY_ON_MILLIS
}

/**
 * 比较两个日期相差的周
 *
 * @param left 原始日期
 * @param right 原始日期
 * @param weekStartOn 设定周的第一天，默认为周日
 */
export function differenceWeeks(left: Dateable, right: Dateable, weekStartOn = 0) {
  left = startOfWeek(left, weekStartOn)
  right = startOfWeek(right, weekStartOn)

  return (right.getTime() - left.getTime()) / WEEK_ON_MILLIS
}

/**
 * 比较两个日期相差的月
 *
 * @param left 原始日期
 * @param right 原始日期
 */
export function differenceMonths(left: Dateable, right: Dateable) {
  left = toDate(left)
  right = toDate(right)

  const yearDiff = right.getFullYear() - left.getFullYear()
  const monthDiff = right.getMonth() - left.getMonth()

  return yearDiff * 12 + monthDiff
}

/**
 * 比较两个日期相差的季度
 *
 * @param left 原始日期
 * @param right 原始日期
 */
export function differenceQuarters(left: Dateable, right: Dateable) {
  left = toDate(left)
  right = toDate(right)

  const yearDiff = right.getFullYear() - left.getFullYear()
  const quarterDiff = getQuarter(right) - getQuarter(left)

  return yearDiff * 4 + quarterDiff
}

/**
 * 比较两个日期相差的年份
 *
 * @param left 原始日期
 * @param right 原始日期
 */
export function differenceYears(left: Dateable, right: Dateable) {
  left = toDate(left)
  right = toDate(right)

  return right.getFullYear() - left.getFullYear()
}

/**
 * 升序比较两个日期大小，用于给数组的 sort 方法使用
 *
 * @param left 原始日期
 * @param right 原始日期
 */
export function compareAsc(left: Dateable, right: Dateable) {
  left = toDate(left)
  right = toDate(right)

  const diff = left.getTime() - right.getTime()

  return diff < 0 ? -1 : diff > 0 ? 1 : diff
}

/**
 * 降序比较两个日期大小，用于给数组的 sort 方法使用
 *
 * @param left 原始日期
 * @param right 原始日期
 */
export function compareDesc(left: Dateable, right: Dateable) {
  return -compareAsc(left, right)
}

/**
 * 比较两个日期相差的完整秒
 *
 * @param left 原始日期
 * @param right 原始日期
 */
export function differenceFullSeconds(left: Dateable, right: Dateable) {
  left = startOfSecond(left)
  right = startOfSecond(right)

  return differenceSeconds(left, right)
}

/**
 * 比较两个日期相差的完整分钟
 *
 * @param left 原始日期
 * @param right 原始日期
 */
export function differenceFullMinutes(left: Dateable, right: Dateable) {
  left = startOfMinute(left)
  right = startOfMinute(right)

  return differenceMinutes(left, right)
}

/**
 * 比较两个日期相差的完整小时
 *
 * @param left 原始日期
 * @param right 原始日期
 */
export function differenceFullHours(left: Dateable, right: Dateable) {
  left = startOfHour(left)
  right = startOfHour(right)

  return differenceHours(left, right)
}

/**
 * 比较两个日期相差的完整天
 *
 * @param left 原始日期
 * @param right 原始日期
 */
export function differenceFullDays(left: Dateable, right: Dateable) {
  const sign = compareDesc(left, right)
  const difference = Math.abs(differenceDays(left, right))

  left = toDate(left)
  left.setDate(left.getDate() + sign * difference)

  const isLastNotFull = compareDesc(left, right) === -sign

  return sign * (difference - (isLastNotFull ? 1 : 0))
}

/**
 * 比较两个日期相差的完整周
 *
 * @param left 原始日期
 * @param right 原始日期
 */
export function differenceFullWeeks(left: Dateable, right: Dateable) {
  const diff = differenceFullDays(left, right) / WEEK_ON_DAYS

  return diff > 0 ? Math.floor(diff) : Math.ceil(diff)
}

/**
 * 比较两个日期相差的完整月
 *
 * @param left 原始日期
 * @param right 原始日期
 */
export function differenceFullMonths(left: Dateable, right: Dateable) {
  const sign = compareDesc(left, right)
  const difference = Math.abs(differenceMonths(left, right))

  left = toDate(left)
  left.setMonth(left.getMonth() + sign * difference)

  const isLastNotFull = compareDesc(left, right) === -sign

  return sign * (difference - (isLastNotFull ? 1 : 0))
}

/**
 * 比较两个日期相差的完整季度
 *
 * @param left 原始日期
 * @param right 原始日期
 */
export function differenceFullQuarters(left: Dateable, right: Dateable) {
  const diff = differenceFullMonths(left, right) / 3

  return diff > 0 ? Math.floor(diff) : Math.ceil(diff)
}

/**
 * 比较两个日期相差的完整年份
 *
 * @param left 原始日期
 * @param right 原始日期
 */
export function differenceFullYears(left: Dateable, right: Dateable) {
  const sign = compareDesc(left, right)
  const difference = Math.abs(differenceYears(left, right))

  left = toDate(left)
  left.setFullYear(left.getFullYear() + sign * difference)

  const isLastNotFull = compareDesc(left, right) === -sign

  return sign * (difference - (isLastNotFull ? 1 : 0))
}
