import Tree from './tree.vue'

import type { ComponentPublicInstance } from 'vue'

export { Tree }
export { treeProps } from './props'

export type TreeExposed = ComponentPublicInstance & InstanceType<typeof Tree>

export type { TreeProps, TreeCProps } from './props'
export type {
  TreeNodeDropType,
  TreeLinkLine,
  TreeNodeKeyConfig,
  TreeNodeProps,
  TreeNodePostCreate,
  TreeNodeRenderFn,
  TreeCommonSlotParams,
  TreeNodeSlotParams
} from './symbol'
