import { getCountWord, makeSentence } from '@vexip-ui/config'
import {
  DAY_ON_MILLISECONDS,
  HOUR_ON_MILLISECONDS,
  MINUTE_ON_MILLISECONDS,
  SECOND_ON_MILLISECONDS,
} from '@vexip-ui/utils'

import type { Ref } from 'vue'

export interface TimeAgoRecord {
  datetime: Date,
  timeAgo: Ref<string>,
  locale: Ref<Record<string, string>>,
  wordSpace: Ref<boolean>,
  interval: false | number,
  updated: number
}

let id = 1

export function getId() {
  return id++
}

const recordMap = new Map<number, TimeAgoRecord>()

let timer: ReturnType<typeof setInterval>
let isRunning: boolean

export function subscribe(id: number, record: TimeAgoRecord) {
  recordMap.set(id, record)

  if (recordMap.size && !isRunning) {
    clearInterval(timer)

    timer = setInterval(() => {
      isRunning = true

      const current = Date.now()

      recordMap.forEach(record => {
        if (!record.interval) return

        if (current - record.updated > record.interval) {
          record.timeAgo.value = computeTimeAgo(
            record.datetime,
            current,
            record.locale.value,
            record.wordSpace.value,
          )
          record.updated = current
        }
      })
    }, 5000)
  }
}

export function unsubscribe(id: number) {
  recordMap.delete(id)

  if (!recordMap.size) {
    clearInterval(timer)
    isRunning = false
  }
}

export function computeTimeAgo(
  date: Date,
  current: number,
  locale: Record<string, string>,
  wordSpace: boolean,
) {
  const diff = Math.abs(current - date.getTime())
  const type = current > date.getTime() ? locale.ago : locale.late

  let label: string
  let usedDiff: number
  let noFormat = false

  if (diff < 10 * SECOND_ON_MILLISECONDS) {
    label = locale.justNow
    noFormat = true
  } else if (diff < MINUTE_ON_MILLISECONDS) {
    label = locale.second
    usedDiff = Math.floor(diff / SECOND_ON_MILLISECONDS)
  } else if (diff < HOUR_ON_MILLISECONDS) {
    label = locale.minute
    usedDiff = Math.floor(diff / MINUTE_ON_MILLISECONDS)
  } else if (diff < DAY_ON_MILLISECONDS) {
    label = locale.hour
    usedDiff = Math.floor(diff / HOUR_ON_MILLISECONDS)
  } else if (diff < 30 * DAY_ON_MILLISECONDS) {
    usedDiff = Math.floor(diff / DAY_ON_MILLISECONDS)

    if (usedDiff === 1) {
      label = locale.yesterday
      noFormat = true
    } else {
      label = locale.days
    }
  } else if (diff < 365 * DAY_ON_MILLISECONDS) {
    usedDiff = Math.floor(diff / (30 * DAY_ON_MILLISECONDS))

    if (usedDiff === 1) {
      label = locale.lastMonth
      noFormat = true
    } else {
      label = locale.months
    }
  } else {
    usedDiff = Math.floor(diff / 365 / DAY_ON_MILLISECONDS)

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

  return makeSentence(`${getCountWord(label, usedDiff!)} ${type}`, wordSpace)
}
