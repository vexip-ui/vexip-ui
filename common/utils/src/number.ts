import type { AnyCase } from './word-case'

export const numberRE = /^\s*[+-]?\d*\.?\d+(?:[eE][+-]?\d+)?\s*$/

/**
 * 检测给定的值是否可以通过 parseFlat 或 Number 方法转为数字
 *
 * 开启严格模式则通过正则以更严格的方法判断
 *
 * @param value 需要检测的值
 * @param strict 是否为严格模式
 *
 * @returns 值是否可以转为数字
 */
export function isValidNumber(value: unknown, strict = false) {
  if (typeof value === 'number') {
    return !Number.isNaN(value)
  }

  if (strict) {
    return numberRE.test(String(value))
  }

  return !Number.isNaN(parseFloat(value as string)) || !Number.isNaN(Number(value))
}

/**
 * 将给定的值转成数字，NaN 的情况将会处理成 0
 *
 * @param value 需要转换的值
 *
 * @returns 转换后的数字
 */
export function toNumber(value: unknown) {
  let number = parseFloat(value as string)

  if (Number.isNaN(number)) {
    number = Number(value)
  }

  return Number.isNaN(number) ? 0 : number
}

/**
 * 为给定的整数开头填充 0，直至满足指定的长度
 *
 * @param number 需要处理的整数
 * @param length 填充至的长度
 *
 * @returns 填充后的字面值
 */
export function padStartZeros(number: number, length: number) {
  if (length <= 0) {
    return number.toString()
  }

  return `${number < 0 ? '-' : ''}${String(Math.abs(Math.round(number))).padStart(length, '0')}`
}

/**
 * 将小于 10 整数 N 变成 `0N` 的字符串，方法不会对入参校验
 *
 * @param number 需要处理的整数
 *
 * @returns 填充后的字面值
 */
export function doubleDigits(number: number) {
  return padStartZeros(number, 2)
}

/**
 * 返回数字的小数位数
 *
 * @param number 指定的数字
 *
 * @returns 数字的小数位数
 */
export function decimalLength(number: number | string) {
  // Get digit length of e
  const eSplit = number.toString().split(/[eE]/)
  const len = (eSplit[0].split('.')[1] || '').length - +(eSplit[1] || 0)

  return len > 0 ? len : 0
}

/**
 * Return decimal length of a number
 *
 * @param number The input number
 * @deprecated Using `decimalLength` to replace it
 */
export function digitLength(number: number | string) {
  return decimalLength(number)
}

/**
 * 将给定的数字格式化为指定的位阶
 *
 * @param number 需要格式化的数字
 * @param segment 分隔的位数，默认为 3
 * @param separator 分隔的符号，默认为 ','
 *
 * @returns 格式化后的字面值
 */
export function segmentNumber(number: number | string, segment = 3, separator = ',') {
  if (typeof number !== 'number') {
    number = parseFloat(number)
  }

  if (Number.isNaN(number)) return '0'

  let [integer, decimal] = String(number).split('.')

  const formatRegExp = new RegExp(`(\\d+)(\\d{${segment}})`)

  while (formatRegExp.test(integer)) {
    integer = integer.replace(formatRegExp, `$1${separator}$2`)
  }

  decimal = decimal ? `.${decimal}` : ''

  return `${integer}${decimal}`
}

/**
 * 将给定的实数保留一定的小数
 *
 * @param number 需要处理的实数
 * @param decimal 需要保留的小数
 *
 * @returns 保留小数后的值
 */
export function toFixed(number: number, decimal: number) {
  decimal = Math.max(Math.round(decimal), 0)

  let snum = number.toFixed(decimalLength(number))

  const pointPos = snum.indexOf('.')

  if (pointPos === -1) return number

  const nums = snum.replace('.', '').split('')
  const targetPos = pointPos + decimal
  const datum = nums[targetPos]

  if (!datum) return number

  if (snum.charAt(targetPos + 1) === '5') {
    snum = snum.substring(0, targetPos + 1) + '6'
  } else {
    snum = snum.substring(0, targetPos + 2)
  }

  return parseFloat(Number(snum).toFixed(decimal))
}

