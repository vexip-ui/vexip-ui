import Card from './card.vue'

import type { ComponentPublicInstance } from 'vue'

export { Card }
export { cardProps } from './props'

export type CardExposed = ComponentPublicInstance & InstanceType<typeof Card>

export type { CardProps, CardCProps } from './props'
export type { CardShadowType, CardSlots } from './symbol'
