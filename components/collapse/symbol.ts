import type { InjectionKey, Ref } from 'vue'

export type CollapseArrowType = 'right' | 'left' | 'none'

export interface PanelState {
  expanded: Ref<boolean>,
  setExpanded: (expanded: boolean) => void
}

export interface CollapseState {
  arrowType: CollapseArrowType,
  registerPanel(label: string | number, panel: PanelState): void,
  unregisterPanel(label: string | number): void,
  expandPanel(label: string | number, expanded: boolean): void
}

export const COLLAPSE_STATE: InjectionKey<CollapseState> = Symbol('COLLAPSE_STATE')
