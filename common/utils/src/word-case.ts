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

/**
 * 将命名转换为短横线命名
 *
 * @param value 需要转换的命名
 */
export function toKebabCase(value: string) {
  return (
    value.charAt(0).toLowerCase() +
    value
      .slice(1)
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()
  )
}

type CapitalCase<T extends string> = T extends `${infer First} ${infer Rest}`
  ? CapitalCase<`${First}-${Rest}`>
  : T extends `${infer First}-${infer Rest}`
    ? `${Capitalize<First>}${CapitalCase<Rest>}`
    : Capitalize<T>

/**
 * 将命名转换为首字母大写的驼峰
 *
 * @param value 需要转换的命名
 */
export function toCapitalCase<T extends string>(value: T) {
  value = value.trim().replace(/\s+/g, '-') as T
  value = value.replace(/-+(\w)/g, (_, char) => (char ? char.toUpperCase() : '')) as T

  return (value.charAt(0).toLocaleUpperCase() + value.slice(1)).replace(
    /[^\w]/g,
    ''
  ) as CapitalCase<T>
}

/**
 *  将命名转换为驼峰命名
 *
 * @param value 需要转换的命名
 */
export function toCamelCase(value: string) {
  const capitalName = toCapitalCase(value)

  return capitalName.charAt(0).toLowerCase() + capitalName.slice(1)
}
