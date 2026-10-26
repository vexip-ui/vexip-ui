import ConfigProvider from './config-provider'

import type { ComponentPublicInstance } from 'vue'

export { ConfigProvider }
export { configProviderProps } from './props'

export type ConfigProviderExposed = ComponentPublicInstance & InstanceType<typeof ConfigProvider>
export type { ConfigProviderProps } from './props'
