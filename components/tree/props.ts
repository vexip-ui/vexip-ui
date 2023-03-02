import { buildProps, booleanProp, eventProp, localeProp } from '@vexip-ui/config'

import type { PropType, ExtractPropTypes } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type {
  Data,
  TreeLinkLine,
  NodeDropType,
  NodeKeyConfig,
  TreeNodeProps,
  RenderFn,
  AsyncLoadFn,
  FilterFn,
  NodePropsFn
} from './symbol'

export const treeProps = buildProps({
  locale: localeProp('tree'),
  arrow: {
    type: [Boolean, String] as PropType<boolean | 'auto'>,
    default: null
  },
  data: Array as PropType<Data[]>,
  noBuildTree: booleanProp,
  emptyTip: String,
  disabled: booleanProp,
  readonly: booleanProp,
  checkbox: booleanProp,
  suffixCheckbox: booleanProp,
  renderer: Function as PropType<RenderFn>,
  multiple: booleanProp,
  indent: [String, Number],
  accordion: booleanProp,
  draggable: booleanProp,
  appear: booleanProp,
  floorSelect: booleanProp,
  onAsyncLoad: Function as PropType<AsyncLoadFn>,
  cacheNode: booleanProp,
  rootId: [String, Number],
  keyConfig: Object as PropType<NodeKeyConfig>,
  noCascaded: booleanProp,
  filter: [String, Function] as PropType<string | FilterFn>,
  ignoreCase: booleanProp,
  nodeProps: [Object, Function] as PropType<Data | NodePropsFn>,
  linkLine: {
    type: [Boolean, String] as PropType<boolean | TreeLinkLine>,
    default: null
  },
  onNodeChange: eventProp<(data: Data, node: TreeNodeProps, checked: boolean) => void>(),
  onNodeClick: eventProp<(data: Data, node: TreeNodeProps) => void>(),
  onNodeSelect: eventProp<(data: Data | Data[], node: TreeNodeProps | TreeNodeProps[]) => void>(),
  onNodeCancel: eventProp<(data: Data, node: TreeNodeProps) => void>(),
  onNodeExpand: eventProp<(data: Data, node: TreeNodeProps) => void>(),
  onNodeReduce: eventProp<(data: Data, node: TreeNodeProps) => void>(),
  onDragStart: eventProp<(data: Data, node: TreeNodeProps) => void>(),
  onDragOver: eventProp<(data: Data, node: TreeNodeProps) => void>(),
  onDrop: eventProp<(data: Data, node: TreeNodeProps, type: NodeDropType) => void>(),
  onDragEnd: eventProp<(data: Data, node: TreeNodeProps) => void>(),
  onLabelClick: eventProp<(data: Data, node: TreeNodeProps) => void>()
})

export type TreeProps = ExtractPropTypes<typeof treeProps>
export type TreeCProps = ConfigurableProps<TreeProps, 'data', 'onAsyncLoad'>