/**
 * 将给定的实数扩大一定的倍数并保留一定的小数
 *
 * @param number 要处理的实数
 * @param multiple 要扩大的倍数
 * @param decimal 要保留的小数
 *
 * @returns 扩大并保留小数后的值
 */
export function multipleFixed(number: number, multiple: number, decimal: number) {
  return toFixed(number * multiple, decimal)
}

/**
 * 根据临界值对给定的数字进行舍入
 *
 * @param number 需要舍入的数
 * @param criticalValue 舍入的临界值 (0 ~ 1)，达到临界值进位反之舍弃
 *
 * @returns 舍入后的值
 */
export function round(number: number, criticalValue: number) {
  if (criticalValue < 0 || criticalValue > 1) {
    return Math.round(number)
  }

  const ceilValue = Math.ceil(number)

  if (number + 1 - criticalValue >= ceilValue) {
    return ceilValue
  } else {
    return Math.floor(number)
  }
}

/**
 * 将给定的数字限定在指定的范围内
 *
 * @param number 需要限定范围的数
 * @param min 边界最小值，包含该值
 * @param max 边界最大值，包含该值
 *
 * @returns 限定在范围内的值
 */
export function boundRange(number: number | string, min: number, max: number) {
  return Math.max(min, Math.min(max, parseFloat(number as string)))
}

/**
 * 将给定的被除数和除数，不断的取余直至达到次数限制或余数小于除数，返回系列余数
 *
 * @param number 被除数，需大于 0
 * @param divideBy 除数，需大于 1
 * @param limit 次数限制，默认为 0，小于 1 则不作限制
 *
 * @returns 相除过程的系列余数
 */
export function leaveNumber(number: number, divideBy: number, limit = 0) {
  if (number <= 0 || divideBy <= 1) return [number]

  if (limit < 1) {
    limit = Infinity
  }

  const remainders: number[] = []
  let count = 0

  while (number >= divideBy && count < limit) {
    remainders.push(number % divideBy)
    number = Math.floor(number / divideBy)
    ++count
  }

  remainders.push(number)

  return remainders.reverse()
}

const ordinalSuffixes = ['th', 'st', 'nd', 'rd']

/**
 * 将给定的数字转换为序数词
 *
 * @param value 需要转换的数字
 *
 * @returns 转换后的序数词
 */
export function ordinalNumber(value: number) {
  value = Math.round(value)

  if (value <= 0) return `${value}th`

  const suffix =
    value % 100 > 10 && value % 100 < 14
      ? ordinalSuffixes[0]
      : ordinalSuffixes[value % 10] || ordinalSuffixes[0]

  return `${value}${suffix}`
}

export type SizeUnitWithAuto = AnyCase<'B' | 'KB' | 'MB' | 'GB' | 'TB' | 'AUTO'>
export type SizeUnit = Exclude<SizeUnitWithAuto, AnyCase<'AUTO'>>

const SIZE_UNIT_WITH_AUTO = Object.freeze([
  'B',
  'KB',
  'MB',
  'GB',
  'TB',
  'AUTO',
] as Uppercase<SizeUnitWithAuto>[])

/**
 * 根据给定的 Byte 数值，将其格式化成指定单位的大小
 *
 * @param byte 需要计算的 Byte 数值
 * @param unit 格式化的单位
 * @param precision 结果的精度
 * @param joinUtil 是否加入单位
 *
 * @returns 格式化后的值
 */
