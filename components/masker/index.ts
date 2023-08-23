import Masker from './masker.vue'

import type { ComponentPublicInstance } from 'vue'

export { Masker }
export { maskerProps } from './props'

export type MaskerExposed = ComponentPublicInstance & InstanceType<typeof Masker>

export type { MaskerProps, MaskerCProps } from './props'
