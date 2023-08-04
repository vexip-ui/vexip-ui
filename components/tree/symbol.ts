import type { InjectionKey } from 'vue'
// import type { BITree } from '@vexip-ui/utils'

export type Key = string | number
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
  readonly?: string,
  arrow?: string,
  checkbox?: string,
  selectDisabled?: string,
  expandDisabled?: string,
  checkDisabled?: string
}

export const enum DropType {
  BEFORE = 'before',
  INNER = 'inner',
  AFTER = 'after'
}

export type TreeNodeProps<D = Data> = {
  id: Key,
  parent: Key,
  children: TreeNodeProps[],
  visible: boolean,
  selected: boolean,
  expanded: boolean,
  disabled: boolean,
  checked: boolean,
  loading: boolean,
  loaded: boolean,
  readonly: boolean,
  arrow: boolean | 'auto',
  checkbox: boolean,
  selectDisabled: boolean,
  expandDisabled: boolean,
  checkDisabled: boolean,
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
  inLastCount: number
}

export type TreeNodePostCreate<D = Data> = (node: TreeNodeProps<D>) => void
export type TreeNodeRenderFn<D = Data> = (data: { data: D, node: TreeNodeProps<D> }) => any
export type AsyncLoadFn<D = Data> = (
  data: D,
  node: Readonly<TreeNodeProps<D>>
) => void | boolean | Promise<any>
export type FilterFn<D = Data> = (data: D, node: TreeNodeProps<D>) => boolean
export type NodePropsFn<D = Data> = (data: D, node: TreeNodeProps<D>) => Data

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
  dragging: boolean,
  boundAsyncLoad: boolean,
  nodeStates: Map<Key, TreeNodeState>,
  getParentNode(node: TreeNodeProps): TreeNodeProps | null,
  updateVisibleNodeEls(): void,
  computeCheckedState(originNode: TreeNodeProps, able: boolean): void,
  handleNodeClick(node: TreeNodeProps): void,
  handleNodeSelect(node: TreeNodeProps): void,
  handleNodeCancel(node: TreeNodeProps): void,
  handleNodeExpand(node: TreeNodeProps): void,
  handleNodeReduce(node: TreeNodeProps): void,
  handleAsyncLoad(node: TreeNodeProps): Promise<boolean>,
  handleNodeDragStart(nodeInstance: TreeNodeInstance): void,
  handleNodeDragOver(nodeInstance: TreeNodeInstance, event: DragEvent): void,
  handleNodeDrop(nodeInstance: TreeNodeInstance): void,
  handleNodeDragEnd(nodeInstance: TreeNodeInstance): void,
  handleHittingChange(type: 'up' | 'down'): void,
  handleNodeHitting(nodeEl?: HTMLElement | null): void,
  handleLabelClick(node: TreeNodeProps): void
}

export const TREE_STATE: InjectionKey<TreeState> = Symbol('TREE_STATE')
export const TREE_NODE_STATE: InjectionKey<TreeNodeState> = Symbol('TREE_NODE_STATE')
