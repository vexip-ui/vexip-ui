import { isNull, toFalse } from '@vexip-ui/utils'

export interface CascadedNode {
  checked: boolean,
  partial: boolean,
  parent?: string | number | symbol,
  children: CascadedNode[]
}

export function useCascadedChecked<T extends CascadedNode>(options: {
  getNode: (key: string | number | symbol) => T | null | undefined | void,
  disableNode?: (node: T) => boolean
}) {
  function updateCheckedUpward(key: string | number | symbol) {
    let node = options.getNode(key)

    if (!node) return

    while (!isNull(node.parent)) {
      const parentId = node.parent
      const parent = options.getNode(parentId)

      if (!parent) break

      if (node.checked === parent.checked && node.partial === parent.partial) {
        break
      }

      if (node.checked) {
        parent.checked = parent.children.every(item => item.checked)
        parent.partial = !parent.checked
      } else {
        parent.checked = false
        parent.partial = parent.children.some(item => item.checked || item.partial)
      }

      node = parent
    }
  }

  function updateCheckedDown(key: string | number | symbol) {
    const originNode = options.getNode(key)

    if (!originNode) return

    const disable = typeof options.disableNode === 'function' ? options.disableNode : toFalse
    const checked = originNode.checked
    const partial = originNode.partial

    const loop = [...(originNode.children as T[])]

    let node: T

    while (loop.length) {
      node = loop.shift()!

      if (disable(node)) continue

      node.checked = checked
      node.partial = partial

      if (node.children.length) {
        loop.push(...(node.children as T[]))
      }
    }
  }

  return {
    updateCheckedUpward,
    updateCheckedDown,
  }
}
