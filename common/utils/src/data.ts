export interface BITree {
  add(index: number, num: number): void,
  sum(index?: number): number,
  get(index: number): number,
  boundIndex(limit: number): number
}

function lowBit(num: number) {
  return num & -num
}

export function createBITree(length: number, min = 0) {
  const tree = new Array(length + 1).fill(0)

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

  function boundIndex(limit: number) {
    let left = 0
    let right = length

    while (right > left) {
      const middle = Math.floor((left + right) / 2)
      const total = sum(middle)

      if (total > limit) {
        right = middle
        continue
      } else if (total < limit) {
        if (left === middle) {
          return sum(left + 1) <= limit ? left + 1 : left
        }

        left = middle
      } else {
        return middle
      }
    }

    return left
  }

  return { add, sum, get, boundIndex }
}
