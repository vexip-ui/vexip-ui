import Alert from './alert.vue'

export { Alert }
export type AlertExposed = InstanceType<typeof Alert>

export type { AlertProps, AlertCProps } from './props'
export type { AlertType } from './symbol'
