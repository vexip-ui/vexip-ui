import Alert from './alert.vue'

export { Alert }
export { alertProps } from './props'

export type AlertExposed = InstanceType<typeof Alert>

export type { AlertProps, AlertCProps } from './props'
export type { AlertType } from './symbol'
