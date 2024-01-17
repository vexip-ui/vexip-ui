import { booleanProp, buildProps, eventProp, iconProp, localeProp } from '@vexip-ui/config'

import type { ExtractPropTypes, PropType } from 'vue'
import type { ConfigurableProps } from '@vexip-ui/config'
import type {
  AsyncLoadFn,
  Data,
  FilterFn,
  NodePropsFn,
  TreeLinkLine,
  TreeNodeDropType,
  TreeNodeKeyConfig,
  TreeNodePostCreate,
  TreeNodeProps,
  TreeNodeRenderFn
} from './symbol'

export const treeProps = buildProps({
  locale: localeProp('tree'),
  arrow: {
    type: [Boolean, String] as PropType<boolean | 'auto'>,
    default: null
  },
  data: Array as PropType<Data[]>,
  noBuildTree: booleanProp,
  emptyText: String,
  disabled: booleanProp,
  readonly: booleanProp,
  checkbox: booleanProp,
  suffixCheckbox: booleanProp,
  renderer: Function as PropType<TreeNodeRenderFn>,
  prefixRenderer: Function as PropType<TreeNodeRenderFn>,
  suffixRenderer: Function as PropType<TreeNodeRenderFn>,
  multiple: booleanProp,
  indent: [String, Number],
  accordion: booleanProp,
  draggable: booleanProp,
  appear: booleanProp,
  floorSelect: booleanProp,
  onAsyncLoad: Function as PropType<AsyncLoadFn>,
  cacheNode: booleanProp,
  rootId: [String, Number],
  keyConfig: Object as PropType<TreeNodeKeyConfig>,
  noCascaded: booleanProp,
  filter: [String, Function] as PropType<string | FilterFn>,
  ignoreCase: booleanProp,
  nodeProps: [Object, Function] as PropType<Data | NodePropsFn>,
  linkLine: {
    type: [Boolean, String] as PropType<boolean | TreeLinkLine>,
    default: null
  },
  postCreate: Function as PropType<TreeNodePostCreate>,
  virtual: booleanProp,
  nodeMinHeight: Number,
  useYBar: booleanProp,
  noTransition: booleanProp,
  arrowIcon: iconProp,
  blockEffect: booleanProp,
  filterLeaf: booleanProp,
  onNodeChange: eventProp<(data: Data, node: TreeNodeProps, checked: boolean) => void>(),
  onNodeClick: eventProp<(data: Data, node: TreeNodeProps) => void>(),
  onNodeSelect: eventProp<(data: Data | Data[], node: TreeNodeProps | TreeNodeProps[]) => void>(),
  onNodeCancel: eventProp<(data: Data, node: TreeNodeProps) => void>(),
  onNodeExpand: eventProp<(data: Data, node: TreeNodeProps) => void>(),
  onNodeReduce: eventProp<(data: Data, node: TreeNodeProps) => void>(),
  onDragStart: eventProp<(data: Data, node: TreeNodeProps) => void>(),
  onDragOver: eventProp<(data: Data, node: TreeNodeProps) => void>(),
  onDrop: eventProp<(data: Data, node: TreeNodeProps, type: TreeNodeDropType) => void>(),
  onDragEnd: eventProp<(data: Data, node: TreeNodeProps) => void>(),
  onLabelClick: eventProp<(data: Data, node: TreeNodeProps) => void>()
})

export type TreeProps = ExtractPropTypes<typeof treeProps>
export type TreeCProps = ConfigurableProps<TreeProps, 'data', 'onAsyncLoad'>
