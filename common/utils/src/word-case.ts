// 短横线命名
export function toKebabCase(value: string) {
  return (
    value.charAt(0).toLowerCase() +
    value
      .slice(1)
      .replace(/([A-Z])/g, '-$1')
      .toLowerCase()
  )
}

// 全大写命名
export function toPascalCase(value: string) {
  return (
    value.charAt(0).toUpperCase() +
    value.slice(1).replace(/-(\w)/g, (_, char) => (char ? char.toUpperCase() : ''))
  )
}

// 驼峰命名
export function toCamelCase(value: string) {
  const pascalName = toPascalCase(value)

  return pascalName.charAt(0).toLowerCase() + pascalName.slice(1)
}
