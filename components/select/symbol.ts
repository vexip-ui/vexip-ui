export type ClassType = string | Record<string, boolean>
export type RawOption =
  | string
  | {
      value: string | number,
      label?: string,
      disabled?: boolean,
      divided?: boolean,
      noTitle?: boolean
    }