export function formatByteSize(byte: number, unit?: SizeUnitWithAuto): number
export function formatByteSize(byte: number, unit?: SizeUnitWithAuto, precision?: number): number
export function formatByteSize(byte: number, unit?: SizeUnitWithAuto, joinUtil?: true): number
export function formatByteSize(
  byte: number,
  unit?: SizeUnitWithAuto,
  joinUtil?: true,
  precision?: number
): number
export function formatByteSize(
  byte: number,
  unit: SizeUnitWithAuto = 'AUTO',
  joinUtil: number | boolean = false,
  precision?: number,
) {
  if (typeof precision === 'undefined') {
    if (typeof joinUtil === 'number') {
      precision = joinUtil
      joinUtil = false
    } else {
      precision = 2
    }
  }

  let upperUnit = unit.toUpperCase() as Uppercase<SizeUnitWithAuto>
  upperUnit = SIZE_UNIT_WITH_AUTO.includes(upperUnit) ? upperUnit : 'AUTO'

  let power
  switch (upperUnit) {
    case 'AUTO':
      power = 0
      break
    case 'KB':
      power = 1
      break
    case 'MB':
      power = 2
      break
    case 'GB':
      power = 3
      break
    case 'TB':
      power = 4
      break
    default:
      return byte
  }

  let targetSize

  if (!power) {
    for (targetSize = byte; targetSize > 1024; ++power) {
      if (power > 4) break
      targetSize = targetSize / 1024
    }
  } else {
    targetSize = byte / 1024 ** power
  }

  targetSize = toFixed(targetSize, precision)

  return joinUtil
    ? `${targetSize}${upperUnit === 'AUTO' ? SIZE_UNIT_WITH_AUTO[Math.min(power, 4)] : upperUnit}`
    : targetSize
}

/**
 * 在给定的范围内随机一个数
 *
 * @param max 最大值
 * @param min 最小值，默认为 0
 *
 * @returns 生成的随机数
 */
export function random(max: number, min = 0) {
  if (min === max) return min

  if (min > max) {
    ;[min, max] = [max, min]
  }

  return Math.random() * (max - min) + min
}

const ordinalSuffixes = ['th', 'st', 'nd', 'rd']

export function getOrdinalSuffix(number: number) {
  if (number < 0) {
    return 'th'
  }

  const rest = number % 100

  return ordinalSuffixes[rest] || ordinalSuffixes[number % 10] || ordinalSuffixes[0]
}

export function getOrdinal(number: number) {
  return `${number}${getOrdinalSuffix(number)}`
}

/**
 * 将数字处理为的指定的有效位数
 *
 * @param number 需要处理的数字
 * @param precision 数字的有效位数
 *
 * @returns 处理后的数字
 *
 * @example
 * ```ts
 * toPrecision(0.09999999999999998) === 0.1 // true
 * ```
 */
export function toPrecision(number: number | string, precision = 15) {
  return +parseFloat(Number(number).toPrecision(precision))
}

function multipleInt(number: number | string) {
  const snum = String(number)

  if (!snum.includes('e')) {
    return Number(snum.replace('.', ''))
  }

  const dLength = decimalLength(number)

  return dLength > 0 ? toPrecision(Number(number) * 10 ** dLength) : Number(number)
}

/**
 * Create an operation to support rest params.
 *
 * @param operation The original operation
 */
function createOperation(operation: (n1: number | string, n2: number | string) => number) {
  return (...numbers: (number | string)[]) => {
    let result = numbers[0] as number

    for (let i = 1, len = numbers.length; i < len; ++i) {
      result = operation(result, numbers[i])
    }

    return result
  }
}

/**
 * 精确的乘法
 *
 * @param numbers 需要依次相乘的数字
 *
 * @returns 乘积
 */
export const times = createOperation((number1, number2) => {
  const int1 = multipleInt(number1)
  const int2 = multipleInt(number2)
  const base = decimalLength(number1) + decimalLength(number2)
  const int = int1 * int2

  return int / 10 ** base
})

/**
 * 精确的加法
 *
 * @param numbers 需要依次相加的数字
 *
 * @returns 和
 */
export const plus = createOperation((number1, number2) => {
  const base = 10 ** Math.max(decimalLength(number1), decimalLength(number2))

  return (times(number1, base) + times(number2, base)) / base
})

/**
 * 精确的减法
 *
 * @param numbers 需要依次相减的数字
 *
 * @returns 差值
 */
export const minus = createOperation((number1, number2) => {
  const base = 10 ** Math.max(decimalLength(number1), decimalLength(number2))

  return (times(number1, base) - times(number2, base)) / base
})

/**
 * 精确的除法
 *
 * @param numbers 需要依次相除的数字
 *
 * @returns 商
 */
export const divide = createOperation((number1, number2) => {
  const int1 = multipleInt(number1)
  const int2 = multipleInt(number2)

  return times(int1 / int2, toPrecision(10 ** (decimalLength(number2) - decimalLength(number1))))
})
