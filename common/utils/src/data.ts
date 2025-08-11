export interface BITree {
  tree: number[],
  /**
   * 为第 index 个元素增减值
   *
   * @param index 索引值
   * @param num 增减的值
   */
  add(index: number, num: number): void,
  /**
   * 求前 index 个元素的和
   *
   * @param index 索引值
   *
   * @returns 前 index 个元素的和
   */
  sum(index?: number): number,
  /**
   * 获取第 index 个元素的值
   *
   * @param index 索引值
   *
   * @returns 第 index 个元素的值
   */
  get(index: number): number,
  /**
   * 根据目标值寻找一个最接近的元素的索引值
   *
   * @param target 目标值
   *
   * @returns 最接近的元素的索引值
   */
  boundIndex(target: number): number,
}

function lowBit(num: number) {
  return num & -num
}

/**
 * 创建一个二叉索引树（Fenwick 树）对象
 *
 * 为了节省初始化性能开销，需确保元素最小值已知，其初始值为：元素最小值 * 元素总数
 *
 * @param length 树的大小，即元素的总数
 * @param min 规定元素的最小值
 *
 * @returns 二叉索引树对象
 */
export function createBITree(length: number, min = 0): BITree {
  const tree: number[] = new Array(length + 1).fill(0)

  function add(index: number, delta: number) {
    if (!delta || index >= length) return

    index += 1

    while (index <= length) {
      tree[index] += delta
      index += lowBit(index)
    }
  }

  function sum(index = length) {
    if (index <= 0) return 0
    if (index > length) index = length

    let sum = index * min

    while (index > 0) {
      sum += tree[index]
      index -= lowBit(index)
    }

    return sum
  }

  function get(index: number) {
    return sum(index + 1) - sum(index)
  }

  function boundIndex(target: number) {
    let left = 0
    let right = length

    while (right > left) {
      const middle = Math.floor((left + right) / 2)
      const total = sum(middle)

      if (total > target) {
        right = middle
        continue
      } else if (total < target) {
        if (left === middle) {
          return sum(left + 1) <= target ? left + 1 : left
        }

        left = middle
      } else {
        return middle
      }
    }

    return left
  }

  return { tree, add, sum, get, boundIndex }
}
