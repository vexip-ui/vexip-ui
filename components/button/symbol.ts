export type ButtonType =
  | 'default'
  | 'primary'
  // | 'dashed'
  // | 'text'
  | 'info'
  | 'success'
  | 'warning'
  | 'error'

export type ButtonAttrType = 'button' | 'submit' | 'reset'

export const buttonTypes = Object.freeze<ButtonType>(['default', 'primary', 'info', 'success', 'warning', 'error'])
