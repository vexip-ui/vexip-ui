export interface ObjectOption {
  value: string | number,
  label?: string,
  disabled?: boolean,
  divided?: boolean,
  noTitle?: boolean
}

export type RawOption = string | ObjectOption

export interface OptionState extends ObjectOption {
  label: string,
  hidden: boolean,
  hitting: boolean
}
