import { booleanProp, buildProps, eventProp, wrapProps } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { BreadcrumbOptions } from './symbol'

type SelectEvent =
  | ((label: string | number) => void)
  | ((label: string) => void)
  | ((label: number) => void)

export const breadcrumbProps = buildProps({
  separator: String,
  border: booleanProp,
  options: Array as PropType<(string | BreadcrumbOptions)[]>,
  onSelect: eventProp<SelectEvent>(),
  onSeparatorClick: eventProp<SelectEvent>()
})

export type BreadcrumbProps = ExtractPropTypes<typeof breadcrumbProps>
export type BreadcrumbCProps = ConfigurableProps<BreadcrumbProps>

export const breadcrumbItemProps = wrapProps({
  label: {
    type: [String, Number],
    default: null
  },
  onSelect: eventProp<(label: string | number) => void>(),
  onSeparatorClick: eventProp<(label: string | number) => void>()
})

export type BreadcrumbItemProps = ExtractPropTypes<typeof breadcrumbItemProps>
