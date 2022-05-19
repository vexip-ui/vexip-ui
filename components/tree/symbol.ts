import type { InjectionKey } from 'vue'

export type Key = string | number
export type Data = Record<string, unknown>

export enum DropType {
  BEFORE,
  INNER,
  AFTER
}

export interface InitDataOptions extends Data {
  visible?: boolean,
  selected?: boolean,
  expanded?: boolean,
  disabled?: boolean,
  checked?: boolean,
  loading?: boolean,
  loaded?: boolean,
  readonly?: boolean,
  arrow?: boolean | 'auto' | null,
  checkbox?: boolean | null
}

export type TreeNodeOptions = Required<InitDataOptions> & {
  data: InitDataOptions,
  partial: boolean
} & Data

export type RenderFn = (data: { data: Data, node: TreeNodeOptions }) => any
export type AsyncLoadFn = (node: Readonly<TreeNodeOptions>) => void | boolean | Promise<any>

export interface TreeNodeInstance {
  el: HTMLElement | null,
  arrow: HTMLElement | null,
  node: TreeNodeOptions
}

export interface TreeState {
  arrow: boolean | 'auto',
  checkbox: boolean,
  renderer: RenderFn,
  dragging: boolean,
  boundAsyncLoad: boolean,
  computeCheckedState(originNode: TreeNodeOptions, able: boolean): void,
  handleNodeClick(node: TreeNodeOptions): void,
  handleNodeSelect(node: TreeNodeOptions): void,
  handleNodeCancel(node: TreeNodeOptions): void,
  handleNodeExpand(node: TreeNodeOptions): void,
  handleNodeReduce(node: TreeNodeOptions): void,
  handleAsyncLoad(node: TreeNodeOptions): Promise<boolean>,
  handleNodeDragStart(nodeInstance: TreeNodeInstance): void,
  handleNodeDragOver(nodeInstance: TreeNodeInstance, event: DragEvent): void,
  handleNodeDrop(nodeInstance: TreeNodeInstance): void,
  handleNodeDragEnd(nodeInstance: TreeNodeInstance): void
}

export interface TreeNodeState {
  disabled: boolean,
  readonly: boolean
}

export const TREE_STATE: InjectionKey<TreeState> = Symbol('TREE_STATE')
export const TREE_NODE_STATE: InjectionKey<TreeNodeState> = Symbol('TREE_NODE_STATE')
