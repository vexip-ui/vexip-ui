import { buildProps, styleProp } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { CardShadowType, CardSlots } from './symbol'

export const cardProps = buildProps({
  title: String,
  shadow: String as PropType<CardShadowType>,
  contentStyle: styleProp,
  slots: Object as PropType<CardSlots>,
})

export type CardProps = ExtractPropTypes<typeof cardProps>
export type CardCProps = ConfigurableProps<CardProps>
