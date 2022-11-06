export type ProgressInfoType =
  | 'outside'
  | 'inside'
  | 'bubble'
  | 'bubble-top'
  | 'bubble-bottom'
  | 'none'

export type ProgressStrokeColor =
  | string
  | [string, string]
  | ((percentage: number) => string | [string, string])
