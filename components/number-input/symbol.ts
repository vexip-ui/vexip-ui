export type NumberInputControlType = 'right' | 'left' | 'right-fade' | 'left-fade' | 'none'
export type NumberInputEmptyType = 'NaN' | 'undefined' | 'null'

export interface NumberInputSlots {
  prefix?: () => any,
  suffix?: () => any
}
