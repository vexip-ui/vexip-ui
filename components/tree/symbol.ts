import type { InjectionKey } from 'vue'
// import type { BITree } from '@vexip-ui/utils'

export type Key = string | number | symbol
export type Data = any
export type TreeNodeDropType = 'before' | 'inner' | 'after'
export type TreeLinkLine = 'dashed' | 'solid' | 'dotted' | 'none'

export interface TreeNodeKeyConfig {
  id?: string,
  parent?: string,
  label?: string,
  children?: string,
  visible?: string,
  selected?: string,
  expanded?: string,
  disabled?: string,
  checked?: string,
  loading?: string,
  loaded?: string,
  loadFail?: string,
  readonly?: string,
  arrow?: string,
  checkbox?: string,
  selectDisabled?: string,
  expandDisabled?: string,
  checkDisabled?: string,
  isLeaf?: string
}

export const enum DropType {
  BEFORE = 'before',
  INNER = 'inner',
  AFTER = 'after',
}

export type TreeNodeProps<D = Data> = {
  id: Key,
  parent?: Key,
  children: TreeNodeProps[],
  visible: boolean,
  selected: boolean,
  expanded: boolean,
  disabled: boolean,
  checked: boolean,
  loading: boolean,
  loaded: boolean,
  loadFail: boolean,
  readonly: boolean,
  arrow: boolean | 'auto',
  checkbox: boolean,
  selectDisabled: boolean,
  expandDisabled: boolean,
  checkDisabled: boolean,
  isLeaf: boolean | 'auto',
  data: D,
  /** @internal */
  partial: boolean,
  /** @internal */
  matched: boolean,
  /** @internal */
  childMatched: boolean,
  /** @internal */
  upperMatched: boolean,
  /** @internal */
  depth: number,
  /** @internal */
  last: boolean,
  /** @internal */
  upstreamLast: boolean[],
  /** @internal */
  lineIndexes: number[]
}

export type TreeNodePostCreate<D = Data> = (node: TreeNodeProps<D>) => void
export type TreeNodeRenderFn<D = Data> = (params: { data: D, node: TreeNodeProps<D> }) => any
export type AsyncLoadFn<D = Data> = (
  data: D,
  node: Readonly<TreeNodeProps<D>>
) => void | boolean | Promise<any>
export type FilterFn<D = Data> = (data: D, node: TreeNodeProps<D>) => boolean
export type NodePropsFn<D = Data> = (data: D, node: TreeNodeProps<D>) => Data

export interface TreeCommonSlotParams {
  data: Data,
  node: TreeNodeProps,
  depth: number,
  focused: boolean
}

export interface TreeNodeSlotParams extends TreeCommonSlotParams {
  /** @deprecated */
  lineCount: number,
  lineIndexes: number[],
  toggleCheck: (checked?: boolean) => void,
  toggleExpand: (expanded?: boolean) => Promise<void>,
  toggleSelect: (able?: boolean) => Promise<void>
}

export interface TreeNodeInstance {
  el?: HTMLElement | null,
  arrow?: HTMLElement | null,
  node: TreeNodeProps
}

export interface TreeNodeState {
  el?: HTMLElement | null,
  depth: number,
  disabled: boolean,
  readonly: boolean
}

export interface TreeCollapseProps {
  id: symbol,
  placeholder: true,
  type: 'expand' | 'reduce',
  height: number,
  nodes: TreeNodeProps[]
}

export interface TreeState {
  arrow: boolean | 'auto',
  checkbox: boolean,
  suffixCheckbox: boolean,
  noCascaded: boolean,
  linkLine: false | TreeLinkLine,
  virtual: boolean,
  labelKey: string,
  draggable: boolean,
  floorSelect: boolean,
  renderer: TreeNodeRenderFn,
  prefixRenderer: TreeNodeRenderFn,
  suffixRenderer: TreeNodeRenderFn,
  arrowIcon: Record<string, any>,
  blockEffect: boolean,
  dragging: boolean,
  boundAsyncLoad: boolean,
  nodeStates: Map<Key, TreeNodeState>,
  expanding: boolean,
  getParentNode(node: TreeNodeProps): TreeNodeProps | null,
  updateVisibleNodeEls(): void,
  computeCheckedState(originNode: TreeNodeProps, able: boolean): void,
  handleNodeClick(node: TreeNodeProps): void,
  handleNodeSelect(node: TreeNodeProps): void,
  handleNodeCancel(node: TreeNodeProps): void,
  handleNodeExpand(node: TreeNodeProps): void,
  handleNodeReduce(node: TreeNodeProps): void,
  handleNodeContextmenu(node: TreeNodeProps): void,
  handleAsyncLoad(node: TreeNodeProps): Promise<boolean>,
  handleNodeDragStart(nodeInstance: TreeNodeInstance): void,
  handleNodeDragOver(nodeInstance: TreeNodeInstance, event: DragEvent): void,
  handleNodeDrop(nodeInstance: TreeNodeInstance): void,
  handleNodeDragEnd(nodeInstance: TreeNodeInstance): void,
  handleHittingChange(type: 'up' | 'down'): void,
  handleNodeHitting(nodeEl?: HTMLElement | null): void,
  handleLabelClick(node: TreeNodeProps): void
}

export interface TreeSlots {
  node?: (params: TreeNodeSlotParams) => any,
  arrow?: (params: TreeCommonSlotParams) => any,
  label?: (params: TreeCommonSlotParams) => any,
  prefix?: (params: TreeCommonSlotParams) => any,
  suffix?: (params: TreeCommonSlotParams) => any,
  empty?: () => any
}

export const TREE_STATE = '__VXP_TREE_STATE' as unknown as InjectionKey<TreeState>
export const TREE_NODE_STATE = '__VXP_TREE_NODE_STATE' as unknown as InjectionKey<TreeNodeState>

export const defaultKeyConfig: Required<TreeNodeKeyConfig> = {
  id: 'id',
  parent: 'parent',
  label: 'label',
  children: 'children',
  visible: 'visible',
  selected: 'selected',
  expanded: 'expanded',
  disabled: 'disabled',
  checked: 'checked',
  loading: 'loading',
  loaded: 'loaded',
  loadFail: 'loadFail',
  readonly: 'readonly',
  arrow: 'arrow',
  checkbox: 'checkbox',
  selectDisabled: 'selectDisabled',
  expandDisabled: 'expandDisabled',
  checkDisabled: 'checkDisabled',
  isLeaf: 'isLeaf',
}
