import { useLocale, getCountWord, makeSentence } from '@vexip-ui/config'
import { SECOND_ON_MILLS, MINUTE_ON_MILLS, HOUR_ON_MILLS, DAY_ON_MILLIS } from '@vexip-ui/utils'

import type { Ref } from 'vue'

export interface TimeAgoRecord {
  datetime: Date,
  timeAgo: Ref<string>,
  interval: number,
  updated: number
}

let id = 1

export function getId() {
  return id++
}

const recordMap = new Map<number, TimeAgoRecord>()

let timer: number
let isRunning: boolean

export function subscribe(id: number, record: TimeAgoRecord) {
  recordMap.set(id, record)

  if (recordMap.size && !isRunning) {
    window.clearInterval(timer)

    timer = window.setInterval(() => {
      isRunning = true

      const current = Date.now()

      recordMap.forEach(record => {
        if (current - record.updated > record.interval) {
          record.timeAgo.value = computeTimeAgo(record.datetime, current)
          record.updated = current
        }
      })
    }, 5000)
  }
}

export function unsubscribe(id: number) {
  recordMap.delete(id)

  if (!recordMap.size) {
    window.clearInterval(timer)
    isRunning = false
  }
}

export function computeTimeAgo(date: Date, current = Date.now()) {
  const locale = useLocale('timeAgo').value
  const diff = Math.abs(current - date.getTime())
  const type = current > date.getTime() ? locale.ago : locale.late

  let label: string
  let usedDiff: number
  let noFormat = false

  if (diff < 10 * SECOND_ON_MILLS) {
    label = locale.justNow
    noFormat = true
  } else if (diff < MINUTE_ON_MILLS) {
    label = locale.second
    usedDiff = Math.floor(diff / SECOND_ON_MILLS)
  } else if (diff < HOUR_ON_MILLS) {
    label = locale.minute
    usedDiff = Math.floor(diff / MINUTE_ON_MILLS)
  } else if (diff < DAY_ON_MILLIS) {
    label = locale.hour
    usedDiff = Math.floor(diff / HOUR_ON_MILLS)
  } else if (diff < 30 * DAY_ON_MILLIS) {
    usedDiff = Math.floor(diff / DAY_ON_MILLIS)

    if (usedDiff === 1) {
      label = locale.yesterday
      noFormat = true
    } else {
      label = locale.days
    }
  } else if (diff < 365 * DAY_ON_MILLIS) {
    usedDiff = Math.floor(diff / (30 * DAY_ON_MILLIS))

    if (usedDiff === 1) {
      label = locale.lastMonth
      noFormat = true
    } else {
      label = locale.months
    }
  } else {
    usedDiff = Math.floor(diff / 365 / DAY_ON_MILLIS)

    if (usedDiff === 1) {
      label = locale.lastYear
      noFormat = true
    } else {
      label = locale.years
    }
  }

  if (noFormat) {
    return label
  }

  return makeSentence(`${getCountWord(label, usedDiff!)} ${type}`)
}
