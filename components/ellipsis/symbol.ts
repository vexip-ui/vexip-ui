export interface EllipsisSlots {
  /**
   * @internal
   */
  default?: () => void,
  content?: (params: { content: string }) => any,
}
