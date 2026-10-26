export interface OptionKeyConfig {
  value?: string,
  label?: string,
  disabled?: string,
  divided?: string,
  title?: string,
}

export type RawOption = string | Record<string, any>

export interface OptionState {
  value: string | number,
  label: string,
  disabled: boolean,
  divided: boolean,
  title: string,
  hidden: boolean,
  hitting: boolean,
  data: RawOption,
}
