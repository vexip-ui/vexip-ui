import type { OptionKeyConfig, RawOption, OptionState } from '@/components/option'

export interface SelectKeyConfig extends OptionKeyConfig {
  group?: string,
  children?: string
}

export type SelectRawOption = RawOption

export interface SelectOptionState extends OptionState {
  group: boolean,
  depth: number,
  parent: SelectOptionState | null,
  data: SelectRawOption
}
