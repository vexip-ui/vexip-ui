import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'

export const typographyProps = buildProps({
  //
})

export type TypographyProps = ExtractPropTypes<typeof typographyProps>
export type TypographyCProps = ConfigurableProps<TypographyProps, 'viewer'>
