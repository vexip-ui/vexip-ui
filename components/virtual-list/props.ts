import { booleanProp, buildProps, eventProp } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type { ScrollPayload } from './symbol'

export const virtualListProps = buildProps({
  items: Array as PropType<Array<Record<string, any>>>,
  itemSize: Number,
  itemFixed: booleanProp,
  idKey: String,
  defaultKeyAt: [Number, String, Symbol],
  bufferSize: Number,
  listTag: String,
  itemsTag: String,
  hideBar: booleanProp,
  lockItems: booleanProp,
  itemsAttrs: Object as PropType<Record<string, any>>,
  autoplay: booleanProp,
  ignoreResize: booleanProp,
  onScroll: eventProp<(payload: ScrollPayload) => void>(),
  onResize: eventProp<(entry: ResizeObserverEntry) => void>()
})

export type VirtualListProps = ExtractPropTypes<typeof virtualListProps>
export type VirtualListCProps = ConfigurableProps<VirtualListProps, 'items'>
