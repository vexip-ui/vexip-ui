/**
 * 将给定的常量字符串类型拓展为不区分大小写的任意组合
 */
export type AnyCase<S> = string extends S
  ? string
  : S extends `${infer F1}${infer F2}${infer R}`
    ? `${Uppercase<F1> | Lowercase<F1>}${Uppercase<F2> | Lowercase<F2>}${AnyCase<R>}`
    : S extends `${infer F}${infer R}`
      ? `${Uppercase<F> | Lowercase<F>}${AnyCase<R>}`
      : ''

function allCapital(value: string) {
  const matched = value.match(/[A-Z]+/)

  return matched && matched[0] === value
}

// const kebabRE = /\B([A-Z])/g
const kebabRE = /\B([A-Z])(?=[^A-Z_-])/g

/**
 * 将字面值转换为短横线连接
 *
 * @param value 需要转换的字面值
 *
 * @returns 转换后的短横线连接字面值
 *
 * @example
 * ```ts
 * toKebabCase('AaBbCc') // aa-bb-cc
 * toKebabCase('AABb') // aa-bb
 * toKebabCase('AAA') // aaa
 * toKebabCase('AaBb CcDd') // aa-bb cc-dd
 * ```
 */
export function toKebabCase(value: string) {
  // if (allCapital(value)) {
  //   return value.toLocaleLowerCase()
  // }

  return value.replace(kebabRE, '-$1').toLowerCase()
}

/**
 * 将给定的常量字符串类型拓展为大驼峰
 */
export type CapitalCase<T extends string> = T extends `${infer First} ${infer Rest}`
  ? CapitalCase<`${First}-${Rest}`>
  : T extends `${infer First}-${infer Rest}`
    ? `${Capitalize<First>}${CapitalCase<Rest>}`
    : Capitalize<T>

/**
 * 将字面值转换为大驼峰
 *
 * @param value 需要转换的字面值
 *
 * @returns 转换后的大驼峰字面值
 */
export function toCapitalCase<T extends string>(value: T) {
  value = value.trim().replace(/\s+/g, '-') as T
  value = value.replace(/-+(\w)/g, (_, char) => (char ? char.toUpperCase() : '')) as T

  return (value.charAt(0).toLocaleUpperCase() + value.slice(1)).replace(
    /[^\w]/g,
    '',
  ) as CapitalCase<T>
}

/**
 *  将字面值转换为小驼峰
 *
 * @param value 需要转换的字面值
 *
 * @returns 转换后的小驼峰字面值
 */
export function toCamelCase(value: string) {
  const capitalName = toCapitalCase(value)

  if (allCapital(capitalName)) {
    return capitalName.toLocaleLowerCase()
  }

  return capitalName.charAt(0).toLowerCase() + capitalName.slice(1)
}
