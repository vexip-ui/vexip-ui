export type AlertType = 'default' | 'primary' | 'info' | 'success' | 'warning' | 'error'

export interface AlertSlots {
  default?: () => any,
  title?: () => any,
  close?: () => any,
  icon?: () => any,
}

export const alertTypes = Object.freeze<AlertType[]>([
  'default',
  'primary',
  'info',
  'success',
  'warning',
  'error',
])
