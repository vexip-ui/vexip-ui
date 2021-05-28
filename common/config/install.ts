export interface InstallOptions extends Record<string, Record<string, unknown>> {
  defaults: Record<string, unknown>
}

export const config: InstallOptions = {
  defaults: {} as Record<string, unknown>
}

function createConfigGetter(name: string) {
  return function getConfig<T>(key: string, defaultValue: T): T {
    return ((config[name] ?? config.defaults)[key] as T) ?? defaultValue
  }
}

/**
 * 将原始 props 选项转换为使用配置后的选项
 * @param name - 驼峰的组件名，传入 symbol 时不会使用配置，仅返回原始 props 用作类型推导
 * @param props - 原始 props 选项
 * @returns 使用配置后的 props 选项
 */
export function useConfiguredProps<T extends Record<string, unknown>>(name: string, props: T) {
  const getConfig = createConfigGetter(name)

  Object.keys(props).forEach(key => {
    const prop = props[key] as { default?: unknown }

    prop.default = getConfig(key, prop.default)
  })

  return props
}
