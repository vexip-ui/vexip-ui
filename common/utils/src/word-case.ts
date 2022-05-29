export type AnyCase<S> = string extends S
  ? string
  : S extends `${infer F1}${infer F2}${infer R}`
  ? `${Uppercase<F1> | Lowercase<F1>}${Uppercase<F2> | Lowercase<F2>}${AnyCase<R>}`
  : S extends `${infer F}${infer R}`
  ? `${Uppercase<F> | Lowercase<F>}${AnyCase<R>}`
  : ''

/**
 * 将命名转换为短横线命名
 * @param value - 需要转换的命名
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

/**
 * 将命名转换为全大写命名Capital
 * @param value - 需要转换的命名
 */
export function toCapitalCase(value: string) {
  return (
    value.charAt(0).toUpperCase() +
    value.slice(1).replace(/-(\w)/g, (_, char) => (char ? char.toUpperCase() : ''))
  )
}

/**
 *  将命名转换为驼峰命名
 * @param value - 需要转换的命名
 */
export function toCamelCase(value: string) {
  const capitalName = toCapitalCase(value)

  return capitalName.charAt(0).toLowerCase() + capitalName.slice(1)
}
