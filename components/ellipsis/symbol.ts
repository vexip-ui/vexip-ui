export interface EllipsisSlots {
  default?: () => void,
  content?: (params: { content: string }) => any,
}
