import type { Ref } from 'vue'

export type CollapseArrowType = 'right' | 'left' | 'none'

export interface CollapseState {
  arrowType: CollapseArrowType,
  registerPane(label: string | number, paneExpanded: Ref<boolean>): void,
  unregisterPane(label: string | number): void,
  expandPane(label: string | number, expanded: boolean): void
}

export const COLLAPSE_STATE = Symbol('COLLAPSE_STATE')
