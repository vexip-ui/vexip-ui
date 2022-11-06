import { buildProps, booleanProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { BreadcrumbOptions } from './symbol'

export const breadcrumbProps = buildProps({
  separator: String,
  border: booleanProp,
  options: Array as PropType<(string | BreadcrumbOptions)[]>,
  onSelect: eventProp<(label: string | number) => void>(),
  onSeparatorClick: eventProp<(label: string | number) => void>()
})

export type BreadcrumbProps = ExtractPropTypes<typeof breadcrumbProps>
export type BreadcrumbCProps = ConfigurableProps<BreadcrumbProps>
