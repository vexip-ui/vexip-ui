import { ref, reactive } from 'vue'

import type { Ref } from 'vue'

type Digit = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9

const numberKeys = Array.from({ length: 10 }, (_, i) => i) as Digit[]

function isNumberKey(key: string, num: Digit) {
  return key === `Digit${num}` || key === `Numpad${num}` || key === `${num}`
}

export function handleKeyEnter(event: KeyboardEvent) {
  const key = event.code || event.key

  let type: null | number | 'next' | 'prev' | 'up' | 'down' | 'ok' | 'esc' = null
  let isMatch = false

  switch (key) {
    case 'Tab': {
      isMatch = true
      type = event.shiftKey ? 'prev' : 'next'
      break
    }
    case 'ArrowRight': {
      // 下一列
      isMatch = true
      type = 'next'
      break
    }
    case 'Backspace':
    case 'Delete':
    case 'ArrowLeft': {
      // 上一列
      isMatch = true
      type = 'prev'
      break
    }
    case 'ArrowUp': {
      // 加一
      isMatch = true
      type = 'up'
      break
    }
    case 'ArrowDown': {
      // 减一
      isMatch = true
      type = 'down'
      break
    }
    case 'Space':
    case ' ':
    case 'Enter':
    case 'NumpadEnter': {
      // 确认
      isMatch = true
      type = 'ok'
      break
    }
    case 'Escape': {
      // 取消
      isMatch = true
      type = 'esc'
      break
    }
  }

  if (isMatch) {
    event.preventDefault()
    event.stopPropagation()
  } else {
    // 键入数字
    const inputtedNumber = numberKeys.findIndex(num => isNumberKey(key, num))

    if (~inputtedNumber) {
      type = inputtedNumber

      event.preventDefault()
      event.stopPropagation()
    }
  }

  return type
}

export function useColumn<T extends string>(
  colTypes: T[],
  currentColumn = ref(colTypes[0]) as Ref<T>
) {
  const columnTypes = Array.from(colTypes)
  const columnCount = columnTypes.length
  const enabled = reactive(
    columnTypes.reduce((prev, current) => {
      prev[current] = false
      return prev
    }, {} as any)
  ) as Record<T, boolean>

  function findEnabledColumn(types: T[]) {
    currentColumn.value = types.find(type => enabled[type]) ?? currentColumn.value
  }

  function resetColumn(type?: T, reverse = false) {
    const types = reverse ? Array.from(columnTypes).reverse() : columnTypes
    const index = types.findIndex(column => column === type)

    if (~index) {
      findEnabledColumn(types.slice(index, columnCount).concat(types.slice(0, index)))
    } else {
      findEnabledColumn(types)
    }
  }

  function enterColumn(type: 'prev' | 'next', canLoop = true) {
    for (let i = 0; i < columnCount; ++i) {
      if (currentColumn.value === columnTypes[i]) {
        const rawTypes = type === 'prev' ? Array.from(columnTypes).reverse() : columnTypes
        const nextIndex = (type === 'prev' ? columnCount - i : i + 1) % columnCount
        const types = canLoop
          ? rawTypes.slice(nextIndex, columnCount).concat(rawTypes.slice(0, nextIndex))
          : nextIndex
            ? rawTypes.slice(nextIndex, columnCount)
            : []

        findEnabledColumn(types)

        break
      }
    }
  }

  return {
    currentColumn,
    enabled,
    resetColumn,
    enterColumn
  }
}
