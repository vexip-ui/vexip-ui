import { buildProps, booleanProp, styleProp, eventProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { CollapseArrowType } from './symbol'

export const collapseProps = buildProps({
  expanded: [String, Number, Array] as PropType<string | number | (string | number)[]>,
  card: booleanProp,
  accordion: booleanProp,
  arrowType: String as PropType<CollapseArrowType>,
  ghost: booleanProp,
  onChange: eventProp<(expanded: (string | number)[]) => void>()
})

export type CollapseProps = ExtractPropTypes<typeof collapseProps>
export type CollapseCProps = ConfigurableProps<CollapseProps, 'expanded'>

export const collapsePanelProps = buildProps({
  label: [String, Number],
  title: String,
  disabled: booleanProp,
  contentStyle: styleProp,
  expanded: booleanProp,
  card: booleanProp,
  arrowType: String as PropType<CollapseArrowType>,
  icon: Object,
  ghost: booleanProp,
  onToggle: eventProp<(expanded: boolean) => void>()
})

export type CollapsePanelProps = ExtractPropTypes<typeof collapsePanelProps>
export type CollapsePanelCProps = ConfigurableProps<CollapsePanelProps>

type TransitionMode = 'in-out' | 'out-in' | 'default'

export const collapseTransitionProps = buildProps({
  appear: booleanProp,
  mode: String as PropType<TransitionMode>,
  horizontal: booleanProp,
  duration: Number,
  timing: String,
  fadeEffect: booleanProp,
  onBeforeEnter: eventProp<(el: Element) => void>(),
  onEnter: eventProp<(el: Element) => void>(),
  onAfterEnter: eventProp<(el: Element) => void>(),
  onEnterCancelled: eventProp<(el: Element) => void>(),
  onBeforeLeave: eventProp<(el: Element) => void>(),
  onLeave: eventProp<(el: Element) => void>(),
  onAfterLeave: eventProp<(el: Element) => void>(),
  onLeaveCancelled: eventProp<(el: Element) => void>()
})

export type CollapseTransitionProps = ExtractPropTypes<typeof collapseTransitionProps>
export type CollapseTransitionCProps = ConfigurableProps<CollapseTransitionProps>
