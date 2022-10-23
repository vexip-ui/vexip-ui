import type { InjectionKey } from 'vue'

export interface AnchorLinkOptions {
  to: string,
  label: string,
  title?: string,
  children?: AnchorLinkOptions[]
}

export interface AnchorLinkState {
  el?: HTMLElement,
  to: string,
  active: boolean,
  indent: number
}

export interface AnchorState {
  currentActive: string,
  increaseLink(state: AnchorLinkState): void,
  decreaseLink(state: AnchorLinkState): void,
  handleActive(label: string): void
}

export const baseIndentWidth = 14 // px
export const LINK_STATE: InjectionKey<AnchorLinkState> = Symbol('ANCHOR_LINK_STATE')
export const ANCHOR_STATE: InjectionKey<AnchorState> = Symbol('ANCHOR_STATE')
