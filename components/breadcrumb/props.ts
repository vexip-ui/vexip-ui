import { booleanProp, buildProps, eventProp, wrapProps } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { Router } from 'vue-router'
import type { ConfigurableProps, EventListener } from '@vexip-ui/config'
import type { BreadcrumbOptions, SelectEvent } from './symbol'

export const breadcrumbProps = buildProps({
  separator: String,
  border: booleanProp,
  options: Array as PropType<(string | BreadcrumbOptions)[]>,
  router: Object as PropType<Router>,
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
