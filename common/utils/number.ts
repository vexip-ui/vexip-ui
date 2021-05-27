export function toNumber(value: unknown): number {
  const number = parseFloat(value as string)

  return Number.isNaN(number) ? 0 : number
}

export function doubleDigits(number: number): string {
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
 * 将一个实数扩大一定的倍数并保留一定的小数
 * @param number - 要处理的实数
 * @param multiple - 要扩大的倍数
 * @param decimal - 要保留的小数
 */
export function multipleFixed(number: number, multiple: number, decimal: number): number {
  const fixed = 10 ** decimal

  return Math.round(number * multiple * fixed) / fixed
}

export function toFixed(number: number, decimal: number): number {
  return multipleFixed(number, 1, decimal)
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
