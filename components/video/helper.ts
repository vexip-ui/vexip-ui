import { doubleDigits, leaveNumber } from '@vexip-ui/utils'

import type { IconOptions, IconValue } from '@vexip-ui/config'

export function formatSeconds(seconds: number) {
  if (seconds <= 0) return '00:00'

  const remainders = leaveNumber(Math.ceil(seconds), 60, 2)

  if (remainders.length < 2) {
    remainders.unshift(0)
  }

  return remainders.length < 3
    ? remainders.map(doubleDigits).join(':')
    : remainders.map((r, i) => (i ? doubleDigits(r) : r)).join(':')
}

export function mergeIconScale(scale: number, icon: IconOptions & { icon: IconValue }) {
  return {
    ...icon,
    scale: +(icon.scale || 1) * scale
  }
}
