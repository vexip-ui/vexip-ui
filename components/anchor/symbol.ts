import type { InjectionKey } from 'vue'

export interface AnchorLinkOptions {
  to: string,
  label: string,
  title?: string,
  children?: AnchorLinkOptions[],
}

export interface AnchorLinkState {
  el?: HTMLElement,
  to: string,
  active: boolean,
  indent: number,
}

export interface AnchorState {
  currentActive: string,
  increaseLink(state: AnchorLinkState): void,
  decreaseLink(state: AnchorLinkState): void,
  handleActive(label: string): void,
}

export interface AnchorSlots {
  default?: () => any,
  marker?: () => any,
}

export const baseIndentWidth = 14 // px
export const LINK_STATE = '__VXP_ANCHOR_LINK_STATE' as unknown as InjectionKey<AnchorLinkState>
export const ANCHOR_STATE = '__VXP_ANCHOR_STATE' as unknown as InjectionKey<AnchorState>
