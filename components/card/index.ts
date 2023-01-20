import Card from './card.vue'

export { Card }
export type CardExposed = InstanceType<typeof Card>

export type { CardProps, CardCProps } from './props'
export type { CardShadowType } from './symbol'
