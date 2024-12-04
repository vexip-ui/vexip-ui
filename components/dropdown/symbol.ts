import type { InjectionKey } from 'vue'

export type DropdownTrigger = 'hover' | 'click' | 'custom'

type SelectHandler = (labels: (string | number)[], metas: Array<Record<string, any>>) => void

export interface DropdownState {
  alive: boolean,
  handleSelect: SelectHandler,
  handleTriggerEnter: () => void,
  handleTriggerLeave: () => void
}

export const SELECT_HANDLER = '__VXP_SELECT_HANDLER' as unknown as InjectionKey<SelectHandler>
export const DROPDOWN_STATE = '__VXP_DROPDOWN_STATE' as unknown as InjectionKey<DropdownState>
