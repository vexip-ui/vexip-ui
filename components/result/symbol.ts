export type ResultType = 'primary' | 'info' | 'success' | 'warning' | 'error'

export interface ResultSlots {
  icon?: () => any,
  title?: () => any,
  description?: () => any,
  extra?: () => any
}

export const resultTypes = Object.freeze<ResultType[]>([
  'primary',
  'info',
  'success',
  'warning',
  'error'
])
