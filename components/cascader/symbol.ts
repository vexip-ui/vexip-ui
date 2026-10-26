export type Data = Record<string, any>
export type CascaderValue = (string | number)[] | (string | number)[][]

export interface CascaderKeyConfig {
  value?: string,
  label?: string,
  children?: string,
  disabled?: string,
  hasChild?: string,
}

export interface CascaderOptionState {
  id: number,
  parent: number,
  value: string | number,
  fullValue: string,
  label: string,
  fullLabel: string,
  children: CascaderOptionState[],
  disabled: boolean,
  hasChild: boolean,
  checked: boolean,
  partial: boolean,
  loading: boolean,
  loaded: boolean,
  error: boolean,
  childrenLoaded: boolean,
  data: Data,
}

export interface CascaderPanelSlots {
  default?: (params: {
    option: CascaderOptionState,
    index: number,
    selected: boolean,
    canCheck: boolean,
    hasChild: boolean,
  }) => any,
  label?: (params: {
    option: CascaderOptionState,
    index: number,
    selected: boolean,
    canCheck: boolean,
    hasChild: boolean,
    handleSelect: () => void,
  }) => any,
}

export interface CascaderSlots extends CascaderPanelSlots {
  prefix?: () => any,
  suffix?: () => any,
  control?: () => any,
  empty?: () => any,
}
