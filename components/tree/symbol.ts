import type { InjectionKey } from 'vue'

export type Key = string | number
export type Data = Record<string, any>

export interface NodeKeyConfig {
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
  checkbox?: string
}

export enum DropType {
  BEFORE,
  INNER,
  AFTER
}

export type TreeNodeProps = {
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
  data: Data,
  /* @internal */
  partial: boolean,
  /* @internal */
  matched: boolean,
  /* @internal */
  childMatched: boolean,
  /* @internal */
  upperMatched: boolean
}

export type RenderFn = (data: { data: Data, node: TreeNodeProps }) => any
export type AsyncLoadFn = (node: Readonly<TreeNodeProps>) => void | boolean | Promise<any>
export type FilterFn = (data: Data, node: TreeNodeProps) => boolean
export type NodePropsFn = (data: Data, node: TreeNodeProps) => Data

export interface TreeNodeInstance {
  el: HTMLElement | null,
  arrow: HTMLElement | null,
  node: TreeNodeProps
}

export interface TreeState {
  arrow: boolean | 'auto',
  checkbox: boolean,
  suffixCheckbox: boolean,
  renderer: RenderFn,
  dragging: boolean,
  boundAsyncLoad: boolean,
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
  handleNodeDragEnd(nodeInstance: TreeNodeInstance): void
}

export interface TreeNodePropsState {
  depth: number,
  disabled: boolean,
  readonly: boolean
}

export const TREE_STATE: InjectionKey<TreeState> = Symbol('TREE_STATE')
export const TREE_NODE_STATE: InjectionKey<TreeNodePropsState> = Symbol('TREE_NODE_STATE')
