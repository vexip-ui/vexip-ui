import { doubleDigits, leaveNumber } from '@vexip-ui/utils'

export function formatTime(time: number) {
  const remainders = leaveNumber(time / 1000, 60, 2)

  if (remainders.length < 2) {
    remainders.unshift(0)
  }

  return remainders.length < 3
    ? remainders.map(doubleDigits).join(':')
    : remainders.map((r, i) => (i ? doubleDigits(r) : r)).join(':')
}
