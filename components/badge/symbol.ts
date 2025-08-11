export type BadgeType = 'error' | 'primary' | 'success' | 'warning' | 'info' | 'disabled'

export interface BadgeSlots {
  default?: () => any,
  content?: (params: { content: number | string }) => any,
}

export const badgeTypes = Object.freeze<BadgeType[]>([
  'error',
  'primary',
  'success',
  'warning',
  'info',
  'disabled',
])
