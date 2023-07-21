import { booleanProp, buildProps, eventProp, wrapProps } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps, EventListener } from '@vexip-ui/config'
import type { BreadcrumbOptions, SelectEvent } from './symbol'

// type SelectEvent =
//   | ((label: string | number) => void)
//   | ((label: string) => void)
//   | ((label: number) => void)

export const breadcrumbProps = buildProps({
  separator: String,
  border: booleanProp,
  options: Array as PropType<(string | BreadcrumbOptions)[]>,
  onSelect: eventProp<EventListener<SelectEvent>>(),
  onSeparatorClick: eventProp<EventListener<SelectEvent>>()
})

export type BreadcrumbProps = ExtractPropTypes<typeof breadcrumbProps>
export type BreadcrumbCProps = ConfigurableProps<BreadcrumbProps>

export const breadcrumbItemProps = wrapProps({
  label: {
    type: [String, Number],
    default: null
  },
  onSelect: eventProp<EventListener<SelectEvent>>(),
  onSeparatorClick: eventProp<EventListener<SelectEvent>>()
})

export type BreadcrumbItemProps = ExtractPropTypes<typeof breadcrumbItemProps>
