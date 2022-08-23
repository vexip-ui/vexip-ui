import type { InjectionKey } from 'vue'

export interface LinkState {
  el: HTMLElement | null,
  to: string,
  active: boolean,
  indent: number
}

export interface AnchorState {
  currentActive: string,
  increaseLink(state: LinkState): void,
  decreaseLink(state: LinkState): void,
  handleActive(label: string): void
}

export const baseIndentWidth = 14 // px
export const LINK_STATE: InjectionKey<LinkState> = Symbol('ANCHOR_LINK_STATE')
export const ANCHOR_STATE: InjectionKey<AnchorState> = Symbol('ANCHOR_STATE')
