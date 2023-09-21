import type { Slot } from 'vue'

/**
 * 获取一个slot插槽中真实需要渲染的节点
 *
 * @param slot 需要提取的slot
 * @returns 真实渲染的节点列表
 */
export function getSlotRealNodes(slot?: Slot) {
  if (!slot) return []
  return slot().filter(item => {
    return (
      item.patchFlag !== -2 &&
      item.type.toString() !== 'Symbol(Comment)' &&
      item.type.toString() !== 'Symbol(v-cmt)'
    )
  })
}
