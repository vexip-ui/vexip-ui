export type CardShadowType = 'always' | 'hover' | 'never'

export interface CardSlots {
  default?: () => any,
  header?: () => any,
  title?: () => any,
  extra?: () => any,
}
