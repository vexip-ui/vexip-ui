import { ref, reactive, computed } from 'vue'
import { toNumber } from '@vexip-ui/utils'
import { DisabledType } from './symbol'

import type { Ref } from 'vue'
import type { DisabledTime } from './symbol'

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
  currentColumn = ref(colTypes[0]) as Ref<T | undefined>
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
    currentColumn.value = types.find(type => enabled[type])
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

const defaultMin = [0, 0, 0]
const defaultMax = [23, 59, 59]

export function useTimeBound(originMin: Ref<string>, originMax: Ref<string>) {
  const minUnits = computed(() => {
    return originMin.value ? originMin.value.split(':').map(toNumber) : defaultMin
  })
  const maxUnits = computed(() => {
    return originMax.value ? originMax.value.split(':').map(toNumber) : defaultMax
  })
  const reversed = computed(() => {
    const min = minUnits.value
    const max = maxUnits.value

    for (let i = 0; i < 3; ++i) {
      if (min[i] < max[i]) return false
      if (min[i] > max[i]) return true
    }

    return false
  })

  const isTimeDisabled: Required<DisabledTime> = {
    hour: isHourDisabled,
    minute: (hour, minute) => isMinuteDisabled(hour, minute) !== DisabledType.FALSE,
    second: (hour, minute, second) => isSecondDisabled(hour, minute, second) !== DisabledType.FALSE
  }

  function isHourDisabled(hour: number) {
    const min = minUnits.value[0] || defaultMin[0]
    const max = maxUnits.value[0] || defaultMax[0]

    return reversed.value ? hour > max && hour < min : hour < min || hour > max
  }

  function isMinuteDisabled(hour: number, minute: number) {
    if (isHourDisabled(hour)) return DisabledType.UPSTREAM

    if (minUnits.value[0] === maxUnits.value[0] && hour === minUnits.value[0]) {
      const min = minUnits.value[1] || defaultMin[1]
      const max = maxUnits.value[1] || defaultMax[1]

      if (reversed.value ? minute > max && minute < min : minute < min || minute > max) {
        return DisabledType.TRUE
      }
    }

    if (hour === minUnits.value[0]) {
      const min = minUnits.value[1] || defaultMin[1]

      if (minute < min) return DisabledType.AT_MIN_TRUE
    }

    if (hour === maxUnits.value[0]) {
      const max = maxUnits.value[1] || defaultMax[1]

      if (minute > max) return DisabledType.AT_MAX_TRUE
    }

    return DisabledType.FALSE
  }

  function isSecondDisabled(hour: number, minute: number, second: number) {
    if (isMinuteDisabled(hour, minute) !== DisabledType.FALSE) return DisabledType.UPSTREAM

    if (
      minUnits.value[0] === maxUnits.value[0] &&
      hour === minUnits.value[0] &&
      minUnits.value[1] === maxUnits.value[1] &&
      minute === minUnits.value[1]
    ) {
      const min = minUnits.value[2] || defaultMin[2]
      const max = maxUnits.value[2] || defaultMax[2]

      if (reversed.value ? second > max && second < min : second < min || second > max) {
        return DisabledType.TRUE
      }
    }

    if (hour === minUnits.value[0] && minute === minUnits.value[1]) {
      const min = minUnits.value[2] || defaultMin[2]

      if (second < min) return DisabledType.AT_MIN_TRUE
    }

    if (hour === maxUnits.value[0] && minute === maxUnits.value[1]) {
      const max = maxUnits.value[2] || defaultMax[2]

      if (second > max) return DisabledType.AT_MAX_TRUE
    }

    return DisabledType.FALSE
  }

  // function verifyHour(hour: number) {
  //   if (!isHourDisabled(hour)) return hour

  //   if (reversed.value) {
  //     const minDis = minUnits.value[0] - hour
  //     const maxDis = hour - maxUnits.value[0]

  //     return minDis > maxDis ? maxUnits.value[0] : minUnits.value[0]
  //   }

  //   return boundRange(hour, minUnits.value[0], maxUnits.value[0])
  // }

  // function verifyMinute(hour: number, minute: number) {
  //   const type = isMinuteDisabled(hour, minute)

  //   if (type === DisabledType.AT_MIN_TRUE) return minUnits.value[1]
  //   if (type === DisabledType.AT_MAX_TRUE) return maxUnits.value[1]

  //   if (type === DisabledType.TRUE) {
  //     if (reversed.value) {
  //       const minDis = minUnits.value[1] - minute
  //       const maxDis = minute - maxUnits.value[1]

  //       return minDis > maxDis ? maxUnits.value[1] : minUnits.value[1]
  //     }

  //     return boundRange(minute, minUnits.value[1], maxUnits.value[1])
  //   }

  //   return minute
  // }

  // function verifySecond(hour: number, minute: number, second: number) {
  //   const type = isSecondDisabled(hour, minute, second)

  //   if (type === DisabledType.AT_MIN_TRUE) return minUnits.value[2]
  //   if (type === DisabledType.AT_MAX_TRUE) return maxUnits.value[2]

  //   if (type === DisabledType.TRUE) {
  //     if (reversed.value) {
  //       const minDis = minUnits.value[2] - second
  //       const maxDis = second - maxUnits.value[2]

  //       return minDis > maxDis ? maxUnits.value[2] : minUnits.value[2]
  //     }

  //     return boundRange(second, minUnits.value[2], maxUnits.value[2])
  //   }

  //   return second
  // }

  return {
    minUnits,
    maxUnits,
    reversed,
    isTimeDisabled
    // verifyHour,
    // verifyMinute,
    // verifySecond
  }
}
