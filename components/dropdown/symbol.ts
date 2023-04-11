import type { InjectionKey } from 'vue'

export type DropdownTrigger = 'hover' | 'click' | 'custom'

type SelectHandler = (labels: (string | number)[], metas: Array<Record<string, any>>) => void

export interface DropdownState {
  alive: boolean,
  handleSelect: SelectHandler,
  handleTriggerEnter: () => void,
  handleTriggerLeave: () => void
}

export const SELECT_HANDLER: InjectionKey<SelectHandler> = Symbol('SELECT_HANDLER')
export const DROPDOWN_STATE: InjectionKey<DropdownState> = Symbol('DROPDOWN_STATE')
