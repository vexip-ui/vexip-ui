export type BadgeType = 'error' | 'primary' | 'success' | 'warning' | 'info' | 'disabled'

export const badgeTypes = Object.freeze<BadgeType[]>([
  'error',
  'primary',
  'success',
  'warning',
  'info',
  'disabled'
])
