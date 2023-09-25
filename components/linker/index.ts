import Linker from './linker.vue'

import type { ComponentPublicInstance } from 'vue'

export { Linker }
export { linkerProps } from './props'

export type LinkerExposed = ComponentPublicInstance & InstanceType<typeof Linker>

export type { LinkerProps, LinkerCProps } from './props'
