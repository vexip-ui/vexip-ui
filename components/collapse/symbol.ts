import type { InjectionKey } from 'vue'

export type CollapseArrowType = 'right' | 'left' | 'none'

export interface PanelState {
  tab?: HTMLElement | null,
  label: string | number,
  expanded: boolean,
  setExpanded: (expanded: boolean) => void
}

export interface CollapseState {
  arrowType: CollapseArrowType,
  registerPanel(panel: PanelState): void,
  unregisterPanel(panel: PanelState): void,
  expandPanel(label: string | number, expanded: boolean): void,
  refreshLabels: () => void
}

export const COLLAPSE_STATE = '__VXP_COLLAPSE_STATE' as unknown as InjectionKey<CollapseState>

let idCount = 0

export function getIndexId() {
  return idCount++
}
