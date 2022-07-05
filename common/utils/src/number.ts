import type { AnyCase } from './word-case'

/**
 * 将任意值转成数字，NaN 的情况将会处理成 0
 * @param value - 需要转化的值
 */
export function toNumber(value: unknown) {
  const number = parseFloat(value as string)

  return Number.isNaN(number) ? 0 : number
}

/**
 * 讲小于 10 整数 N 变成 `0N` 的字符串，方法不会对入参校验
 * @param number - 需要处理的整数
 */
export function doubleDigits(number: number) {
  return number < 10 ? `0${number}` : number.toString()
}

/**
 * 将数字格式化为三位阶
 * @param number - 需要格式化的数字
 * @param segment - 分隔的位数，默认为 3
 * @param separator - 分隔的符号，默认为 ','
 */
export function segmentNumber(number: number | string, segment = 3, separator = ','): string {
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
 * 讲一个实数保留一定的小数
 * @param number - 需要处理的实数
 * @param decimal - 需要保留的小数
 */
export function toFixed(number: number, decimal: number) {
  if (decimal === 0) return Math.round(number)

  let snum = String(number)
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
 * 将一个实数扩大一定的倍数并保留一定的小数
 * @param number - 要处理的实数
 * @param multiple - 要扩大的倍数
 * @param decimal - 要保留的小数
 */
export function multipleFixed(number: number, multiple: number, decimal: number) {
  return toFixed(number * multiple, decimal)
}

/**
 * 根据临界值对数字进行舍入
 * @param number - 需要舍入的数
 * @param criticalValue - 舍入的临界值 (0 ~ 1)，达到临界值进位反之舍弃
 */
export function round(number: number, criticalValue: number) {
  if (criticalValue < 0 || criticalValue > 1) {
    return Math.round(number)
  }

  const ceilValue = Math.ceil(number)

  if (number + criticalValue >= ceilValue) {
    return ceilValue
  } else {
    return Math.floor(number)
  }
}

/**
 * 将一个数字限定在指定的范围内
 * @param number - 需要限定范围的数
 * @param min - 边界最小值，包含该值
 * @param max - 边界最大值，包含该值
 *
 * @returns 限定了范围后的数
 */
export function boundRange(number: number | string, min: number, max: number) {
  return Math.max(min, Math.min(max, parseFloat(number as string)))
}

export type SizeUnitWithAuto = AnyCase<'B' | 'KB' | 'MB' | 'GB' | 'TB' | 'AUTO'>
export type SizeUnit = Exclude<SizeUnitWithAuto, AnyCase<'AUTO'>>

const SIZE_UNIT_WITH_AUTO = Object.freeze(['B', 'KB', 'MB', 'GB', 'TB', 'AUTO'] as Uppercase<SizeUnitWithAuto>[])

/**
 * 根据传入的 Byte 数值，将其格式化成指定单位的大小
 * @param byte - 需要计算的 Byte 数值
 * @param unit - 格式化的单位
 */
export function formatByteSize(byte: number, unit: SizeUnitWithAuto = 'AUTO') {
  let upperUnit = unit.toUpperCase() as Uppercase<SizeUnitWithAuto>
  upperUnit = SIZE_UNIT_WITH_AUTO.includes(upperUnit) ? upperUnit : 'AUTO'

  let power
  switch (upperUnit) {
    case 'AUTO': power = 0; break
    case 'KB': power = 1; break
    case 'MB': power = 2; break
    case 'GB': power = 3; break
    case 'TB': power = 4; break
    default: return byte
  }

  let targetSize

  if (!power) {
    for (targetSize = byte; targetSize > 1024; ++power) {
      if (power > 4) break
      targetSize = targetSize / 1024
    }
  } else {
    targetSize = byte / (1024 ** power)
  }

  return targetSize
}

/**
 * Return digits length of a number
 * @param number the number
 */
export function digitLength(number: number | string) {
  // Get digit length of e
  const eSplit = number.toString().split(/[eE]/)
  const len = (eSplit[0].split('.')[1] || '').length - +(eSplit[1] || 0)

  return len > 0 ? len : 0
}

function toPrecision(number: number | string, precision = 15) {
  return +parseFloat(Number(number).toPrecision(precision))
}

function multipleInt(number: number | string) {
  const snum = String(number)

  if (!snum.includes('e')) {
    return Number(snum.replace('.', ''))
  }

  const dLength = digitLength(number)

  return dLength > 0 ? toPrecision(Number(number) * (10 ** dLength)) : Number(number)
}

function times(...numbers: (number | string)[]) {
  let result = numbers[0] as number

  const loop = numbers.slice(1)

  while (loop.length) {
    const number = loop.shift()!
    const int1 = multipleInt(result)
    const int2 = multipleInt(number)
    const base = digitLength(result) + digitLength(number)
    const int = int1 * int2

    result = int / (10 ** base)
  }

  return result
}

export function plus(...numbers: (number | string)[]) {
  let result = numbers[0] as number

  const loop = numbers.slice(1)

  while (loop.length) {
    const number = loop.shift()!
    const base = 10 ** Math.max(digitLength(result), digitLength(number))

    result = (times(result, base) + times(number, base)) / base
  }

  return result
}

export function minus(...numbers: (number | string)[]) {
  let result = numbers[0] as number

  const loop = numbers.slice(1)

  while (loop.length) {
    const number = loop.shift()!
    const base = 10 ** Math.max(digitLength(result), digitLength(number))

    result = (times(result, base) - times(number, base)) / base
  }

  return result
}

export function divide(...numbers: (number | string)[]) {
  let result = numbers[0] as number

  const loop = numbers.slice(1)

  while (loop.length) {
    const number = loop.shift()!
    const int1 = multipleInt(result)
    const int2 = multipleInt(number)

    result = times(int1 / int2, toPrecision(10 ** (digitLength(number) - digitLength(result))))
  }

  return result
}
