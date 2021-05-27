export interface LinkState {
  el: HTMLElement | null,
  to: string,
  indent: number
}

export interface AnchorState {
  currentActive: string,
  increaseLink(state: LinkState): void,
  decreaseLink(state: LinkState): void,
  handleActive(label: string): void
}

export const baseIndentWidth = 14 // px
export const LINK_STATE = Symbol('ANCHOR_LINK_STATE')
export const ANCHOR_STATE = Symbol('ANCHOR_STATE')
