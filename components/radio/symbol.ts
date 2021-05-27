export interface GroupState {
  currentValue: string | number,
  disabled: boolean,
  updateValue(value: string | number): void
}

export const GROUP_STATE = Symbol('RADIO_GROUP_STATE')
