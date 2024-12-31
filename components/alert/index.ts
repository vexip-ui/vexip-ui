import Alert from './alert.vue'

import type { ComponentPublicInstance } from 'vue'

export { Alert }
export { alertProps } from './props'

export type AlertExposed = ComponentPublicInstance & InstanceType<typeof Alert>

export type { AlertProps, AlertCProps } from './props'
export type { AlertType, AlertSlots } from './symbol'
